/* eslint-disable @typescript-eslint/no-explicit-any */

export function isArray(value: any): value is Array<any> {
    return value instanceof Array;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(value: any): value is Function {
    return value instanceof Function;
}

export function isObject(value: any): value is object {
    return (value === Object(value) && !isArray(value) && !isFunction(value));
}

export const toCamelCasedKeysFromUnderScores = (obj: { [key: string]: any }) => {

    const getValue = (key: string): any => {
        if (obj[key] !== null && typeof obj[key] === 'object') {
            return isArray(obj[key]) ? obj[key].map((item: any) => toCamelCasedKeysFromUnderScores(item)) : toCamelCasedKeysFromUnderScores(obj[key])
        }
        return obj[key];
    }

    return (
        Object.keys(obj).reduce((acc, key) => {
            const modifiedKey = key.replace(/_([a-z])/g, function f(g) {
                return g[1].toUpperCase();
            });
            return ({
                ...acc,
                ...{ [modifiedKey]: getValue(key) },
            });
        }, {} as any))
};

export const capitalizeFirstLetter = (string: string) => {
    const words = string.split(" ");

    return words.map((word) => {
        return word[0].toUpperCase() + word.substring(1);
    }).join(" ");
}