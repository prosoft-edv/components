import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsWebCompComponent } from './web-comp.component';

@NgModule({
  declarations: [PsWebCompComponent],
  imports: [CommonModule],
  exports: [PsWebCompComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PsWebCompModule {}
