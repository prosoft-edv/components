import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentPageWrapperComponent, COMPONENT_CAPTION } from '../../components/component-page-wrapper/component-page-wrapper.component';
import { ComponentPageWrapperModule } from '../../components/component-page-wrapper/component-page-wrapper.module';
import { FormApiPage } from './pages/api/form-api.page';
import { FormCodeGenerationPage } from './pages/code-generation/form-code-generation.page';
import { FormOverviewPage } from './pages/overview/form-overview.page';

@NgModule({
  declarations: [FormApiPage, FormCodeGenerationPage, FormOverviewPage],
  imports: [
    CommonModule,
    ComponentPageWrapperModule,
    RouterModule.forChild([
      {
        path: '',
        component: ComponentPageWrapperComponent,
        children: [
          { path: '', redirectTo: 'overview' },
          { path: 'overview', component: FormOverviewPage },
          { path: 'api', component: FormApiPage },
          { path: 'code-generation', component: FormCodeGenerationPage },
        ],
      },
    ]),
  ],
  providers: [{ provide: COMPONENT_CAPTION, useValue: 'Form' }],
})
export class FormModule {}
