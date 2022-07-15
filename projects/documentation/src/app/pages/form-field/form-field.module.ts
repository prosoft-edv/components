import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentPageWrapperComponent, COMPONENT_CAPTION } from '../../components/component-page-wrapper/component-page-wrapper.component';
import { ComponentPageWrapperModule } from '../../components/component-page-wrapper/component-page-wrapper.module';
import { FormFieldApiPage } from './pages/api/form-field-api.page';
import { FormFieldCodeGenerationPage } from './pages/code-generation/form-field-code-generation.page';
import { FormFieldOverviewPage } from './pages/overview/form-field-overview.page';

@NgModule({
  declarations: [FormFieldApiPage, FormFieldCodeGenerationPage, FormFieldOverviewPage],
  imports: [
    CommonModule,
    ComponentPageWrapperModule,
    RouterModule.forChild([
      {
        path: '',
        component: ComponentPageWrapperComponent,
        children: [
          { path: '', redirectTo: 'overview' },
          { path: 'overview', component: FormFieldOverviewPage },
          { path: 'api', component: FormFieldApiPage },
          { path: 'code-generation', component: FormFieldCodeGenerationPage },
        ],
      },
    ]),
  ],
  providers: [{ provide: COMPONENT_CAPTION, useValue: 'Form field' }],
})
export class FormFieldModule {}
