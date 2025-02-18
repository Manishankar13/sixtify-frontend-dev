import { StepperV2 } from "@repo/shared-components";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof StepperV2> = {
  title: "shared-component/Stepper/StepperV2",
  component: StepperV2,
  tags: ["autodocs"],
  argTypes: {
    activeStep: {
      description: "Set the active step (zero-based index).",
      control: { type: "number", min: -1 },
      defaultValue: 0,
    },
    orientation: {
      description: "The component orientation (layout flow direction).",
      control: {
        type: "select",
        options: ["horizontal", "vertical"],
      },
      defaultValue: "horizontal",
    },
    alternativeLabel: {
      description:
        "If true and orientation is horizontal, step label will be under the icon.",
      control: { type: "boolean" },
      defaultValue: false,
    },
    stepLabelProps: {
      description: "Props applied to the StepLabel component.",
      control: { type: "object" },
      defaultValue: {},
    },
  },
};

export default meta;

type Story = StoryObj<typeof StepperV2>;

export const CustomizedSteppers: Story = {
  args: {
    steps: ["Step 1", "Step 2", "Step 3"],
  },
};
