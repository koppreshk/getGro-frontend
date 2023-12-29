/* eslint-disable @typescript-eslint/no-explicit-any */

type UniquePropSelectorFunction<TItem> = (item: TItem) => any;

function defaultUniquePropsSelector<TItem extends TUniqueValue, TUniqueValue>(item: TItem): TUniqueValue {
    return item;
}

export function unique<TItem, TUniqueValue>(array: TItem[], propSelector: UniquePropSelectorFunction<TItem> = defaultUniquePropsSelector): TItem[] {
    let uniqueValue: TUniqueValue;
    return array.filter((item, index) => {
        uniqueValue = propSelector(item);
        return array.findIndex((i => propSelector(i) === uniqueValue)) === index;
    });
}
