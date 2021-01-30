export class Translations {
  private static _messages: { [key: string]: string } = {};

  /**
   * Manually sets an object of translations for a given language
   * after passing it through the compiler
   */
  public static set(translations: { [key: string]: string }, shouldMerge: boolean = false): void {
    if (shouldMerge) {
      this._messages = Object.assign({}, this._messages, translations);
    } else {
      this._messages = translations;
    }
  }

  public static get(locKey: string): string {
    return Translations._messages[locKey];
  }
}
