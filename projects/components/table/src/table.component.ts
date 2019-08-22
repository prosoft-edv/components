import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  LOCALE_ID,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { PsFlipContainerComponent } from '@prosoft/components/flip-container';
import { combineLatest, Subject, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { IPsTableUpdateDataInfo, PsTableDataSource } from './data/table-data-source';
import { IPsTableSortDefinition } from './data/table-sort-definition';
import {
  PsTableColumnDirective,
  PsTableCustomHeaderDirective,
  PsTableListActionsDirective,
  PsTableRowActionsDirective,
  PsTableRowDetailDirective,
  PsTableTopButtonSectionDirective,
} from './directives/table.directives';
import { asQueryParams, fromQueryParams } from './helper/table.helper';
import { IPsTableSetting, PsTableSettingsService } from './services/table-settings.service';
import { PsTableIntl } from './services/table.intl';

@Component({
  selector: 'ps-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PsTableComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() public caption: string;
  @Input() public dataSource: PsTableDataSource<{ [key: string]: any }>;
  @Input() public tableId: string;
  @Input()
  public get pageSize(): number {
    return this.dataSource.pageSize;
  }
  public set pageSize(value: number) {
    this.dataSource.pageSize = value;
  }
  @Input()
  public set sortDefinitions(value: IPsTableSortDefinition[]) {
    if (!value) {
      return;
    }

    this._sortDefinitions = [...value];
    this.mergeSortDefinitions();
  }

  public get sortDefinitions(): IPsTableSortDefinition[] {
    return this._mergedSortDefinitions;
  }

  @Input() public refreshable = true;
  @Input() public filterable = true;
  @Input() public showSettings = true;

  @Input()
  @HostBinding('class.mat-elevation-z3')
  public cardLayout = true;

  @Input()
  @HostBinding('class.ps-table--striped')
  public striped = false;

  @Output() public page = new EventEmitter<PageEvent>();

  @ViewChild(MatPaginator, { static: false }) public paginator: MatPaginator | null = null;
  @ViewChild(PsFlipContainerComponent, { static: true }) public flipContainer: PsFlipContainerComponent | null = null;

  @ContentChild(PsTableCustomHeaderDirective, { read: TemplateRef, static: false })
  public customHeader: TemplateRef<any> | null = null;

  @ContentChild(PsTableTopButtonSectionDirective, { read: TemplateRef, static: false })
  public topButtonSection: TemplateRef<any> | null = null;

  @ContentChild(PsTableListActionsDirective, { read: TemplateRef, static: false })
  public listActions: TemplateRef<any> | null = null;

  @ContentChild(PsTableRowActionsDirective, { read: TemplateRef, static: false })
  public rowActions: TemplateRef<any> | null = null;

  @ContentChildren(PsTableColumnDirective)
  public set columnDefsSetter(queryList: QueryList<PsTableColumnDirective>) {
    this.columnDefs = [...queryList.toArray()];
    this.mergeSortDefinitions();
  }

  @HostBinding('class.ps-table--row-detail')
  @ContentChild(PsTableRowDetailDirective, { static: true })
  public rowDetail: PsTableRowDetailDirective | null = null;

  public pageSizeOptions: number[];
  public columnDefs: PsTableColumnDirective[] = [];

  public displayedColumns: string[] = [];

  public get sortDirection(): 'asc' | 'desc' {
    return this.dataSource.sortDirection;
  }
  public set sortDirection(value: 'asc' | 'desc') {
    this.dataSource.sortDirection = value;
  }

  public get sortColumn(): string {
    return this.dataSource.sortColumn;
  }
  public set sortColumn(value: string) {
    this.dataSource.sortColumn = value;
  }

  public get pageIndex(): number {
    return this.dataSource.pageIndex;
  }
  public set pageIndex(value: number) {
    this.dataSource.pageIndex = value;
  }

  public get filterText(): string {
    return this.dataSource.filter;
  }
  public set filterText(value: string) {
    this.dataSource.filter = value;
  }

  public get showNoEntriesText(): boolean {
    return (
      !this.dataSource.loading &&
      !this.dataSource.error &&
      (!this.dataSource || !this.dataSource.visibleRows || !this.dataSource.visibleRows.length)
    );
  }
  public get showError(): boolean {
    return !!(this.dataSource && this.dataSource.error);
  }
  public get showLoading(): boolean {
    return !!(this.dataSource && this.dataSource.loading);
  }
  public get settingsEnabled(): boolean {
    return this.tableId && this.settingsService.settingsEnabled && this.showSettings;
  }
  public get showListActions(): boolean {
    return !!this.listActions || this.settingsEnabled || this.refreshable;
  }
  public get showSorting(): boolean {
    return !!this._mergedSortDefinitions.length;
  }

  private requestDebouncedDataUpdateSubject = new Subject();
  private subscriptions: Subscription[] = [];
  private _sortDefinitions: IPsTableSortDefinition[] = [];
  private _mergedSortDefinitions: IPsTableSortDefinition[] = [];
  private _initialized = false;
  private _dataSourceChangesSub: Subscription;

  constructor(
    public tableIntl: PsTableIntl,
    public settingsService: PsTableSettingsService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(LOCALE_ID) private _locale: string
  ) {}

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.dataSource && this._initialized) {
      this.dataSource.updateData();

      if (this._dataSourceChangesSub) {
        this._dataSourceChangesSub.unsubscribe();
      }

      this._dataSourceChangesSub = this.dataSource._internalDetectChanges.subscribe(() => {
        this.cd.markForCheck();
      });
    }
  }

  public ngAfterViewInit(): void {
    this.dataSource.locale = this._locale;
    this.pageSizeOptions = this.settingsService.pageSizeOptions;

    this.initListSettingsSubscription();

    this.subscriptions.push(
      this.requestDebouncedDataUpdateSubject.pipe(debounceTime(300)).subscribe(() => {
        this.requestUpdate();
      })
    );

    this._dataSourceChangesSub = this.dataSource._internalDetectChanges.subscribe(() => {
      this.cd.markForCheck();
    });

    this.paginator._intl = this.tableIntl;
    this.paginator._intl.changes.next();
    this._initialized = true;
  }

  public ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }

    if (this._dataSourceChangesSub) {
      this._dataSourceChangesSub.unsubscribe();
    }
  }

  public search(key: string, value: string) {
    if (key.toLowerCase() === 'escape') {
      value = '';
    }

    if (this.filterText !== value) {
      this.filterText = value;
      this.requestDebouncedDataUpdateSubject.next();
    }
  }

  public sortDirChanged(direction: 'asc' | 'desc') {
    this.sortDirection = direction;
    this.requestUpdate();
  }

  public sortPropChanged(event: MatSelectChange) {
    this.sortColumn = event.value;
    this.requestUpdate();
  }

  public onPage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.page.emit(event);
    this.requestUpdate();
  }

  public toggleRowDetail(item: { [key: string]: any }) {
    this.rowDetail.toggle(item);
    this.cd.markForCheck();
  }

  public refreshList() {
    this.dataSource.updateData();
  }

  public onSettingsSaved() {
    const currentParams = this.route.snapshot.queryParamMap;
    const newQueryParams: { [id: string]: any } = {};
    for (const key of currentParams.keys) {
      if (key !== this.tableId) {
        newQueryParams[key] = currentParams.get(key);
      }
    }

    this.router.navigate([], {
      queryParams: newQueryParams,
      relativeTo: this.route,
    });

    this.flipContainer.toggleFlip();
  }

  private requestUpdate() {
    const newQueryParams: { [id: string]: any } = {};

    const currentParams = this.route.snapshot.queryParamMap;
    for (const key of currentParams.keys) {
      newQueryParams[key] = currentParams.get(key);
    }

    if (this.tableId) {
      const updateInfo = this.dataSource.getUpdateDataInfo();
      newQueryParams[this.tableId] = asQueryParams(updateInfo);
    }

    this.router.navigate([], {
      queryParams: newQueryParams,
      relativeTo: this.route,
    });
  }

  private initListSettingsSubscription() {
    const tableSettings$ = this.settingsService.settings$.pipe(
      map(settings => {
        if (this.tableId && settings && settings[this.tableId]) {
          return settings[this.tableId];
        }
        return null;
      })
    );
    const urlSettings$ = this.route.queryParamMap.pipe(
      map(queryParamMap => {
        if (this.tableId && queryParamMap.has(this.tableId)) {
          return fromQueryParams(queryParamMap.get(this.tableId));
        }
        return null;
      })
    );
    this.subscriptions.push(
      combineLatest([urlSettings$, tableSettings$, this.settingsService.defaultPageSize$]).subscribe({
        next: ([urlSettings, savedSettings, defaultPageSize]) => {
          // Paging, Sorting, Filter und Display Columns updaten
          this.updateTableState(savedSettings, urlSettings, defaultPageSize);

          // Row Detail Expander aktivieren
          if (this.rowDetail && this.rowDetail.showToggleColumn) {
            this.displayedColumns.splice(0, 0, 'rowDetailExpander');
          }

          // Selektierung der Rows aktivieren
          if (this.listActions) {
            this.displayedColumns.splice(0, 0, 'select');
          }

          // Selektierungs- und Row-Aktionen aktivieren
          if (this.showListActions || this.rowActions) {
            this.displayedColumns.push('options');
          }

          this.cd.markForCheck();
          this.dataSource.updateData();
        },
        error: (err: Error | any) => (this.dataSource.error = err instanceof Error ? err.message : err),
      })
    );
  }

  private updateTableState(tableSettings: Partial<IPsTableSetting>, urlSettings: Partial<IPsTableUpdateDataInfo>, defaultPageSize: number) {
    tableSettings = tableSettings || {};
    urlSettings = urlSettings || {};

    this.pageIndex = Math.max(urlSettings.currentPage, 0) || 0;
    this.pageSize = Math.max(urlSettings.pageSize || tableSettings.pageSize || defaultPageSize, 1);
    this.sortColumn = urlSettings.sortColumn || tableSettings.sortColumn || '';
    this.sortDirection = urlSettings.sortDirection || tableSettings.sortDirection || 'asc';
    this.filterText = urlSettings.searchText || '';

    this.displayedColumns = this.columnDefs.map(x => x.property);
    if (tableSettings.columnBlacklist && tableSettings.columnBlacklist.length) {
      this.displayedColumns = this.displayedColumns.filter(x => !tableSettings.columnBlacklist.includes(x));
    }
  }

  private mergeSortDefinitions() {
    const sortableColumns = this.columnDefs
      .filter(def => def.sortable)
      .map(def => <IPsTableSortDefinition>{ prop: def.property, displayName: def.header });

    this._mergedSortDefinitions = sortableColumns
      .concat(this._sortDefinitions)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => a.displayName.toLocaleLowerCase().localeCompare(b.displayName.toLocaleLowerCase()));
    this.cd.markForCheck();
  }
}
