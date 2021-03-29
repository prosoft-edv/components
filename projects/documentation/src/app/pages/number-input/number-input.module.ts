import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentPageWrapperComponent, COMPONENT_CAPTION } from '../../components/component-page-wrapper/component-page-wrapper.component';
import { ComponentPageWrapperModule } from '../../components/component-page-wrapper/component-page-wrapper.module';
import { NumberInputApiPage } from './pages/api/number-input-api.page';
import { NumberInputCodeGenerationPage } from './pages/code-generation/number-input-code-generation.page';
import { NumberInputOverviewPage } from './pages/overview/number-input-overview.page';

@NgModule({
  declarations: [NumberInputApiPage, NumberInputCodeGenerationPage, NumberInputOverviewPage],
  imports: [
    CommonModule,
    ComponentPageWrapperModule,
    RouterModule.forChild([
      {
        path: '',
        component: ComponentPageWrapperComponent,
        children: [
          { path: '', redirectTo: 'overview' },
          { path: 'overview', component: NumberInputOverviewPage },
          { path: 'api', component: NumberInputApiPage },
          { path: 'code-generation', component: NumberInputCodeGenerationPage },
        ],
      },
    ]),
  ],
  providers: [{ provide: COMPONENT_CAPTION, useValue: 'Number input' }],
})
export class NumberInputModule {}
