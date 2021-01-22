import { INVALID_DATE, isAfterOrEqual, isBeforeOrEqual, parseHumanInput } from './date-fns';

describe('isBeforeOrEqual', () => {
  it('should work', () => {
    const before = new Date(2019, 0, 2, 13, 12, 10);
    const date = new Date(2019, 0, 2, 13, 12, 11);
    const equal = new Date(2019, 0, 2, 13, 12, 11);
    const after = new Date(2019, 0, 2, 13, 12, 12);

    expect(isBeforeOrEqual(before, date)).toBe(true);
    expect(isBeforeOrEqual(equal, date)).toBe(true);
    expect(isBeforeOrEqual(date, date)).toBe(true);
    expect(isBeforeOrEqual(after, date)).toBe(false);
  });
});

describe('isAfterOrEqual', () => {
  it('should work', () => {
    const before = new Date(2019, 0, 2, 13, 12, 10);
    const date = new Date(2019, 0, 2, 13, 12, 11);
    const equal = new Date(2019, 0, 2, 13, 12, 11);
    const after = new Date(2019, 0, 2, 13, 12, 12);

    expect(isAfterOrEqual(before, date)).toBe(false);
    expect(isAfterOrEqual(equal, date)).toBe(true);
    expect(isAfterOrEqual(date, date)).toBe(true);
    expect(isAfterOrEqual(after, date)).toBe(true);
  });
});

describe('parseHumanInput', () => {
  beforeEach(() => {
    (parseHumanInput as any).currentYear = 2020;
  });

  function buildDate(y: number, m: number, d: number) {
    return new Date(y, m - 1, d);
  }

  it('should accept 6 digits as ddmmyy, check for bounds and expand year', () => {
    expect(parseHumanInput('101192')).toEqual(buildDate(1992, 11, 10));
    expect(parseHumanInput('010516')).toEqual(buildDate(2016, 5, 1));

    // month out of bounds
    expect(parseHumanInput('011316')).toBe(INVALID_DATE);

    // day out of bounds
    expect(parseHumanInput('320516')).toBe(INVALID_DATE);

    // up to 10 years in the future -> use this century
    expect(parseHumanInput('010520')).toEqual(buildDate(2020, 5, 1));
    expect(parseHumanInput('010525')).toEqual(buildDate(2025, 5, 1));
    expect(parseHumanInput('010530')).toEqual(buildDate(2030, 5, 1));

    // year more than 10 years in the future -> use last century
    expect(parseHumanInput('010531')).toEqual(buildDate(1931, 5, 1));
    expect(parseHumanInput('010540')).toEqual(buildDate(1940, 5, 1));
    expect(parseHumanInput('010550')).toEqual(buildDate(1950, 5, 1));
    expect(parseHumanInput('010560')).toEqual(buildDate(1960, 5, 1));
    expect(parseHumanInput('010570')).toEqual(buildDate(1970, 5, 1));
    expect(parseHumanInput('010580')).toEqual(buildDate(1980, 5, 1));
    expect(parseHumanInput('010590')).toEqual(buildDate(1990, 5, 1));
    expect(parseHumanInput('010599')).toEqual(buildDate(1999, 5, 1));

    // test with different currentYear
    (parseHumanInput as any).currentYear = 2010;
    expect(parseHumanInput('010510')).toEqual(buildDate(2010, 5, 1));
    expect(parseHumanInput('010521')).toEqual(buildDate(1921, 5, 1));
  });

  it("should accept 7 digits as ddmmyyy, check for bounds but don't expand year", () => {
    expect(parseHumanInput('1011992')).toEqual(buildDate(992, 11, 10));
    expect(parseHumanInput('0105016')).toEqual(buildDate(16, 5, 1));

    // month out of bounds
    expect(parseHumanInput('0113016')).toBe(INVALID_DATE);

    // day out of bounds
    expect(parseHumanInput('3205016')).toBe(INVALID_DATE);
  });

  it('should accept 8 digits as ddmmyyyy and check for bounds', () => {
    expect(parseHumanInput('10111992')).toEqual(buildDate(1992, 11, 10));
    expect(parseHumanInput('01052016')).toEqual(buildDate(2016, 5, 1));

    // month out of bounds
    expect(parseHumanInput('0113016')).toBe(INVALID_DATE);

    // day out of bounds
    expect(parseHumanInput('3205016')).toBe(INVALID_DATE);
  });

  it("should accept '.' separated date", () => {
    expect(parseHumanInput('01.05.20')).toEqual(buildDate(2020, 5, 1));
    expect(parseHumanInput('01.05.530')).toEqual(buildDate(530, 5, 1));
    expect(parseHumanInput('01.05.1870')).toEqual(buildDate(1870, 5, 1));

    // month out of bounds
    expect(parseHumanInput('01.13.16')).toBe(INVALID_DATE);

    // day out of bounds
    expect(parseHumanInput('32.05.16')).toBe(INVALID_DATE);

    // up to 10 years in the future -> use this century
    expect(parseHumanInput('01.05.30')).toEqual(buildDate(2030, 5, 1));

    // year more than 10 years in the future -> use last century
    expect(parseHumanInput('01.05.31')).toEqual(buildDate(1931, 5, 1));
  });

  it("should accept '/' separated date", () => {
    expect(parseHumanInput('01/05/20')).toEqual(buildDate(2020, 5, 1));
    expect(parseHumanInput('01/05/530')).toEqual(buildDate(530, 5, 1));
    expect(parseHumanInput('01/05/1870')).toEqual(buildDate(1870, 5, 1));

    // month out of bounds
    expect(parseHumanInput('01/13/16')).toBe(INVALID_DATE);

    // day out of bounds
    expect(parseHumanInput('32/05/16')).toBe(INVALID_DATE);

    // up to 10 years in the future -> use this century
    expect(parseHumanInput('01/05/30')).toEqual(buildDate(2030, 5, 1));

    // year more than 10 years in the future -> use last century
    expect(parseHumanInput('01/05/31')).toEqual(buildDate(1931, 5, 1));
  });

  it("should accept ' ' separated date", () => {
    expect(parseHumanInput('01 05 20')).toEqual(buildDate(2020, 5, 1));
    expect(parseHumanInput('01 05 530')).toEqual(buildDate(530, 5, 1));
    expect(parseHumanInput('01 05 1870')).toEqual(buildDate(1870, 5, 1));

    // month out of bounds
    expect(parseHumanInput('01 13 16')).toBe(INVALID_DATE);

    // day out of bounds
    expect(parseHumanInput('32 05 16')).toBe(INVALID_DATE);

    // up to 10 years in the future -> use this century
    expect(parseHumanInput('01 05 30')).toEqual(buildDate(2030, 5, 1));

    // year more than 10 years in the future -> use last century
    expect(parseHumanInput('01 05 31')).toEqual(buildDate(1931, 5, 1));
  });
});
