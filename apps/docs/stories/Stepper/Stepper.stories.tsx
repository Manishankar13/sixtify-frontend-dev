import { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "@repo/shared-components";

const meta: Meta<typeof Stepper> = {
  title: "shared-component/Stepper/Stepper",
  component: Stepper,
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

type Story = StoryObj<typeof Stepper>;

export const DefaultStepper: Story = {
  args: {
    steps: ["Step 1", "Step 2", "Step 3"],
  },
};

export const HorizontalAlternativeLabel: Story = {
  args: {
    steps: ["Step 1", "Step 2", "Step 3"],
    orientation: "horizontal",
    alternativeLabel: true,
  },
};

export const VerticalStepper: Story = {
  args: {
    steps: ["Step 1", "Step 2", "Step 3"],
    orientation: "vertical",
  },
};

export const ErrorStep: Story = {
  args: {
    steps: ["Step 1", "Step 2 (Error)", "Step 3"],
    activeStep: 1,
    stepLabelProps: { error: true },
  },
};

export const CustomActiveStepIcon: Story = {
  args: {
    steps: ["Step 1", "Step 2", "Step 3"],
    activeStep: 1,
    showActiveStepIcon: true,
  },
};
