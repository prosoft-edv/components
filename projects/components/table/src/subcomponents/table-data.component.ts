import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { IPsTableIntlTexts } from '@prosoft/components/core';
import { PsTableDataSource } from '../data/table-data-source';
import { PsTableColumnDirective, PsTableRowDetailDirective } from '../directives/table.directives';

@Component({
  selector: 'ps-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PsTableDataComponent {
  @Input() public dataSource: PsTableDataSource<{ [key: string]: any }>;
  @Input() public tableId: string;
  @Input() public intl: IPsTableIntlTexts;
  @Input() public rowActions: TemplateRef<any> | null = null;
  @Input() public cardLayout: boolean;
  @Input() public rowDetail: PsTableRowDetailDirective | null;
  @Input() public listActions: TemplateRef<any> | null = null;
  @Input() public columnDefs: PsTableColumnDirective[];
  @Input() public showListActions: boolean;
  @Input() public refreshable: boolean;
  @Input() public settingsEnabled: boolean;
  @Input() public displayedColumns: string[];

  @Output() public showSettingsClicked = new EventEmitter<void>();
  @Output() public refreshDataClicked = new EventEmitter<void>();

  constructor(private cd: ChangeDetectorRef) {}

  public onShowSettingsClicked() {
    this.showSettingsClicked.emit();
  }

  public onRefreshDataClicked() {
    this.refreshDataClicked.emit();
  }

  public toggleRowDetail(item: { [key: string]: any }) {
    this.rowDetail.toggle(item);
    this.cd.markForCheck();
  }

  public onMasterToggleChange() {
    this.dataSource.toggleVisibleRowSelection();
  }

  public onRowToggleChange(row: any) {
    this.dataSource.selectionModel.toggle(row);
  }

  public isMasterToggleChecked() {
    return this.dataSource.selectionModel.hasValue() && this.dataSource.allVisibleRowsSelected;
  }

  public isMasterToggleIndeterminate() {
    return this.dataSource.selectionModel.hasValue() && !this.dataSource.allVisibleRowsSelected;
  }

  public isRowSelected(row: any) {
    return this.dataSource.selectionModel.isSelected(row);
  }

  public getSelectedRows() {
    return this.dataSource.selectionModel.selected;
  }
}
