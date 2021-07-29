import React from 'react';
import { Box, Spinner, Text } from 'grommet'

export const CustomerLoading: React.FC = () => {
  return (
    <Box
      fill
      align="center"
      justify="center"
      direction="row"
      pad="large"
      gap="small"
      background={{ color: 'background-front', opacity: 'strong' }}
    >
      <Spinner />
      <Text weight="bold">Loading ...</Text>
    </Box>
  )
}