import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './translate.service';

export function isDefined(value: any): boolean {
  return typeof value !== 'undefined' && value !== null;
}

@Pipe({
  name: 'translate',
  pure: true,
})
export class TranslatePipe implements PipeTransform {
  constructor(private ts: TranslateService) {}

  transform(locKey: string, ...args: any[]): any {
    if (!locKey || !locKey.length) {
      return locKey;
    }

    const interpolateParams = getTranslateParams(args);
    const result = this.ts.localize(locKey, interpolateParams);
    return result;
  }
}

function getTranslateParams(args: any[]) {
  const arg0 = args[0];
  let interpolateParams: object;
  if (isDefined(arg0) && args.length) {
    if (typeof arg0 === 'string' && args[0].length) {
      // we accept objects written in the template such as {n:1}, {'n':1}, {n:'v'}
      // which is why we might need to change it to real JSON objects such as {"n":1} or {"n":"v"}
      const validArgs: string = arg0.replace(/(\')?([a-zA-Z0-9_]+)(\')?(\s)?:/g, '"$2":').replace(/:(\s)?(\')(.*?)(\')/g, ':"$3"');
      try {
        interpolateParams = JSON.parse(validArgs);
      } catch (e) {
        throw new SyntaxError(`Wrong parameter in TranslatePipe. Expected a valid Object, received: ${arg0}`);
      }
    } else if (typeof arg0 === 'object' && !Array.isArray(arg0)) {
      interpolateParams = arg0;
    }
  }
  return interpolateParams;
}
