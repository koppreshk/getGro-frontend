/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isObject, isFunction, isArray } from './common-utils';

interface IMemoizeNode {
    map: WeakMap<object, IMemoizeNode>;
    value?: any;
}

const DICTIONARY: any = {};

function createNode(): IMemoizeNode {
    return {
        map: new WeakMap<object, IMemoizeNode>()
    };
}

function normalizeArg(val: any): object {
    if (isObject(val) || isArray(val) || isFunction(val)) {
        return val;
    }

    if (!DICTIONARY[val]) {
        DICTIONARY[val] = { val };
    }

    return DICTIONARY[val];
}

export function memoizeFunction<T extends (...args: any[]) => R, R>(callback: T, maxCacheSize: number = 20): T {

    let rootNode = createNode();
    let cacheSize = 0;

    return function memoizedFunction(...args: any[]): R {
        let currentNode: IMemoizeNode = rootNode;

        if (maxCacheSize > 0 && cacheSize > maxCacheSize) {
            currentNode = rootNode = createNode();
            cacheSize = 0;
        }

        args.forEach((rawArg) => {
            const arg = normalizeArg(rawArg);

            if (!currentNode.map.has(arg)) {
                currentNode.map.set(arg, createNode());
            }

            currentNode = currentNode.map.get(arg)!;
        });

        if (!currentNode.hasOwnProperty('value')) {
            currentNode.value = callback(...args);
            cacheSize++;
        }

        return currentNode.value;
    } as T;
}

export function debounce<Params extends any[]>(callback: (...args: Params) => any, wait: number) {
    let timeoutId: number | undefined = undefined;
    return (...args: any) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            callback(...args);
        }, wait);
    };
}