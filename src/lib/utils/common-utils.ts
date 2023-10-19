/* eslint-disable @typescript-eslint/no-explicit-any */

export const toCamelCasedKeysFromUnderScores = (obj: { [key: string]: any }) => {
    return (
        Object.keys(obj).reduce((acc, key) => {
            const modifiedKey = key.replace(/_([a-z])/g, function f(g) {
                return g[1].toUpperCase();
            });
            return ({
                ...acc,
                ...{ [modifiedKey]: obj[key] },
            });
        }, {} as any))
};
