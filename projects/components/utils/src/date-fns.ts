import {
  differenceInCalendarWeeks as differenceInCalendarWeeksDateFns,
  eachWeekOfInterval as eachWeekOfIntervalDateFns,
  endOfWeek as endOfWeekDateFns,
  format as formatDateFns,
  formatDistance as formatDistanceDateFns,
  formatDistanceStrict as formatDistanceStrictDateFns,
  formatDistanceToNow as formatDistanceToNowDateFns,
  formatRelative as formatRelativeDateFns,
  getWeek as getWeekDateFns,
  getWeekOfMonth as getWeekOfMonthDateFns,
  getWeeksInMonth as getWeeksInMonthDateFns,
  getWeekYear as getWeekYearDateFns,
  isAfter as isAfterDateFns,
  isBefore as isBeforeDateFns,
  isEqual as isEqualDateFns,
  isSameWeek as isSameWeekDateFns,
  isThisWeek as isThisWeekDateFns,
  lastDayOfWeek as lastDayOfWeekDateFns,
  parse as parseDateFns,
  setDay as setDayDateFns,
  setWeek as setWeekDateFns,
  setWeekYear as setWeekYearDateFns,
  startOfWeek as startOfWeekDateFns,
  startOfWeekYear as startOfWeekYearDateFns,
} from 'date-fns';
import { de, enGB } from 'date-fns/locale';

// =====================================
// = Default Locale Helper
// =====================================

let defaultLocale: Locale = de;

export function getLocale(localeId?: string) {
  if (!localeId) {
    return defaultLocale;
  }
  return localeId.startsWith('de') ? de : enGB;
}

export function setDefaultLocale(localeId: string) {
  defaultLocale = getLocale(localeId);
}

function buildOptions<T>(options: T): T {
  return { locale: getLocale(), ...(options || ({} as any)) };
}

// =====================================
// = New Date Functions
// =====================================

export const INVALID_DATE = new Date(NaN);

export function isBeforeOrEqual(date: Date | number, dateToCompare: Date | number): boolean {
  return isBeforeDateFns(date, dateToCompare) || isEqualDateFns(date, dateToCompare);
}

export function isAfterOrEqual(date: Date | number, dateToCompare: Date | number): boolean {
  return isAfterDateFns(date, dateToCompare) || isEqualDateFns(date, dateToCompare);
}

export function parseHumanInput(value: any): Date | null {
  // We have no way using the native JS Date to set the parse format or locale, so we ignore these
  // parameters.
  if (typeof value === 'number') {
    return new Date(value);
  }
  if (!value) {
    return null;
  }

  const stringValue = `${value}`.trim();
  const dateParserExact = /^(\d+)[\.\/ ](\d+)[\.\/ ](\d+)$/;
  const dateParserFuzzy = /^(\d{2})(\d{2})(\d{2,4})$/;
  const match = stringValue.match(dateParserExact) || stringValue.match(dateParserFuzzy);
  if (match) {
    const day = +match[1];
    if (day > 31) {
      return INVALID_DATE;
    }

    const month = +match[2] - 1;
    if (month > 11) {
      return INVALID_DATE;
    }

    let year;
    if (match[3].length <= 2) {
      year = +match[3];

      const currentYear = parseHumanInput.currentYear;
      const currentCentury = Math.round(currentYear / 100) * 100;
      const difference = year - (currentYear - currentCentury);
      year = year + currentCentury;
      // Wenn es bei gleichem Jahrhundert 10 Jahre in der Zukunft wäre, nehmen wir das letzte Jahrhundert.
      if (difference > 10) {
        year = year - 100;
      }
    } else {
      year = +match[3];
    }
    return new Date(year, month, day);
  }

  return INVALID_DATE;
}
parseHumanInput.currentYear = new Date().getFullYear();

// =====================================
// = Option Wrappers
// =====================================

export function differenceInCalendarWeeks(
  dateLeft: Date | number,
  dateRight: Date | number,
  options?: {
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  }
): number {
  return differenceInCalendarWeeksDateFns(dateLeft, dateRight, buildOptions(options));
}

