import { Inject, Injectable, LOCALE_ID } from '@angular/core';

import { InterpolationParams, MessageFormat } from './message-format';
import { Translations } from './translations';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private _mf: MessageFormat;
  private _compiled = new Map<string, (params?: InterpolationParams, plurVarValue?: number) => string>();

  constructor(@Inject(LOCALE_ID) locale: string) {
    this._mf = new MessageFormat(locale);
  }

  /**
   * Returns a translation instantly from the internal state of loaded translation.
   * All rules regarding the current language, the preferred language of even fallback languages will be used except any promise handling.
   */
  public localize(locKey: string, params?: { [key: string]: any }) {
    let compiled = this._compiled.get(locKey);
    if (!compiled) {
      const messageTemplate = Translations.get(locKey);
      if (!messageTemplate) {
        return locKey;
      }
      compiled = this._mf.compile(messageTemplate);
      this._compiled.set(locKey, compiled);
    }

    return compiled(params);
  }
}
