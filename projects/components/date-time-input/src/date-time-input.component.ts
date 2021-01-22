import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { CanUpdateErrorStateCtor, ErrorStateMatcher, mixinErrorState } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { isValid } from '@prosoft/components/utils';
import { Subject } from 'rxjs';

export class PsDateTimeInputBase {
  constructor(
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    public _parentForm: NgForm,
    public _parentFormGroup: FormGroupDirective,
    public ngControl: NgControl
  ) {}
}

let nextUniqueId = 0;

export const _PsDateTimeMixinBase: CanUpdateErrorStateCtor & typeof PsDateTimeInputBase = mixinErrorState(PsDateTimeInputBase);

@Component({
  selector: 'ps-date-time-input',
  templateUrl: './date-time-input.component.html',
  styleUrls: ['./date-time-input.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: PsDateTimeComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    // Native input properties that are overwritten by Angular inputs need to be synced with
    // the native input element. Otherwise property bindings for those don't work.
    '[attr.id]': 'id',
    '[attr.placeholder]': 'placeholder',
    '[attr.disabled]': 'disabled',
    '[attr.required]': 'required',
    '[attr.readonly]': 'readonly || null',
    '[attr.aria-describedby]': '_ariaDescribedby || null',
    '[attr.aria-invalid]': 'errorState',
    '[attr.aria-required]': 'required.toString()',
  },
})
export class PsDateTimeComponent extends _PsDateTimeMixinBase
  implements MatFormFieldControl<Date>, OnDestroy, ControlValueAccessor, DoCheck, OnInit {
  @Input()
  public shouldLabelFloat = true;
  public stateChanges = new Subject<void>();
  public errorState: boolean;
  public controlType = 'ps-date-time-input';
  public placeholder: string;

  public readonly = false;
  public get empty(): boolean {
    return !this.value;
  }
  public required = false;
  /** An object used to control when error messages are shown. */
  @Input() public errorStateMatcher: ErrorStateMatcher;
  @Input()
  public get disabled(): boolean {
    if (this.ngControl && this.ngControl.disabled !== null) {
      return this.ngControl.disabled;
    }
    return this._disabled;
  }
  public set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.dateInputEl.nativeElement.disabled = value;
    this.timeInputEl.nativeElement.disabled = value;
    this.stateChanges.next();
    this.cd.markForCheck();
  }
  public autofilled?: boolean;

  public datum: Date;
  public uhrzeit: string;

  public get focused(): boolean {
    return this._focused;
  }

  @Input()
  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value || this._uid;
  }

  public get value(): Date | null {
    return this._value;
  }
  public set value(value: Date | null) {
    this._value = value;
    this.stateChanges.next();
  }

  public _ariaDescribedby: string;

  @ViewChild('dateInput', { static: true }) public dateInputEl: ElementRef;
  @ViewChild('timeInput', { static: true }) public timeInputEl: ElementRef;
  protected _id: string;
  protected _disabled = false;

  protected _uid = `ps-date-time-input-${nextUniqueId++}`;

  private _value: Date | null = null;
  private _focused = false;

  private _changeFn: (value: Date) => void;
  private _touchedFn: () => void;

  constructor(
    @Optional()
    @Self()
    public ngControl: NgControl,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    _defaultErrorStateMatcher: ErrorStateMatcher,
    private cd: ChangeDetectorRef
  ) {
    super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }
  public ngOnInit(): void {
    // this._id = value || this._uid; wird gesetzt
    this.id = this.id;
  }
  public writeValue(newValue: Date | null): void {
    this.patchDateValue(newValue);
  }
  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  public registerOnChange(fn: (value: Date) => void): void {
    this._changeFn = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this._touchedFn = fn;
  }

  public ngDoCheck() {
    if (this.ngControl) {
      // We need to re-evaluate this on every change detection cycle, because there are some
      // error triggers that we can't subscribe to (e.g. parent form submissions). This means
      // that whatever logic is in here has to be super lean or we risk destroying the performance.
      this.updateErrorState();
    }
  }

  public setDescribedByIds(ids: string[]): void {
    this._ariaDescribedby = ids.join(' ');
  }
  public onContainerClick(_event: MouseEvent): void {
    // funktioniert nicht, fokus liegt dann auf der ganzen component und man kann in die zeit nur reintabben
    // this.dateInputEl.nativeElement.focus();
  }

  public ngOnDestroy() {
    this.stateChanges.complete();
  }

  public onBlur() {
    this._focused = false;
    this.stateChanges.next();
  }

  public patchDateValue(newValue: Date | null) {
    if (newValue !== null && !isValid(newValue)) {
      return;
    }

    if (newValue !== null) {
      newValue = new Date(newValue);
    }
    const uhrzeit =
      newValue !== null
        ? (newValue.getHours() < 10 ? '0' : '') +
          newValue.getHours() +
          ':' +
          (newValue.getMinutes() < 10 ? '0' : '') +
          newValue.getMinutes()
        : null;

    this._value = newValue;
    this.datum = newValue;
    this.uhrzeit = uhrzeit;

    this.cd.markForCheck();
    this.stateChanges.next();
  }

  public clearInput() {
    this.datum = null;
    this.uhrzeit = null;
    this.cd.markForCheck();
  }

  public onFocus() {
    this._focused = true;
    this.stateChanges.next();
    this._touchedFn();
  }

  public onChanged() {
    this.updateValue();
  }

  public updateValue() {
    this._value = this.convertToDate();
    this._changeFn(this._value);
  }

  public convertToDate() {
    const datum = new Date(this.datum);
    const uhrzeit = this.uhrzeit;
    const uhrzeitIsValid = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(uhrzeit);

    if (!datum && this.dateInputEl.nativeElement.value) {
      return new Date(NaN);
    }

    if (!datum && !uhrzeit) {
      return null;
    }

    if (!uhrzeitIsValid || !isValid(datum)) {
      return new Date(NaN);
    }

    if (uhrzeit && datum) {
      const uhrzeitSplit = uhrzeit.split(':');
      datum.setHours(parseInt(uhrzeitSplit[0], 10), parseInt(uhrzeitSplit[1], 10));
      this.stateChanges.next();
      this.cd.markForCheck();
      return datum;
    }

    return new Date(NaN);
  }
}
