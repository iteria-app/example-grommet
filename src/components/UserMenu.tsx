import React from "react";

import { Menu, Text } from "grommet";

import { Avatar } from ".";
import { AlignSelfType } from "grommet/utils";

export interface User{
  name?: string , 
  thumbnail?: string
}

export interface Items{
  label: string,
  href: string
  }

interface UserMenuProps{
  user: User,
  items: Items[],
  alignSelf?: AlignSelfType
}

export const UserMenu: React.FC<UserMenuProps> = ({ user = {}, items = [] , ...rest }) => {
  return(
  <Menu
    dropAlign={{ top: "bottom", right: "right" }}
    icon={false}
    items={items.map(item => ({
      ...item,
      label: <Text size="small">{item.label}</Text>,
      onClick: () => {} // no-op
    }))}
    label={<Avatar name={user.name} thumbnail={user.thumbnail} />}
    {...rest}
  />
);}

