import React from 'react'
import {
  // DataTable,
  InfiniteScroll,
  Text,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Grid
} from 'grommet'
// import { FormattedDate } from 'react-intl'

export const CustomersTable: React.FC<any> = ({ customers, onBottomScroll, paginationStep }) => {
  return (
    <>
      <Box margin={'0 auto'} width={'500px'} overflow="auto">
        <Grid gap="medium" columns={{ count: 'fit', size: 'small' }}>
          <InfiniteScroll items={customers} step={paginationStep} onMore={onBottomScroll} {...customers}>
            {(item: any, index: number) => (
              <Card key={index} width={'100%'} height={'400px'} pad="small" gap="medium" background="light-4">
                <CardHeader><Text size='large' weight='bold' color='black'>{item.node.name}</Text></CardHeader>
                <CardBody><Text size='large' weight='bold' color='black'>{item.node.address.city}</Text></CardBody>
                <CardFooter><Text size='large' weight='bold' color='black'>{item.node.address.state}</Text></CardFooter>
              </Card>
            )}
          </InfiniteScroll>
        </Grid>
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