import React from "react";
import { Box, Text, Heading } from "grommet";
import { StatusBadge } from ".";

const statusColors: { [index: string]: string } = {
  Off: "status-critical",
  Suspended: "status-warning",
  On: "status-ok",
};

type Data = {
  name: string;
  count: number;
  On: number;
  Off: number;
  Suspended: number;
};

type VirtualMachinesCardProps = {
  data: Data;
};

type StatusKey = keyof Data;

const statusKeys: StatusKey[] = ["On", "Off", "Suspended"];

export const VirtualMachinesCard: React.FC<VirtualMachinesCardProps> = ({
  data,
  ...rest
}) => (
  <Box round pad="medium" direction="column" background="white" {...rest}>
    <Heading level="2" margin="none" size="small">
      {data.name}
    </Heading>
    <Text size="90px" weight="bold">
      {data.count}
    </Text>
    <Box gap="medium" pad={{ vertical: "small" }}>
      {statusKeys.map((status) => (
        <Box direction="row" align="center" key={status}>
          <StatusBadge size="xlarge" background={statusColors[status]} />
          <Box pad="xsmall">
            <Text size="small" color="dark-1" margin={{ left: "xsmall" }}>
              {status} ({data[status]})
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);
