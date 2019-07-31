import {
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Renderer2,
  Self,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { CanUpdateErrorStateCtor, ErrorStateMatcher, mixinErrorState } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import * as noUiSlider from 'nouislider';

export class DefaultFormatter {
  public to(value: number): string {
    return String(parseFloat(parseFloat(String(value)).toFixed(2)));
  }

  public from(value: string): number {
    return parseFloat(value);
  }
}

// Boilerplate for applying mixins to PsSlider.
/** @docs-private */
export class PsSliderBase {
  constructor(
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    public _parentForm: NgForm,
    public _parentFormGroup: FormGroupDirective,
    public ngControl: NgControl
  ) {}
}
export const _PsSliderMixinBase: CanUpdateErrorStateCtor & typeof PsSliderBase = mixinErrorState(PsSliderBase);

// tslint:disable-next-line: no-conflicting-lifecycle
@Component({
  selector: 'ps-slider',
  template: `
    <div></div>
  `,
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: MatFormFieldControl, useExisting: PsSliderComponent }],
})
export class PsSliderComponent extends _PsSliderMixinBase
  implements ControlValueAccessor, MatFormFieldControl<number | number[]>, OnInit, OnChanges, DoCheck {
  public static nextId = 0;

  @Input() public min: number;
  @Input() public max: number;
  @Input() public stepSize = 1;
  @Input() public isRange = false;
  @Input() public showTooltips = false;
  @Input() public pageSteps = 10;
  @Input() public connect: any[];

  @Output() public valueChange: EventEmitter<any> = new EventEmitter(true);

  @HostBinding() public id = `ps-select-${PsSliderComponent.nextId++}`;

  public placeholder: string;
  public focused = false;
  public controlType = 'ps-slider';
  public autofilled?: boolean;
  public slider: any;
  public shouldLabelFloat = true;
  public noUnderline = true;
  public handles: any[];

  @Input()
  public set required(required: boolean) {
    this._required = !!required;
    this.stateChanges.next();
  }
  public get required() {
    return this._required;
  }

  @Input()
  public set disabled(disabled: boolean) {
    this._disabled = !!disabled;
    this.stateChanges.next();
  }
  public get disabled() {
    return this._disabled;
  }

  public get empty() {
    return !this.value;
  }

  public get value(): number | number[] {
    return this._value;
  }

  private _formatter = new DefaultFormatter();
  private _required = false;
  private _disabled = false;
  private _value: number | number[];

  constructor(
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    @Optional() @Self() public ngControl: NgControl,
    _defaultErrorStateMatcher: ErrorStateMatcher,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  public ngOnInit(): void {
    const getStartFnc = () => {
      const defaultValue = this.isRange ? [this.min, this.max] : this.min;

      const sliderStart = this.ngControl && this.ngControl.value ? this.ngControl.value : defaultValue;
      if (!this._value) {
        this._value = sliderStart;
      }

      if (this.ngControl && !this.ngControl.value) {
        this.ngControl.reset(defaultValue);
      }

      return sliderStart;
    };

    const inputsConfig = {
      start: getStartFnc(),
      step: this.stepSize,
      range: { min: this.min, max: this.max },
      tooltips: this.showTooltips,
      pageSteps: this.pageSteps,
      format: this._formatter,
      connect: this.connect || (this.isRange ? true : null),
    };

    this.slider = noUiSlider.create(this.el.nativeElement.querySelector('div'), inputsConfig);
    this.configureHandles();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.slider && (changes.min || changes.max || changes.stepSize || changes.showTooltips || changes.pageSteps || changes.connect)) {
      setTimeout(() => {
        this.slider.updateOptions({
          step: this.stepSize,
          range: { min: this.min, max: this.max },
          tooltips: this.showTooltips,
          pageSteps: this.pageSteps,
          connect: this.connect,
        });
      });
    }
  }

  public ngDoCheck() {
    if (this.ngControl) {
      this.updateErrorState();
    }
  }

  public writeValue(obj: any): void {
    if (this.slider) {
      setTimeout(() => {
        this.slider.set(obj);
        this._value = obj;
      });
    }
  }

  public registerOnChange(fn: any): void {
    this._onChangeFnc = fn;
  }

  public registerOnTouched(fn: any): void {
    this._onTouchedFnc = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    const slider = this.el.nativeElement.childNodes[0];
    isDisabled ? this.renderer.setAttribute(slider, 'disabled', 'true') : this.renderer.removeAttribute(slider, 'disabled');
  }

  public setDescribedByIds(_: string[]): void {}
  public onContainerClick(_: MouseEvent): void {}

  private toValues(values: string[]): any | any[] {
    const v = values.map(this._formatter.from);
    return v.length === 1 ? v[0] : v;
  }

  private configureHandles() {
    this.handles = [].slice.call(this.el.nativeElement.querySelectorAll('.noUi-handle'));
    for (const handle of this.handles) {
      handle.setAttribute('tabindex', 0);
      handle.addEventListener('click', () => handle.focus());
      handle.addEventListener('keydown', this.keyHandler);
    }

    this.slider.on('slide', (values: string[], _: number, __: number[]) => {
      const v = this.toValues(values);
      this._onChangeFnc(v);
      this.valueChange.emit(v);
    });
  }

  private keyHandler = (e: KeyboardEvent) => {
    const stepSize: any[] = this.slider.steps();
    const index = parseInt((<HTMLElement>e.target).getAttribute('data-handle'), 10);
    let sign = 1;
    let multiplier = 1;
    let step = 0;
    let delta = 0;

    switch (e.code) {
      case '34': // PageDown
        multiplier = this.pageSteps;
        break;
      case '40': // ArrowDown
      case '37': // ArrowLeft
        sign = -1;
        step = stepSize[index][0];
        e.preventDefault();
        break;

      case '33': // PageUp
        multiplier = this.pageSteps;
        break;
      case '38': // ArrowUp
      case '39': // ArrowRight
        step = stepSize[index][1];
        e.preventDefault();
        break;
    }

    delta = sign * multiplier * step;
    let newValue: number | number[];

    if (Array.isArray(this.value)) {
      newValue = [].concat(this.value);
      newValue[index] = newValue[index] + delta;
    } else {
      newValue = this.value + delta;
    }

    this.slider.set(newValue);
  };

  private _onChangeFnc: (value: any) => void = () => {};
  private _onTouchedFnc: () => void = () => {};
}
