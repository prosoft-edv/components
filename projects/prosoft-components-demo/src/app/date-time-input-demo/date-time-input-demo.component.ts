import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-time-input-demo',
  template: `
    <form [formGroup]="form" style="width: 250px;">
      <ps-form-field>
        <ps-date-time-input formControlName="myDateTime"></ps-date-time-input>
        <mat-label>Select date-time</mat-label>
      </ps-form-field>
    </form>
    <div>Selected value: {{ form.getRawValue().myDateTime }}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimeInputDemoComponent {
  public form = new FormGroup({
    myDateTime: new FormControl(null),
  });
}
