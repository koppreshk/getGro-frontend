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
const regexToTestIfSafariBrowser =
  /(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//;

export function isSafariBrowser() {
  return regexToTestIfSafariBrowser.test(navigator.userAgent);
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
        if (content.startsWith('data:')) {
          resolve(content);
        } else {
          resolve('data:' + mimeType + ';base64,' + content);
        }
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

export function saveAsCSV(
  data: Array<object>,
  args: { fileName?: string } = { fileName: 'data' }
) {
  args = args || { fileName: 'data' };
  const headers = Object.keys(data[0]).join(',') + '\n';
  const rows = data.map((obj) => Object.values(obj).join(',')).join('\n');
  const csvContent = headers + rows;

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${args.fileName}.csv`);
  link.click();
}
