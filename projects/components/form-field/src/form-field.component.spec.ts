import { ChangeDetectorRef, Component, Injectable, ViewChild } from '@angular/core';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BasePsFormService, IPsFormError, IPsFormErrorData, PsFormService } from '@prosoft/components/form-base';
import { Observable, of } from 'rxjs';
import { PsFormFieldComponent } from './form-field.component';
import { PsFormFieldModule } from './form-field.module';
import { delay } from 'rxjs/operators';

@Injectable()
class TestPsFormService extends BasePsFormService {
  public labelDelay = 0;
  constructor() {
    super();
    this.options.debounceTime = 0;
  }

  public getLabel(formControl: any): Observable<string> | null {
    if (!formControl.psLabel) {
      return null;
    }
    if (this.labelDelay) {
      return of(formControl.psLabel).pipe(delay(this.labelDelay));
    }
    return of(formControl.psLabel);
  }
  protected mapDataToError(errorData: IPsFormErrorData[]): Observable<IPsFormError[]> {
    return of(
      errorData.map(data => ({
        errorText: data.errorKey,
        data: data,
      }))
    );
  }
}

@Component({
  selector: 'ps-test-component',
  template: `
    <ps-form-field #f1>
      <input type="text" matInput />
    </ps-form-field>
    <ps-form-field #f2>
      <input type="text" />
    </ps-form-field>
  `,
})
export class TestNoFormComponent {
  @ViewChild('f1', { static: true }) formField: PsFormFieldComponent;
  @ViewChild('f2', { static: true }) formFieldEmulated: PsFormFieldComponent;

  constructor(public cd: ChangeDetectorRef) {}
}

@Component({
  selector: 'ps-test-component',
  template: `
    <ps-form-field>
      <input type="text" [(ngModel)]="value" matInput />
    </ps-form-field>
  `,
})
export class TestNgModelComponent {
  value: any = null;

  @ViewChild(PsFormFieldComponent, { static: true }) formField: PsFormFieldComponent;

  constructor(public cd: ChangeDetectorRef) {}
}

@Component({
  selector: 'ps-test-component',
  template: `
    <ps-form-field>
      <mat-label *ngIf="customLabel">{{ customLabel }}</mat-label>
      <input type="text" [formControl]="formControl" matInput />
    </ps-form-field>
  `,
})
export class TestFormComponent {
  formControl = new FormControl('', [Validators.pattern('pattern'), Validators.minLength(5)]);
  customLabel: string = null;

  @ViewChild(PsFormFieldComponent, { static: true }) formField: PsFormFieldComponent;

  constructor(public cd: ChangeDetectorRef) {}
}

@Component({
  selector: 'ps-test-component',
  template: `
    <ps-form-field #f1 class="template-label">
      <mat-checkbox [formControl]="formControl">{{ asyncLabel$ | async }}</mat-checkbox>
    </ps-form-field>
    <ps-form-field #f2 class="no-label">
      <mat-checkbox [formControl]="formControl"></mat-checkbox>
    </ps-form-field>
  `,
})
export class TestCheckboxComponent {
  public asyncLabel$ = of('async label');
  formControl = new FormControl('');

  @ViewChild('f1', { static: true }) formFieldTemplateLabel: PsFormFieldComponent;
  @ViewChild('f2', { static: true }) formFieldNoLabel: PsFormFieldComponent;

  constructor(public cd: ChangeDetectorRef) {}
}

