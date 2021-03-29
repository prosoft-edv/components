import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePage } from './pages/home/home.page';

const appRoutes: Routes = [
  { path: '', component: HomePage },
  { path: 'block-ui', loadChildren: () => import('./pages/block-ui/block-ui.module').then((m) => m.BlockUiModule) },
  { path: 'card', loadChildren: () => import('./pages/card/card.module').then((m) => m.CardModule) },
  { path: 'dialog-wrapper', loadChildren: () => import('./pages/dialog-wrapper/dialog-wrapper.module').then((m) => m.DialogWrapperModule) },
  { path: 'flip-container', loadChildren: () => import('./pages/flip-container/flip-container.module').then((m) => m.FlipContainerModule) },
  { path: 'form', loadChildren: () => import('./pages/form/form.module').then((m) => m.FormModule) },
  { path: 'form-errors', loadChildren: () => import('./pages/form-errors/form-errors.module').then((m) => m.FormErrorsModule) },
  { path: 'form-field', loadChildren: () => import('./pages/form-field/form-field.module').then((m) => m.FormFieldModule) },
  { path: 'header', loadChildren: () => import('./pages/header/header.module').then((m) => m.HeaderModule) },
  { path: 'number-input', loadChildren: () => import('./pages/number-input/number-input.module').then((m) => m.NumberInputModule) },
  { path: 'savebar', loadChildren: () => import('./pages/savebar/savebar.module').then((m) => m.SavebarModule) },
  { path: 'select', loadChildren: () => import('./pages/select/select.module').then((m) => m.SelectModule) },
  { path: 'slider', loadChildren: () => import('./pages/slider/slider.module').then((m) => m.SliderModule) },
  { path: 'table', loadChildren: () => import('./pages/table/table.module').then((m) => m.TableModule) },
  { path: 'view', loadChildren: () => import('./pages/view/view.module').then((m) => m.ViewModule) },
];

@NgModule({
  declarations: [AppComponent, HomePage],
  imports: [
    // Angular stuff
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),

    // Material stuff
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
