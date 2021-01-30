export interface MessageFormatFunction<T> {
  parseParams(paramStr: string, locale: string, mf: MessageFormat): T;
  execute(value: any, parsedParams: T, interpolations: InterpolationParams, locale: string, plurVarValue?: number): string;
}

class NumberFunction implements MessageFormatFunction<string> {
  public parseParams(paramStr: string): string {
    return paramStr;
  }
  public execute(value: any, parsedParams: string): string {
    switch (parsedParams) {
      case 'percent':
        return `${value * 100}%`;
      default:
        return value;
    }
  }
}

interface SelectParamsParsed {
  [key: string]: (params?: InterpolationParams, plurVarValue?: number) => string;
}

abstract class CaseFunctionBase {
  protected parseCases(paramStr: string, locale: string, mf: MessageFormat): SelectParamsParsed {
    const cases: SelectParamsParsed = {};

    let currentCase = '';
    let currentText = '';
    const stack: string[] = [];
    let escape = false;
    // =1 {eins} other {sub {var, select, =1 {eins} other {was anders}} select}
    for (let i = 0; i < paramStr.length; i++) {
      if (!paramStr.hasOwnProperty(i)) {
        continue;
      }
      const c = paramStr[i];

      if (!stack.length) {
        if (c === '{') {
          stack.push('{');
          continue;
        }
        currentCase += c;
      } else {
        if (c === "'") {
          if (!escape && paramStr[i + 1] === "'") {
            currentText += "'";
            ++i;
            continue;
          }
          escape = !escape;
        } else if (escape) {
          currentText += c;
        } else if (c === '{') {
          stack.push('{');
          currentText += c;
        } else if (c === '}') {
          stack.pop();
          if (stack.length === 0) {
            cases[currentCase.trim()] = mf.compile(currentText, locale);
            currentText = '';
            currentCase = '';
            continue;
          }
          currentText += c;
        } else {
          currentText += c;
        }
      }
    }

    if (currentCase || currentText) {
      cases[currentCase.trim()] = mf.compile(currentText, locale);
    }

    return cases;
  }
}

class SelectFunction extends CaseFunctionBase implements MessageFormatFunction<SelectParamsParsed> {
  public parseParams(paramStr: string, locale: string, mf: MessageFormat): SelectParamsParsed {
    return super.parseCases(paramStr, locale, mf);
  }
  public execute(
    value: any,
    parsedParams: SelectParamsParsed,
    interpolations: InterpolationParams,
    _locale: string,
    plurVarValue?: number
  ): string {
    const caze = parsedParams[value] || parsedParams.other;
    return caze(interpolations, plurVarValue);
  }
}
interface PluralParamsParsed {
  offset: number;
  cases: {
    [key: string]: (params?: InterpolationParams, plurVarValue?: number) => string;
  };
}

class PluralFunction extends CaseFunctionBase {
  public parseParams(paramStr: string, locale: string, mf: MessageFormat): PluralParamsParsed {
    let offset = 0;
    if (paramStr.startsWith('offset:')) {
      const firstSpacePos = paramStr.indexOf(' ');
      offset = +paramStr.substring(7, firstSpacePos);
      paramStr = paramStr.substr(firstSpacePos);
    }
    return {
      offset: offset,
      cases: super.parseCases(paramStr, locale, mf),
    };
  }

  public execute(value: any, parsedParams: PluralParamsParsed, interpolations: InterpolationParams, locale: string): string {
    const adjustedValue = value - parsedParams.offset;
    const plural = new Intl.PluralRules(locale).select(adjustedValue);
    const func = parsedParams.cases[`=${value}`] || parsedParams.cases[plural] || parsedParams.cases.other;
    return func(interpolations, adjustedValue);
  }
}

class SelectOrdinalFunction extends CaseFunctionBase implements MessageFormatFunction<SelectParamsParsed> {
  public parseParams(paramStr: string, locale: string, mf: MessageFormat): SelectParamsParsed {
    return super.parseCases(paramStr, locale, mf);
  }
  public execute(value: any, parsedParams: SelectParamsParsed, interpolations: InterpolationParams, locale: string): string {
    const caze = new Intl.PluralRules(locale, {
      type: 'ordinal',
    }).select(value);
    const func = parsedParams[caze] || parsedParams.other;
    return func(interpolations, value);
  }
}

