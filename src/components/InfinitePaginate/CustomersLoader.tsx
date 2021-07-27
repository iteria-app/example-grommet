import React, { useState } from 'react'
import { CustomerPaginate } from './CustomerPaginate'
import { usePaginateAllCustomersQuery } from '../../generated/graphql'
export const CustomersLoader: React.FC = () => {
  const paginationStep = 2
  const [first, setFirst] = useState<number>(4)
  const [result] = usePaginateAllCustomersQuery({ variables: { first: first } })
  const { data, error, fetching } = result
  
  if (error) return <p>Oh no... {error.message}</p>
  const customers = data?.customer_connection?.edges
  console.log(data?.customer_connection,'data?.customer_connection'); 

  const onBottomScroll = () => {
    if (fetching === false) {
      setFirst(first + paginationStep)
    }
  }

  return (
    <div>
      <CustomerPaginate customers={customers} paginationStep={paginationStep} onBottomScroll={onBottomScroll} />
    </div>
  )
}