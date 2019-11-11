<link href="style.css" rel="stylesheet"></link> 

# PsTable <a name="PsTable"></a>
`<ps-table>` enhances the [MatTable](https://material.angular.io/components/table/overview) with many features.

---

  ## API <a name="<componentName>Api"></a>   
  ### Import <a name="<componentName>Import"></a>
  ```ts | js
    import { PsTableComponent } from '@prosoft/components/table'
  ```

---

  ## Directives <a name="<componentName>Directives"></a>
  | Name                          | Description
  | ----------------------------- | -------------
  | `psTableColumnHeaderTemplate` | Used for customizing your columns header.
  | `psTableColumnTemplate`       | Used for customizing your columns content.
  | `psTableCustomHeader`         | Used for customizing the header part of the table.
  | `psTableCustomSettings`       | Used for customizing the tables settings part.
  | `psTableTopButtonSection`     | Use this, if you want to add custom buttons to the tables top right part.
  | `psTableListActions`          | Used for customizing the table list actions.
  | `psTableRowActions`           | Used for customizing the actions every row has to offer.
  | `psTableRowDetailTemplate`    | Used for customizing the tables row detail template.
  | `ps-table-column`             | Used for declaring a column in the table.
  | `ps-table-row-detail`         | Used for declaring a detail view for every table row.

---

  ## PsTableComponent <a name="PsTableComponent"></a>
  ### Properties <a name="PsTableComponentProperties"></a>
  | Name                                                | Description
  | --------------------------------------------------- | -------------
  | `caption: string`                                   | The tables caption.
  | `dataSource: PsTableDataSource<T>`                  | The tables source of data.
  | `tableId: string`                                   | If set, the table can save its settings.
  | `intlOverride: Partial<IPsTableIntlTexts>`          | If you want to override dispalyed labels.
  | `sortDefinitions: IPsTableSortDefinition[]`         | Array of additional data element properties used for sorting.
  | `refreshable: boolean`                              | `true`, if you want the table to have a 'refresh' button.
  | `filterable: boolean`                               | `true`, if the table should have a searchbar in its header.
  | `showSettings: boolean`                             | `true`, if the table should have a settings page.
  | `pageDebounce: number`                              | Delays the paging by the given milliseconds.
  | `cardLayout: boolean`                               | `true`, if you want the table to be displayed as a MatCard.
  | `striped: boolean`                                  | `true`, if you want every other row to be colorized.

  ### Events <a name="PsTableComponentEvents"></a>
  | Name                                                | Description
  | --------------------------------------------------- | -------------
  | `page: EventEmitter<PageEvent>`                     | Emitted, if the user wants to page to another side. For PageEvent info see [PageEvent](https://material.angular.io/components/paginator/api#PageEvent)

---

  ## PsTableDataSource <a name="PsTableDataSource"></a>
  ### Usage <a name="PsTableDataSourceUsage"></a>
  ```ts | js
    const dataSource = new PsTableDataSource<MyDataType>((filter: IPsTableUpdateDataInfo) => myDataService.getListData(filter, 'client'))
  ```

  ### Properties <a name="PsTableDataSourceProperties"></a>
  | Name                                                                                                   | Description
  | ------------------------------------------------------------------------------------------------------ | -------------
  | `_internalDetectChanges: Subject<void>`                                                                | Subject that emits, when the table should be checked by the change detection.
  | `data: T[]`                                                                                            | Array of data that should be rendered by the table, where each object represents one row.
  | `visibleRows: T[]`                                                                                     | The currently visible rows.
  | `allVisibleRowsSelected: boolean`                                                                      | Indicates if all visible rows are selected.
  | `loading: boolean`                                                                                     | Indicates if the table is currently loading data.
  | `error: any`                                                                                           | The error that occured in the last observable returned by loadData.
  | `locale: string`                                                                                       | The locale for the table texts.
  | `dataLength: number`                                                                                   | The length of the total number of items that are being paginated.
  | `sortColumn: string`                                                                                   | The name of the column, after which the rows should be sorted.
  | `sortDirection: 'asc' | 'desc'`                                                                        | The sort direction.
  | `pageIndex: number`                                                                                    | The zero-based page index of the displayed list of items.
  | `pageSize: number`                                                                                     | Number of items to display on a page.
  | `filter: string`                                                                                       | Filter term that should be used to filter out objects from the data array. To override how data objects match to this filter string, provide a custom function for filterPredicate.
  | `filterPredicate: () => boolean`                                                                       | Checks if a data object matches the data source's filter string. By default, each data object is converted to a string of its properties and returns true if the filter has at least one occurrence in that string. By default, the filter string has its whitespace trimmed and the match is case-insensitive. May be overridden for a custom implementation of filter matching.
  | `sortingDataAccessor: (data: T[], sort: { sortColumn: string; sortDirection: 'asc' | 'desc' }) => T[]` | Gets a sorted copy of the data array based on the state of the MatSort. Called after changes are made to the filtered data or when sort changes are emitted from MatSort. By default, the function retrieves the active sort and its direction and compares data by retrieving data using the sortingDataAccessor. May be overridden for a custom implementation of data ordering.

  ### Functions <a name="PsTableDataSourceFunctions"></a>
  | Name                                           | Description
  | ---------------------------------------------- | -------------
  | `updateData(forceReload: boolean): void`       | Triggers a reload of the data. The callback given in the constructor is executed.
  | `selectVisibleRows(): void`                    | Selects all visible rows.
  | `toggleVisibleRowSelection(): void`            | Toggle the selection of the visible rows.
  | `getUpdateDataInfo(): IPsTableUpdateDataInfo`  | Gets the current page, sort and filter state.

  ### Types <a name="PsTableDataSourceTypes"></a>
  ### PsTableMode
  | Name                           | Description
  | ------------------------------ | -------------
  | `client`                       | The data filtering and sorting is handled by the client.
  | `server`                       | The data filtering and sorting is handled by the server.

---

  ## Prerequisites/Requirements <a name="PsTableRequirements"></a>
  
  1. You have to override `PsTableSettingsService` and implement the following functions:
  * > `constructor` to define the loading of the settings for each table.
  * > `save(tableId: string, settings: IPsTableSetting): Observable<void>` to tell the table service where to store the settings for each table.

  2. Import the PsFormBaseModule forRoot with the created service in your AppModule. Like this:
  `PsFormBaseModule.forRoot(DemoPsFormsService)`

---

  ## Implementation <a name="PsTableImplementation"></a>
  Import the module into your module. 

  ```ts | js
    @NgModule({
      declarations: [MyComponent],
      imports: [PsTableModule]
    })
    export class MyModule {}
  ```

  Now you can use it in your components like this:

  ```html
    <ps-table
      tableId="example"
      [dataSource]="dataSource"
      [caption]="caption"
      [sortDefinitions]="sortDefinitions && !disableAllSortable ? [{ displayName: 'custom: `${boolean}${string}`', prop: 'hiddenSortable' }] : null"
      [refreshable]="refreshable"
      [filterable]="filterable"
      [showSettings]="showSettings"
      [cardLayout]="cardLayout"
      [striped]="striped"
      [pageDebounce]="pageDebounce"
      (page)="onPage($event)">
      <ps-table-column [header]="'id'" property="id" [sortable]="!sortable"></ps-table-column>
      <ps-table-column
        [header]="columnHeader"
        property="date"
        [mandatory]="columnMandatory"
        [sortable]="columnSortable && !disableAllSortable"
        [headerStyles]="columnHeaderStyles ? { color: 'green' } : null"
        [columnStyles]="columnColumnStyles ? { color: 'green' } : null"
        [width]="columnWidth"
      >
        <ng-container>
          <ng-container *psTableColumnHeaderTemplate>
            <i style="color: blue;">date</i>
          </ng-container>
        </ng-container>
        <ng-container>
          <ng-container *psTableColumnTemplate="let item">
            {{ item.date | date: 'yyyy-MM-dd HH:mm:ss' }}
          </ng-container>
        </ng-container>
      </ps-table-column>

      <ng-container *ngIf="customHeader">
        <div *psTableCustomHeader style="border: 1px solid black; width: 100%;">
          custom header
        </div>
      </ng-container>

      <ng-container *ngIf="customSettings">
        <div *psTableCustomSettings style="border: 1px solid black; width: 100%;">
          custom settings
        </div>
      </ng-container>

      <ng-container *ngIf="customTopButton">
        <div *psTableTopButtonSection style="border: 1px solid black">
          custom button section
        </div>
      </ng-container>

      <ng-container *ngIf="customListActions">
        <ng-container *psTableListActions="let selection">
          <button type="button" mat-menu-item (click)="alertData(selection)">
            custom list actions
          </button>
        </ng-container>
      </ng-container>

      <ng-container *ngIf="customRowActions">
        <ng-container *psTableRowActions="let item">
          <button type="button" mat-menu-item>item {{ item.id }} custom row actions</button>
        </ng-container>
      </ng-container>

      <ng-container *ngIf="expandable">
        <ps-table-row-detail [expanded]="expanded" [showToggleColumn]="showToggleColumn">
          <ng-container *psTableRowDetailTemplate="let item"> item: {{ item.id }} expanded: {{ expanded }} </ng-container>
        </ps-table-row-detail>
      </ng-container>
    </ps-table>
  ```
