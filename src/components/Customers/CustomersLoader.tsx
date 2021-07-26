import React, { useState } from 'react'
import { CustomersTable } from './CustomerTable'
import { useAllCustomersQuery } from '../../generated/graphql'
export const CustomersLoader: React.FC = () => {
  const paginationStep = 2
  const [limit, setLimit] = useState<number>(paginationStep)
  const [result] = useAllCustomersQuery({ variables: { limit: limit } })
  const { data, error, fetching } = result
  
  if (error) return <p>Oh no... {error.message}</p>
  const customers = data?.customers

  const initialSkeleton: object[] = []
  const skeletonFromCustomers = [ ...initialSkeleton, customers ]

  const customersSkeleton = () => {
    if(skeletonFromCustomers){
      return skeletonFromCustomers[0]
    }
    return []
  }
  
  const onBottomScroll = () => {
    if (fetching === false) {
      setLimit(limit + paginationStep)
    }
  }

  return (
    <div>
      <CustomersTable customers={fetching ? customersSkeleton() : customers} paginationStep={paginationStep} onBottomScroll={onBottomScroll} />
    </div>
  )
}