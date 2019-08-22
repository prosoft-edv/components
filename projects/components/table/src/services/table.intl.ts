import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class PsTableIntl extends MatPaginatorIntl {
  public searchLabel = 'Search';
  public sortLabel = 'Sorting';
  public refreshListLabel = 'Refresh list';
  public settingsLabel = 'List settings';
  public noEntriesLabel = 'No entries';
  public saveSettingsLabel = 'Save settings';
  public abortSettingsLabel = 'Cancel';
  public displayedColumnsLabel = 'Displayed columns';
}
