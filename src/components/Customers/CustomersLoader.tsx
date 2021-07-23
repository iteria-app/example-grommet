import React, { useState } from 'react'
import { CustomersTable } from './CustomerTable'
import { useAllCustomersQuery } from '../../generated/graphql'
export const CustomersLoader: React.FC = () => {
  const [limit, setLimit] = useState<number>(3)
  const [customerPostion, setCustomerPosition] = useState<number>(1)
  const [result] = useAllCustomersQuery({ variables: { limit: limit } })
  const { data, error, fetching } = result
  
  // if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>
  const customers = data?.customers
  // const totalCustomers = data?.customerAggregate?.aggregate?.count
  // console.log(totalCustomers,'totalCustomers');  


  const c:any = []
  const skeleton = [ ...c, customers ]
  // c.push(customers)

  const onBottomScroll = () => {
    if (fetching === false && customers) {
      // if (limit <= totalCustomers) {
        // setCustomerPosition(limit)
        setLimit(limit + 3)
        console.log('all datas');
      // }
    }
  }
  // console.log(newArr,'newArr');  

  // const skeleton = [{name:"...loading"},{name:"...loading"},{name:"...loading"},{name:"...loading"},{name:"...loading"},{name:"...loading"},{name:"...loading"},{name:"...loading"},{name:"...loading"},{name:"...loading"}]
  // skeleton.length = limit
  // console.log(skeleton,'skeleton length'); 

  return (
    <div>
      <CustomersTable customers={fetching ? skeleton[0] : customers} limit={limit} onBottomScroll={onBottomScroll} customerPostion={customerPostion} />
    </div>
  )
}