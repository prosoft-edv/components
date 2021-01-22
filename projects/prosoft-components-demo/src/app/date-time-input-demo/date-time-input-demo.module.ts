import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ErrorStateMatcher, MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { PsDateTimeInputModule } from '@prosoft/components/date-time-input';
import { PsFormBaseModule } from '@prosoft/components/form-base';
import { PsFormFieldModule } from '@prosoft/components/form-field';
import { DemoPsFormsService } from '../common/demo-ps-form-service';
import { InvalidErrorStateMatcher } from '../common/invalid-error-state-matcher';
import { DateTimeInputDemoComponent } from './date-time-input-demo.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DateTimeInputDemoComponent,
      },
    ]),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    PsDateTimeInputModule,

    PsFormBaseModule.forRoot(DemoPsFormsService),
    PsFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  declarations: [DateTimeInputDemoComponent],
  providers: [{ provide: ErrorStateMatcher, useClass: InvalidErrorStateMatcher }],
})
export class DateTimeInputDemoModule {}
