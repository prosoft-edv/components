import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPsTableSortDefinition } from '../data/table-sort-definition';
import { PsTableColumnDirective } from '../directives/table.directives';
import { IPsTableSetting, PsTableSettingsService } from '../services/table-settings.service';
import { PsTableIntl } from '../services/table.intl';

@Component({
  selector: 'ps-table-settings',
  templateUrl: './table-settings.component.html',
  styles: [
    `
      .ps-table__settings-form {
        display: flex;
        justify-content: space-between;
      }
      .ps-table__settings-form > * {
        min-width: 20%;
      }
      .ps-table__settings-form__display-columns {
        display: flex;
        flex-direction: column;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PsTableSettingsComponent implements OnInit {
  @Input() public tableId: string;
  @Input() public columnDefinitions: PsTableColumnDirective[] = [];
  @Input() public sortDefinitions: IPsTableSortDefinition[] = [];
  @Input() public pageSizeOptions: number[];

  @Output() public settingsSaved = new EventEmitter<void>();
  @Output() public settingsAborted = new EventEmitter<void>();

  public settings$: Observable<IPsTableSetting>;

  constructor(public tableIntl: PsTableIntl, public settingsService: PsTableSettingsService) {}

  public ngOnInit(): void {
    this.settings$ = combineLatest([this.settingsService.settings$, this.settingsService.defaultPageSize$]).pipe(
      map(([allSettings, defaultPageSize]) => {
        if (allSettings[this.tableId]) {
          return allSettings[this.tableId];
        }

        return <IPsTableSetting>{
          columnBlacklist: [],
          pageSize: defaultPageSize || 15,
          sortColumn: null,
          sortDirection: 'asc',
        };
      })
    );
  }

  public onSortChanged(event: { sortColumn: string; sortDirection: 'asc' | 'desc' }, settings: IPsTableSetting) {
    if (settings.sortColumn !== event.sortColumn) {
      settings.sortColumn = event.sortColumn;
      settings.columnBlacklist = settings.columnBlacklist.filter(x => x !== event.sortColumn);
    }
    settings.sortDirection = event.sortDirection;
  }

  public hiddenColumnsChange(settings: IPsTableSetting, event: MatCheckboxChange, columnDef: PsTableColumnDirective) {
    if (event.checked) {
      settings.columnBlacklist = settings.columnBlacklist.filter(x => x !== columnDef.property);
    } else if (!settings.columnBlacklist.find(x => x === columnDef.property)) {
      settings.columnBlacklist.push(columnDef.property);
    }
  }

  public columnVisible(settings: IPsTableSetting, columnDef: PsTableColumnDirective) {
    return !settings.columnBlacklist.some(x => x === columnDef.property);
  }

  public saveSettings(setting: IPsTableSetting) {
    this.settingsService.save(this.tableId, setting).subscribe(() => this.settingsSaved.emit());
  }

  public abortSettings() {
    this.settingsAborted.emit();
  }
}
