import { ObjectString } from '../types'
import { ObjectType } from '../types'

export const filterDataGrid = (filter: ObjectString, onFilterCustomers: (event: ObjectString) => void, onChangePageCustomers: () => void) => {
    console.log(filter, 'filter');

    const filterColumnField = Object.keys(filter)[0]
    console.log(filterColumnField, 'filterColumnField');
    const filterValue = filter[filterColumnField]
    console.log(filterValue, 'filterValue');

    onFilterCustomers(filteredQuery(filterValue, filterColumnField))
    setCurrentPageToOne(onChangePageCustomers)
}

const filteredQuery = (filterValue: string, filterColumnField: string) => {
    const filteredQueryForGraphQl: ObjectType = {}
    if (filterValue) {
        filteredQueryForGraphQl[filterColumnField] = { _eq: filterValue }
    }else{
        filteredQueryForGraphQl[filterColumnField] = {}
    }
    return filteredQueryForGraphQl
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
