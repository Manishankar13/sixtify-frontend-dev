import { Stack } from "@mui/material";
import { AppBar, Button } from "@repo/shared-components";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AppBar> = {
  title: "shared-component/AppBar",
  tags: ["autodocs"],
  component: AppBar,
  argTypes: {
    drawerOpen: {
      control: "boolean",
    },
  },
  render: (args) => (
    <AppBar {...args}>
      <Stack gap="24px" direction="row" alignItems="center">
        <Button>Home</Button>
        <Button>About</Button>
        <Button>Contact</Button>
      </Stack>
    </AppBar>
  ),
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {
    drawerOpen: false,
  },
};

export const DrawerOpen: Story = {
  args: {
    drawerOpen: true,
  },
};
