import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { ADDITIONAL_TABS, ComponentPageWrapperComponent, COMPONENT_CAPTION } from './component-page-wrapper.component';

@NgModule({
  declarations: [ComponentPageWrapperComponent],
  imports: [CommonModule, MatCardModule, MatTabsModule, RouterModule],
  exports: [ComponentPageWrapperComponent],
  providers: [
    { provide: COMPONENT_CAPTION, useValue: '' },
    { provide: ADDITIONAL_TABS, useValue: undefined },
  ],
})
export class ComponentPageWrapperModule {}
