import React from "react"
import { Box, Grid, Text, Heading } from "grommet"
export default function UtilizationTable({ utilization }: any) {
  console.log(utilization)
  return (
    <Box pad="medium">
      <Grid gap="medium">
        {utilization?.map((data: any, index: any) => (
          <Box
            round
            pad="medium"
            direction="column"
            background="white"
            key={index}
          >
            <Box gap="small">
              <Heading level="2" margin="none" size="small">
                {data.name}
              </Heading>
              <Text color="gray" size="small">
                {" "}
                {data.id}{" "}
              </Text>
              <Text color="gray" size="small">
                {" "}
                {data.value}{" "}
              </Text>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  )
}
