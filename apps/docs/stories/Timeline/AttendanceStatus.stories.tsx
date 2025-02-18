import { AttendanceStatus } from "@repo/shared-components";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AttendanceStatus> = {
  title: "shared-component/Timeline/AttendanceStatus",
  component: AttendanceStatus,
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
    variant: "Holiday",
  },
};

export default meta;

type Story = StoryObj<typeof AttendanceStatus>;

export const DefaultTimelineStatus: Story = {};
