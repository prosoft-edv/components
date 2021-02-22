import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentPageWrapperComponent, COMPONENT_CAPTION } from '../../components/component-page-wrapper/component-page-wrapper.component';
import { ComponentPageWrapperModule } from '../../components/component-page-wrapper/component-page-wrapper.module';
import { ViewApiPage } from './pages/api/view-api.page';
import { ViewCodeGenerationPage } from './pages/code-generation/view-code-generation.page';
import { ViewOverviewPage } from './pages/overview/view-overview.page';

@NgModule({
  declarations: [ViewApiPage, ViewCodeGenerationPage, ViewOverviewPage],
  imports: [
    CommonModule,
    ComponentPageWrapperModule,
    RouterModule.forChild([
      {
        path: '',
        component: ComponentPageWrapperComponent,
        children: [
          { path: '', redirectTo: 'overview' },
          { path: 'overview', component: ViewOverviewPage },
          { path: 'api', component: ViewApiPage },
          { path: 'code-generation', component: ViewCodeGenerationPage },
        ],
      },
    ]),
  ],
  providers: [{ provide: COMPONENT_CAPTION, useValue: 'View' }],
})
export class ViewModule {}
