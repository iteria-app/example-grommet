import React from 'react'
import { DataTable, Text } from 'grommet'
import moment from 'moment'

export const CustomersTable: React.FC<any> = ({ customers }) => {
  return (
    <div>
      <DataTable
        columns={[
          {
            property: 'name',
            header: <Text>Name</Text>,
            primary: true,
          },
          {
            property: 'email',
            header: <Text>Email</Text>,
            primary: true,
          },
          {
            property: 'address',
            header: <Text>Location</Text>,
            primary: true,
            render: (customer) => (
              <Text>
                {customer.address.city +
                  ', ' +
                  customer.address.state +
                  ', ' +
                  customer.address.country}
              </Text>
            ),
          },
          {
            property: 'phone',
            header: <Text>Phone</Text>,
            primary: true,
          },
          {
            property: 'createdAt',
            header: <Text>Registration date</Text>,
            primary: true,
            render: (customer) => (
              <Text>{moment(customer.createdAt).format('DD/MM/YYYY')}</Text>
            ),
          },
        ]}
        data={customers}
      />
    </div>
  )
}
