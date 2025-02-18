import { Typography } from "@mui/material";
import { Button, Dialog } from "@repo/shared-components";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof Dialog> = {
  title: "shared-component/Dialog/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    children: { control: false },
    isHideCloseIcon: { control: "boolean" },
    isHideDividers: { control: "boolean" },
  },
  args: {
    title: "Dialog Heading",
  },
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog {...args} open={open} onClose={() => setOpen(false)}>
          <Typography>Your content goes here 😊!</Typography>
        </Dialog>
      </>
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultDialog: Story = {};
export const WithoutCloseIcon: Story = {
  args: {
    isHideCloseIcon: true,
  },
};
export const WithoutDivider: Story = {
  args: {
    isHideDividers: true,
  },
};
