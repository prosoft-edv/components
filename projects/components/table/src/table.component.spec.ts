import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild, QueryList } from '@angular/core';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap, ParamMap, Params, Router } from '@angular/router';
import { IPsTableIntlTexts, PsIntlService, PsIntlServiceEn } from '@prosoft/components/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PsTableDataSource } from './data/table-data-source';
import { IPsTableSortDefinition } from './models';
import { IPsTableSetting, PsTableSettingsService } from './services/table-settings.service';
import { PsTableComponent } from './table.component';
import { PsTableModule } from './table.module';
import { PsTableColumnDirective } from './directives/table.directives';

class TestSettingsService extends PsTableSettingsService {
  public readonly defaultPageSize$ = new BehaviorSubject<number>(15);
  public readonly settings$ = new BehaviorSubject<{ [id: string]: IPsTableSetting }>({});
  public pageSizeOptions = [1, 5, 25, 50];

  public save(id: string, settings: IPsTableSetting): Observable<void> {
    const currentSettings = this.settings$.getValue();
    currentSettings[id] = settings;
    this.settings$.next(currentSettings);

    return of();
  }
}

const router: any = {
  navigate: (_route: any, _options: any) => {},
};

const queryParams$ = new BehaviorSubject<ParamMap>(convertToParamMap({ other: 'value' }));

const route: ActivatedRoute = <any>{
  snapshot: new Proxy(queryParams$, {
    get: (obj, prop) => {
      if (prop === 'queryParamMap') {
        return obj.value;
      }
    },
  }),
  queryParamMap: queryParams$,
};

function createColDef(data: { property?: string; header?: string; sortable?: boolean }) {
  const colDef = new PsTableColumnDirective();
  colDef.sortable = data.sortable || false;
  colDef.property = data.property || null;
  colDef.header = data.header || null;
  return colDef;
}

@Component({
  selector: 'ps-test-component',
  template: `
    <ps-table
      [caption]="caption"
      [dataSource]="dataSource"
      [tableId]="tableId"
      [intlOverride]="intlOverride"
      [refreshable]="refreshable"
      [filterable]="filterable"
      [showSettings]="showSettings"
      [cardLayout]="cardLayout"
      [striped]="striped"
      [sortDefinitions]="sortDefinitions"
      (page)="onPage($event)"
    ></ps-table>
  `,
})
export class TestComponent {
  public caption: string;
  public dataSource: PsTableDataSource<{ [key: string]: any }> = new PsTableDataSource(() => of([]), 'client');
  public tableId: string;
  public intlOverride: Partial<IPsTableIntlTexts>;
  public refreshable = false;
  public filterable = false;
  public showSettings = false;
  public cardLayout = false;
  public striped = false;
  public sortDefinitions: IPsTableSortDefinition[];

  @ViewChild(PsTableComponent, { static: true }) table: PsTableComponent;

  public onPage(event: any) {}
}

