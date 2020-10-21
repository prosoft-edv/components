import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ChangeDetectorRef, Component, OnDestroy, Type, ViewChild, QueryList } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatSelectHarness } from '@angular/material/select/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Subject, Subscription, of, throwError } from 'rxjs';
import { DefaultPsSelectDataSource } from './defaults/default-select-data-source';
import { DefaultPsSelectService } from './defaults/default-select-service';
import { PsSelectComponent } from './select.component';
import { PsSelectModule } from './select.module';
import { OptionHarnessFilters, MatOptionHarness } from '@angular/material/core/testing';
import { _PsSliderMixinBase } from 'dist/components/slider/src/slider.component';
import { PsSelectService } from './select.service';
import { PsSelectDataSource } from './select-data-source';
import { PsSelectItem } from './models';

function createFakeMatSelect(): MatSelect {
  const matSelect = <any>{
    value: null,
    stateChanges: new Subject<void>(),
    openedChange: new Subject<void>(),
    close: () => {},
    _onChange: () => {},
    _onTouched: null,
    ngControl: new FormControl(),
    options: new QueryList(),
    writeValue: () => {},
    setDisabledState: () => {},
  };

  matSelect.writeValue = (val: any) => {
    matSelect.value = val;
  };
  matSelect.registerOnChange = (val: any) => {
    matSelect._onChange = val;
  };
  matSelect.registerOnTouched = (val: any) => {
    matSelect._onTouched = val;
  };

  return matSelect;
}

function createSelectService(): PsSelectService {
  const service = <PsSelectService>{
    createDataSource: (ds: any) => ds,
  };

  return service;
}

function createDataSource(items: PsSelectItem[] = []): PsSelectDataSource {
  const dataSource = <PsSelectDataSource>{
    connect: () => of<PsSelectItem[]>(items),
    disconnect: () => {},
    selectedValuesChanged: (_: any | any[]) => {},
    panelOpenChanged: (_: boolean) => {},
    searchTextChanged: (_: string) => {},
  };

  return dataSource;
}

function createPsSelect(options?: { dataSource?: PsSelectDataSource; service: PsSelectService }) {
  const matSelect = createFakeMatSelect();
  const dataSource = options?.dataSource ?? createDataSource();
  const service = options?.service ?? createSelectService();
  const component = new PsSelectComponent(null, null, service, <any>{ markForCheck: () => {} }, null, null, <any>{ control: null });
  component.setMatSelect = matSelect;
  component.dataSource = dataSource;
  return { component: component, matSelect: matSelect, service: service, dataSource: dataSource };
}

@Component({
  selector: 'ps-test-component',
  template: `
    <div [formGroup]="form">
      <ps-select
        formControlName="select"
        [dataSource]="dataSource"
        [errorStateMatcher]="errorStateMatcher"
        [panelClass]="panelClass"
        [clearable]="clearable"
      ></ps-select>
    </div>
  `,
})
export class TestComponent implements OnDestroy {
  dataSource: any = [
    { value: 1, label: 'item1' },
    { value: 2, label: 'item2' },
  ];
  control = new FormControl(null, [Validators.required]);
  form = new FormGroup({
    select: this.control,
  });
  emittedValues: any[] = [];
  errorStateMatcher: ErrorStateMatcher = null;
  panelClass: { [key: string]: boolean } = {};
  clearable = true;

  @ViewChild(PsSelectComponent, { static: true }) select: PsSelectComponent;

  private valuesSubscription: Subscription;
  constructor() {
    this.valuesSubscription = this.form.get('select').valueChanges.subscribe((value) => {
      this.emittedValues.push(value);
    });
  }

  ngOnDestroy() {
    this.valuesSubscription.unsubscribe();
  }
}

@Component({
  selector: 'ps-test-multiple-component',
  template: ` <ps-select [(ngModel)]="value" [dataSource]="dataSource" [multiple]="true" [showToggleAll]="showToggleAll"></ps-select> `,
})
export class TestMultipleComponent {
  showToggleAll = true;
  dataSource: any = [
    { value: 1, label: 'item1' },
    { value: 2, label: 'item2' },
  ];
  value: any = null;

