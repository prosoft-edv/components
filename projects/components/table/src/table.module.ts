import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { PsFlipContainerModule } from '@prosoft/components/flip-container';
import { PsSavebarModule } from '@prosoft/components/savebar';
import {
  PsTableColumnDirective,
  PsTableColumnHeaderTemplateDirective,
  PsTableColumnTemplateDirective,
  PsTableCustomHeaderDirective,
  PsTableListActionsDirective,
  PsTableRowActionsDirective,
  PsTableRowDetailDirective,
  PsTableRowDetailTemplateDirective,
  PsTableTopButtonSectionDirective,
} from './directives/table.directives';
import { PsTableSettingsService } from './services/table-settings.service';
import { PsTableSettingsComponent } from './subcomponents/table-settings.component';
import { PsTableSortComponent } from './subcomponents/table-sort.component';
import { TableRowDetailComponent } from './table-row-detail.component';
import { PsTableComponent } from './table.component';

@NgModule({
  declarations: [
    PsTableComponent,
    PsTableSettingsComponent,
    PsTableSortComponent,
    TableRowDetailComponent,
    PsTableColumnDirective,
    PsTableColumnTemplateDirective,
    PsTableColumnHeaderTemplateDirective,
    PsTableTopButtonSectionDirective,
    PsTableListActionsDirective,
    PsTableRowActionsDirective,
    PsTableCustomHeaderDirective,
    PsTableRowDetailDirective,
    PsTableRowDetailTemplateDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    PsFlipContainerModule,
    PsSavebarModule,
  ],
  exports: [
    PsTableComponent,
    PsTableColumnDirective,
    PsTableColumnTemplateDirective,
    PsTableColumnHeaderTemplateDirective,
    PsTableTopButtonSectionDirective,
    PsTableListActionsDirective,
    PsTableRowActionsDirective,
    PsTableCustomHeaderDirective,
    PsTableRowDetailDirective,
    PsTableRowDetailTemplateDirective,
  ],
})
export class PsTableModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: PsTableModule,
      providers: [PsTableSettingsService],
    };
  }
}
