// This type can be used to map TitleCased types to camelCasedTypes
export type ToCamelCasedKeys<T extends { [property: string]: any }> = {
  [Key in keyof T as Uncapitalize<Key & string>]: T[Key];
};

// This type can be used to map camelCased types to TitleCased Types
export type ToTitleCasedKeys<T extends { [property: string]: any }> = {
  [Key in keyof T as Capitalize<Key & string>]: T[Key];
};

type CamelizeString<T extends PropertyKey> = T extends string
  ? string extends T
    ? string
    : T extends `${infer F}_${infer R}`
      ? `${F}${Capitalize<CamelizeString<R>>}`
      : T
  : T;

export type ToCamelCasedKeysFromUnderscores<T> = {
  [K in keyof T as CamelizeString<K>]: T[K];
};
