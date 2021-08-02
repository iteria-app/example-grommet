import { ObjectString, ObjectType, FilterNumberValue } from '../types'

export const filterDataGrid = (filter: ObjectType, onFilterCustomers: (event: ObjectString) => void, onChangePageCustomers: () => void) => {
    console.log(filter, 'filter');

    const graphqlQuery = { ...filter }

    setNumberOrStringGraphQuery(filter, graphqlQuery)

    console.log(graphqlQuery, 'graphqlQuery');
    console.log(filter, 'filterrrr');
    onFilterCustomers(graphqlQuery)
    setCurrentPageToOne(onChangePageCustomers)
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

const setNumberOrStringGraphQuery = (filter: ObjectType, graphqlQuery: ObjectType) => {
    const columnFieldList = getColumnFieldList(filter)
    columnFieldList.forEach(columnField => {
        console.log(columnField, 'columnField');

        const includesDecimal = decimalColumnsList().includes(columnField)
        const includesInteger = integerColumnsList().includes(columnField)

        setNumberOrString(filter, graphqlQuery, columnField, includesInteger, includesDecimal)
    })
}

const setNumberOrString = (filter: ObjectType, graphqlQuery: ObjectType, columnField: string, includesInteger: boolean, includesDecimal: boolean ) => {
    if (includesInteger || includesDecimal) {
        setNumberGraphQuery(filter, graphqlQuery, columnField, includesInteger)
    } else {
        setStringGraphQuery(graphqlQuery, columnField)
    } 
}

const setNumberGraphQuery = (filter: ObjectType, graphqlQuery: ObjectType, columnField: string, includesInteger: boolean) => {
    const filterNumberValue: FilterNumberValue = { value: null }

    setfilterNumberValue(graphqlQuery, columnField, includesInteger, filterNumberValue)
    console.log(filterNumberValue, 'filterNumberValue');

    filter[columnField] = filterNumberValue?.value

    graphqlQuery[columnField] = setNumberQuery(filterNumberValue)

    console.log(filterNumberValue, 'filterNumberValue');
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

const setStringGraphQuery = (graphqlQuery: ObjectType, columnField: any) => {
    graphqlQuery[columnField] = { _ilike: '%' + graphqlQuery[columnField] + '%' }
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

