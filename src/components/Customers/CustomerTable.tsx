import React from 'react'
import { DataTable, InfiniteScroll, Text, Box } from 'grommet'
import { FormattedDate } from 'react-intl'

export const CustomersTable: React.FC<any> = ({ customers, limit, onBottomScroll, customerPostion }) => {
  return (
    <>
      <Box height="100px" overflow="auto">
        <InfiniteScroll items={customers} step={3} onMore={onBottomScroll} {...customers}>
          {(item: any, index: number) => (
            <Box
              key={index} pad='medium'
              align='center'
            >
              <Text size='large' weight='bold' color='black'>{item.name}</Text>
            </Box>
          )}
        </InfiniteScroll>
      </Box>
      {/* <DataTable
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
              <FormattedDate value={new Date(customer.createdAt)} />
            ),
          },
        ]}
        data={customers}
      /> */}
    </>
  )
}