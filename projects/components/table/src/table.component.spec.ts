import { ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { PsTableDataSource } from './data/table-data-source';
import { IPsTableSetting, PsTableSettingsService } from './services/table-settings.service';
import { PsTableIntl } from './services/table.intl';
import { PsTableComponent } from './table.component';

class TestTableIntl extends PsTableIntl {
  constructor() {
    super();
    this.settingsLabel = 'a';
    this.searchLabel = 'b';
    this.sortLabel = 'c';
    this.refreshListLabel = 'd';
    this.noEntriesLabel = 'e';
    this.saveSettingsLabel = 'f';
    this.abortSettingsLabel = 'g';
    this.displayedColumnsLabel = 'h';
    this.itemsPerPageLabel = 'i';
    this.nextPageLabel = 'j';
    this.previousPageLabel = 'k';
    this.firstPageLabel = 'l';
    this.lastPageLabel = 'm';
    this.getRangeLabel = (_: any, __: any, ___: any) => {
      return 'n';
    };

    this.changes.next();
  }
}

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

const testIntl = new TestTableIntl();
const settingsService = new TestSettingsService();
const cd = <ChangeDetectorRef>{ markForCheck: () => {} };
const paginator = new MatPaginator(new MatPaginatorIntl(), cd);
const dataSouce = new PsTableDataSource(() => of([]));
const route: any = {
  queryParams: {
    other: 'value',
  },
  snapshot: {
    queryParamMap: <ParamMap>{
      get: (key: string) => {
        expect(key).toBe('other');
        return 'value';
      },
      has: (_: string) => {
        return false;
      },
      keys: ['other'],
    },
  },
  queryParamMap: new BehaviorSubject<Partial<ParamMap>>({
    get: (key: string) => {
      expect(key).toBe('other');
      return 'value';
    },
    has: (_: string) => {
      return false;
    },
    keys: ['other'],
  }),
};

describe('PsTableComponent', () => {
  it('setsSpecifiedIntl', () => {
    const table = new PsTableComponent(testIntl, settingsService, cd, route, null, null);
    table.dataSource = dataSouce;
    table.paginator = paginator;
    table.tableId = 'setsSpecifiedIntl';
    table.ngAfterViewInit();

    expect(table.tableIntl).toEqual(testIntl);
    expect(table.paginator._intl.getRangeLabel(null, null, null)).toEqual(testIntl.getRangeLabel(null, null, null));
    expect((<any>table.paginator._intl).settingsLabel).toEqual(testIntl.settingsLabel);
    expect((<any>table.paginator._intl).searchLabel).toEqual(testIntl.searchLabel);
    expect((<any>table.paginator._intl).sortLabel).toEqual(testIntl.sortLabel);
    expect((<any>table.paginator._intl).refreshListLabel).toEqual(testIntl.refreshListLabel);
    expect((<any>table.paginator._intl).noEntriesLabel).toEqual(testIntl.noEntriesLabel);
    expect((<any>table.paginator._intl).saveSettingsLabel).toEqual(testIntl.saveSettingsLabel);
    expect((<any>table.paginator._intl).abortSettingsLabel).toEqual(testIntl.abortSettingsLabel);
    expect((<any>table.paginator._intl).displayedColumnsLabel).toEqual(testIntl.displayedColumnsLabel);
    expect((<any>table.paginator._intl).itemsPerPageLabel).toEqual(testIntl.itemsPerPageLabel);
    expect((<any>table.paginator._intl).nextPageLabel).toEqual(testIntl.nextPageLabel);
    expect((<any>table.paginator._intl).previousPageLabel).toEqual(testIntl.previousPageLabel);
    expect((<any>table.paginator._intl).firstPageLabel).toEqual(testIntl.firstPageLabel);
    expect((<any>table.paginator._intl).lastPageLabel).toEqual(testIntl.lastPageLabel);
  });

  it('updateTableState', () => {
    const table = new PsTableComponent(testIntl, settingsService, cd, route, router, null);
    table.paginator = paginator;
    table.dataSource = new PsTableDataSource<any>(() => of([{ a: 'asdfg' }, { a: 'gasdf' }, { a: 'asdas' }, { a: '32424rw' }]));
    table.tableId = 'tableid';

    table.ngAfterViewInit();

    (settingsService as TestSettingsService).settings$.next({
      tableid: <IPsTableSetting>{
        columnBlacklist: [],
        pageSize: 22,
        sortColumn: 'col',
        sortDirection: 'desc',
      },
    });

    expect(table.pageSize).toEqual(22);
    expect(table.pageIndex).toEqual(0);
    expect(table.filterText).toEqual('');
    expect(table.sortColumn).toEqual('col');
    expect(table.sortDirection).toEqual('desc');

    route.queryParamMap.next(
      convertToParamMap(<Params>{
        tableid: '1◬1◬asdf◬Column1◬asc',
      })
    );

    expect(table.pageSize).toEqual(1);
    expect(table.pageIndex).toEqual(1);
    expect(table.filterText).toEqual('asdf');
    expect(table.sortColumn).toEqual('Column1');
    expect(table.sortDirection).toEqual('asc');
  });

  it('requestUpdate should build correct query params', () => {
    const testRoute: any = {
      snapshot: {
        queryParamMap: convertToParamMap({ existingParam: '0815' }),
      },
    };
    spyOn(router, 'navigate');

    const table = new PsTableComponent(testIntl, settingsService, cd, testRoute, router, null);
    table.dataSource = dataSouce;
    table.paginator = paginator;
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

    expect(router.navigate).toHaveBeenCalledWith([], { queryParams: expectedQueryParams, relativeTo: testRoute });
  });
});
