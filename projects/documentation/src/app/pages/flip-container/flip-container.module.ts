import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentPageWrapperComponent, COMPONENT_CAPTION } from '../../components/component-page-wrapper/component-page-wrapper.component';
import { ComponentPageWrapperModule } from '../../components/component-page-wrapper/component-page-wrapper.module';
import { FlipContainerApiPage } from './pages/api/flip-container-api.page';
import { FlipContainerCodeGenerationPage } from './pages/code-generation/flip-container-code-generation.page';
import { FlipContainerOverviewPage } from './pages/overview/flip-container-overview.page';

@NgModule({
  declarations: [FlipContainerApiPage, FlipContainerCodeGenerationPage, FlipContainerOverviewPage],
  imports: [
    CommonModule,
    ComponentPageWrapperModule,
    RouterModule.forChild([
      {
        path: '',
        component: ComponentPageWrapperComponent,
        children: [
          { path: '', redirectTo: 'overview' },
          { path: 'overview', component: FlipContainerOverviewPage },
          { path: 'api', component: FlipContainerApiPage },
          { path: 'code-generation', component: FlipContainerCodeGenerationPage },
        ],
      },
    ]),
  ],
  providers: [{ provide: COMPONENT_CAPTION, useValue: 'Flip container' }],
})
export class FlipContainerModule {}
