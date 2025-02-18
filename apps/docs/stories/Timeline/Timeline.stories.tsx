import { Timeline } from "@repo/shared-components";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Timeline> = {
  title: "shared-component/Timeline/Timeline",
  component: Timeline,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Timeline>;

export const DefaultTimeline: Story = {
  args: {
    totalDots: 24,
    highlightedIntervals: [
      {
        in_time: "2024-11-18T04:00:04.000Z",
        out_time: "2024-11-18T07:00:04.000Z",
        status_type: "present",
      },
      {
        in_time: "2024-11-18T08:00:04.000Z",
        out_time: "2024-11-18T09:00:04.000Z",
        status_type: "leave",
      },
      {
        in_time: "2024-11-18T10:00:04.000Z",
        out_time: "2024-11-18T13:00:04.000Z",
        status_type: "present",
      },
    ],
    startTimeline: "2024-11-17T22:30:04.000Z",
    shiftStartTime: "2024-11-18T03:00:04.000Z",
    shiftEndTime: "2024-11-18T13:00:04.000Z",
  },
};