fdescribe('PsTableComponent', () => {
  describe('isolated', () => {
    const intlService = new PsIntlServiceEn();
    const cd = <ChangeDetectorRef>{ markForCheck: () => {} };

    let settingsService: TestSettingsService;
    function createTableInstance(): PsTableComponent {
      settingsService = new TestSettingsService();
      const table = new PsTableComponent(intlService, settingsService, null, cd, route, router, 'de');
      table.tableId = 'tableid';
      table.dataSource = new PsTableDataSource<any>(() => of([{ a: 'asdfg' }, { a: 'gasdf' }, { a: 'asdas' }, { a: '32424rw' }]));
      table.paginator = new MatPaginator(new MatPaginatorIntl(), cd);
      return table;
    }

    it('should update table state from the settings service and the query params', fakeAsync(() => {
      const table = createTableInstance();
      settingsService.settings$.next({});
      settingsService.defaultPageSize$.next(7);
      table.columnDefs = [createColDef({ property: 'prop1' }), createColDef({ property: 'prop2' })];
      table.rowDetail = <any>{ showToggleColumn: true };
      table.listActions = <any>{};
      table.rowActions = <any>{};

      table.ngOnInit();
      table.ngAfterContentInit();
      tick(1);

      expect(table.pageSize).toEqual(7);
      expect(table.pageIndex).toEqual(0);
      expect(table.filterText).toEqual('');
      expect(table.sortColumn).toEqual(null);
      expect(table.sortDirection).toEqual('asc');
      expect(table.displayedColumns).toEqual(['select', 'rowDetailExpander', 'prop1', 'prop2', 'options']);

      settingsService.settings$.next({
        tableid: <IPsTableSetting>{
          columnBlacklist: ['prop2'],
          pageSize: 22,
          sortColumn: 'col',
          sortDirection: 'desc',
        },
      });
      tick(1);

      expect(table.pageSize).toEqual(22);
      expect(table.pageIndex).toEqual(0);
      expect(table.filterText).toEqual('');
      expect(table.sortColumn).toEqual('col');
      expect(table.sortDirection).toEqual('desc');
      expect(table.displayedColumns).toEqual(['select', 'rowDetailExpander', 'prop1', 'options']);

      queryParams$.next(
        convertToParamMap(<Params>{
          tableid: '1◬1◬asdf◬Column1◬asc',
        })
      );
      tick(1);

      expect(table.pageSize).toEqual(1);
      expect(table.pageIndex).toEqual(1);
      expect(table.filterText).toEqual('asdf');
      expect(table.sortColumn).toEqual('Column1');
      expect(table.sortDirection).toEqual('asc');
      expect(table.displayedColumns).toEqual(['select', 'rowDetailExpander', 'prop1', 'options']);

      table.rowDetail = <any>{ showToggleColumn: false };
      queryParams$.next(convertToParamMap(<Params>{ tableid: '1◬1◬asdf◬Column1◬desc' }));
      tick(1);
      expect(table.displayedColumns).toEqual(['select', 'prop1', 'options']);

      table.rowDetail = null;
      queryParams$.next(convertToParamMap(<Params>{ tableid: '1◬1◬asdf◬Column1◬desc' }));
      tick(1);
      expect(table.displayedColumns).toEqual(['select', 'prop1', 'options']);

      table.listActions = null;
      queryParams$.next(convertToParamMap(<Params>{ tableid: '1◬1◬asdf◬Column1◬desc' }));
      tick(1);
      expect(table.displayedColumns).toEqual(['prop1', 'options']);

      table.rowActions = null;
      table.showSettings = false;
      table.refreshable = false;
      queryParams$.next(convertToParamMap(<Params>{ tableid: '1◬1◬asdf◬Column1◬desc' }));
      tick(1);
      expect(table.displayedColumns).toEqual(['prop1']);
    }));

    it('should set locale in data source', fakeAsync(() => {
      const table = createTableInstance();
      table.ngOnInit();
      expect(table.dataSource.locale).toEqual('de');
    }));

    it('should initialize page size options from the service', fakeAsync(() => {
      const table = createTableInstance();
      table.settingsService.pageSizeOptions = [3, 7, 9];
      table.ngOnInit();
      expect(table.pageSizeOptions).toBe(table.settingsService.pageSizeOptions);
    }));

    it('should show right content depending on the datatable state', fakeAsync(() => {
      const table = createTableInstance();

      table.dataSource = <any>{ loading: false, error: null, visibleRows: [] };
      expect(table.showNoEntriesText).toBe(true);
      expect(table.showError).toBe(false);
      expect(table.showLoading).toBe(false);

      table.dataSource = <any>{ loading: true, error: null, visibleRows: [] };
      expect(table.showNoEntriesText).toBe(false);
      expect(table.showError).toBe(false);
      expect(table.showLoading).toBe(true);

      table.dataSource = <any>{ loading: false, error: new Error('error'), visibleRows: [] };
      expect(table.showNoEntriesText).toBe(false);
      expect(table.showError).toBe(true);
      expect(table.showLoading).toBe(false);
    }));

    it('should only enable settings if all prerequisites are met', fakeAsync(() => {
      const table = createTableInstance();

      table.tableId = 'test';
      table.showSettings = true;
      table.settingsService.settingsEnabled = true;
      expect(table.settingsEnabled).toBe(true);

      table.settingsService.settingsEnabled = false;
      expect(table.settingsEnabled).toBe(false);
      table.settingsService.settingsEnabled = true;

      table.showSettings = false;
      expect(table.settingsEnabled).toBe(false);
      table.showSettings = true;

      table.tableId = null;
      expect(table.settingsEnabled).toBe(false);
    }));

    it('should only show list actions if there are any menu items', fakeAsync(() => {
      const table = createTableInstance();
      table.tableId = 'test';
      table.showSettings = true;
      table.settingsService.settingsEnabled = true;

      table.listActions = null;
      table.refreshable = false;
      expect(table.showListActions).toBe(true);

      table.showSettings = false;
      expect(table.showListActions).toBe(false);

      table.refreshable = true;
      expect(table.showListActions).toBe(true);
      table.refreshable = false;

      table.listActions = <any>{};
      expect(table.showListActions).toBe(true);
    }));

    it('should merge sort definitions and disable sorting on empty', fakeAsync(() => {
      const table = createTableInstance();
      const customSortDef = { prop: 'custom', displayName: 'Custom' };
      const notSortableColDef = new PsTableColumnDirective();
      notSortableColDef.sortable = false;
      notSortableColDef.property = 'no_sort';
      notSortableColDef.header = 'NoSort';
      const sortableColDef = new PsTableColumnDirective();
      sortableColDef.sortable = true;
      sortableColDef.property = 'sort';
      sortableColDef.header = 'Sort';
      const colDefs = new QueryList<PsTableColumnDirective>();

      colDefs.reset([notSortableColDef]);
      table.columnDefsSetter = colDefs;
      table.sortDefinitions = [];
      expect(table.showSorting).toBe(false);
      expect(table.sortDefinitions).toEqual([]);

      colDefs.reset([notSortableColDef, sortableColDef]);
      table.columnDefsSetter = colDefs;
      expect(table.showSorting).toBe(true);
      expect(table.sortDefinitions).toEqual([{ prop: 'sort', displayName: 'Sort' }]);

      table.sortDefinitions = [{ prop: 'custom', displayName: 'Custom' }];
      expect(table.showSorting).toBe(true);
      expect(table.sortDefinitions).toEqual([customSortDef, { prop: 'sort', displayName: 'Sort' }]);

      colDefs.reset([]);
      table.columnDefsSetter = colDefs;
      expect(table.showSorting).toBe(true);
      expect(table.sortDefinitions).toEqual([customSortDef]);

      table.sortDefinitions = [];
      expect(table.showSorting).toBe(false);
      expect(table.sortDefinitions).toEqual([]);
    }));

    it('requestUpdate should update query params without overriding deleting other query params', () => {
      queryParams$.next(convertToParamMap({ existingParam: '0815' }));
      spyOn(router, 'navigate');

      const table = createTableInstance();
      table.pageIndex = 3;
      table.pageSize = 12;
      table.filterText = 'Blubb';
      table.sortColumn = 'col';
      table.sortDirection = 'desc';
      table.tableId = 'requestUpdate';

      (<any>table).requestUpdate();

      const expectedQueryParams = {
        existingParam: '0815',
        requestUpdate: '12◬3◬Blubb◬col◬desc',
      };

      expect(router.navigate).toHaveBeenCalledWith([], { queryParams: expectedQueryParams, relativeTo: route });
    });
  });

  describe('intgration', () => {
    beforeEach(async(() => {
      queryParams$.next(convertToParamMap({}));

      TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, CommonModule, PsTableModule],
        declarations: [TestComponent],
        providers: [
          { provide: PsTableSettingsService, useClass: TestSettingsService },
          { provide: PsIntlService, useClass: PsIntlServiceEn },
          { provide: ActivatedRoute, useValue: route },
          { provide: Router, useValue: router },
        ],
      }).compileComponents();
    }));

    it('should resolve intl correctly', () => {
      const fixture = TestBed.createComponent(TestComponent);
      const component = fixture.componentInstance;
      expect(component).toBeDefined();

      const intlService: PsIntlServiceEn = TestBed.get(PsIntlService);
      const defaultTableIntl = intlService.get('table');
      fixture.detectChanges();
      const paginator = component.table.paginator;

      expect(component.table.intl).toEqual(defaultTableIntl);
      expect(paginator._intl.getRangeLabel(null, null, null)).toEqual(defaultTableIntl.getRangeLabel(null, null, null));
      expect(paginator._intl.itemsPerPageLabel).toEqual(defaultTableIntl.itemsPerPageLabel);
      expect(paginator._intl.nextPageLabel).toEqual(defaultTableIntl.nextPageLabel);
      expect(paginator._intl.previousPageLabel).toEqual(defaultTableIntl.previousPageLabel);
      expect(paginator._intl.firstPageLabel).toEqual(defaultTableIntl.firstPageLabel);
      expect(paginator._intl.lastPageLabel).toEqual(defaultTableIntl.lastPageLabel);

      component.intlOverride = {
        lastPageLabel: 'asdf',
      };
      fixture.detectChanges();
      expect(component.table.intl.lastPageLabel).toEqual('asdf');
      expect(paginator._intl.lastPageLabel).toEqual('asdf');

      (<any>intlService).tableIntl.previousPageLabel = 'x';
      intlService.intlChanged$.next();
      fixture.detectChanges();
      expect(component.table.intl.previousPageLabel).toEqual('x');
      expect(paginator._intl.previousPageLabel).toEqual('x');
    });
  });
});
