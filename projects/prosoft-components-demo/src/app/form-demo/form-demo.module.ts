import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { PsFormActionService, PsFormModule } from '@prosoft/components/form';
import { PsFormBaseModule } from '@prosoft/components/form-base';
import { PsSavebarModule } from '@prosoft/components/savebar';
import { FormDemoComponent } from './form-demo.component';
import { DemoPsFormActionService, DemoPsFormsService } from './form-demo.services';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PsFormBaseModule.forRoot(DemoPsFormsService),
    PsSavebarModule,
    PsFormModule,
    RouterModule.forChild([
      {
        path: '',
        component: FormDemoComponent,
      },
    ]),
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
  ],
  declarations: [FormDemoComponent],
  providers: [{ provide: PsFormActionService, useClass: DemoPsFormActionService }],
})
export class FormDemoModule {}
