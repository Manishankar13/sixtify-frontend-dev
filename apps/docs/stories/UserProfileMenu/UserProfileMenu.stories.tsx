import { AccountCircle, Logout, Settings } from "@mui/icons-material";
import { UserProfileMenu } from "@repo/shared-components";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta: Meta<typeof UserProfileMenu> = {
  title: "shared-component/UserProfileMenu",
  component: UserProfileMenu,
  tags: ["autodocs"],
  argTypes: {
    userDetails: { control: "object" },
    menuItems: {
      control: {
        type: "object",
      },
    },
  },
  args: {
    userDetails: {
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    menuItems: [],
  },
};

export default meta;

type Story = StoryObj<typeof UserProfileMenu>;

export const DefaultUserProfileMenu: Story = {
  args: {
    userDetails: {
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    menuItems: [],
  },
};

export const UserProfileMenuWithItems: Story = {
  args: {
    userDetails: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      avatar: "https://i.pravatar.cc/150?img=10",
    },
    menuItems: [
      {
        key: "profile",
        label: "Profile",
        icon: <AccountCircle />,
        onClick: fn(),
      },
      {
        key: "settings",
        label: "Settings",
        icon: <Settings />,
        onClick: fn(),
      },
      {
        key: "logout",
        label: "Logout",
        icon: <Logout />,
        divider: true,
        onClick: fn(),
      },
    ],
  },
};

export const UserProfileMenuWithDividers: Story = {
  args: {
    userDetails: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    menuItems: [
      {
        key: "profile",
        label: "Profile",
        icon: <AccountCircle />,
        onClick: fn(),
      },
      {
        key: "divider1",
        label: "",
        divider: true,
      },
      {
        key: "settings",
        label: "Settings",
        icon: <Settings />,
        onClick: fn(),
      },
      {
        key: "divider2",
        label: "",
        divider: true,
      },
      {
        key: "logout",
        label: "Logout",
        icon: <Logout />,
        onClick: fn(),
      },
    ],
  },
};
