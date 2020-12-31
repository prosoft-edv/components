import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PsWebCompModule } from '@prosoft/components/web-comp';
import { WebCompDemoComponent } from './web-comp-demo.component';

@NgModule({
  imports: [
    CommonModule,
    PsWebCompModule,
    RouterModule.forChild([
      {
        path: '',
        component: WebCompDemoComponent,
      },
    ]),
  ],
  declarations: [WebCompDemoComponent],
  providers: [],
})
export class WebCompDemoModule {}
