import { SeverityIndicator } from "@repo/shared-components";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SeverityIndicator> = {
  title: "shared-component/Indicator/SeverityIndicator",
  component: SeverityIndicator,
  tags: ["autodocs"],
  argTypes: {
    isBackground: {
      options: [true, false],
      control: {
        type: "select",
      },
    },
  },
  args: {
    label: "Present",
    color: "hsla(136, 59%, 49%, 1)",
    isBackground: false,
  },
};

export default meta;

type Story = StoryObj<typeof SeverityIndicator>;

export const DefaultSeverityIndicator: Story = {};
