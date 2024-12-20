/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

const beginsWithDataRegex = /^data:/;
const base64MimeTypeRegex = /^data:([\w\/\-\+]+)/;
function downloadFromURLOnSafariBrowser(url: string, mimeType: string) {
  if (beginsWithDataRegex.test(url)) {
    url = 'data:' + url.replace(base64MimeTypeRegex, mimeType);
  }
  const downloadWindow = window.open(url);
  if (downloadWindow) {
    return;
  }
  location.href = url;
}
export function downloadFromURL(
  url: string,
  fileName: string,
  mimeType: string,
  skipSafariBrowserCheck?: boolean
) {
  if (!skipSafariBrowserCheck && isSafariBrowser()) {
    // For Safari browser
    downloadFromURLOnSafariBrowser(url, mimeType);
    return;
  }
  // For other browsers
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.setAttribute('download', fileName);
  // we need not add HTMLElement to browser, we can invoke a dispatchevent to trigger the click - refer https://stackoverflow.com/a/48367757/3632372
  anchor.dispatchEvent(
    new MouseEvent(`click`, { bubbles: true, cancelable: true, view: window })
  );
  return;
}

function generateURL(content: Blob | string, mimeType: string) {
  return new Promise<string>((resolve) => {
    if (typeof content === 'string') {
      try {
        content.startsWith('data:')
          ? resolve(content)
          : resolve('data:' + mimeType + ';base64,' + content);
      } catch (y) {
        resolve('data:' + mimeType + ',' + encodeURIComponent(content));
      }
    } else {
      if (window.URL) {
        resolve(window.URL.createObjectURL(content));
        return;
      }
      const reader = new FileReader();
      reader.onload = function (_e) {
        resolve(this.result as string);
      };
      reader.readAsDataURL(content);
    }
  });
}

export function saveFile(
  content: Blob | string,
  fileName: string,
  mimeType: string = 'application/octet-stream',
  skipSafariBrowserCheck: boolean = false
): boolean {
  generateURL(content, mimeType).then((url: string) =>
    downloadFromURL(url, fileName, mimeType, skipSafariBrowserCheck)
  );
  return true;
}

const regexToTestIfSafariBrowser =
  /(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//;
export function isSafariBrowser() {
  return regexToTestIfSafariBrowser.test(navigator.userAgent);
}
