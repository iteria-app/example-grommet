import React from 'react';
import { Box, Pagination } from 'grommet'

export const CustomerPagination: React.FC<any> = ({page, pageSize, handlePage, totalCustomers}) => {
  return (
    <Box align={'center'}>
    <Pagination
      numberItems={totalCustomers}
      page={page + 1}
      step={pageSize}
      onChange={handlePage}
      // pad="medium"
      margin="0 auto"
    />
  </Box>
  )
} 