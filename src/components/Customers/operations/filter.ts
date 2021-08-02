import { ObjectString } from '../types'
import { ObjectType } from '../types'

export const filterDataGrid = (filter: ObjectType, onFilterCustomers: (event: ObjectString) => void, onChangePageCustomers: () => void) => {
    console.log(filter, 'filter');



    // for (let i = 0; i < 3; i++){

    const graphqlQuery = { ...filter }

    //Object.keys(filter)
    // bigInteger, seq bude, zoznam v [bigInteger, seq] ktory dam do for cyklu pomoze mi Object.keys(filter).length z toho vytovrim for to bude lenght
    const columnFieldList = Object.keys(filter)
    console.log(columnFieldList, 'columnFieldList');


    // for (let i = 0; i < columnFieldList.length; i++) {
    //     console.log(columnFieldList[i], 'columnFieldList[i]');

    //     //number
    //     const integerColumns = ['seq', 'bigInteger']
    //     const decimalColumns = ['float']
    //     // const numberColumns = []
    //     const includesDecimal = decimalColumns.includes(columnFieldList[i])
    //     const includesInteger = integerColumns.includes(columnFieldList[i])


    //     if (includesInteger || includesDecimal) {
    //         setNumberGraphQuery(graphqlQuery, columnFieldList, i, includesInteger, filter)
    //     } else {
    //         setStringGraphQuery(i, columnFieldList, graphqlQuery)
    //     }
    // }
    columnFieldList.forEach(columnField => {
        console.log(columnField, 'columnField');

        //number
        const integerColumns = ['seq', 'bigInteger']
        const decimalColumns = ['float']
        // const numberColumns = []
        const includesDecimal = decimalColumns.includes(columnField)
        const includesInteger = integerColumns.includes(columnField)


        if (includesInteger || includesDecimal) {
            setNumberGraphQuery(graphqlQuery, columnField, includesInteger, filter)
        } else {
            setStringGraphQuery(columnField, graphqlQuery)
        }
    })

    console.log(graphqlQuery, 'graphqlQuery');
    console.log(filter, 'filterrrr');
    onFilterCustomers(graphqlQuery)
    setCurrentPageToOne(onChangePageCustomers)
}

const setNumberGraphQuery = (graphqlQuery: any, columnField: any, includesInteger: any, filter: any) => {
    const filterNumberValue: any = {value: null}
    
    if (graphqlQuery[columnField]) {
        if (includesInteger) {
            filterNumberValue.value = intReplaceValue(graphqlQuery[columnField])
        } else {
            filterNumberValue.value = floatReplaceValue(graphqlQuery[columnField])
        }
    }
    console.log(filterNumberValue, 'filterNumberValue');

    filter[columnField] = filterNumberValue?.value

    setNumberQuery(filterNumberValue, graphqlQuery, columnField)

    console.log(filterNumberValue, 'filterNumberValue');
}

// const maxLength = () =>{
//     if()
// }

const intReplaceValue = (filterValue: string) => {
    console.log(filterValue,'filterValue'); 
    
    return filterValue.replace(/[^0-9]/g, '').slice(0, 19)
}

const floatReplaceValue = (filterValue: string) => {
    return filterValue.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
}

const setStringGraphQuery = (columnField: any, graphqlQuery: ObjectType) => {
    graphqlQuery[columnField] = { _ilike: '%' + graphqlQuery[columnField] + '%' }
}

const setNumberQuery = (filterNumberValue: ObjectType | null, graphqlQuery: ObjectType, columnField: any) => {
    if (filterNumberValue?.value) {
        graphqlQuery[columnField] = { _eq: filterNumberValue.value }
    } else {
        graphqlQuery[columnField] = { _eq: null }
    }
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