export class MessageFormat {
  constructor(private defaultLocale: string) {}
  private functions: { [key: string]: MessageFormatFunction<any> } = {
    select: new SelectFunction(),
    selectordinal: new SelectOrdinalFunction(),
    plural: new PluralFunction(),
    number: new NumberFunction(),
  };

  public compile(
    translation: string,
    locale: string = this.defaultLocale
  ): (params?: InterpolationParams, plurVarValue?: number) => string {
    const ast = this.parseText(translation, locale);
    return (params, plurVarValue) => {
      let text = '';
      for (const token of ast) {
        switch (token.type) {
          case 'text':
            text += token.text;
            break;
          case 'var':
            text += params[token.var];
            break;
          case 'plurNum':
            text += plurVarValue !== undefined ? new Intl.NumberFormat(locale).format(plurVarValue) : '#';
            break;
          case 'func':
            text += this.functions[token.func].execute(params[token.var], token.data, params, locale, plurVarValue);
            break;
        }
      }

      return text;
    };
  }

  private parseText(translation: string, locale: string): Token[] {
    const tokens: Token[] = [];

    let currentText = '';
    const stack: string[] = [];
    let escape = false;
    for (let i = 0; i < translation.length; i++) {
      if (!translation.hasOwnProperty(i)) {
        continue;
      }
      const c = translation[i];

      if (c === "'") {
        if (translation[i + 1] === "'") {
          currentText += "'";
          ++i;
          continue;
        }
        if (!escape) {
          const nextChar = translation[i + 1];
          escape = nextChar === '{' || nextChar === '}' || nextChar === '#';
          if (!escape) {
            currentText += "'";
          }
        } else {
          escape = false;
        }
      } else if (escape) {
        currentText += c;
      } else if (c === '{') {
        if (stack.length === 0) {
          tokens.push({
            type: 'text',
            text: currentText,
          });
          currentText = '';
        }
        stack.push('{');
        currentText += c;
      } else if (c === '}') {
        currentText += c;
        stack.pop();
        if (stack.length === 0) {
          tokens.push(this.parseExpression(currentText, locale));
          currentText = '';
        }
      } else if (c === '#' && stack.length === 0) {
        if (currentText) {
          tokens.push({
            type: 'text',
            text: currentText,
          });
          currentText = '';
        }
        tokens.push({
          type: 'plurNum',
        });
      } else {
        currentText += c;
      }
    }

    if (currentText) {
      tokens.push({
        type: 'text',
        text: currentText,
      });
    }

    return tokens;
  }

  private parseExpression(funcStr: string, locale: string): Token {
    const regex = /^\{([^,]+)(?:,([^,]+)(?:,(.*))?)?\}$/;
    const matches = regex.exec(funcStr);
    if (!matches) {
      throw new Error(`Unknown expression '${funcStr}'`);
    }

    const varName = matches[1].trim();
    const funcName = matches[2] ? matches[2].trim() : null;
    const paramStr = matches[3] ? matches[3].trim() : null;
    if (!funcName) {
      return {
        type: 'var',
        var: varName,
      };
    }

    const func = this.functions[funcName];
    if (!func) {
      throw new Error(`Unknow function '${funcName}'`);
    }
    return {
      type: 'func',
      var: varName,
      func: funcName,
      data: func.parseParams(paramStr, locale, this),
    };
  }
}

export interface InterpolationParams {
  [key: string]: any;
}
type Token = TextToken | VarToken | FuncToken | PlurNumToken;

interface TextToken {
  type: 'text';
  text: string;
}

interface VarToken {
  type: 'var';
  var: string;
}

interface PlurNumToken {
  type: 'plurNum';
}

interface FuncToken {
  type: 'func';
  var: string;
  func: string;
  data: any;
}
