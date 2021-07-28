import React from 'react'
import { DataTable, Text } from 'grommet'
import { FormattedDate } from 'react-intl'
import { useIntl } from "react-intl";
import { sortCustomers } from './operations/sort'
import { ObjectString } from './types'

// import { pageByTotalAndPageSize } from './operations/pagination'
// import { filterDataGrid, getFilterData, numberColumnType, uuidColumnType } from './operations/filter'

export const CustomersTable: React.FC<any> = ({ customers, onSortCustomers, onChangePageCustomers, page, offset, pageSize, onPageSize, onFilterCustomers, totalCustomers }) => {
  const intl = useIntl();

  const handleSortCustomers = (sort: ObjectString) => {
    console.log(sort, 'sort from customerTable');
    sortCustomers(sort, onSortCustomers)
  };

  return (
    <div>
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
            primary: true,
            render: (customer) => (
              intl.formatDate(customer.createdAt) + ', ' + intl.formatTime(customer.createdAt, { timeZone: 'Europe/Athens' })
            ),
          },
          {
            property: 'id',
            header: <Text>id</Text>,
            primary: true
          },
          {
            property: 'seq',
            header: <Text>Int</Text>,
            primary: true
          },
          {
            property: 'name',
            header: <Text>name</Text>,
            primary: true
          },
          {
            property: 'manager',
            header: <Text>manager</Text>,
            primary: true
          },
          {
            property: 'bigInteger',
            header: <Text>bigInteger</Text>,
            primary: true
          },
          {
            property: 'date',
            header: <Text>date</Text>,
            primary: true
          },
          {
            property: 'float',
            header: <Text>float</Text>,
            primary: true
          },
          {
            property: 'jsonB',
            header: <Text>jsonB</Text>,
            primary: true,
            render: (customer) => (
              JSON.stringify(customer.jsonB)
            ),
          },
          {
            property: 'time',
            header: <Text>time</Text>,
            primary: true
          },
          {
            property: 'timeZ',
            header: <Text>timeZ</Text>,
            primary: true
          },
          {
            property: 'state',
            header: <Text>state</Text>,
            primary: true
          },
        ]}
        data={customers}
        onSort={handleSortCustomers}
        sortable
        resizeable
      />
    </div>
  )
}