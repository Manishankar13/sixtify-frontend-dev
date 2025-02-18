import { Typography } from "@mui/material";
import { Button, BottomDialog } from "@repo/shared-components";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof BottomDialog> = {
  title: "shared-component/Dialog/BottomDialog",
  component: BottomDialog,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    children: { control: false },
    isHideCloseIcon: { control: "boolean" },
    isHideDividers: { control: "boolean" },
  },
  args: {
    title: "Bottom Dialog Heading",
  },
  render: (args) => {
    const [open, setOpen] = useState(args.open);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Bottom Dialog</Button>
        <BottomDialog {...args} open={open} onClose={() => setOpen(false)}>
          <Typography>Your content goes here 😊!</Typography>
        </BottomDialog>
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
