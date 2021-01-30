import { isCompoundKey, isContainerKey, localizeServerKey, handleInputStr, handleInputContainerStr } from './server-key';
import { TranslateService } from './translate.service';
import { Translations } from './translations';

describe('i18n', () => {
  Translations.set({
    'test.validation.WertMussZwischenLiegen': 'Feld {0} muss Wert zwischen {1} und {2} haben.',
    'kunde.KundeSeit': 'Kunde seit',
    'asdf.XY': 'xy',
    'global.spanne.von': 'von',
    'test.Arbeitsstunden': 'Arbeitsstunden: {0}',
    'a.test012': 'x "{0}" "{1}" "{2}"',
    'test.Wert1': 'Wert1',
  });
  const localizer = new TranslateService('de-DE');

  it('localizeServerKey', () => {
    expect(localizeServerKey(localizer, 'test.validation.WertMussZwischenLiegen<0:[DsgvoZustimmungAb]><1:1900><2:2999>')).toBe(
      'Feld DsgvoZustimmungAb muss Wert zwischen 1900 und 2999 haben.'
    );

    expect(localizeServerKey(localizer, 'test.validation.WertMussZwischenLiegen<0:{kunde.KundeSeit}><1:1900><2:2999>')).toBe(
      'Feld Kunde seit muss Wert zwischen 1900 und 2999 haben.'
    );

    expect(localizeServerKey(localizer, 'a.test012<{test.Arbeitsstunden<7>, [ ], global.spanne.von}><0><9999,99>')).toBe(
      'x "Arbeitsstunden: 7 von" "0" "9999,99"'
    );

    expect(localizeServerKey(localizer, '{test.Arbeitsstunden<{asdf.XY, [ , ]}>, [ ], global.spanne.von}')).toBe(
      'Arbeitsstunden: xy ,  von'
    );
  });

  it('isContainerKey', () => {
    expect(isContainerKey('{asdf.XY, [ , ]}')).toBe(true);
    expect(isContainerKey('{test.Arbeitsstunden<{asdf.XY, [ , ]}>, [ ], global.spanne.von}')).toBe(true);

    expect(isContainerKey('test.validation.WertMussZwischenLiegen<0:[DsgvoZustimmungAb]><1:1900><2:2999>')).toBe(false);
    expect(isContainerKey('system.Asdf')).toBe(false);
    expect(isContainerKey('system.Asdf<{asdf.XY}>')).toBe(false);
  });

  it('isCompoundKey', () => {
    expect(isCompoundKey('asdf.XY, [ , ]')).toBe(true);
    expect(isCompoundKey('test.Arbeitsstunden<{asdf.XY, [ , ]}>, [ ], global.spanne.von')).toBe(true);

    expect(isCompoundKey('test.validation.WertMussZwischenLiegen<0:[DsgvoZustimmungAb]><1:1900><2:2999>')).toBe(false);
    expect(isCompoundKey('system.Asdf')).toBe(false);
    expect(isCompoundKey('system.Asdf<{asdf.XY}>')).toBe(false);
  });

  it('handleInputStr', () => {
    expect(handleInputStr(localizer, '<{test.Wert1, [ ], global.spanne.von}><0><9999,99><[Asdf]>')).toEqual({
      0: 'Wert1 von',
      1: '0',
      2: '9999,99',
      3: 'Asdf',
    });

    expect(handleInputStr(localizer, '<a:{test.Wert1, [ ], global.spanne.von}><b:0><c:[Asdf]>')).toEqual({
      a: 'Wert1 von',
      b: '0',
      c: 'Asdf',
    });
  });

  it('handleInputContainerStr', () => {
    expect(handleInputContainerStr(localizer, '{test.Arbeitsstunden<{asdf.XY, [, Test]}>, [ ], global.spanne.von}')).toEqual(
      'Arbeitsstunden: xy, Test von'
    );
  });
});
