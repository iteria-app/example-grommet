import React from 'react'
import {
  // DataTable,
  InfiniteScroll,
  Text,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Grid,
  // Icons
} from 'grommet'
import { Chat, ShareOption, UserManager } from 'grommet-icons';
// import { Icons } from 'grommet-icons';

// import { FormattedDate } from 'react-intl'

export const CustomersTable: React.FC<any> = ({ customers, onBottomScroll, paginationStep }) => {
  return (
    <>
      <Box margin={'80px auto'} width={'800px'} overflow="auto">
        <Grid gap="medium" justify="center" columns={{ count: 'fit', size: 'medium' }}>
          <InfiniteScroll items={customers} step={paginationStep} onMore={onBottomScroll} {...customers}>
            {(item: any, index: number) => (
              <Card key={index} height="medium" width="medium" background="light-1" elevation="large">
                <CardHeader pad="medium"><UserManager size="40px" color="black" /><Text size='30px' weight='bold' color='black'>{item.node.name}</Text></CardHeader>
                <CardBody pad="medium" justify={"around"}>
                  <Text size='25px' weight='bold' color='black'>{item.node.address.city} {item.node.address.state}</Text>
                  <Text size='medium' weight='bold' color='black'>{item.node.address.street}</Text>
                </CardBody>
                <CardFooter pad={{ horizontal: "small", vertical: "small" }} background="light-2">
                  <Button
                    icon={<Chat size="40px" color="red" />}
                    hoverIndicator
                  />
                  <Button icon={<ShareOption size="40px" color="black" />} hoverIndicator />
                </CardFooter>
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