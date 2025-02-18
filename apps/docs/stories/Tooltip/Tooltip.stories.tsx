import { Tooltip } from "@repo/shared-components";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Tooltip> = {
  title: "shared-component/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: "text",
      description: "Text to be displayed inside the tooltip",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const DefaultTooltip: Story = {
  args: {
    text: "This is a default tooltip",
  },
};

export const LongTextTooltip: Story = {
  args: {
    text: "This tooltip has a long text that will be truncated if it exceeds the maximum width of 150px.",
  },
};
