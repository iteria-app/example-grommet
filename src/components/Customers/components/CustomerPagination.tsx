import React from 'react';
import { Box, Pagination, Select } from 'grommet'
import { pageByTotalAndPageSize } from '../operations/pagination'

export const CustomerPagination: React.FC<any> = ({ page, pageSize, offset, handlePage, totalCustomers, onPageSize, onChangePageCustomers }) => {

  const pageSizeOptions = ['2', '3', '5', '6', '10']

  const handlePageSize = (pageSize: string) => {
    const pageSizeWithOffset = (pageSize + offset)
    if (pageSizeWithOffset > totalCustomers) {
      onChangePageCustomers(pageByTotalAndPageSize(parseInt(pageSize), totalCustomers))
    }
    onPageSize(parseInt(pageSize))
  }

  return (
    <>
      <Box align={'center'}>
        <Pagination
          numberItems={totalCustomers}
          page={page + 1}
          step={pageSize}
          onChange={handlePage}
          margin="0 auto"
        />
      </Box>
      <Box width="100px" margin="0 auto">
        <Select
          options={pageSizeOptions}
          value={pageSize.toString()}
          onChange={({ option }) => handlePageSize(option)}
          margin="30px 0 0"
        />
      </Box>
    </>
  )
}