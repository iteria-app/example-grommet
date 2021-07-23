import React from "react";
import {
  Anchor,
  Box,
  DropButton,
  Menu,
  ResponsiveContext,
  Text
} from "grommet";
import { Down } from "grommet-icons";
import { UserMenu } from ".";
import { User, Items } from ".";



type AppHeaderProps = {
  appName: string;
  appIcon: any;
  userSession: { user: User, items: Items[] };
  open?: boolean
}

export const AppHeader: React.FC<AppHeaderProps> = ({ appName, appIcon, userSession, open }) => (
  <Box
    flex={false}
    tag="header"
    direction="row"
    background="white"
    align="center"
    justify="between"
    responsive={false}
  >
    <DropButton
      open={open}
      onClose={() => { }}
      dropContent={
        <Box pad="small">
          <Text size="medium" margin="small">
            Settings
          </Text>
          <Text size="medium" margin="small">
            Switch Server
          </Text>
          <Text size="medium" margin="small">
            Documention
          </Text>
          <Box direction="row" justify="between">
            <Text size="medium" margin="small">
              Logout
            </Text>
            {userSession && (
              <UserMenu
                alignSelf="center"
                user={userSession.user}
                items={userSession.items}
              />
            )}
          </Box>
        </Box>
      }
    >
      <Box
        pad={{ horizontal: "medium", vertical: "small" }}
        responsive={false}
        direction="row"
        align="center"
        gap="small"
      >
        <Text>{appName}</Text>
        <Down color="brand" size="small" />
      </Box>
    </DropButton>
    <ResponsiveContext.Consumer>
      {responsive =>
        responsive === "small" ? (
          <Menu
            dropAlign={{ right: "right", top: "top" }}
            label="view"
            items={[
              { label: "Activity", href: "#" },
              { label: "Utilization", href: "#" },
              { label: "Virtual Machines", href: "#" }
            ]}
          />
        ) : (
          <Box
            margin={{ left: "medium" }}
            round="xsmall"
            background={{ color: "white", opacity: "weak" }}
            direction="row"
            align="center"
            pad={{ horizontal: "small" }}
          >
            <Anchor href="" label="Activity" margin="small" />
            <Anchor href="" label="Utilization" margin="small" />
            <Anchor href="" label="Virtual Machines" margin="small" />
            <Anchor href="/customers" label="Customers" margin="small" />
          </Box>
        )
      }
    </ResponsiveContext.Consumer>
  </Box>
);
