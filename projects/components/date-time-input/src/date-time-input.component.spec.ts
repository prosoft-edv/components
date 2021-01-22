import { Platform } from '@angular/cdk/platform';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, Inject, Injectable, LOCALE_ID, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateAdapter, MatDateFormats, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { parseHumanInput } from '@prosoft/components/utils';
import { PsDateTimeInputComponent } from './date-time-input.component';
import { PsDateTimeInputModule } from './date-time-input.module';
import { PsDateTimeInputHarness } from './testing/date-time-input.harness';

export const TEST_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: null,
  },
  display: {
    dateInput: { year: 'numeric', month: '2-digit', day: '2-digit' },
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

// extend NativeDateAdapter's format method to specify the date format.
@Injectable({ providedIn: 'root' })
export class TestDateTimeAdapter extends NativeDateAdapter {
  constructor(@Inject(LOCALE_ID) _locale: string, platform: Platform) {
    super(_locale, platform);
  }

  public sameDate(a: any, b: any) {
    return !a && !b ? false : super.sameDate(a, b);
  }

  public getFirstDayOfWeek(): number {
    return getLocaleFirstDayOfWeek(this.locale);
  }

  // If required extend other NativeDateAdapter methods.
  public parse(value: any): Date | null {
    return parseHumanInput(value);
  }

  public getIs24Hours(): boolean {
    return new Date(79200000).toLocaleTimeString(this.locale).indexOf('11') === -1;
  }
}

@Component({
  selector: 'ps-test-component',
  template: ` <ps-date-time-input [disabled]="disabled"></ps-date-time-input> `,
})
export class TestDataSourceComponent {
  public disabled = false;
  @ViewChild(PsDateTimeInputComponent) public dateTimeInputComponent: PsDateTimeInputComponent;
}

fdescribe('DateTimeInputComponent', () => {
  let fixture: ComponentFixture<TestDataSourceComponent>;
  let component: TestDataSourceComponent;
  let loader: HarnessLoader;
  let dateTimeInput: PsDateTimeInputHarness;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PsDateTimeInputModule],
      declarations: [TestDataSourceComponent],
      providers: [
        { provide: DateAdapter, useClass: TestDateTimeAdapter },
        { provide: MAT_DATE_FORMATS, useValue: TEST_DATE_FORMATS },
      ],
    });
    fixture = TestBed.createComponent(TestDataSourceComponent);
    component = fixture.componentInstance;
    expect(component).toBeDefined();

    loader = TestbedHarnessEnvironment.loader(fixture);
    dateTimeInput = await loader.getHarness(PsDateTimeInputHarness);
  });

  it('Should be disabled', async () => {
    expect(await dateTimeInput.isDisabled()).toEqual(false);
    component.disabled = true;
    expect(await dateTimeInput.isDisabled()).toEqual(true);
  });

  it('Should return valid date', () => {
    component.dateTimeInputComponent.datum = new Date();
    component.dateTimeInputComponent.uhrzeit = '11:11';
    const value = component.dateTimeInputComponent.convertToDate();

    const expectedValue = new Date();
    expectedValue.setHours(11, 11);
    expect(value.getDate()).toEqual(expectedValue.getDate());
  });

  it('Should return invalid Date', () => {
    component.dateTimeInputComponent.datum = new Date();
    component.dateTimeInputComponent.uhrzeit = null;
    const value = component.dateTimeInputComponent.convertToDate();

    expect(value.getTime()).toEqual(NaN);
  });
});
