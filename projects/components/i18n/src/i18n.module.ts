import { NgModule } from '@angular/core';

import { TranslatePipe } from './translate.pipe';

@NgModule({
  exports: [TranslatePipe],
  declarations: [TranslatePipe],
})
export class I18nModule {}
