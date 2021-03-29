import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentPageWrapperComponent, COMPONENT_CAPTION } from '../../components/component-page-wrapper/component-page-wrapper.component';
import { ComponentPageWrapperModule } from '../../components/component-page-wrapper/component-page-wrapper.module';
import { BlockUiApiPage } from './pages/api/block-ui-api.page';
import { BlockUiCodeGenerationPage } from './pages/code-generation/block-ui-code-generation.page';
import { BlockUiOverviewPage } from './pages/overview/block-ui-overview.page';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentPageWrapperModule,
    RouterModule.forChild([
      {
        path: '',
        component: ComponentPageWrapperComponent,
        children: [
          { path: '', redirectTo: 'overview' },
          { path: 'overview', component: BlockUiOverviewPage },
          { path: 'api', component: BlockUiApiPage },
          { path: 'code-generation', component: BlockUiCodeGenerationPage },
        ],
      },
    ]),
  ],
  providers: [{ provide: COMPONENT_CAPTION, useValue: 'Block UI' }],
})
export class BlockUiModule {}