  @ViewChild(PsSelectComponent, { static: true }) select: PsSelectComponent;

  constructor(public cd: ChangeDetectorRef) {}
}

@Component({
  selector: 'ps-test-custom-template',
  template: `
    <ps-select [(value)]="value" [dataSource]="items">
      <ng-container *psSelectTriggerTemplate="let item">
        trigger:{{ item.value }}:<span [style.color]="item.value">{{ item.viewValue }}</span>
      </ng-container>
      <ng-container *psSelectOptionTemplate="let item">
        <div>color:</div>
        <div>{{ item.value }}:</div>
        <div [style.color]="item.value">{{ item.label }}</div>
      </ng-container>
    </ps-select>
  `,
})
export class TestCustomTemplateComponent {
  public items = [
    {
      value: `red`,
      label: `Red`,
    },
    {
      value: `green`,
      label: `Green`,
    },
    {
      value: `blue`,
      label: `Blue`,
    },
  ];
  public value: any = null;
}

async function initTest<T>(type: Type<T>): Promise<{ fixture: ComponentFixture<T>; component: T; loader: HarnessLoader }> {
  await TestBed.configureTestingModule({
    imports: [NoopAnimationsModule, PsSelectModule.forRoot(DefaultPsSelectService), FormsModule, ReactiveFormsModule],
    declarations: [TestComponent, TestMultipleComponent, TestCustomTemplateComponent],
  });
  const fixture = TestBed.createComponent(type);
  const component = fixture.componentInstance;
  expect(component).toBeDefined();

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();

  return {
    fixture: fixture,
    component: component,
    loader: TestbedHarnessEnvironment.loader(fixture),
  };
}

function createInstance() {
  return new PsSelectComponent(null, {} as ErrorStateMatcher, null, null, null, null, null);
}

