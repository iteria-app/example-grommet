import React, { useState } from 'react';
import { CustomersTable } from './CustomerTable'
import { useFilterCustomerGridDataQuery } from '../../generated/graphql'

export const CustomersLoader: React.FC = () => {
  const [sort, setSortCustomers] = useState<object>();
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(3);
  const [filter, setFilter] = useState<object>()
  const offset = page * pageSize
  const [result] = useFilterCustomerGridDataQuery({
    variables: { where: filter, limit: pageSize, offset: offset, order_by: sort }
  })

  const { data, error } = result

  const totalCustomers: number | null = data?.customerAggregate?.aggregate?.count || null

  if (error) return <p>Oh no... {error.message}</p>

  const onSortCustomers = (sort: object) => {
    setSortCustomers(sort)
  }

  const onChangePageCustomers = (page: number) => {
    setPage(page - 1)
  }

  const onPageSize = (pageSize: number) => {
    setPageSize(pageSize)
  }

  const onFilterCustomers = (query: object) => {
    setFilter(query)
  }

  return (
    <div>
      <CustomersTable customers={data?.customers} totalCustomers={totalCustomers} offset={offset} page={page} onPageSize={onPageSize} onSortCustomers={onSortCustomers} onFilterCustomers={onFilterCustomers} pageSize={pageSize} onChangePageCustomers={onChangePageCustomers}/>
    </div>
  )
}