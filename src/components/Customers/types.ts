export interface ObjectString {
    [key: string]: string;
}

export interface ObjectType {
    [key: string]: any
}

export interface FilterNumberValue {
    value: | string | null
}

export type TypeNumberOrString = { filter: ObjectType, includesInteger: boolean, includesDecimal: boolean, graphqlQuery: ObjectType, columnField: string }