fdescribe('PsSelectComponent', () => {
  it('should use right default values', () => {
    const cmp = createInstance();

    expect(cmp.clearable).toBe(true);
    expect(cmp.showToggleAll).toBe(true);
    expect(cmp.multiple).toBe(false);
    expect(cmp.errorStateMatcher).toBe(null);
    expect(cmp.panelClass).toBe(null);
    expect(cmp.placeholder).toBe(null);
    expect(cmp.required).toBe(false);
    expect(cmp.disabled).toBe(false);
  });

  // Probably unneccessary now
  xit('should fix MatSelect.close() not emitting stateChanges', fakeAsync(() => {
    const matSelect = createFakeMatSelect();

    const psSelect = createInstance();
    psSelect.setMatSelect = matSelect;

    spyOn(matSelect.stateChanges, 'next');

    matSelect.close();

    expect(matSelect.stateChanges.next).toHaveBeenCalled();
  }));

  it('should update disabled property when calling setDisabledState', () => {
    const psSelect = createInstance();
    psSelect.disabled = true;

    psSelect.setDisabledState(false);
    expect(psSelect.disabled).toBe(false);

    psSelect.setDisabledState(true);
    expect(psSelect.disabled).toBe(true);
  });

  it('should work with ngModel', async () => {
    const { fixture, component, loader } = await initTest(TestMultipleComponent);

    // Update value from ps-select
    const matSelect = await loader.getHarness(MatSelectHarness);
    await matSelect.open();
    const options = await matSelect.getOptions();
    await last(options).click();

    fixture.detectChanges();
    expect(component.value).toEqual([2]);
    const selectedOptions = await matSelect.getOptions({ isSelected: true });
    expect(selectedOptions.length).toBe(1);
    expect(await selectedOptions[0].getText()).toEqual('item2');
  });

  it('should work with value binding', async () => {
    const { fixture, component, loader } = await initTest(TestCustomTemplateComponent);

    // Update value from ps-select
    const matSelect = await loader.getHarness(MatSelectHarness);
    await matSelect.open();
    const redOption = (await matSelect.getOptions({ text: /.*Red.*/ }))[0];
    await redOption.click();

    fixture.detectChanges();
    expect(component.value).toEqual('red');
  });

  it('should emit only once when selecting an option', async () => {
    const { component, loader } = await initTest(TestComponent);

    const matSelect = await loader.getHarness(MatSelectHarness);

    // select item 2
    {
      await matSelect.open();
      const options = await matSelect.getOptions();
      await last(options).click();
      expect(component.emittedValues).toEqual([2]);
    }

    // select the clear item
    {
      await matSelect.open();
      component.emittedValues = [];
      const options = await matSelect.getOptions({ text: '--' });
      await options[0].click();
      expect(component.emittedValues).toEqual([undefined]);
    }
  });

  it('should use the error state matcher input', async () => {
    const { fixture, component } = await initTest(TestComponent);

    // Default matcher
    expect(component.control.value).toBe(null);
    expect(component.select.errorState).toBe(false);

    // Custom matcher - empty value
    component.errorStateMatcher = {
      isErrorState: (control: FormControl | null, _form: FormGroupDirective | NgForm | null): boolean => {
        return !!(control && control.invalid);
      },
    };
    fixture.detectChanges();
    expect(component.select.errorState).toBe(true);

    // Custom matcher - item 1
    component.control.patchValue(1);
    fixture.detectChanges();
    expect(component.select.errorState).toBe(false);
  });

  it('should use clearable input', async () => {
    const { fixture, component, loader } = await initTest(TestComponent);
    component.clearable = true;
    fixture.detectChanges();
    const matSelect = await loader.getHarness(MatSelectHarness);
    await matSelect.open();

    expect(await isEmptyOptionVisible()).toBeTruthy();

    component.clearable = false;
    fixture.detectChanges();

    expect(await isEmptyOptionVisible()).toBeFalsy();

    async function isEmptyOptionVisible() {
      const options = await matSelect.getOptions({ text: '--' });
      return options.length > 0;
    }
  });

  it('toggle all functionality should work', async () => {
    const { fixture, component, loader } = await initTest(TestMultipleComponent);
    const matSelect = await loader.getHarness(MatSelectHarness);
    component.showToggleAll = true;
    fixture.detectChanges();
    await matSelect.open();
    expect(await getOptionIsSelected(matSelect)).toEqual([false, false]);

    let toggleAllCbx = await getToggleAllInputCbx(fixture);
    expect(toggleAllCbx).toBeTruthy();

    toggleAllCbx.click();
    fixture.detectChanges();
    expect(await getOptionIsSelected(matSelect)).toEqual([true, true]);
    expect(toggleAllCbx.checked).toBe(true);

    toggleAllCbx.click();
    fixture.detectChanges();
    expect(await getOptionIsSelected(matSelect)).toEqual([false, false]);
    expect(toggleAllCbx.checked).toBe(false);

    const options = await matSelect.getOptions();
    await last(options).click();
    expect(await getOptionIsSelected(matSelect)).toEqual([false, true]);
    expect((toggleAllCbx.parentNode.parentNode.parentNode as any).classList.contains('mat-checkbox-indeterminate')).toBe(true);

    toggleAllCbx.click();
    fixture.detectChanges();
    expect(await getOptionIsSelected(matSelect)).toEqual([true, true]);
    expect(toggleAllCbx.checked).toBe(true);

    component.showToggleAll = false;
    fixture.detectChanges();
    toggleAllCbx = await getToggleAllInputCbx(fixture);
    expect(toggleAllCbx).toBeFalsy();
  });

  it('should set the right css classes', async () => {
    const { fixture, component, loader } = await initTest(TestComponent);

    let errorState = false;
    component.errorStateMatcher = {
      isErrorState: (_control: FormControl | null, _form: FormGroupDirective | NgForm | null): boolean => {
        return errorState;
      },
    };

    fixture.detectChanges();
    const matSelect = await loader.getHarness(MatSelectHarness);
    await matSelect.open();

    // Empty
    assertPsSelectCssClasses(fixture, ['ps-select', 'ps-select-empty']);

    // Item selected
    const options = await matSelect.getOptions();
    await last(options).click();
    fixture.detectChanges();
    assertPsSelectCssClasses(fixture, ['ps-select']);

    // Disabled
    component.control.disable();
    fixture.detectChanges();
    assertPsSelectCssClasses(fixture, ['ps-select', 'ps-select-disabled']);
    component.control.enable();

    // Invalid
    errorState = true;
    fixture.detectChanges();
    assertPsSelectCssClasses(fixture, ['ps-select', 'ps-select-invalid']);
    errorState = false;

    // Required
    component.select.required = true;
    fixture.detectChanges();
    assertPsSelectCssClasses(fixture, ['ps-select', 'ps-select-required']);
    component.select.required = false;

    // mat-option
    component.panelClass = { 'custom-mat-option-class': true };
    fixture.detectChanges();

    const matSelectTrigger = fixture.debugElement.query(By.css('.mat-select-trigger'));
    matSelectTrigger.triggerEventHandler('click', new Event('click'));
    fixture.detectChanges();

    // select panel
    const selectPanelNode = document.querySelector('.mat-select-panel');
    expect(selectPanelNode).not.toBeNull();
    expect(selectPanelNode.classList).toContain('custom-mat-option-class');

    const matOptionNodes = selectPanelNode.querySelectorAll('mat-option');

    // mat-select-search
    expect(matOptionNodes.item(0).classList.contains('mat-option-disabled')).toBeTruthy();
    expect(matOptionNodes.item(0).classList.contains('ps-select__search')).toBeTruthy();

    // empty input
    expect(matOptionNodes.item(1).classList.contains('ps-select__empty-option')).toBeTruthy();

    // items
    expect(matOptionNodes.item(2).classList.contains('ps-select__option')).toBeTruthy();
  });

  it('should set multiple css class for multiple mode', async () => {
    const { fixture } = await initTest(TestMultipleComponent);

    const classes = getPsSelectCssClasses(fixture);
    expect(classes).toContain('ps-select-multiple');
  });

  it('should work with custom templates', async () => {
    const { fixture } = await initTest(TestCustomTemplateComponent);

    const matSelectTrigger = fixture.debugElement.query(By.css('.mat-select-trigger'));
    matSelectTrigger.triggerEventHandler('click', new Event('click'));
    fixture.detectChanges();

    // mat-option text
    const selectPanelNode = document.querySelector('.mat-select-panel');
    const matOptionNodes = selectPanelNode.querySelectorAll('mat-option');
    const itemNode = matOptionNodes.item(2);
    expect(itemNode.textContent.trim()).toEqual('color:blue:Blue');

    // select the mat-option
    itemNode.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // trigger text
    expect(matSelectTrigger.nativeElement.textContent.trim()).toEqual('trigger:blue:color:blue:Blue'); // static trigger text + value + mat-option viewValue
  });

  it('should disable matOption for item with disable', async () => {
    const { fixture, component, loader } = await initTest(TestMultipleComponent);
    component.dataSource = new DefaultPsSelectDataSource({
      mode: 'id',
      labelKey: 'label',
      idKey: 'value',
      disabledKey: 'disabled',
      items: [
        { label: 'disabled', value: 1, disabled: true },
        { label: 'active', value: 2, disabled: false },
        { label: 'default', value: 3 },
      ],
    });

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const matSelect = await loader.getHarness(MatSelectHarness);
    await matSelect.open();
    expect(await (await matSelect.getOptions({ text: 'disabled' }))[0].isDisabled()).toBeTruthy();
    expect(await (await matSelect.getOptions({ text: 'active' }))[0].isDisabled()).toBeFalsy();
    expect(await (await matSelect.getOptions({ text: 'default' }))[0].isDisabled()).toBeFalsy();
  });

  it('should take DataSource compareWith function', async () => {
    const { fixture, component, loader } = await initTest(TestComponent);
    component.dataSource = new DefaultPsSelectDataSource({
      mode: 'id',
      labelKey: 'label',
      idKey: 'value',
      items: [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
      ],
    });
    let calledCount = 0;
    component.dataSource.compareWith = (a: any, b: any) => {
      ++calledCount;
      return a === 1 && b === 2;
    };
    component.control.patchValue(2);
    fixture.detectChanges();
    const matSelect = await loader.getHarness(MatSelectHarness);
    await matSelect.open();

    const optionTexts = await getOptionData(matSelect, (o) => o.getText(), { isSelected: true });
    expect(optionTexts).toEqual(['1']);
    expect(calledCount).toBeGreaterThan(0);
  });

  it('should switch to new dataSource when new dataSource is set', async () => {
    const { fixture, component, loader } = await initTest(TestComponent);
    component.dataSource = new DefaultPsSelectDataSource({
      mode: 'id',
      labelKey: 'label',
      idKey: 'value',
      items: [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
      ],
    });
    component.control.patchValue(2);

    fixture.detectChanges();

    const matSelect = await loader.getHarness(MatSelectHarness);
    await matSelect.open();

    {
      // TODO filter nach '2'

      const optionTexts = await getOptionData(matSelect, (o) => o.getText(), { isSelected: true });
      expect(optionTexts).toEqual(['2']);
    }

    {
      component.dataSource = new DefaultPsSelectDataSource({
        mode: 'id',
        labelKey: 'label',
        idKey: 'value',
        items: [
          { label: '1', value: 1 },
          { label: 'new label 2', value: 2 },
        ],
      });
      fixture.detectChanges();

      const optionTexts = await getOptionData(matSelect, (o) => o.getText(), { isSelected: true });
      expect(optionTexts).toEqual(['new label 2']);

      // TODO: option 1 nicht sichtbar wegen filter
      // TODO: testen, ob value, panelopen und searchvalue weitergegeben wurde an die datasource
    }
  });

  it('should show load errors as disabled option, but still show selected option', async () => {
    const { fixture, component, loader } = await initTest(TestComponent);
    component.dataSource = new DefaultPsSelectDataSource({
      mode: 'id',
      labelKey: 'label',
      idKey: 'value',
      items: () => throwError('my error'),
    });
    component.control.patchValue(2);

    fixture.detectChanges();

    const matSelect = await loader.getHarness(MatSelectHarness);
    await matSelect.open();

    let options = await getOptions(matSelect);
    expect(options.length).toBe(3);

    expect(await options[0].getText()).toBe('my error');
    expect(await options[0].isDisabled()).toBe(true);

    expect(await options[1].getText()).toBe('--');
    expect(await options[1].isDisabled()).toBe(false);

    expect(await options[2].getText()).toContain('2');
    expect(await options[2].isDisabled()).toBe(false);
    expect(await options[2].isSelected()).toBe(true);

    await options[1].click();
    await matSelect.open();

    options = await getOptions(matSelect);
    expect(options.length).toBe(1);

    expect(await options[0].getText()).toBe('my error');
    expect(await options[0].isDisabled()).toBe(true);
  });

  it("should not switch dataSource when dataSource input doesn't change", async () => {
    const { component, service } = createPsSelect();
    const items = [{ value: 1, label: 'i1', hidden: false }];
    const ds = createDataSource(items);
    spyOn(service, 'createDataSource').and.returnValue(ds);

    component.dataSource = 'a';
    expect(service.createDataSource).toHaveBeenCalledTimes(1);

    component.dataSource = 'lookup';
    expect(service.createDataSource).toHaveBeenCalledTimes(2);

    component.dataSource = 'lookup';
    expect(service.createDataSource).toHaveBeenCalledTimes(2);

    expect(component.items).toEqual(items);
    expect(component.dataSource).toBe(ds);
  });

  // it('should use loading of dataSource', fakeAsync(() => {
  //   dataSource.loading = false;
  //   expect(component.loading).toEqual(false);
  //   dataSource.loading = true;
  //   expect(component.loading).toEqual(true);
  // }));

  // it('should pass panel open/close to DataSource', fakeAsync(() => {
  //   component.ngAfterViewInit();

  //   spyOn(dataSource, 'panelOpenChanged');
  //   matSelect.openedChange.next(true);

  //   expect(dataSource.panelOpenChanged).toHaveBeenCalledWith(true);

  //   component.ngOnDestroy();
  // }));

  // it('should pass filter value to DataSource', fakeAsync(() => {
  //   component.ngAfterViewInit();

  //   spyOn(dataSource, 'searchTextChanged');
  //   component.filterCtrl.patchValue('asdf');

  //   expect(dataSource.searchTextChanged).toHaveBeenCalledWith('asdf');

  //   component.ngOnDestroy();
  // }));

  // it('should pass selected values to DataSource', fakeAsync(() => {
  //   spyOn(dataSource, 'selectedValuesChanged');

  //   const initialSelectedValue = { value: 42, label: 'init' };
  //   matSelect.writeValue(initialSelectedValue);
  //   component.ngAfterViewInit();
  //   expect(dataSource.selectedValuesChanged).toHaveBeenCalledWith([initialSelectedValue]);

  //   const newSelectedValue = { value: 1, label: '1' };

  //   matSelect.writeValue(newSelectedValue);
  //   expect(dataSource.selectedValuesChanged).toHaveBeenCalledWith([newSelectedValue]);

  //   matSelect.writeValue(null);
  //   expect(dataSource.selectedValuesChanged).toHaveBeenCalledWith([]);

  //   matSelect.multiple = true;
  //   matSelect.writeValue(newSelectedValue);
  //   expect(dataSource.selectedValuesChanged).toHaveBeenCalledWith([newSelectedValue]);

  //   matSelect._onChange(null);
  //   expect(dataSource.selectedValuesChanged).toHaveBeenCalledWith([]);

  //   matSelect._onChange(newSelectedValue);
  //   expect(dataSource.selectedValuesChanged).toHaveBeenCalledWith([newSelectedValue]);

  //   component.ngOnDestroy();
  // }));

  // it('should pass selected values, searchText and panel open when switching to new DataSource', fakeAsync(() => {
  //   component.ngAfterViewInit();

  //   const selectedValue = { value: 1, label: '1' };
  //   const comparer = () => true;

  //   component.compareWith = comparer;
  //   component.filterCtrl.patchValue('filter');
  //   matSelect.writeValue(selectedValue);

  //   const newDataSource = createDataSource();
  //   spyOn(newDataSource, 'selectedValuesChanged');
  //   spyOn(newDataSource, 'searchTextChanged');

  //   component.dataSource = newDataSource;

  //   expect(newDataSource.compareWith).toBe(comparer);
  //   expect(newDataSource.selectedValuesChanged).toHaveBeenCalledWith([selectedValue]);
  //   expect(newDataSource.searchTextChanged).toHaveBeenCalledWith('filter');

  //   component.ngOnDestroy();
  // }));
});

