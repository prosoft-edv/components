import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { PsSelectDataComponent } from './select-data.component';
import { PsSelectComponent } from './select.component';
import { PsSelectService } from './select.service';
import { PsSelectOptionTemplateDirective } from './select-option-template.directive';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatSelectModule, MatTooltipModule, NgxMatSelectSearchModule],
  declarations: [PsSelectComponent, PsSelectDataComponent, PsSelectOptionTemplateDirective],
  exports: [MatSelectModule, PsSelectComponent, PsSelectDataComponent, PsSelectOptionTemplateDirective],
  entryComponents: [],
})
export class PsSelectModule {
  public static forRoot(selectServiceType: any): ModuleWithProviders {
    return {
      ngModule: PsSelectModule,
      providers: [{ provide: PsSelectService, useClass: selectServiceType }],
    };
  }
}