import React from 'react'
import { Box, Grommet, DataTable, Pagination, Text } from 'grommet'
import { FormattedDate } from 'react-intl'
import { useIntl } from "react-intl";
import { sortCustomers } from './operations/sort'
import { ObjectString } from './types'
import { tableTheme } from './components/tableTheme'
import { CustomerLoading } from './components/CustomerLoading'
import { CustomerPagination } from './components/CustomerPagination';

// import { filterDataGrid, getFilterData, numberColumnType, uuidColumnType } from './operations/filter'
import { filterDataGrid } from './operations/filter'

export const CustomersTable: React.FC<any> = ({ customers, onSortCustomers, onChangePageCustomers, page, offset, pageSize, onPageSize, onFilterCustomers, totalCustomers }) => {
  const intl = useIntl();

  const handleSortCustomers = (sort: ObjectString) => {
    console.log(sort, 'sort from customerTable');
    sortCustomers(sort, onSortCustomers)
  };


  const handlePage = (page: ObjectString) => {
    console.log(page?.page, 'page.page')
    const pageNumber = page?.page
    onChangePageCustomers(pageNumber)
  };

  const handleFilter = React.useCallback((filter) => {
    filterDataGrid(filter, onFilterCustomers, onChangePageCustomers)

}, [onFilterCustomers, onChangePageCustomers]);

  return (
    <Grommet theme={tableTheme}>
      <Box align="center" pad="large">
        {customers
          ?
          <DataTable
            columns={[
              {
                property: 'createdAt',
                header: <Text>timeStamp</Text>,
                primary: true,
                render: (customer) => (
                  <FormattedDate value={new Date(customer.createdAt)} />
                ),
              },
              {
                property: 'timeStamp2',
                header: <Text>timeStamp2</Text>,
                render: (customer) => (
                  intl.formatDate(customer.createdAt) + ', ' + intl.formatTime(customer.createdAt, { timeZone: 'Europe/Athens' })
                ),
              },
              {
                property: 'id',
                header: <Text>id</Text>,
              },
              {
                property: 'seq',
                header: <Text>Int</Text>,
                search: true
              },
              {
                property: 'name',
                header: <Text>name</Text>,
                sortable: false
              },
              {
                property: 'manager',
                header: <Text>manager</Text>,
              },
              {
                property: 'bigInteger',
                header: <Text>bigInteger</Text>,
              },
              {
                property: 'date',
                header: <Text>date</Text>,
              },
              {
                property: 'float',
                header: <Text>float</Text>,
              },
              {
                property: 'jsonB',
                header: <Text>jsonB</Text>,
                render: (customer) => (
                  JSON.stringify(customer.jsonB)
                ),
              },
              {
                property: 'time',
                header: <Text>time</Text>,
              },
              {
                property: 'timeZ',
                header: <Text>timeZ</Text>,
              },
              {
                property: 'state',
                header: <Text>state</Text>,
              },
            ]}
            data={customers}
            // placeholder={!customers ? loading() : null}
            onSort={handleSortCustomers}
            onSearch={handleFilter}
            resizeable
          />
          :
          <CustomerLoading />
        }
      </Box>
      <CustomerPagination page={page} pageSize={pageSize} handlePage={handlePage} totalCustomers={totalCustomers} />
    </Grommet>
  )
}