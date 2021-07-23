import React from 'react'
import { CustomersTable } from './CustomerTable'
import { useAllCustomersQuery } from '../../generated/graphql'
export const CustomersLoader: React.FC = () => {
  const [result] = useAllCustomersQuery()
  const { data, error, fetching } = result

  if (error) return <p>Oh no... {error.message}</p>

  return (
    <div>
      <CustomersTable customers={fetching ? [] : data?.customers} />
    </div>
  )
}