async function getOptionIsSelected(matSelect: MatSelectHarness) {
  return getOptionData(matSelect, (o) => o.isSelected());
}

async function getOptionData<T>(
  matSelect: MatSelectHarness,
  transform: (option: MatOptionHarness) => Promise<T>,
  filter?: Omit<OptionHarnessFilters, 'ancestor'>
) {
  const options = await getOptions(matSelect, filter);
  return Promise.all(options.map((o) => transform(o)));
}

async function getOptions(matSelect: MatSelectHarness, filter?: Omit<OptionHarnessFilters, 'ancestor'>) {
  const options = await matSelect.getOptions(filter);
  const result = [];
  for (const option of options) {
    const host = await option.host();
    if (await host.hasClass('ps-select__search')) {
      continue;
    }
    result.push(option);
  }
  return result;
}

function getPsSelectCssClasses(fixture: ComponentFixture<any>) {
  const testComponentElement: HTMLElement = fixture.nativeElement;
  const classes = testComponentElement
    .querySelector('ps-select')
    .className.split(' ')
    .filter((x) => x.startsWith('ps-'))
    .sort();
  return classes;
}

function assertPsSelectCssClasses(fixture: ComponentFixture<any>, exprectedClasses: string[]) {
  const classes = getPsSelectCssClasses(fixture);
  expect(classes).toEqual(exprectedClasses.sort());
}

async function getToggleAllInputCbx<T>(_fixture: ComponentFixture<T>): Promise<HTMLInputElement> {
  const selectPanelNode = document.querySelector('.mat-select-panel');
  const toggleAllElement = selectPanelNode.querySelector('.mat-select-search-toggle-all-checkbox input') as HTMLInputElement;
  return toggleAllElement;
}

function last<T>(a: T[]): T {
  return a[a.length - 1];
}
