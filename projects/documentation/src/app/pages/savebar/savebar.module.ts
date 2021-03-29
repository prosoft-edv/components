import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentPageWrapperComponent, COMPONENT_CAPTION } from '../../components/component-page-wrapper/component-page-wrapper.component';
import { ComponentPageWrapperModule } from '../../components/component-page-wrapper/component-page-wrapper.module';
import { SavebarApiPage } from './pages/api/savebar-api.page';
import { SavebarCodeGenerationPage } from './pages/code-generation/savebar-code-generation.page';
import { SavebarOverviewPage } from './pages/overview/savebar-overview.page';

@NgModule({
  declarations: [SavebarApiPage, SavebarCodeGenerationPage, SavebarOverviewPage],
  imports: [
    CommonModule,
    ComponentPageWrapperModule,
    RouterModule.forChild([
      {
        path: '',
        component: ComponentPageWrapperComponent,
        children: [
          { path: '', redirectTo: 'overview' },
          { path: 'overview', component: SavebarOverviewPage },
          { path: 'api', component: SavebarApiPage },
          { path: 'code-generation', component: SavebarCodeGenerationPage },
        ],
      },
    ]),
  ],
  providers: [{ provide: COMPONENT_CAPTION, useValue: 'Savebar' }],
})
export class SavebarModule {}
