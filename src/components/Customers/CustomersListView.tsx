import React from 'react'
import { createClient, Provider } from 'urql'
import { Box } from 'grommet'
import { CustomersLoader } from './CustomersLoader'

export const CustomerListView = () => {
  const client = createClient({
    url: 'https://iteria-app-example01.herokuapp.com/v1/graphql',
  })


  return (
    <Box fill background='light-3'>
      <Box flex overflow='auto' gap='medium' pad='medium'>
        <Provider value={client}>
          <CustomersLoader />
        </Provider>
      </Box>
    </Box>
  )
}