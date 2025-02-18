import { Stack, Typography } from "@mui/material";
import { Card, DeleteAction, EditAction } from "@repo/shared-components";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Card> = {
  title: "shared-component/Card/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    heading: { control: "text" },
    action: { control: false },
    children: { control: false },
  },
  args: {
    heading: "Card Heading",
  },
  render: (args) => (
    <Card {...args}>
      <Typography>This is the card content</Typography>
    </Card>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultCard: Story = {};

export const ActionCard: Story = {
  args: {
    action: (
      <Stack direction="row">
        <EditAction />
        <DeleteAction />
      </Stack>
    ),
  },
};
