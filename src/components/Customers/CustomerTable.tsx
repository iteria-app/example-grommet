
import React from 'react'
import { DataTable, Text } from 'grommet'
import { FormattedDate } from 'react-intl'

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
                {customer.node.address.city +
                  ', ' +
                  customer.node.address.state +
                  ', ' +
                  customer.node.address.country}
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
              <FormattedDate value={new Date(customer.node.createdAt)} />
            ),
          },
        ]}
        data={customers}
      />
    </div>
  )
}