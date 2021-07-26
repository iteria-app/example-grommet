import React from "react";

import { Box } from "grommet"
//TODO return this lines
// import { useAllUtilizationQuery } from '../../generated/graphql'
import UtilizationTable from "./UtilizationTable";

export const GeneratedUtilization: React.FC = () => {
  //TODO return this lines
  // const [result] = useAllUtilizationQuery()
  // const { data, error, fetching } = result;
  // if (error) return <p>Oh no... {error.message}</p>;
  // console.log(data)
  return (
    <Box>
      <h1>Generated utilization</h1>
      {/* //TODO return this lines */}
      {/* <UtilizationTable utilization={fetching ? [] : data?.utilization} /> */}
    </Box>
  );
};
