import { Indicator } from "@repo/shared-components";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Indicator> = {
  title: "shared-component/Indicator",
  component: Indicator,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "holiday",
        "weekly_off",
        "paid_leave",
        "absent",
        "unpaid_leave",
      ],
    },
  },
  args: {
    variant: "holiday",
  },
};

export default meta;

type Story = StoryObj<typeof Indicator>;

export const DefaultIndicator: Story = {
  args: {
    label: "Holiday",
  },
};
