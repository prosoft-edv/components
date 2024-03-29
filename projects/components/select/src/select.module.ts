import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PsErrorMessagePipeModule } from '@prosoft/components/core';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { PsSelectOptionTemplateDirective } from './select-option-template.directive';
import { PsSelectTriggerTemplateDirective } from './select-trigger-template.directive';
import { PsSelectComponent } from './select.component';
import { PsSelectService } from './select.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTooltipModule,
    NgxMatSelectSearchModule,
    PsErrorMessagePipeModule,
  ],
  declarations: [PsSelectComponent, PsSelectOptionTemplateDirective, PsSelectTriggerTemplateDirective],
  exports: [MatSelectModule, PsSelectComponent, PsSelectOptionTemplateDirective, PsSelectTriggerTemplateDirective],
})
export class PsSelectModule {
  public static forRoot(selectServiceType: any): ModuleWithProviders<PsSelectModule> {
    return {
      ngModule: PsSelectModule,
      providers: [{ provide: PsSelectService, useClass: selectServiceType }],
    };
  }
}
