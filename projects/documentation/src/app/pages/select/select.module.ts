import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentPageWrapperComponent, COMPONENT_CAPTION } from '../../components/component-page-wrapper/component-page-wrapper.component';
import { ComponentPageWrapperModule } from '../../components/component-page-wrapper/component-page-wrapper.module';
import { SelectApiPage } from './pages/api/select-api.page';
import { SelectCodeGenerationPage } from './pages/code-generation/select-code-generation.page';
import { SelectOverviewPage } from './pages/overview/select-overview.page';

@NgModule({
  declarations: [SelectApiPage, SelectCodeGenerationPage, SelectOverviewPage],
  imports: [
    CommonModule,
    ComponentPageWrapperModule,
    RouterModule.forChild([
      {
        path: '',
        component: ComponentPageWrapperComponent,
        children: [
          { path: '', redirectTo: 'overview' },
          { path: 'overview', component: SelectOverviewPage },
          { path: 'api', component: SelectApiPage },
          { path: 'code-generation', component: SelectCodeGenerationPage },
        ],
      },
    ]),
  ],
  providers: [{ provide: COMPONENT_CAPTION, useValue: 'Select' }],
})
export class SelectModule {}
