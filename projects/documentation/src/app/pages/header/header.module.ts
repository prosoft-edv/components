import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentPageWrapperComponent, COMPONENT_CAPTION } from '../../components/component-page-wrapper/component-page-wrapper.component';
import { ComponentPageWrapperModule } from '../../components/component-page-wrapper/component-page-wrapper.module';
import { HeaderApiPage } from './pages/api/header-api.page';
import { HeaderCodeGenerationPage } from './pages/code-generation/header-code-generation.page';
import { HeaderOverviewPage } from './pages/overview/header-overview.page';

@NgModule({
  declarations: [HeaderApiPage, HeaderCodeGenerationPage, HeaderOverviewPage],
  imports: [
    CommonModule,
    ComponentPageWrapperModule,
    RouterModule.forChild([
      {
        path: '',
        component: ComponentPageWrapperComponent,
        children: [
          { path: '', redirectTo: 'overview' },
          { path: 'overview', component: HeaderOverviewPage },
          { path: 'api', component: HeaderApiPage },
          { path: 'code-generation', component: HeaderCodeGenerationPage },
        ],
      },
    ]),
  ],
  providers: [{ provide: COMPONENT_CAPTION, useValue: 'Header' }],
})
export class HeaderModule {}
