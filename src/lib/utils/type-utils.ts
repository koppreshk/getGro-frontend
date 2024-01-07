// This type can be used to map TitleCased types to camelCasedTypes
export type ToCamelCasedKeys<T extends { [property: string]: any }> = {
    [Key in keyof T as Uncapitalize<Key & string>]: T[Key];
};

// This type can be used to map camelCased types to TitleCased Types
export type ToTitleCasedKeys<T extends { [property: string]: any }> = {
    [Key in keyof T as Capitalize<Key & string>]: T[Key];
}
