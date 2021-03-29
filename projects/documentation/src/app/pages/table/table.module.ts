import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentPageWrapperComponent, COMPONENT_CAPTION } from '../../components/component-page-wrapper/component-page-wrapper.component';
import { ComponentPageWrapperModule } from '../../components/component-page-wrapper/component-page-wrapper.module';
import { TableApiPage } from './pages/api/table-api.page';
import { TableCodeGenerationPage } from './pages/code-generation/table-code-generation.page';
import { TableOverviewPage } from './pages/overview/table-overview.page';

@NgModule({
  declarations: [TableApiPage, TableCodeGenerationPage, TableOverviewPage],
  imports: [
    CommonModule,
    ComponentPageWrapperModule,
    RouterModule.forChild([
      {
        path: '',
        component: ComponentPageWrapperComponent,
        children: [
          { path: '', redirectTo: 'overview' },
          { path: 'overview', component: TableOverviewPage },
          { path: 'api', component: TableApiPage },
          { path: 'code-generation', component: TableCodeGenerationPage },
        ],
      },
    ]),
  ],
  providers: [{ provide: COMPONENT_CAPTION, useValue: 'Table' }],
})
export class TableModule {}