describe('PsFormFieldComponent', () => {
  describe('checkbox', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, ReactiveFormsModule, MatCheckboxModule, PsFormFieldModule],
        declarations: [TestCheckboxComponent],
        providers: [{ provide: PsFormService, useClass: TestPsFormService }],
      }).compileComponents();
    }));

    it('should set checkbox label if no label is set in the template', async(() => {
      const fixture = TestBed.createComponent(TestCheckboxComponent);
      const component = fixture.componentInstance;
      expect(component).toBeDefined();

      (<any>component.formControl).psLabel = 'service label';
      fixture.detectChanges();

      expect(
        fixture.debugElement
          .query(By.css('.template-label'))
          .query(By.css('.mat-checkbox-label'))
          .nativeElement.textContent.trim()
      ).toBe('async label');
      expect(
        fixture.debugElement
          .query(By.css('.no-label'))
          .query(By.css('.mat-checkbox-label'))
          .nativeElement.textContent.trim()
      ).toBe('service label');
    }));
  });

  describe('formControl', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, ReactiveFormsModule, MatInputModule, PsFormFieldModule],
        declarations: [TestFormComponent],
        providers: [{ provide: PsFormService, useClass: TestPsFormService }],
      }).compileComponents();
    }));

    it('should set label', fakeAsync(() => {
      const fixture = TestBed.createComponent(TestFormComponent);
      const component = fixture.componentInstance;
      expect(component).toBeDefined();

      // Label calculated from the service
      (<any>component.formControl).psLabel = 'service label';
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('mat-label')).nativeElement.textContent.trim()).toBe('service label');

      // label defined with <mat-label>
      component.customLabel = 'custom label';
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('mat-label')).nativeElement.textContent.trim()).toBe('custom label');

      // Label calculated from the service with delay
      component.customLabel = null;
      (<any>component.formControl).psLabel = 'async label';
      TestBed.get(PsFormService).labelDelay = 10;
      fixture.detectChanges();
      tick(10);
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('mat-label')).nativeElement.textContent.trim()).toBe('async label');
    }));

    it('should show errors', fakeAsync(() => {
      const fixture = TestBed.createComponent(TestFormComponent);
      const component = fixture.componentInstance;
      expect(component).toBeDefined();
      fixture.autoDetectChanges();

      component.formControl.setValue('a');
      component.formControl.markAsTouched();
      fixture.detectChanges();

      expect(component.formField._ngControl.invalid).toBe(true);
      expect(component.formField._matFormField._control.errorState).toBe(true);

      let errorsChecked = false;
      component.formField.errors$.subscribe(e => {
        expect(e.map(x => x.errorText)).toEqual(['pattern', 'minlength']);
        errorsChecked = true;
      });
      tick(1);
      expect(errorsChecked).toBeTruthy();
    }));
  });

  describe('ngModel', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, FormsModule, MatInputModule, PsFormFieldModule],
        declarations: [TestNgModelComponent],
        providers: [{ provide: PsFormService, useClass: TestPsFormService }],
      }).compileComponents();
    }));

    it('should work with ngModel', fakeAsync(() => {
      const fixture = TestBed.createComponent(TestNgModelComponent);
      const component = fixture.componentInstance;
      expect(component).toBeDefined();

      fixture.detectChanges();

      expect(component.formField.emulated).toBe(false);
      expect(component.formField.noUnderline).toBe(false);
      expect(component.formField._matFormField._shouldLabelFloat()).toBe(false);

      component.value = 'test';
      fixture.detectChanges();

      tick(1);
      expect(component.formField._matFormField._shouldLabelFloat()).toBe(true);
    }));
  });

  describe('no form', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, FormsModule, MatInputModule, PsFormFieldModule],
        declarations: [TestNoFormComponent],
        providers: [{ provide: PsFormService, useClass: TestPsFormService }],
      }).compileComponents();
    }));

    it('should work without form binding', fakeAsync(() => {
      const fixture = TestBed.createComponent(TestNoFormComponent);
      const component = fixture.componentInstance;
      expect(component).toBeDefined();

      fixture.detectChanges();

      // real form control
      expect(component.formField.emulated).toBe(false);
      expect(component.formField.noUnderline).toBe(false);
      expect(component.formField._matFormField._shouldLabelFloat()).toBe(false);

      // emulated form control
      expect(component.formFieldEmulated.emulated).toBe(true);
      expect(component.formFieldEmulated.noUnderline).toBe(true);
      expect(component.formFieldEmulated._matFormField._shouldLabelFloat()).toBe(true);

      fixture.detectChanges();

      tick(1);

      const el = fixture.debugElement.query(By.css('input')).nativeElement;
      el.value = 'someValue';
      el.dispatchEvent(new Event('input'));

      expect(component.formField._matFormField._shouldLabelFloat()).toBe(true);
      expect(component.formFieldEmulated._matFormField._shouldLabelFloat()).toBe(true);
    }));
  });
});
