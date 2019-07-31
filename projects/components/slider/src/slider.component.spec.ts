import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, NgModel } from '@angular/forms';
import { PsSliderComponent } from './slider.component';
import { PsSliderModule } from './slider.module';

@Component({
  selector: 'ps-slider-test-blank-implemented',
  template: `
    <ps-slider [min]="0" [max]="15"></ps-slider>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderNgModelBlankImplementedComponent {
  @ViewChild(PsSliderComponent, { static: true }) slider: PsSliderComponent;
}

@Component({
  selector: 'ps-slider-test-ngmodel',
  template: `
    <ps-slider [min]="0" [max]="15" [(ngModel)]="someNumber"></ps-slider>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderNgModelTestComponent {
  @ViewChild(PsSliderComponent, { static: true }) slider: PsSliderComponent;
  public someNumber = 5;
}

@Component({
  selector: 'ps-slider-test-reactive-form',
  template: `
    <form [formGroup]="form">
      <ps-slider [min]="0" [max]="15" [formControlName]="'someFormNumber'"></ps-slider>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderReactiveFormTestComponent {
  @ViewChild(PsSliderComponent, { static: false }) slider: PsSliderComponent;

  public someForm = new FormGroup({
    someFormNumber: new FormControl(5),
  });
}

describe('PsSlider', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PsSliderModule],
      declarations: [SliderNgModelBlankImplementedComponent],
    });
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(PsSliderComponent);
    const component = fixture.componentInstance;

    expect(component).toBeDefined();
  });

  it('should create when implemented', () => {
    const fixture = TestBed.createComponent(SliderNgModelBlankImplementedComponent);
    const component = fixture.componentInstance;

    expect(component).toBeDefined();
    expect(component.slider).toBeDefined();
  });

  it('should create with given values', fakeAsync(() => {
    const fixture = TestBed.createComponent(SliderNgModelBlankImplementedComponent);
    const component = fixture.componentInstance;

    fixture.detectChanges();

    expect(component.slider.min).toEqual(0);
    expect(component.slider.max).toEqual(15);
    expect(component.slider.value).toEqual(0);
  }));
});

xdescribe('PsSlider with NgModel', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, PsSliderModule],
      declarations: [SliderNgModelTestComponent],
    });
  }));

  it('should update when implementer updates', fakeAsync(() => {
    const fixture = TestBed.createComponent(SliderNgModelTestComponent);
    fixture.autoDetectChanges(true);
    fixture.detectChanges();

    const component = fixture.componentInstance;
    expect(component.slider.value).toEqual(5);
    fixture.detectChanges();

    component.someNumber = 10;
    fixture.detectChanges();

    const changedModel = fixture.debugElement.children[0].injector.get<NgModel>(NgModel);
    fixture.detectChanges();
    expect(changedModel.value).toEqual(10);
  }));

  it('implementer should update when slider changes', fakeAsync(() => {
    const fixture = TestBed.createComponent(SliderNgModelTestComponent);
    const component = fixture.componentInstance;

    const handleEl: HTMLElement = component.slider.handles[0];
    handleEl.dispatchEvent(new KeyboardEvent('keydown', { code: '39' }));

    expect(component.someNumber).toEqual(6);
  }));
});

xdescribe('PsSlider with ReactiveForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, PsSliderModule],
      declarations: [SliderReactiveFormTestComponent],
    });
  });

  it('should update when implementer updates', fakeAsync(() => {
    const fixture = TestBed.createComponent(SliderReactiveFormTestComponent);
    const component = fixture.componentInstance;

    expect(component.slider.slider.value).toEqual(5);
    component.someForm.getRawValue().someFormNumber = 10;

    expect(component.slider.value).toEqual(10);
  }));

  it('implementer should update when slider changes', fakeAsync(() => {
    const fixture = TestBed.createComponent(SliderReactiveFormTestComponent);
    const component = fixture.componentInstance;

    const handleEl: HTMLElement = component.slider.handles[0];
    handleEl.dispatchEvent(new KeyboardEvent('keydown', { code: '39' }));

    expect(component.someForm.getRawValue().someFormNumber).toEqual(6);
  }));
});
