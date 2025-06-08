/* eslint-disable @typescript-eslint/no-explicit-any */

import { useAppSelector } from 'lib/hooks';
import { v4 } from 'uuid';

import { memoizeFunction } from './memoize-utils';

export function isArray(value: any): value is Array<any> {
  return value instanceof Array;
}

export function isFunction(value: any): value is Function {
  return value instanceof Function;
}

export function isObject(value: any): value is object {
  return value === Object(value) && !isArray(value) && !isFunction(value);
}

export const toCamelCasedKeysFromUnderScores = (obj: {
  [key: string]: any;
}) => {
  const getValue = (key: string): any => {
    if (obj[key] !== null && typeof obj[key] === 'object') {
      return isArray(obj[key])
        ? obj[key].map((item: any) =>
            typeof item === 'string'
              ? item
              : toCamelCasedKeysFromUnderScores(item)
          )
        : toCamelCasedKeysFromUnderScores(obj[key]);
    }
    return obj[key];
  };

  return Object.keys(obj).reduce((acc, key) => {
    const modifiedKey = key.replace(/_([a-z])/g, function f(g) {
      return g[1].toUpperCase();
    });
    return {
      ...acc,
      ...{ [modifiedKey]: getValue(key) },
    };
  }, {} as any);
};

export const convertToCamelCase = (str: string, splitter = '-') => {
  return str
    .toLowerCase()
    .split(splitter)
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('');
};

export const convertToUnderscore = (str: string, splitter = '-') => {
  return str.toLowerCase().split(splitter).join('_');
};

export const capitalizeFirstLetter = (string: string, splitter?: string) => {
  const words = string.split(splitter ?? ' ');

  return words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');
};
interface IInitialsColorCodes {
  backgroundColor: string;
  textColor: string;
}

const COLORCODES = [
  {
    backgroundColor: '#DDECF7',
    textColor: '#0077D9',
  },
  {
    backgroundColor: '#ECE5F6',
    textColor: '#6E40CF',
  },
  {
    backgroundColor: '#F5E2EE',
    textColor: '#B32181',
  },
  {
    backgroundColor: '#DFEEE5',
    textColor: '#008334',
  },
  {
    backgroundColor: '#F4E6E6',
    textColor: '#B6383E',
  },
  {
    backgroundColor: '#F5EDDE',
    textColor: '#B96E02',
  },
  {
    backgroundColor: '#EFE1ED',
    textColor: '#8C007E',
  },
  {
    backgroundColor: '#EAEBEC',
    textColor: '#5F6672',
  },
  {
    backgroundColor: '#EFE8E0',
    textColor: '#934F00',
  },
  {
    backgroundColor: '#E4EAEE',
    textColor: '#19628F',
  },
  {
    backgroundColor: '#DEEDEE',
    textColor: '#00828C',
  },
  {
    backgroundColor: '#E3EAF5',
    textColor: '#165DCB',
  },
] as IInitialsColorCodes[];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const chooseRandomColors = memoizeFunction(
  (_name: string): IInitialsColorCodes => {
    const idx = Math.floor(Math.random() * COLORCODES.length);
    return COLORCODES[idx];
  },
  500
);

export const generateId = () => v4();

export const useFormatedNumberByLocale = () => {
  const lang = useAppSelector((state) => state?.core?.config?.language);
  const getFormatedNumberByLocale = (number: number | string) => {
    const locale = lang === 'en' ? 'en-IN' : lang || 'en-IN';
    return new Intl.NumberFormat(locale).format(Number(number));
  };

  return getFormatedNumberByLocale;
};

export function getSubdomain(): string | null {
  const host = window.location.hostname;
  const parts = host.split('.');

  if (parts.length > 2) return parts[0].toLowerCase();

  return null;
}
