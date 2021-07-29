import { ObjectString } from '../types'
import { ObjectType } from '../types'

export const filterDataGrid = (filter: ObjectType, onFilterCustomers: (event: ObjectString) => void, onChangePageCustomers: () => void) => {
    console.log(filter, 'filter');

    for (let i = 0; i < 3; i++){

    }   
    const filterColumnField = Object.keys(filter)[0]
    const filterColumnField2 = Object.keys(filter)[1]

    let filterValue = filter[filterColumnField]
    let filterValue2 = filter[filterColumnField2]

    const filteredQuery = getFilteredQuery(filter, filterValue, filterColumnField)
    console.log(Object.keys(filter),'Object.keys(filter)x'); 
    
    const filteredQueryForGraphQl: ObjectType = {}
    const filteredQueryForGraphQl2: ObjectType = {}

    if(filterValue2 === ""){
        filterValue2 = null
    }
    if(filterValue === ""){
        filterValue = null
    }
    
    filteredQueryForGraphQl[filterColumnField] = { _eq:  filterValue }
    filteredQueryForGraphQl2[filterColumnField2] = { _eq: filterValue2}

    const connect = Object.assign(filteredQueryForGraphQl, filteredQueryForGraphQl2)
    console.log(connect,'connect'); 

    console.log(Object.keys(filter).length,'Object.keys(filter).length'); 
    // if(Object.keys(filter).length > 1){
    //     alert("adfqwer")
    // }

    console.log(filterColumnField,'filterColumnField15'); 

    console.log(filterColumnField, 'filterColumnField');
    console.log(filterValue, 'filterValue');

    //funguje s jednym query
    // onFilterCustomers(filteredQuery)
    onFilterCustomers(connect)
    setCurrentPageToOne(onChangePageCustomers)
}

const getFilteredQuery = (filter:ObjectType, filterValue: string, filterColumnField: string) => {
    const filteredQueryForGraphQl: ObjectType = {}

    const filterValueToNumber = setFilterValueToNumber(filterValue, filterColumnField)
    // const filterValueToNumber = filterValue.replace(/[^0-9]/g, '').slice(0,9)
    // numberValueReplaced.length = 9 
    console.log(filterValueToNumber,'filterValueToNumber'); 
    
    filter.seq = filterValueToNumber
    console.log(filterValueToNumber,'numberValue'); 

    if (filterValueToNumber) {
        setFilteredQueryToGraphQl(filterValueToNumber, filteredQueryForGraphQl, filterColumnField)
    } else {
        setEmptyFilteredQueryValueToGraphQl(filteredQueryForGraphQl, filterColumnField)
    }
    return filteredQueryForGraphQl
}

const numberTypes = ['seq', 'bigInteger']

const setFilterValueToNumber = ( filterValue: string, filterColumnField: string) => {
    const maxNumberLengh = setMaxNumberLengh(filterColumnField)
    if(numberTypes.includes(filterColumnField)){
        return filterValue.replace(/[^0-9]/g, '').slice(0,maxNumberLengh)
    }
}  

const setMaxNumberLengh = (filterColumnField: string) => {
    if(filterColumnField === 'bigInteger'){
        return 19
    }
    return 9
}

const setFilteredQueryToGraphQl = (filterValue: string, filteredQueryForGraphQl: ObjectType, filterColumnField: string) => {
    return filteredQueryForGraphQl[filterColumnField] = { _eq: filterValue }
}

const setEmptyFilteredQueryValueToGraphQl = (filteredQueryForGraphQl: ObjectType, filterColumnField: string) => {
    return filteredQueryForGraphQl[filterColumnField] = {}
}

export const setCurrentPageToOne = (onChangePageCustomers: (event: number) => void) => {
    onChangePageCustomers(1)
}

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