export function eachWeekOfInterval(
  interval: Interval,
  options?: {
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  }
): Date[] {
  return eachWeekOfIntervalDateFns(interval, buildOptions(options));
}

export function endOfWeek(
  date: Date | number,
  options?: {
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  }
): Date {
  return endOfWeekDateFns(date, buildOptions(options));
}

export function format(
  date: Date | number,
  // tslint:disable-next-line: no-shadowed-variable
  format: string,
  options?: {
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    firstWeekContainsDate?: number;
    useAdditionalWeekYearTokens?: boolean;
    useAdditionalDayOfYearTokens?: boolean;
  }
): string {
  return formatDateFns(date, format, buildOptions(options));
}

export function formatDistance(
  date: Date | number,
  baseDate: Date | number,
  options?: {
    includeSeconds?: boolean;
    addSuffix?: boolean;
    locale?: Locale;
  }
): string {
  return formatDistanceDateFns(date, baseDate, buildOptions(options));
}

export function formatDistanceStrict(
  date: Date | number,
  baseDate: Date | number,
  options?: {
    addSuffix?: boolean;
    unit?: 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year';
    roundingMethod?: 'floor' | 'ceil' | 'round';
    locale?: Locale;
  }
): string {
  return formatDistanceStrictDateFns(date, baseDate, buildOptions(options));
}

export function formatDistanceToNow(
  date: Date | number,
  options?: {
    includeSeconds?: boolean;
    addSuffix?: boolean;
    locale?: Locale;
  }
): string {
  return formatDistanceToNowDateFns(date, buildOptions(options));
}

export function formatRelative(
  date: Date | number,
  baseDate: Date | number,
  options?: {
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  }
): string {
  return formatRelativeDateFns(date, baseDate, buildOptions(options));
}

export function getWeek(
  date: Date | number,
  options?: {
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  }
): number {
  return getWeekDateFns(date, buildOptions(options));
}

export function getWeekOfMonth(
  date: Date | number,
  options?: {
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  }
): number {
  return getWeekOfMonthDateFns(date, buildOptions(options));
}

export function getWeeksInMonth(
  date: Date | number,
  options?: {
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  }
): number {
  return getWeeksInMonthDateFns(date, buildOptions(options));
}

export function getWeekYear(
  date: Date | number,
  options?: {
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  }
): number {
  return getWeekYearDateFns(date, buildOptions(options));
}

export function isSameWeek(
  dateLeft: Date | number,
  dateRight: Date | number,
  options?: {
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  }
): boolean {
  return isSameWeekDateFns(dateLeft, dateRight, buildOptions(options));
}

export function isThisWeek(
  date: Date | number,
  options?: {
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  }
): boolean {
  return isThisWeekDateFns(date, buildOptions(options));
}

export function lastDayOfWeek(
  date: Date | number,
  options?: {
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  }
): Date {
  return lastDayOfWeekDateFns(date, buildOptions(options));
}

export function parse(
  dateString: string,
  formatString: string,
  backupDate: Date | number,
  options?: {
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    useAdditionalWeekYearTokens?: boolean;
    useAdditionalDayOfYearTokens?: boolean;
  }
): Date {
  return parseDateFns(dateString, formatString, backupDate, buildOptions(options));
}

export function setDay(
  date: Date | number,
  day: number,
  options?: {
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  }
): Date {
  return setDayDateFns(date, day, buildOptions(options));
}

export function setWeek(
  date: Date | number,
  week: number,
  options?: {
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  }
): Date {
  return setWeekDateFns(date, week, buildOptions(options));
}

export function setWeekYear(
  date: Date | number,
  week: number,
  options?: {
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  }
): Date {
  return setWeekYearDateFns(date, week, buildOptions(options));
}

export function startOfWeek(
  date: Date | number,
  options?: {
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  }
): Date {
  return startOfWeekDateFns(date, buildOptions(options));
}

export function startOfWeekYear(
  date: Date | number,
  options?: {
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  }
): Date {
  return startOfWeekYearDateFns(date, buildOptions(options));
}

// =====================================
// = Reexports
// =====================================

