import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentPageWrapperComponent, COMPONENT_CAPTION } from '../../components/component-page-wrapper/component-page-wrapper.component';
import { ComponentPageWrapperModule } from '../../components/component-page-wrapper/component-page-wrapper.module';
import { SliderApiPage } from './pages/api/slider-api.page';
import { SliderCodeGenerationPage } from './pages/code-generation/slider-code-generation.page';
import { SliderOverviewPage } from './pages/overview/slider-overview.page';

@NgModule({
  declarations: [SliderApiPage, SliderCodeGenerationPage, SliderOverviewPage],
  imports: [
    CommonModule,
    ComponentPageWrapperModule,
    RouterModule.forChild([
      {
        path: '',
        component: ComponentPageWrapperComponent,
        children: [
          { path: '', redirectTo: 'overview' },
          { path: 'overview', component: SliderOverviewPage },
          { path: 'api', component: SliderApiPage },
          { path: 'code-generation', component: SliderCodeGenerationPage },
        ],
      },
    ]),
  ],
  providers: [{ provide: COMPONENT_CAPTION, useValue: 'Slider' }],
})
export class SliderModule {}
