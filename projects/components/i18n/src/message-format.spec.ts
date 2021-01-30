import { MessageFormat } from './message-format';

describe('MessageFormat', () => {
  describe('compile', () => {
    it('should echo translation with only text', () => {
      const mf = new MessageFormat('en-US');
      const compiler = mf.compile('Hello World!');
      expect(compiler()).toBe('Hello World!');
    });

    it('should replace constiables', () => {
      const mf = new MessageFormat('en-US');
      const compiler = mf.compile('Hello {name}!');
      expect(compiler({ name: 'Test' })).toBe('Hello Test!');
    });

    it('should not replace constiables in quotes', () => {
      const mf = new MessageFormat('en-US');
      const compiler = mf.compile("Hello '{name}'!");
      expect(compiler({ name: 'Test' })).toBe('Hello {name}!');
    });

    it('should handle escaped quotes', () => {
      const mf = new MessageFormat('en-US');
      const compiler = mf.compile("Hello ''{name}''!");
      expect(compiler({ name: 'Test' })).toBe("Hello 'Test'!");
    });

    it('should handle escaped quotes in a quote', () => {
      const mf = new MessageFormat('en-US');
      const compiler = mf.compile("This '{isn''t}' obvious");
      expect(compiler()).toBe("This {isn't} obvious");
    });

    it('should replace consecutive single quotes with one single quote', () => {
      const mf = new MessageFormat('en-US');
      const compiler = mf.compile("Anna''s house a'{''''b'");
      expect(compiler()).toBe("Anna's house a{''b");
    });

    it('should handle {const, number}', () => {
      const mf = new MessageFormat('en-US');
      const compiler = mf.compile('{const, number}');
      expect(compiler({ const: 99 })).toBe('99');
    });

    it('should handle {const, number, percent}', () => {
      const mf = new MessageFormat('en-US');
      const compiler = mf.compile('{const, number, percent}');
      expect(compiler({ const: 0.99 })).toBe('99%');
    });

    it('should handle selects (string match case)', () => {
      const mf = new MessageFormat('en-US');
      const compiler = mf.compile('{const, select, a {A} other {B}}');
      expect(compiler({ const: 'a' })).toBe('A');
    });

    it('should handle selects (other case)', () => {
      const mf = new MessageFormat('en-US');
      const compiler = mf.compile('{const, select, a {A} other {B}}');
      expect(compiler({ const: 'c' })).toBe('B');
    });

    // Google Closure tests ( https://raw.githubusercontent.com/google/closure-library/master/closure/goog/i18n/messageformat_test.js )
    function assertEquals(expected: string, got: string) {
      expect(got).toBe(expected);
    }

    it('EmptyPattern', () => {
      const fmt = new MessageFormat('en-US').compile('');
      assertEquals('', fmt({}));
    });

    // it('MissingLeftCurlyBrace', () => {
    //     const err = assertThrows(function() {
    //         const fmt = new MessageFormat('en-US').compile("''{}}");
    //         fmt({});
    //     });
    //     assertEquals('Assertion failed: No matching { for }.', err.message);
    // });

    // it('TooManyLeftCurlyBraces', () => {
    //     const err = assertThrows(function() {
    //         const fmt = new MessageFormat('en-US').compile('{} {');
    //         fmt({});
    //     });
    //     assertEquals('Assertion failed: There are mismatched { or } in the pattern.', err.message);
    // });

    it('SimpleReplacement', () => {
      const fmt = new MessageFormat('en-US').compile('New York in {SEASON} is nice.');
      assertEquals('New York in the Summer is nice.', fmt({ SEASON: 'the Summer' }));
    });

    it('SimpleSelect', () => {
      const fmt = new MessageFormat('en-US').compile(
        '{GENDER, select,' +
          'male {His} ' +
          'female {Her} ' +
          'other {Its}}' +
          ' bicycle is {GENDER, select, male {blue} female {red} other {green}}.'
      );

      assertEquals('His bicycle is blue.', fmt({ GENDER: 'male' }));
      assertEquals('Her bicycle is red.', fmt({ GENDER: 'female' }));
      assertEquals('Its bicycle is green.', fmt({ GENDER: 'other' }));
      assertEquals('Its bicycle is green.', fmt({ GENDER: 'whatever' }));
    });

    it('SimplePlural', () => {
      const fmt = new MessageFormat('en-US').compile(
        'I see {NUM_PEOPLE, plural, offset:1 ' +
          '=0 {no one at all in {PLACE}.} ' +
          '=1 {{PERSON} in {PLACE}.} ' +
          'one {{PERSON} and one other person in {PLACE}.} ' +
          'other {{PERSON} and # other people in {PLACE}.}}'
      );

      assertEquals('I see no one at all in Belgrade.', fmt({ NUM_PEOPLE: 0, PLACE: 'Belgrade' }));
      assertEquals('I see Markus in Berlin.', fmt({ NUM_PEOPLE: 1, PERSON: 'Markus', PLACE: 'Berlin' }));
      assertEquals('I see Mark and one other person in Athens.', fmt({ NUM_PEOPLE: 2, PERSON: 'Mark', PLACE: 'Athens' }));
      assertEquals('I see Cibu and 99 other people in the cubes.', fmt({ NUM_PEOPLE: 100, PERSON: 'Cibu', PLACE: 'the cubes' }));
    });

    it('SimplePluralNoOffset', () => {
      const fmt = new MessageFormat('en-US').compile(
        'I see {NUM_PEOPLE, plural, ' +
          '=0 {no one at all} ' +
          '=1 {{PERSON}} ' +
          'one {{PERSON} and one other person} ' +
          'other {{PERSON} and # other people}} in {PLACE}.'
      );

      assertEquals('I see no one at all in Belgrade.', fmt({ NUM_PEOPLE: 0, PLACE: 'Belgrade' }));
      assertEquals('I see Markus in Berlin.', fmt({ NUM_PEOPLE: 1, PERSON: 'Markus', PLACE: 'Berlin' }));
      assertEquals('I see Mark and 2 other people in Athens.', fmt({ NUM_PEOPLE: 2, PERSON: 'Mark', PLACE: 'Athens' }));
      assertEquals('I see Cibu and 100 other people in the cubes.', fmt({ NUM_PEOPLE: 100, PERSON: 'Cibu', PLACE: 'the cubes' }));
    });

    it('SelectNestedInPlural', () => {
      const fmt = new MessageFormat('en-US').compile(
        '{CIRCLES, plural, ' +
          'one {{GENDER, select, ' +
          '  female {{WHO} added you to her circle} ' +
          '  other  {{WHO} added you to his circle}}} ' +
          'other {{GENDER, select, ' +
          '  female {{WHO} added you to her # circles} ' +
          '  other  {{WHO} added you to his # circles}}}}'
      );

      assertEquals('Jelena added you to her circle', fmt({ GENDER: 'female', WHO: 'Jelena', CIRCLES: 1 }));
      assertEquals('Milan added you to his 1,234 circles', fmt({ GENDER: 'male', WHO: 'Milan', CIRCLES: 1234 }));
    });

    it('PluralNestedInSelect', () => {
      // Added offset just for testing purposes. It doesn't make sense
      // to have it otherwise.
      const fmt = new MessageFormat('en-US').compile(
        '{GENDER, select, ' +
          'female {{NUM_GROUPS, plural, ' +
          '  one {{WHO} added you to her group} ' +
          '  other {{WHO} added you to her # groups}}} ' +
          'other {{NUM_GROUPS, plural, offset:1' +
          '  one {{WHO} added you to his group} ' +
          '  other {{WHO} added you to his # groups}}}}'
      );

      assertEquals('Jelena added you to her group', fmt({ GENDER: 'female', WHO: 'Jelena', NUM_GROUPS: 1 }));
      assertEquals('Milan added you to his 1,233 groups', fmt({ GENDER: 'male', WHO: 'Milan', NUM_GROUPS: 1234 }));
    });

    it('LiteralOpenCurlyBrace', () => {
      const fmt = new MessageFormat('en-US').compile("Anna's house" + " has '{0} and # in the roof' and {NUM_COWS} cows.");
      assertEquals("Anna's house has {0} and # in the roof and 5 cows.", fmt({ NUM_COWS: '5' }));
    });

    it('LiteralClosedCurlyBrace', () => {
      const fmt = new MessageFormat('en-US').compile("Anna's house" + " has '{'0'} and # in the roof' and {NUM_COWS} cows.");
      assertEquals("Anna's house has {0} and # in the roof and 5 cows.", fmt({ NUM_COWS: '5' }));
    });

    it('LiteralPoundSign', () => {
      const fmt = new MessageFormat('en-US').compile("Anna's house" + " has '{0}' and '# in the roof' and {NUM_COWS} cows.");
      assertEquals("Anna's house has {0} and # in the roof and 5 cows.", fmt({ NUM_COWS: '5' }));
    });

    it('NoLiteralsForSingleQuotes', () => {
      const fmt = new MessageFormat('en-US').compile("Anna's house" + " 'has {NUM_COWS} cows'.");
      assertEquals("Anna's house 'has 5 cows'.", fmt({ NUM_COWS: '5' }));
    });

    it('ConsecutiveSingleQuotesAreReplacedWithOneSingleQuote', () => {
      const fmt = new MessageFormat('en-US').compile("Anna''s house a'{''''b'");
      assertEquals("Anna's house a{''b", fmt({}));
    });

    it('ConsecutiveSingleQuotesBeforeSpecialCharDontCreateLiteral', () => {
      const fmt = new MessageFormat('en-US').compile("a''{NUM_COWS}'b");
      assertEquals("a'5'b", fmt({ NUM_COWS: '5' }));
    });

    it('SerbianSimpleSelect', () => {
      // stubs.set(goog.i18n.pluralRules, 'select', goog.i18n.pluralRules.beSelect_);

      const fmt = new MessageFormat('sr-RS').compile(
        '{GENDER, select, ' + 'female {Njen} other {Njegov}} bicikl je ' + '{GENDER, select, female {crven} other {plav}}.'
      );

      assertEquals('Njegov bicikl je plav.', fmt({ GENDER: 'male' }));
      assertEquals('Njen bicikl je crven.', fmt({ GENDER: 'female' }));
    });

    it('SerbianSimplePlural', () => {
      // stubs.set(goog.i18n.pluralRules, 'select', goog.i18n.pluralRules.beSelect_);

      const fmt = new MessageFormat('sr-RS').compile(
        'Ja {NUM_PEOPLE, plural, offset:1 ' +
          '=0 {ne vidim nikoga} ' +
          '=1 {vidim {PERSON}} ' +
          'one {vidim {PERSON} i jos # osobu} ' +
          'few {vidim {PERSON} i jos # osobe} ' +
          'many {vidim {PERSON} i jos # osoba} ' +
          'other {{PERSON} i jos # osoba}} ' +
          'u {PLACE}.'
      );

      assertEquals('Ja ne vidim nikoga u Beogradu.', fmt({ NUM_PEOPLE: 0, PLACE: 'Beogradu' }));
      assertEquals('Ja vidim Markusa u Berlinu.', fmt({ NUM_PEOPLE: 1, PERSON: 'Markusa', PLACE: 'Berlinu' }));
      assertEquals('Ja vidim Marka i jos 1 osobu u Atini.', fmt({ NUM_PEOPLE: 2, PERSON: 'Marka', PLACE: 'Atini' }));
      assertEquals('Ja vidim Petra i jos 3 osobe u muzeju.', fmt({ NUM_PEOPLE: 4, PERSON: 'Petra', PLACE: 'muzeju' }));
      // assertEquals('Ja vidim Cibua i jos 99 osoba u bazenu.', fmt({ NUM_PEOPLE: 100, PERSON: 'Cibua', PLACE: 'bazenu' }));
    });

    it('SerbianSimplePluralNoOffset', () => {
      // stubs.set(goog.i18n.pluralRules, 'select', goog.i18n.pluralRules.beSelect_);

      const fmt = new MessageFormat('sr-RS').compile(
        'Ja {NUM_PEOPLE, plural, ' +
          '=0 {ne vidim nikoga} ' +
          '=1 {vidim {PERSON}} ' +
          'one {vidim {PERSON} i jos # osobu} ' +
          'few {vidim {PERSON} i jos # osobe} ' +
          'many {vidim {PERSON} i jos # osoba} ' +
          'other {{PERSON} i jos # osoba}} ' +
          'u {PLACE}.'
      );

      assertEquals('Ja ne vidim nikoga u Beogradu.', fmt({ NUM_PEOPLE: 0, PLACE: 'Beogradu' }));
      assertEquals('Ja vidim Markusa u Berlinu.', fmt({ NUM_PEOPLE: 1, PERSON: 'Markusa', PLACE: 'Berlinu' }));
      assertEquals('Ja vidim Marka i jos 21 osobu u Atini.', fmt({ NUM_PEOPLE: 21, PERSON: 'Marka', PLACE: 'Atini' }));
      assertEquals('Ja vidim Petra i jos 3 osobe u muzeju.', fmt({ NUM_PEOPLE: 3, PERSON: 'Petra', PLACE: 'muzeju' }));
      // assertEquals('Ja vidim Cibua i jos 100 osoba u bazenu.', fmt({ NUM_PEOPLE: 100, PERSON: 'Cibua', PLACE: 'bazenu' }));
    });

    it('SerbianSelectNestedInPlural', () => {
      // stubs.set(goog.i18n.pluralRules, 'select', goog.i18n.pluralRules.beSelect_);
      // stubs.set(goog.i18n, 'NumberFormatSymbols', goog.i18n.NumberFormatSymbols_hr);

      const fmt = new MessageFormat('sr-RS').compile(
        '{CIRCLES, plural, ' +
          'one {{GENDER, select, ' +
          '  female {{WHO} vas je dodala u njen # kruzok} ' +
          '  other  {{WHO} vas je dodao u njegov # kruzok}}} ' +
          'few {{GENDER, select, ' +
          '  female {{WHO} vas je dodala u njena # kruzoka} ' +
          '  other  {{WHO} vas je dodao u njegova # kruzoka}}} ' +
          'many {{GENDER, select, ' +
          '  female {{WHO} vas je dodala u njenih # kruzoka} ' +
          '  other  {{WHO} vas je dodao u njegovih # kruzoka}}} ' +
          'other {{GENDER, select, ' +
          '  female {{WHO} vas je dodala u njenih # kruzoka} ' +
          '  other  {{WHO} vas je dodao u njegovih # kruzoka}}}}'
      );

      assertEquals('Jelena vas je dodala u njen 21 kruzok', fmt({ GENDER: 'female', WHO: 'Jelena', CIRCLES: 21 }));
      assertEquals('Jelena vas je dodala u njena 3 kruzoka', fmt({ GENDER: 'female', WHO: 'Jelena', CIRCLES: 3 }));
      assertEquals('Jelena vas je dodala u njenih 5 kruzoka', fmt({ GENDER: 'female', WHO: 'Jelena', CIRCLES: 5 }));
      assertEquals('Milan vas je dodao u njegovih 1.235 kruzoka', fmt({ GENDER: 'male', WHO: 'Milan', CIRCLES: 1235 }));
    });

    it('FallbackToOtherOptionInPlurals', () => {
      // Use Arabic plural rules since they have all six cases.
      // Only locale and numbers matter, the actual language of the message
      // does not.
      // stubs.set(goog.i18n.pluralRules, 'select', goog.i18n.pluralRules.arSelect_);

      const fmt = new MessageFormat('en-US').compile('{NUM_MINUTES, plural, ' + 'other {# minutes}}');

      // These numbers exercise all cases for the arabic plural rules.
      assertEquals('0 minutes', fmt({ NUM_MINUTES: 0 }));
      assertEquals('1 minutes', fmt({ NUM_MINUTES: 1 }));
      assertEquals('2 minutes', fmt({ NUM_MINUTES: 2 }));
      assertEquals('3 minutes', fmt({ NUM_MINUTES: 3 }));
      assertEquals('11 minutes', fmt({ NUM_MINUTES: 11 }));
      assertEquals('1.5 minutes', fmt({ NUM_MINUTES: 1.5 }));
    });

    it('PoundShowsNumberMinusOffsetInAllCases', () => {
      const fmt = new MessageFormat('en-US').compile('{SOME_NUM, plural, offset:1 ' + '=0 {#} =1 {#} =2 {#}one {#} other {#}}');

      assertEquals('-1', fmt({ SOME_NUM: '0' }));
      assertEquals('0', fmt({ SOME_NUM: '1' }));
      assertEquals('1', fmt({ SOME_NUM: '2' }));
      assertEquals('20', fmt({ SOME_NUM: '21' }));
    });

    it('SpecialCharactersInParamaterDontChangeFormat', () => {
      const fmt = new MessageFormat('en-US').compile('{SOME_NUM, plural,' + 'other {# {GROUP}}}');

      // Test pound sign.
      assertEquals('10 group#1', fmt({ SOME_NUM: '10', GROUP: 'group#1' }));
      // Test other special characters in parameters, like { and }.
      assertEquals('10 } {', fmt({ SOME_NUM: '10', GROUP: '} {' }));
    });

    // it('MissingOrInvalidPluralParameter', () => {
    //     const fmt = new MessageFormat('en-US').compile('{SOME_NUM, plural,' + 'other {result}}');

    //     // Key name doesn't match A != SOME_NUM.
    //     assertEquals('Undefined or invalid parameter - SOME_NUM', fmt({ A: '10' }));

    //     // Value is not a number.
    //     assertEquals('Undefined or invalid parameter - SOME_NUM', fmt({ SOME_NUM: 'Value' }));
    // });

    // it('MissingSelectParameter', () => {
    //     const fmt = new MessageFormat('en-US').compile('{GENDER, select,' + 'other {result}}');

    //     // Key name doesn't match A != GENDER.
    //     assertEquals('Undefined parameter - GENDER', fmt({ A: 'female' }));
    // });

    // it('MissingSimplePlaceholder', () => {
    //     const fmt = new MessageFormat('en-US').compile('{result}');

    //     // Key name doesn't match A != result.
    //     assertEquals('Undefined parameter - result', fmt({ A: 'none' }));
    // });

    // it('PluralWithIgnorePound', () => {
    //     const fmt = (new MessageFormat('en-US')).compile('{SOME_NUM, plural,' + 'other {# {GROUP}}}');

    //     // Test pound sign.
    //     assertEquals('# group#1', fmtIgnoringPound({ SOME_NUM: '10', GROUP: 'group#1' }));
    //     // Test other special characters in parameters, like { and }.
    //     assertEquals('# } {', fmtIgnoringPound({ SOME_NUM: '10', GROUP: '} {' }));
    // });

    // it('SimplePluralWithIgnorePound', () => {
    //     const fmt = (new MessageFormat('en-US')).compile(
    //         'I see {NUM_PEOPLE, plural, offset:1 ' +
    //             '=0 {no one at all in {PLACE}.} ' +
    //             '=1 {{PERSON} in {PLACE}.} ' +
    //             'one {{PERSON} and one other person in {PLACE}.} ' +
    //             'other {{PERSON} and # other people in {PLACE}.}}'
    //     );

    //     assertEquals(
    //         'I see Cibu and # other people in the cubes.',
    //         fmtIgnoringPound({ NUM_PEOPLE: 100, PERSON: 'Cibu', PLACE: 'the cubes' })
    //     );
    // });

    it('SimpleOrdinal', () => {
      const fmt = new MessageFormat('en-US').compile(
        '{NUM_FLOOR, selectordinal, ' +
          'one {Take the elevator to the #st floor.}' +
          'two {Take the elevator to the #nd floor.}' +
          'few {Take the elevator to the #rd floor.}' +
          'other {Take the elevator to the #th floor.}}'
      );

      assertEquals('Take the elevator to the 1st floor.', fmt({ NUM_FLOOR: 1 }));
      assertEquals('Take the elevator to the 2nd floor.', fmt({ NUM_FLOOR: 2 }));
      assertEquals('Take the elevator to the 3rd floor.', fmt({ NUM_FLOOR: 3 }));
      assertEquals('Take the elevator to the 4th floor.', fmt({ NUM_FLOOR: 4 }));
      assertEquals('Take the elevator to the 23rd floor.', fmt({ NUM_FLOOR: 23 }));
      // Esoteric example.
      assertEquals('Take the elevator to the 0th floor.', fmt({ NUM_FLOOR: 0 }));
    });

    // it('OrdinalWithNegativeValue', () => {
    //     const fmt = new MessageFormat('en-US').compile(
    //         '{NUM_FLOOR, selectordinal, ' +
    //             'one {Take the elevator to the #st floor.}' +
    //             'two {Take the elevator to the #nd floor.}' +
    //             'few {Take the elevator to the #rd floor.}' +
    //             'other {Take the elevator to the #th floor.}}'
    //     );

    //     try {
    //         fmt({ NUM_FLOOR: -2 });
    //     } catch (e) {
    //         assertEquals('Assertion failed: Argument index smaller than offset.', e.message);
    //         return;
    //     }
    //     fail('Expected an error to be thrown');
    // });

    // it('SimpleOrdinalWithIgnorePound', () => {
    //     const fmt = (new MessageFormat('en-US')).compile(
    //         '{NUM_FLOOR, selectordinal, ' +
    //             'one {Take the elevator to the #st floor.}' +
    //             'two {Take the elevator to the #nd floor.}' +
    //             'few {Take the elevator to the #rd floor.}' +
    //             'other {Take the elevator to the #th floor.}}'
    //     );

    //     assertEquals('Take the elevator to the #th floor.', fmtIgnoringPound({ NUM_FLOOR: 100 }));
    // });

    // it('MissingOrInvalidOrdinalParameter', () => {
    //     const fmt = new MessageFormat('en-US').compile('{SOME_NUM, selectordinal,' + 'other {result}}');

    //     // Key name doesn't match A != SOME_NUM.
    //     assertEquals('Undefined or invalid parameter - SOME_NUM', fmt({ A: '10' }));

    //     // Value is not a number.
    //     assertEquals('Undefined or invalid parameter - SOME_NUM', fmt({ SOME_NUM: 'Value' }));
    // });
  });
});
