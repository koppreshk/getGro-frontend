import { useState } from 'react';

export function setCookie(
  cookieName: string,
  cookieValue: string,
  expireDays: number,
  keepMeSignedIn: boolean = false
) {
  const date = new Date();
  // here days are converted to milliseconds
  date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + date.toUTCString();
  const cookieExpireValue = keepMeSignedIn ? expires : '';
  const encodedCookieValue = encodeURI(cookieValue);
  document.cookie =
    cookieName + '=' + encodedCookieValue + ';' + cookieExpireValue + ';path=/';
}

export function getCookie(cookieName: string) {
  const name = cookieName + '=';
  const cookieList = document.cookie.split(';');
  for (let i = 0; i < cookieList.length; i++) {
    let cookie = cookieList[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      const decodedCookieValue = decodeURI(
        cookie.substring(name.length, cookie.length) || ''
      );
      return decodedCookieValue;
    }
  }
  return '';
}

export function clearCookies() {
  const cookiesList = document.cookie.split(';');
  for (let i = 0; i < cookiesList.length; i++) {
    const cookie = cookiesList[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;Path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

export const DEFAULT_COOKIE_EXPIRATION_VALUE = 14;

export const useCookieStorage = (cookieName: string, defaultValue: null) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = getCookie(cookieName);
      if (value) {
        return JSON.parse(value);
      } else {
        setCookie(
          cookieName,
          JSON.stringify(defaultValue),
          DEFAULT_COOKIE_EXPIRATION_VALUE
        );
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (
    newValue: object,
    expireDays: number,
    keepMeSignedIn?: boolean
  ) => {
    try {
      setCookie(
        cookieName,
        JSON.stringify(newValue),
        expireDays,
        keepMeSignedIn
      );
    } catch (err) {
      /* empty */
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};
