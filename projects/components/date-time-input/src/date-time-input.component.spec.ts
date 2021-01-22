import { Platform } from '@angular/cdk/platform';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DateAdapter, MatDateFormats, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { parseHumanInput } from '@prosoft/components/utils';
import { PsDateTimeComponent } from './date-time-input.component';
import { dateTimeModuleImports } from './date-time-input.module';

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

describe('DateTimeInputComponent', () => {
  let component: PsDateTimeComponent;
  let fixture: ComponentFixture<PsDateTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: dateTimeModuleImports,
      declarations: [PsDateTimeComponent],
      providers: [
        { provide: DateAdapter, useClass: TestDateTimeAdapter },
        { provide: MAT_DATE_FORMATS, useValue: TEST_DATE_FORMATS },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PsDateTimeComponent);
    component = fixture.componentInstance;
  }));

  it('Should be disabled', () => {
    component.disabled = true;

    expect(component.dateInputEl.nativeElement.disabled).toEqual(true);
    expect(component.timeInputEl.nativeElement.disabled).toEqual(true);
  });

  it('Should return valid date', () => {
    component.datum = new Date();
    component.uhrzeit = '11:11';
    const value = component.convertToDate();

    const expectedValue = new Date();
    expectedValue.setHours(11, 11);
    expect(value.getDate()).toEqual(expectedValue.getDate());
  });

  it('Should return invalid Date', () => {
    component.datum = new Date();
    component.uhrzeit = null;
    const value = component.convertToDate();

    expect(value.getTime()).toEqual(NaN);
  });
});
