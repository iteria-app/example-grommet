import React from 'react'
import {
  InfiniteScroll,
  Text,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Grid,
} from 'grommet'
import { Chat, ShareOption, UserManager } from 'grommet-icons';

export const CustomerPaginate: React.FC<any> = ({ customers, onBottomScroll, paginationStep }) => {
  return (
    <>
      <Box margin={'80px auto'} width={'800px'} overflow="auto">
        <Grid gap="medium" justify="center" columns={{ count: 'fit', size: 'medium' }}>
          <InfiniteScroll items={customers} step={paginationStep} onMore={onBottomScroll} {...customers}>
            {(item: any, index: number) => (
              <Card key={index} height="medium" width="medium" background="light-1" elevation="large">
                <CardHeader pad="medium"><UserManager size="40px" color="black" />
                  <Text size='30px' weight='bold' color='black'>{item.node.name}</Text>
                </CardHeader>
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
    </>
  )
}