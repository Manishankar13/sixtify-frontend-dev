import { Stack } from "@mui/material";
import {
  DeleteAction,
  EditAction,
  ListItemButton,
} from "@repo/shared-components";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ListItemButton> = {
  title: "shared-component/FormFields/ListItemButton",
  component: ListItemButton,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    selected: { control: "boolean" },
    actions: { control: "object" },
  },
  args: {
    label: "List Item",
    selected: false,
  },
};

export default meta;

type Story = StoryObj<typeof ListItemButton>;

export const DefaultListItemButton: Story = {
  args: {
    label: "Default List Item",
    selected: false,
  },
};

export const SelectedListItemButton: Story = {
  args: {
    label: "Selected List Item",
    selected: true,
  },
};

export const ListItemButtonWithActions: Story = {
  args: {
    label: "List Item with Actions",
    actions: (
      <Stack direction="row">
        <EditAction />
        <DeleteAction />
      </Stack>
    ),
  },
};

export const ListItemButtonWithLongLabel: Story = {
  args: {
    label:
      "This is a list item with a very long label that should be truncated or shown in a tooltip",
  },
};
