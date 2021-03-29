import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentPageWrapperComponent, COMPONENT_CAPTION } from '../../components/component-page-wrapper/component-page-wrapper.component';
import { ComponentPageWrapperModule } from '../../components/component-page-wrapper/component-page-wrapper.module';
import { FormErrorsApiPage } from './pages/api/form-errors-api.page';
import { FormErrorsCodeGenerationPage } from './pages/code-generation/form-errors-code-generation.page';
import { FormErrorsOverviewPage } from './pages/overview/form-errors-overview.page';

@NgModule({
  declarations: [FormErrorsApiPage, FormErrorsCodeGenerationPage, FormErrorsOverviewPage],
  imports: [
    CommonModule,
    ComponentPageWrapperModule,
    RouterModule.forChild([
      {
        path: '',
        component: ComponentPageWrapperComponent,
        children: [
          { path: '', redirectTo: 'overview' },
          { path: 'overview', component: FormErrorsOverviewPage },
          { path: 'api', component: FormErrorsApiPage },
          { path: 'code-generation', component: FormErrorsCodeGenerationPage },
        ],
      },
    ]),
  ],
  providers: [{ provide: COMPONENT_CAPTION, useValue: 'Form errors' }],
})
export class FormErrorsModule {}
