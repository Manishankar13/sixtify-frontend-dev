import { ChipWithBorder } from "@repo/shared-components";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ChipWithBorder> = {
  title: "shared-component/Chips/ChipWithBorder",
  component: ChipWithBorder,
  tags: ["autodocs"],
  args: {
    label: "P",
    color: "hsla(136, 59%, 49%, 1)",
  },
};

export default meta;

type Story = StoryObj<typeof ChipWithBorder>;

export const DefaultChipWithBorder: Story = {};
