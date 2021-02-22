import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentPageWrapperComponent, COMPONENT_CAPTION } from '../../components/component-page-wrapper/component-page-wrapper.component';
import { ComponentPageWrapperModule } from '../../components/component-page-wrapper/component-page-wrapper.module';
import { CardApiPage } from './pages/api/card-api.page';
import { CardCodeGenerationPage } from './pages/code-generation/card-code-generation.page';
import { CardOverviewPage } from './pages/overview/card-overview.page';

@NgModule({
  declarations: [CardApiPage, CardCodeGenerationPage, CardOverviewPage],
  imports: [
    CommonModule,
    ComponentPageWrapperModule,
    RouterModule.forChild([
      {
        path: '',
        component: ComponentPageWrapperComponent,
        children: [
          { path: '', redirectTo: 'overview' },
          { path: 'overview', component: CardOverviewPage },
          { path: 'api', component: CardApiPage },
          { path: 'code-generation', component: CardCodeGenerationPage },
        ],
      },
    ]),
  ],
  providers: [{ provide: COMPONENT_CAPTION, useValue: 'Card' }],
})
export class CardModule {}
