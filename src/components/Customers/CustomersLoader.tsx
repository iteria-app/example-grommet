import React, { useState } from 'react';
import { CustomersTable } from './CustomerTable'
import { useFilterCustomerGridDataQuery } from '../../generated/graphql'
export const CustomersLoader: React.FC = () => {
  const [sort, setSortCustomers] = React.useState<object>();
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [filter, setFilter] = useState<object>()
  const offset = page * pageSize
  const [result] = useFilterCustomerGridDataQuery({
    variables: { where: filter, limit: pageSize, offset: offset, order_by: sort }
  })
  const { data, error, fetching } = result

  if (error) return <p>Oh no... {error.message}</p>

  return (
    <div>
      <CustomersTable customers={fetching ? [] : data?.customers} />
    </div>
  )
}