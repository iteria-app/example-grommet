import React, { useCallback } from 'react'
import { Box, Grommet, DataTable, Text } from 'grommet'
import { FormattedDate } from 'react-intl'
import { useIntl } from "react-intl";
import { sortCustomers } from './operations/sort'
import { filterDataGrid } from './operations/filter'
import { tableTheme } from './components/tableTheme'
import { CustomerLoading } from './components/CustomerLoading'
import { CustomerPagination } from './components/CustomerPagination';
import { ObjectString } from './types'

export const CustomersTable: React.FC<any> = ({ customers, onSortCustomers, onChangePageCustomers, page, offset, pageSize, onPageSize, onFilterCustomers, totalCustomers }) => {
  const intl = useIntl();
  const handleSortCustomers = (sort: ObjectString) => {
    sortCustomers(sort, onSortCustomers)
  };

  const handlePage = (page: ObjectString) => {
    const pageNumber = page?.page
    onChangePageCustomers(pageNumber)
  };

  const handleFilter = useCallback((filter) => {
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
                  intl.formatDate(customer.createdAt)
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
                header: <Text>id</Text>
              },
              {
                property: 'seq',
                header: <Text>Int</Text>,
                search: true
              },
              {
                property: 'name',
                header: <Text>name</Text>,
                sortable: false,
                search: true

              },
              {
                property: 'manager',
                header: <Text>manager</Text>
              },
              {
                property: 'bigInteger',
                header: <Text>bigInteger</Text>,
                search: true
              },
              {
                property: 'date',
                header: <Text>date</Text>
              },
              {
                property: 'float',
                header: <Text>float</Text>,
                search: true
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
                header: <Text>time</Text>
              },
              {
                property: 'timeZ',
                header: <Text>timeZ</Text>
              },
              {
                property: 'state',
                header: <Text>state</Text>
              },
            ]}
            data={customers}
            onSort={handleSortCustomers}
            onSearch={handleFilter}
            pad={'8px'}
            resizeable
          />
          :
          <CustomerLoading />
        }
      </Box>
      <CustomerPagination page={page} pageSize={pageSize} offset={offset} onPageSize={onPageSize} handlePage={handlePage} totalCustomers={totalCustomers} onChangePageCustomers={onChangePageCustomers} />
    </Grommet>
  )
}