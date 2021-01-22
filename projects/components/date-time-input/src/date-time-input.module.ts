import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

import { PsDateTimeInputComponent } from './date-time-input.component';

export const dateTimeModuleImports = [CommonModule, MatDatepickerModule, FormsModule, MatInputModule];

@NgModule({
  imports: dateTimeModuleImports,
  declarations: [PsDateTimeInputComponent],
  exports: [PsDateTimeInputComponent],
})
export class PsDateTimeInputModule {}
