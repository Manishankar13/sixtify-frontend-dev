import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box } from "@mui/material";
import { Drawer, type MenuItem } from "@repo/shared-components";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const menuItems: MenuItem[] = [
  {
    key: "home",
    title: "Home",
    icon: <HomeIcon />,
    onClick: fn(),
  },
  {
    key: "settings",
    title: "Settings",
    icon: <SettingsIcon />,
    onClick: fn(),
  },
  {
    key: "about",
    title: "About",
    icon: <InfoIcon />,
    onClick: fn(),
  },
];

const meta: Meta<typeof Drawer> = {
  title: "shared-component/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  argTypes: {
    currentPathname: {
      options: ["/home", "/settings", "/about"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    menuItems,
    currentPathname: "/home",
  },
  render: (args) => {
    return (
      <Box sx={{ height: "100vh" }}>
        <Drawer {...args} />
      </Box>
    );
  },
};

export default meta;

type Story = StoryObj<typeof Drawer>;

export const OpenDrawer: Story = {
  args: {
    open: true,
  },
};
export const ClosedDrawer: Story = {
  args: {
    open: false,
  },
};

export const DrawerWithSubmenu: Story = {
  args: {
    open: true,
    menuItems: [
      ...menuItems,
      {
        key: "nested",
        title: "Nested Menu",
        icon: <SettingsIcon />,
        menuItems: [
          {
            key: "nested-1",
            title: "Nested Item 1",
            onClick: fn(),
          },
          {
            key: "nested-2",
            title: "Nested Item 2",
            onClick: fn(),
          },
        ],
      },
    ],
  },
};
