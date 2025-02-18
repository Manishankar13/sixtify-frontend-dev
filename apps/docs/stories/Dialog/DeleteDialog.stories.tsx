import { Button, DeleteDialog } from "@repo/shared-components";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof DeleteDialog> = {
  title: "shared-component/Dialog/DeleteDialog",
  component: DeleteDialog,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
  },
  args: {
    title: "Do you want to Delete this?",
  },
  render: (args) => {
    const [open, setOpen] = useState(args.open);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Delete Dialog</Button>
        <DeleteDialog {...args} open={open} onClose={() => setOpen(false)} />
      </>
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultDialog: Story = {};
