import { FilterNumberValue, TypeNumberOrString, ObjectString, ObjectType } from '../types'

export const filterDataGrid = (filter: ObjectType, onFilterCustomers: (event: ObjectString) => void, onChangePageCustomers: () => void) => {
    const graphqlQuery = { ...filter }
    setNumberOrStringGraphQuery(filter, graphqlQuery)
    onFilterCustomers(graphqlQuery)
    setCurrentPageToOne(onChangePageCustomers)
}

const setNumberOrStringGraphQuery = (filter: ObjectType, graphqlQuery: ObjectType) => {
    const columnFieldList = getColumnFieldList(filter)
    columnFieldList.forEach(columnField => {
        const includesDecimal = decimalColumnsList().includes(columnField)
        const includesInteger = integerColumnsList().includes(columnField)

        setNumberOrString({
            filter: filter,
            includesInteger: includesInteger,
            includesDecimal: includesDecimal,
            graphqlQuery: graphqlQuery,
            columnField: columnField
        })
    })
}

const getColumnFieldList = (filter: ObjectType) => {
    return Object.keys(filter)
}

const integerColumnsList = () => {
    return ['seq', 'bigInteger']
}

const decimalColumnsList = () => {
    return ['float']
}

const setNumberOrString = (query: TypeNumberOrString) => {
    if (query.includesInteger || query.includesDecimal) {
        setNumberGraphQuery(query.filter, query.graphqlQuery, query.columnField, query.includesInteger)
    } else {
        setStringGraphQuery(query.graphqlQuery, query.columnField)
    }
}

const setNumberGraphQuery = (filter: ObjectType, graphqlQuery: ObjectType, columnField: string, includesInteger: boolean) => {
    const filterNumberValue: FilterNumberValue = { value: null }

    setfilterNumberValue(graphqlQuery, columnField, includesInteger, filterNumberValue)
    filter[columnField] = filterNumberValue?.value

    graphqlQuery[columnField] = setNumberQuery(filterNumberValue)
}

const setStringGraphQuery = (graphqlQuery: ObjectType, columnField: string) => {
    graphqlQuery[columnField] = { _ilike: '%' + graphqlQuery[columnField] + '%' }
}

const setfilterNumberValue = (graphqlQuery: ObjectType, columnField: string, includesInteger: boolean, filterNumberValue: FilterNumberValue) => {
    if (graphqlQuery[columnField]) {
        if (includesInteger) {
            filterNumberValue.value = intReplaceValue(graphqlQuery[columnField], columnField)
        } else {
            filterNumberValue.value = floatReplaceValue(graphqlQuery[columnField])
        }
    }
}

const intReplaceValue = (filterValue: string, columnField: string) => {
    return filterValue.replace(/[^0-9]/g, '').slice(0, maxLengthInput(columnField))
}

const maxLengthInput = (columnField: string) => {
    if (columnField === 'bigInteger') {
        return 19
    }
    return 9
}

const floatReplaceValue = (filterValue: string) => {
    return filterValue.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
}

const setNumberQuery = (filterNumberValue: FilterNumberValue | null) => {
    if (filterNumberValue?.value) {
        return { _eq: filterNumberValue.value }
    }
    return { _eq: null }
}

export const setCurrentPageToOne = (onChangePageCustomers: (event: number) => void) => {
    onChangePageCustomers(1)
}

