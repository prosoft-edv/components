import { TranslateService } from './translate.service';
import { keyValuePairsToDictionary } from './helper';

export function localizeServerKey(localizer: TranslateService, localizationString: string): string {
  if (isContainerKey(localizationString)) {
    return handleInputContainerStr(localizer, localizationString);
  }
  if (isCompoundKey(localizationString)) {
    return handleInputContainerStr(localizer, `{${localizationString}}`);
  }

  const paramsIdx = localizationString.indexOf('<');
  if (paramsIdx !== -1) {
    const key = localizationString.substr(0, paramsIdx);
    const inputStr = localizationString.substr(paramsIdx);
    const inputs = handleInputStr(localizer, inputStr);
    return localizer.localize(key, inputs);
  }

  return localizer.localize(localizationString);
}

export function isContainerKey(localizationString: string): boolean {
  return localizationString.startsWith('{') && localizationString.endsWith('}');
}

export function isCompoundKey(localizationString: string): boolean {
  const concatinatorIdx = localizationString.indexOf(',');
  if (concatinatorIdx === -1) {
    return false;
  }

  let insideTextNode = false;
  let depth = 0;
  let maxDepth = 0;
  for (const c of localizationString) {
    if (c === '[') {
      insideTextNode = true;
    }
    if (c === ']') {
      insideTextNode = false;
    }
    if (!insideTextNode) {
      if (c === '<') {
        ++depth;
        if (depth > maxDepth) {
          maxDepth = depth;
        }
      }
      if (maxDepth && !depth) {
        return true;
      }
      if (c === '>') {
        --depth;
      }
    }
  }
  if (!maxDepth && concatinatorIdx !== -1) {
    return true;
  }
  return false;
}

// inputStr: <{mitarbeiter.arbeitszeit.Arbeitsstunden, [ ], global.spanne.von}><0><9999,99><[Asdf]>
// result: ['Arbeitsstunden von', '0', '9999,99', 'Asdf']
export function handleInputStr(localizer: TranslateService, inputStr: string): { [key: string]: string } {
  const inputs: string[] = [];
  const delimiterStack: string[] = [];
  let currentPart = '';
  for (const char of inputStr) {
    const topStackItem = delimiterStack.length && delimiterStack[delimiterStack.length - 1];
    if (topStackItem === '[' && char !== ']') {
      currentPart += char;
      continue;
    }
    switch (char) {
      case '[':
      case '<':
        delimiterStack.push(char);
        if (char !== '<' || delimiterStack.length !== 1) {
          currentPart += char;
        }
        break;
      case ']':
      case '>':
        delimiterStack.pop();
        if (char === '>' && delimiterStack.length === 0) {
          inputs.push(currentPart);
          currentPart = '';
        } else {
          currentPart += char;
        }
        break;
      default:
        currentPart += char;
        break;
    }
  }

  const regex = /^([a-zA-Z0-9]+):(.*)$/;
  const keyValuePairs = inputs.map((input, idx) => {
    const matches = regex.exec(input);
    if (!matches) {
      return {
        key: idx.toString(),
        value: input,
      };
    }

    return {
      key: matches[1].trim(),
      value: matches[2],
    };
  });

  const parts = keyValuePairs.map((input) => {
    // Input mit {} außenrum ist es ein Container. Im Container sind [] normale Texte, der rest Localization-Strings.
    if (isContainerKey(input.value)) {
      input.value = handleInputContainerStr(localizer, input.value);
    }
    // Mit [] außenrum ist es Text
    else if (input.value.startsWith('[')) {
      input.value = input.value.slice(1, -1);
    }

    return input;
  });
  const result = keyValuePairsToDictionary(parts);
  return result;
}

// inputContainerStr: {mitarbeiter.arbeitszeit.Arbeitsstunden<{asdf.XY, [ , ]}>, [ ], global.spanne.von}
// result: Übersetzter String
export function handleInputContainerStr(localizer: TranslateService, inputContainerStr: string): string {
  inputContainerStr = inputContainerStr.slice(1, -1);

  const parts: string[] = [];
  const delimiterStack: string[] = [];
  let currentPart = '';
  for (const char of inputContainerStr) {
    switch (char) {
      case '[':
      case '<':
      case '{':
        currentPart += char;
        delimiterStack.push(char);
        break;
      case ']':
      case '>':
      case '}':
        currentPart += char;
        delimiterStack.pop();
        break;
      case ',':
        if (delimiterStack.length === 0) {
          parts.push(currentPart);
          currentPart = '';
        } else {
          currentPart += char;
        }
        break;
      default:
        currentPart += char;
        break;
    }
  }
  if (currentPart.length) {
    parts.push(currentPart);
  }

  const result = parts
    .map((x) => x.trim())
    .map((input) => {
      // Mit [] außenrum ist es Text
      if (input.startsWith('[')) {
        return input.slice(1, -1);
      }

      // Localization-String.
      return localizeServerKey(localizer, input);
    })
    .join('');
  return result;
}
