import { ObjectString } from '../types'
import { ObjectNumber } from '../types'

export const filterDataGrid = (filter: any, onFilterCustomers: any, onChangePageCustomers: any) => {
    console.log(filter, 'filter');

    const filterColumnField = Object.keys(filter)[0]
    console.log(filterColumnField, 'filterColumnField');
    const filterValue = filter[filterColumnField]
    console.log(filterValue, 'filterValue');

    onFilterCustomers(filteredQuery(filterValue, filterColumnField))
}

const filteredQuery = (filterValue: any, filterColumnField: any) => {
    const filteredQueryForGraphQl: any = {}
    if (filterValue) {
        filteredQueryForGraphQl[filterColumnField] = { _eq: filterValue }
    }
    return filteredQueryForGraphQl
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
