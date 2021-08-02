import { ObjectString } from '../types'
import { ObjectType } from '../types'

export const filterDataGrid = (filter: ObjectType, onFilterCustomers: (event: ObjectString) => void, onChangePageCustomers: () => void) => {
    console.log(filter, 'filter');

    const graphqlQuery = { ...filter }

    const columnFieldList = getColumnFieldList(filter)
    console.log(columnFieldList, 'columnFieldList');

    setNumberOrStringGraphQuery(filter, columnFieldList, graphqlQuery)

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

const setNumberOrStringGraphQuery = (filter: ObjectType, columnFieldList: string[], graphqlQuery: ObjectType) => {
    columnFieldList.forEach(columnField => {
        console.log(columnField, 'columnField');

        const includesDecimal = decimalColumnsList().includes(columnField)
        const includesInteger = integerColumnsList().includes(columnField)

        if (includesInteger || includesDecimal) {
            setNumberGraphQuery(graphqlQuery, columnField, includesInteger, filter)
        } else {
            setStringGraphQuery(columnField, graphqlQuery)
        }
    })
}

const setNumberGraphQuery = (graphqlQuery: any, columnField: any, includesInteger: any, filter: any) => {
    const filterNumberValue: any = { value: null }

    if (graphqlQuery[columnField]) {
        if (includesInteger) {
            filterNumberValue.value = intReplaceValue(graphqlQuery[columnField], columnField)
        } else {
            filterNumberValue.value = floatReplaceValue(graphqlQuery[columnField])
        }
    }
    
    setfilterNumberValue(columnField, graphqlQuery, includesInteger, filterNumberValue)
    console.log(filterNumberValue, 'filterNumberValue');

    filter[columnField] = filterNumberValue?.value

    graphqlQuery[columnField] = setNumberQuery(filterNumberValue)

    console.log(filterNumberValue, 'filterNumberValue');
}
const setfilterNumberValue = (columnField: string, graphqlQuery: ObjectType, includesInteger: boolean, filterNumberValue: ObjectString) => {
    if (graphqlQuery[columnField]) {
        if (includesInteger) {
            filterNumberValue.value = intReplaceValue(graphqlQuery[columnField], columnField)
        } else {
            filterNumberValue.value = floatReplaceValue(graphqlQuery[columnField])
        }
    }
}



const intReplaceValue = (filterValue: string, columnField: string) => {
    console.log(filterValue, 'filterValue');
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

const setStringGraphQuery = (columnField: any, graphqlQuery: ObjectType) => {
    graphqlQuery[columnField] = { _ilike: '%' + graphqlQuery[columnField] + '%' }
}

const setNumberQuery = (filterNumberValue: ObjectType | null) => {
    if (filterNumberValue?.value) {
        return { _eq: filterNumberValue.value }
    }
    return { _eq: null }
}

// const setFilterNumberValue = (graphqlQuery: ObjectType, columnFieldList: ObjectType, i: any, includesInteger: boolean, filterNumberValue: any) => {
//     if (graphqlQuery[columnFieldList[i]]) {
//         if (includesInteger) {
//             filterNumberValue = intReplaceValue(graphqlQuery[columnFieldList[i]])
//         } else {
//             filterNumberValue = floatReplaceValue(graphqlQuery[columnFieldList[i]])
//         }
//     }
// }

// const numberColumn = (graphqlQuery, columnFieldList) =>{
//     let filterNumberValue = null
//     if (graphqlQuery[columnFieldList[i]]) {
//         if (includesInteger) {
//             filterNumberValue = graphqlQuery[columnFieldList[i]].replace(/[^0-9]/g, '').slice(0, 19)
//         } else {
//             filterNumberValue = graphqlQuery[columnFieldList[i]].replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
//         }
//     }
//     console.log(filterNumberValue, 'filterNumberValue');
//     console.log(filter[columnFieldList[i]], 'filter[columnFieldList[i]]');
//     filter[columnFieldList[i]] = filterNumberValue

//     if (filterNumberValue) {
//         graphqlQuery[columnFieldList[i]] = { _eq: filterNumberValue }
//     } else {
//         graphqlQuery[columnFieldList[i]] = { _eq: null }
//     }

//     console.log(filterNumberValue, 'filterNumberValue');
// }


// const getFilteredQuery = (filter:ObjectType, filterValue: string, filterColumnField: string) => {
//     const filteredQueryForGraphQl: ObjectType = {}

//     const filterValueToNumber = setFilterValueToNumber(filterValue, filterColumnField)
//     // const filterValueToNumber = filterValue.replace(/[^0-9]/g, '').slice(0,9)
//     // numberValueReplaced.length = 9 
//     console.log(filterValueToNumber,'filterValueToNumber'); 

//     filter.seq = filterValueToNumber
//     console.log(filterValueToNumber,'numberValue'); 

//     if (filterValueToNumber) {
//         setFilteredQueryToGraphQl(filterValueToNumber, filteredQueryForGraphQl, filterColumnField)
//     } else {
//         setEmptyFilteredQueryValueToGraphQl(filteredQueryForGraphQl, filterColumnField)
//     }
//     return filteredQueryForGraphQl
// }

// const numberTypes = ['seq', 'bigInteger']

// const setFilterValueToNumber = ( filterValue: string, filterColumnField: string) => {
//     const maxNumberLengh = setMaxNumberLengh(filterColumnField)
//     if(numberTypes.includes(filterColumnField)){
//         return filterValue.replace(/[^0-9]/g, '').slice(0,maxNumberLengh)
//     }
// }  

// const setMaxNumberLengh = (filterColumnField: string) => {
//     if(filterColumnField === 'bigInteger'){
//         return 19
//     }
//     return 9
// }

// const setFilteredQueryToGraphQl = (filterValue: string, filteredQueryForGraphQl: ObjectType, filterColumnField: string) => {
//     return filteredQueryForGraphQl[filterColumnField] = { _eq: filterValue }
// }

// const setEmptyFilteredQueryValueToGraphQl = (filteredQueryForGraphQl: ObjectType, filterColumnField: string) => {
//     return filteredQueryForGraphQl[filterColumnField] = {}
// }

export const setCurrentPageToOne = (onChangePageCustomers: (event: number) => void) => {
    onChangePageCustomers(1)
}

/////////////////////////////////////////

// const getQueryFromDataGrid = () => {

// }

// const getQueryFromDataGrid = () => {
//     const filteredQueryForGraphQl: object = {}
//     const filterModels = filterModelFromDataGrid()

//     filterModels.forEach(filterModel => {
//         console.log(filterData, 'filterDatafilterData');

//         console.log(filterColumnFieldFromDataGrid(), 'filterColumnField');

//         const columnDataByFilterColumnField = getColumnDataByFilterColumnField()
//         const filterDataType: string = columnDataByFilterColumnField[0]?.type
//         console.log(filterDataType, 'filterDataType');

//         console.log(filterModel, 'filterModel1');
//         console.log(filterValueFromDataGrid(), 'filterValue2');
//         console.log(filteredQueryForGraphQl, 'filteredQueryForGraphQl');

//         filterDataByColumnTypeName(filterDataType, filteredQueryForGraphQl)

//     })

//     return filteredQueryForGraphQl
// }
