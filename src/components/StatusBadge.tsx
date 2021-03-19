import React from "react";
import { Box } from "grommet";
import { BackgroundType } from "grommet/utils";

type StatusBadgeProps = {
  background: BackgroundType
  size?: string
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ background = "status-unknown", ...rest }) => (
  <Box
    width="12px"
    height="12px"
    round="small"
    background={background}
    {...rest}
  />
);
