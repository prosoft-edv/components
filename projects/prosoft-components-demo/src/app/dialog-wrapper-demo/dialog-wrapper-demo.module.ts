import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { PsViewModule } from '@prosoft/components/view';
import { DialogWrapperDemoComponent } from './dialog-wrapper-demo.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DialogWrapperDemoComponent,
      },
    ]),
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    PsViewModule,
  ],
  declarations: [DialogWrapperDemoComponent],
})
export class DialogWrapperDemoModule {}
