import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ps-error-card',
  template: `
    <mat-card class="ps-error-card" [class.ps-error-card--center]="center">
      <mat-icon *ngIf="showIcon" class="ps-error-card__icon">sentiment_very_dissatisfied</mat-icon>
      <span>{{ errorMessage }}</span>
    </mat-card>
  `,
  styles: [
    `
      .ps-error-card {
        color: var(--ps-error);
      }

      .ps-error-card--center {
        display: grid;
        justify-items: center;
      }

      .ps-error-card__icon {
        color: var(--ps-error);
        font-size: 72px;
        height: 72px;
        width: 72px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PsErrorCardComponent {
  @Input() public showIcon = true;
  @Input() public errorMessage: string;
  @Input() public center = false;
}
