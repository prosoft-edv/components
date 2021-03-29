import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentPageWrapperComponent, COMPONENT_CAPTION } from '../../components/component-page-wrapper/component-page-wrapper.component';
import { ComponentPageWrapperModule } from '../../components/component-page-wrapper/component-page-wrapper.module';
import { DialogWrapperApiPage } from './pages/api/dialog-wrapper-api.page';
import { DialogWrapperCodeGenerationPage } from './pages/code-generation/dialog-wrapper-code-generation.page';
import { DialogWrapperOverviewPage } from './pages/overview/dialog-wrapper-overview.page';

@NgModule({
  declarations: [DialogWrapperApiPage, DialogWrapperCodeGenerationPage, DialogWrapperOverviewPage],
  imports: [
    CommonModule,
    ComponentPageWrapperModule,
    RouterModule.forChild([
      {
        path: '',
        component: ComponentPageWrapperComponent,
        children: [
          { path: '', redirectTo: 'overview' },
          { path: 'overview', component: DialogWrapperOverviewPage },
          { path: 'api', component: DialogWrapperApiPage },
          { path: 'code-generation', component: DialogWrapperCodeGenerationPage },
        ],
      },
    ]),
  ],
  providers: [{ provide: COMPONENT_CAPTION, useValue: 'Dialog wrapper' }],
})
export class DialogWrapperModule {}
