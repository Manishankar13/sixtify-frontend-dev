import { FilterPill } from "@repo/shared-components";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta: Meta<typeof FilterPill> = {
  title: "shared-component/Chips/FilterPill",
  component: FilterPill,
  tags: ["autodocs"],
  args: {
    label: "FilterPill",
  },
};

export default meta;

type Story = StoryObj<typeof FilterPill>;

export const DefaultFilterPill: Story = {};

export const FilterPillWithDeleteIcon: Story = {
  args: {
    onDelete: fn(),
  },
};
