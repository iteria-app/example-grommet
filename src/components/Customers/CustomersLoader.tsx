import React, { useState } from 'react'
import { CustomersTable } from './CustomerTable'
import { useAllCustomersQuery } from '../../generated/graphql'
export const CustomersLoader: React.FC = () => {
  const [limit, setLimit] = useState<number>(2)
  const [result] = useAllCustomersQuery({ variables: { limit: limit } })
  const { data, error, fetching } = result
  
  if (error) return <p>Oh no... {error.message}</p>
  const customers = data?.customers

  const initialSkeleton: object[] = []
  const customersSkeleton = [ ...initialSkeleton, customers ]
  const onBottomScroll = () => {
    if (fetching === false) {
      setLimit(limit + 2)
    }
  }

  return (
    <div>
      <CustomersTable customers={fetching ? customersSkeleton[0] : customers} onBottomScroll={onBottomScroll} />
    </div>
  )
}