export {
  Interval,
  Locale,
  addBusinessDays,
  addDays,
  addHours,
  addISOWeekYears,
  addMilliseconds,
  addMinutes,
  addMonths,
  addQuarters,
  addSeconds,
  addWeeks,
  addYears,
  areIntervalsOverlapping,
  closestIndexTo,
  closestTo,
  compareAsc,
  compareDesc,
  differenceInBusinessDays,
  differenceInCalendarDays,
  differenceInCalendarISOWeekYears,
  differenceInCalendarISOWeeks,
  differenceInCalendarMonths,
  differenceInCalendarQuarters,
  // differenceInCalendarWeeks,
  differenceInCalendarYears,
  differenceInDays,
  differenceInHours,
  differenceInISOWeekYears,
  differenceInMilliseconds,
  differenceInMinutes,
  differenceInMonths,
  differenceInQuarters,
  differenceInSeconds,
  differenceInWeeks,
  differenceInYears,
  eachDayOfInterval,
  // eachWeekOfInterval,
  eachWeekendOfInterval,
  eachWeekendOfMonth,
  eachWeekendOfYear,
  endOfDay,
  endOfDecade,
  endOfHour,
  endOfISOWeek,
  endOfISOWeekYear,
  endOfMinute,
  endOfMonth,
  endOfQuarter,
  endOfSecond,
  endOfToday,
  endOfTomorrow,
  // endOfWeek,
  endOfYear,
  endOfYesterday,
  // format,
  // formatDistance,
  // formatDistanceStrict,
  // formatDistanceToNow,
  // formatRelative,
  fromUnixTime,
  getDate,
  getDay,
  getDayOfYear,
  getDaysInMonth,
  getDaysInYear,
  getDecade,
  getHours,
  getISODay,
  getISOWeek,
  getISOWeekYear,
  getISOWeeksInYear,
  getMilliseconds,
  getMinutes,
  getMonth,
  getOverlappingDaysInIntervals,
  getQuarter,
  getSeconds,
  getTime,
  getUnixTime,
  // getWeek,
  // getWeekOfMonth,
  // getWeekYear,
  // getWeeksInMonth,
  getYear,
  isAfter,
  isBefore,
  isDate,
  isEqual,
  isFirstDayOfMonth,
  isFriday,
  isFuture,
  isLastDayOfMonth,
  isLeapYear,
  isMonday,
  isPast,
  isSameDay,
  isSameHour,
  isSameISOWeek,
  isSameISOWeekYear,
  isSameMinute,
  isSameMonth,
  isSameQuarter,
  isSameSecond,
  // isSameWeek,
  isSameYear,
  isSaturday,
  isSunday,
  isThisHour,
  isThisISOWeek,
  isThisMinute,
  isThisMonth,
  isThisQuarter,
  isThisSecond,
  // isThisWeek,
  isThisYear,
  isThursday,
  isToday,
  isTomorrow,
  isTuesday,
  isValid,
  isWednesday,
  isWeekend,
  isWithinInterval,
  isYesterday,
  lastDayOfDecade,
  lastDayOfISOWeek,
  lastDayOfISOWeekYear,
  lastDayOfMonth,
  lastDayOfQuarter,
  // lastDayOfWeek,
  lastDayOfYear,
  lightFormat,
  max,
  maxTime,
  min,
  minTime,
  // parse,
  parseISO,
  roundToNearestMinutes,
  setDate,
  // setDay,
  setDayOfYear,
  setHours,
  setISODay,
  setISOWeek,
  setISOWeekYear,
  setMilliseconds,
  setMinutes,
  setMonth,
  setQuarter,
  setSeconds,
  // setWeek,
  // setWeekYear,
  setYear,
  startOfDay,
  startOfDecade,
  startOfHour,
  startOfISOWeek,
  startOfISOWeekYear,
  startOfMinute,
  startOfMonth,
  startOfQuarter,
  startOfSecond,
  startOfToday,
  startOfTomorrow,
  // startOfWeek,
  // startOfWeekYear,
  startOfYear,
  startOfYesterday,
  subDays,
  subHours,
  subISOWeekYears,
  subMilliseconds,
  subMinutes,
  subMonths,
  subQuarters,
  subSeconds,
  subWeeks,
  subYears,
  toDate,
} from 'date-fns';
