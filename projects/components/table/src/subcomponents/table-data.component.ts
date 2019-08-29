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
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { IPsTableIntlTexts, PsIntlService } from '@prosoft/components/core';
import { PsFlipContainerComponent } from '@prosoft/components/flip-container';
import { combineLatest, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PsTableDataSource } from '../data/table-data-source';
import {
  PsTableColumnDirective,
  PsTableCustomHeaderDirective,
  PsTableListActionsDirective,
  PsTableRowActionsDirective,
  PsTableRowDetailDirective,
  PsTableTopButtonSectionDirective,
} from '../directives/table.directives';
import { asQueryParams, fromQueryParams } from '../helper/table.helper';
import { IPsTableSortDefinition, IPsTableUpdateDataInfo } from '../models';
import { IPsTableSetting, PsTableSettingsService } from '../services/table-settings.service';

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
  @Input() public rowDetail: any;
  @Input() public columnDefs: any;
  @Input() public showListActions: any;
  @Input() public displayedColumns: any;

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
}
