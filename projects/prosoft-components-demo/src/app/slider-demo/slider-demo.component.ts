import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-slider-demo',
  template: `
    <h1>ps-slider</h1>
    <h2>Single number sliders</h2>
    <div class="app-slider-demo__container">
      <div>
        <span style="font-weight: bold;">Single number value</span>
        <ps-slider [min]="0" [max]="15" [(ngModel)]="someNumber"></ps-slider>
        <label style="margin-top: 1em;">{{ 'Value: ' + someNumber }}</label>
      </div>
      <div>
        <span style="font-weight: bold;">Single number value with tooltip</span>
        <ps-slider [showTooltips]="true" [min]="0" [max]="15" [(ngModel)]="someNumber2"></ps-slider>
        <label style="margin-top: 1em;">{{ 'Value: ' + someNumber2 }}</label>
      </div>
      <div>
        <span style="font-weight: bold;">Single number value with connect</span>
        <ps-slider [connect]="'lower'" [showTooltips]="true" [min]="0" [max]="15" [(ngModel)]="someNumber3"></ps-slider>
        <label style="margin-top: 1em;">{{ 'Value: ' + someNumber3 }}</label>
      </div>
      <div>
        <span style="font-weight: bold;">Single number value nullable</span>
        <ps-slider [connect]="'lower'" [showTooltips]="true" [min]="0" [max]="15" [(ngModel)]="someNumber4"></ps-slider>
        <label style="margin-top: 1em;">{{ 'Value: ' + someNumber4 }}</label>
      </div>
      <div>
        <span style="font-weight: bold;">Updated from ngModel</span>
        <ps-slider [connect]="'lower'" [showTooltips]="true" [min]="0" [max]="15" [(ngModel)]="someNumber5"></ps-slider>
        <button (click)="decreaseNumber()">Decrease number</button>
        <label style="margin-left: 1em; margin-top: 1em;">{{ 'Value: ' + someNumber5 }}</label>
        <button style="margin-left: 1em;" (click)="increaseNumber()">Increase number</button>
      </div>
    </div>
    <br />
    <h2>Number range sliders</h2>
    <div class="app-slider-demo__container">
      <div>
        <span style="font-weight: bold;">Number range</span>
        <ps-slider [isRange]="true" [showTooltips]="true" [min]="0" [max]="15" [(ngModel)]="someRange"></ps-slider>
        <label style="margin-top: 1em;">{{ 'Value: ' + (someRange | json) }}</label>
      </div>
    </div>
    <br />
    <h2>RectiveForms (PsFormField)</h2>
    <form [formGroup]="someForm">
      <div class="app-slider-demo__container">
        <div>
          <span style="font-weight: bold;">Single number value MatFormField</span>
          <ps-form-field>
            <ps-slider [min]="0" [max]="15" formControlName="formNumber"></ps-slider>
          </ps-form-field>
          <div>{{ 'Value: ' + someForm.value.formNumber }}</div>
        </div>
        <div>
          <span style="font-weight: bold;">Single number value min 3 validation</span>
          <ps-form-field>
            <ps-slider [min]="0" [max]="15" [showTooltips]="true" formControlName="formNumber2"></ps-slider>
          </ps-form-field>
          <div>{{ 'Value: ' + someForm.value.formNumber2 }}</div>
        </div>
        <div>
          <span style="font-weight: bold;">Single number value disabled</span>
          <ps-form-field>
            <ps-slider [min]="0" [max]="15" formControlName="formNumber3"></ps-slider>
          </ps-form-field>
          <div>{{ 'Value: ' + someForm.value.formNumber3 }}</div>
        </div>
        <div>
          <span style="font-weight: bold;">Single number value disabled value set</span>
          <ps-form-field>
            <ps-slider [min]="0" [max]="15" formControlName="formNumber4"></ps-slider>
          </ps-form-field>
          <div>{{ 'Value: ' + someForm.getRawValue().formNumber4 }}</div>
        </div>
      </div>
    </form>
  `,
  styles: [
    `
      .app-slider-demo__container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 1em;
        grid-row-gap: 1em;
        border: 0.2em solid #d3d3d3d3;
        padding: 0.5em;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderDemoComponent {
  public someNumber: number;
  public someNumber2: number;
  public someNumber3 = 5;
  public someNumber4: number;
  public someNumber5 = 0;
  public someRange: number[];
  public someRange2 = [3, 8];
  public someForm = new FormGroup({
    formNumber: new FormControl(null, [Validators.required]),
    formNumber2: new FormControl(null, [Validators.min(3)]),
    formNumber3: new FormControl({ value: null, disabled: true }),
    formNumber4: new FormControl({ value: 5, disabled: true }),
  });

  public increaseNumber() {
    this.someNumber5 = this.someNumber5 < 15 ? (this.someNumber5 += 1) : 15;
  }

  public decreaseNumber() {
    this.someNumber5 = this.someNumber5 > 0 ? (this.someNumber5 -= 1) : 0;
  }
}
