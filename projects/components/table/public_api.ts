export { IPsTableFilterResult, PsTableDataSource } from './src/data/table-data-source';
export { IPsTableSortDefinition, IPsTableUpdateDataInfo } from './src/models';
export { IPsTableSetting, PsTableSettingsService } from './src/services/table-settings.service';
export {
  PsTableColumnDirective,
  PsTableColumnHeaderTemplateDirective,
  PsTableColumnTemplateDirective,
  PsTableCustomHeaderDirective,
  PsTableCustomSettingsDirective,
  PsTableListActionsDirective,
  PsTableRowActionsDirective,
  PsTableRowDetailDirective,
  PsTableRowDetailTemplateDirective,
  PsTableTopButtonSectionDirective,
} from './src/directives/table.directives';
export { PsTableComponent } from './src/table.component';
export { PsTableModule } from './src/table.module';

// reexport
export { IPsTableIntlTexts } from '@prosoft/components/core';
