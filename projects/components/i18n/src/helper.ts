import { TranslateService } from './translate.service';

export function keyValuePairsToDictionary(keyValuePairs: { key: string; value: string }[]): { [key: string]: string } {
  const dict: { [key: string]: string } = {};
  for (const kvp of keyValuePairs) {
    dict[kvp.key] = kvp.value;
  }
  return dict;
}

export function translate<T extends {}>(ts: TranslateService, dict: T): T {
  const result: any = {};
  for (const dictKey of Object.keys(dict)) {
    result[dictKey] = ts.localize((dict as any)[dictKey]);
  }
  return result;
}
