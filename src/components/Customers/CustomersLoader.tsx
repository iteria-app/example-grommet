import React, { useState } from 'react'
import { CustomersTable } from './CustomerTable'
import { useAllCustomersQuery } from '../../generated/graphql'
export const CustomersLoader: React.FC = () => {
  const [limit, setLimit] = useState<number>(2)
  const [customerPostion, setCustomerPosition] = useState<number>(1)
  const [result] = useAllCustomersQuery({ variables: { limit: limit } })
  const { data, error, fetching } = result
  
  // if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>
  const customers = data?.customers
  const totalCustomers = data?.customerAggregate?.aggregate?.count
  // console.log(totalCustomers,'totalCustomers');  


  const initialSkeleton: object[] = []
  const skeleton = [ ...initialSkeleton, customers ]
  // c.push(customers)

  const onBottomScroll = () => {
    if (fetching === false && customers && totalCustomers) {
      if (limit <= totalCustomers) {
        // setCustomerPosition(limit)
        setLimit(limit + 2)
        console.log('all datas');
      }
    }
  }
  // console.log(newArr,'newArr');  

  // const skeleton = [{name:"...loading"},{name:"...loading"},{name:"...loading"},{name:"...loading"},{name:"...loading"},{name:"...loading"},{name:"...loading"},{name:"...loading"},{name:"...loading"},{name:"...loading"}]
  // skeleton.length = limit
  // console.log(skeleton,'skeleton length'); 

  return (
    <div>
      {/* <CustomersTable customers={fetching ? [] : customers} limit={limit} onBottomScroll={onBottomScroll} customerPostion={customerPostion} /> */}
      <CustomersTable customers={fetching ? skeleton[0] : customers} limit={limit} onBottomScroll={onBottomScroll} customerPostion={customerPostion} />
    </div>
  )
}