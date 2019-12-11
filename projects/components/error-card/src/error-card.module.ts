import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PsErrorCardComponent } from './error-card.component';

@NgModule({
  declarations: [PsErrorCardComponent],
  imports: [CommonModule, MatCardModule, MatIconModule],
  exports: [PsErrorCardComponent],
})
export class PsErrorCardModule {}
