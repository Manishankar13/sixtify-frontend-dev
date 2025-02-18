import { AttendanceCard } from "@repo/shared-components";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AttendanceCard> = {
  title: "shared-component/Card/AttendanceCard",
  component: AttendanceCard,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
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

type Story = StoryObj<typeof AttendanceCard>;

export const DefaultIndicator: Story = {
  args: {
    label: "Holiday",
    value: "03 Days",
    isPending: false,
  },
};
