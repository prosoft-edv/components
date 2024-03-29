import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { PsIntlService, PsIntlServiceEn } from '@prosoft/components/core';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,

    RouterModule.forRoot([
      {
        path: 'flip-container',
        loadChildren: () => import('./flip-container-demo/flip-container-demo.module').then((m) => m.FlipContainerDemoModule),
      },
      {
        path: 'select',
        loadChildren: () => import('./select-demo/select-demo.module').then((m) => m.SelectDemoModule),
      },
      {
        path: 'form-errors',
        loadChildren: () => import('./form-errors-demo/form-errors-demo.module').then((m) => m.FormErrorsDemoModule),
      },
      {
        path: 'form-field',
        loadChildren: () => import('./form-field-demo/form-field-demo.module').then((m) => m.FormFieldDemoModule),
      },
      {
        path: 'savebar',
        loadChildren: () => import('./savebar-demo/savebar-demo.module').then((m) => m.SavebarDemoModule),
      },
      {
        path: 'block-ui',
        loadChildren: () => import('./block-ui-demo/block-ui-demo.module').then((m) => m.BlockUiDemoModule),
      },
      {
        path: 'slider',
        loadChildren: () => import('./slider-demo/slider-demo.module').then((m) => m.SliderDemoModule),
      },
      {
        path: 'number-input',
        loadChildren: () => import('./number-input-demo/number-input-demo.module').then((m) => m.NumberInputDemoModule),
      },
      {
        path: 'form',
        loadChildren: () => import('./form-demo/form-demo.module').then((m) => m.FormDemoModule),
      },
      {
        path: 'dialog-wrapper',
        loadChildren: () => import('./dialog-wrapper-demo/dialog-wrapper-demo.module').then((m) => m.DialogWrapperDemoModule),
      },
      {
        path: 'table',
        loadChildren: () => import('./table-demo/table-demo.module').then((m) => m.TableDemoModule),
      },
      {
        path: 'view',
        loadChildren: () => import('./view-demo/view-demo.module').then((m) => m.ViewDemoModule),
      },
      {
        path: 'card',
        loadChildren: () => import('./card-demo/card-demo.module').then((m) => m.CardDemoModule),
      },
      {
        path: 'header',
        loadChildren: () => import('./header-demo/header-demo.module').then((m) => m.HeaderDemoModule),
      },
      {
        path: '**',
        pathMatch: 'full',
        loadChildren: () => import('./start-page/start-page.module').then((m) => m.StartPageModule),
      },
    ]),
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    { provide: PsIntlService, useClass: PsIntlServiceEn },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
