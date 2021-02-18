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
  { path: 'form', loadChildren: () => import('./pages/form/form.module').then((m) => m.FormModule) },
  { path: 'block-ui', loadChildren: () => import('./pages/block-ui/block-ui.module').then((m) => m.BlockUiModule) },
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
