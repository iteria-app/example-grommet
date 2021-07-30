import { ObjectString } from '../types'
import { ObjectType } from '../types'

export const filterDataGrid = (filter: ObjectType, onFilterCustomers: (event: ObjectString) => void, onChangePageCustomers: () => void) => {
    console.log(filter, 'filter');



    // for (let i = 0; i < 3; i++){

    const filterDuplicate = { ...filter }

    //Object.keys(filter)
    // bigInteger, seq bude, zoznam v [bigInteger, seq] ktory dam do for cyklu pomoze mi Object.keys(filter).length z toho vytovrim for to bude lenght
    const columnFieldList = Object.keys(filter)
    console.log(columnFieldList, 'columnFieldList');


    for (let i = 0; i < columnFieldList.length; i++) {
        console.log(columnFieldList[i], 'columnFieldList[i]');
        
        //number
        const integerColumns = ['seq', 'bigInteger']
        if (integerColumns.includes(columnFieldList[i])) {
            let filterNumberValue = null
            if (filterDuplicate[columnFieldList[i]]) {
                filterNumberValue = filterDuplicate[columnFieldList[i]].replace(/[^0-9]/g, '').slice(0, 19)
            }
            console.log(filterNumberValue, 'filterNumberValue');
            console.log(filter[columnFieldList[i]], 'filter[columnFieldList[i]]');
            filter[columnFieldList[i]] = filterNumberValue

            if (filterNumberValue) {
                filterDuplicate[columnFieldList[i]] = { _eq: filterNumberValue }
            } else {
                filterDuplicate[columnFieldList[i]] = { _eq: null }
            }

            console.log(filterNumberValue, 'filterNumberValue');
        }else{
            filterDuplicate[columnFieldList[i]] = { _ilike: '%' + filterDuplicate[columnFieldList[i]] + '%' } 
        }
    }

    console.log(filterDuplicate, 'filterDuplicate');
    console.log(filter, 'filterrrr');
    onFilterCustomers(filterDuplicate)
}

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

// export const setCurrentPageToOne = (onChangePageCustomers: (event: number) => void) => {
//     onChangePageCustomers(1)
// }

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
