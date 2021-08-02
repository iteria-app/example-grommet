import { ObjectString } from '../types'

export const sortCustomers = (sort: ObjectString, onSortCustomers: (sort: object) => void) => {
    const sortModel: object = sortModelFromDataGrid(sort)
    if (sortModel) {
        setSortQuery(sort, onSortCustomers)
    } else {
        onSortCustomers({})
    }
}

const setSortQuery = (sort: ObjectString, onSortCustomers: (sort: object) => void) => {
    onSortCustomers(sortQueryFromGridData(sort))
}

const sortQueryFromGridData = (sort: ObjectString): object => {
    const sortQuery: ObjectString = {}
    const sortModels = sortModelFromDataGrid(sort)
    const sortColumnFiled: string = sortModels?.property
    const sortValue: string = sortModels?.direction

    sortQuery[sortColumnFiled] = sortValue

    return sortQuery
}

const sortModelFromDataGrid = (sort: ObjectString) => {
    const sortModel = sort
    if (sortModel) {
        return sortModel
    }
    return {}
}
