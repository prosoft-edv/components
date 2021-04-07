import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation,
  HostBinding,
} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { IPsTableIntlTexts } from '@prosoft/components/core';
import { IPsTableSortDefinition } from '../models';

@Component({
  selector: 'ps-table-header',
  template: `
    <h2 *ngIf="caption" class="ps-table-header__caption">{{ caption }}</h2>
    <div *ngIf="customHeader" class="ps-table-header__custom-content">
      <ng-container [ngTemplateOutlet]="customHeader"></ng-container>
    </div>
    <ps-table-sort
      *ngIf="showSorting"
      class="ps-table-header__sort"
      [sortColumn]="sortColumn"
      [sortDirection]="sortDirection"
      [sortDefinitions]="sortDefinitions"
      [intl]="intl"
      (sortChanged)="sortChanged.emit($event)"
    ></ps-table-sort>
    <ps-table-search
      *ngIf="filterable"
      class="ps-table-header__search"
      [searchText]="searchText"
      [debounceTime]="300"
      [intl]="intl"
      (searchChanged)="searchChanged.emit($event)"
    ></ps-table-search>
    <div *ngIf="topButtonSection" class="ps-table-header__actions">
      <ng-container [ngTemplateOutlet]="topButtonSection" [ngTemplateOutletContext]="{ $implicit: selectedRows }"></ng-container>
    </div>
  `,
  styles: [
    `
      ps-table-header {
        padding: 0 16px;

        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        justify-content: space-between;
      }

      .ps-table-header__caption {
        flex-basis: 100%;
      }

      .ps-table-header__sort {
        flex: 0 1 350px;
        margin-right: auto; /* This counters the margin of the actions to push the search back to the middle */
      }

      .ps-table-header__search {
        flex: 0 1 800px;
      }

      .ps-table-header__actions {
        flex-basis: auto;
        margin: 0.3em 8px 1em;
        text-align: end;
        align-self: flex-end;
        margin-left: auto; /* This ensures that the actions are always right, even if there is no other flex item */
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PsTableHeaderComponent {
  @Input() public intl: IPsTableIntlTexts;
  @Input() public caption: string;
  @Input() public topButtonSection: TemplateRef<any> | null;
  @Input() public customHeader: TemplateRef<any> | null;
  @Input() public selectedRows: any[];
  @Input() public showSorting: boolean;
  @Input() public sortColumn: string;
  @Input() public sortDirection: 'asc' | 'desc' | null;
  @Input() public sortDefinitions: IPsTableSortDefinition[] = [];
  @Input() public filterable: boolean;
  @Input() public searchText: string;

  @Output() public sortChanged = new EventEmitter<Sort>();
  @Output() public searchChanged = new EventEmitter<string>();

  @HostBinding('style.padding-top') public get paddingTop() {
    return !this.caption && (this.showSorting || this.filterable || this.topButtonSection) ? '1em' : '0';
  }
}
