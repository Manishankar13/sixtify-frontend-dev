import { CheckBox } from "@repo/shared-components";
import { Meta, StoryObj } from "@storybook/react";
import { FieldValues, useForm } from "react-hook-form";

const meta: Meta<typeof CheckBox> = {
  title: "shared-component/FormFields/CheckBox",
  component: CheckBox,
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: {
        type: "select",
      },
    },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
  args: {
    size: "medium",
    loading: false,
    disabled: false,
  },
  render: (args) => {
    const { control } = useForm<FieldValues>({
      defaultValues: {
        example: false,
      },
    });
    return <CheckBox {...args} name="example" control={control} />;
  },
};
export default meta;

type Story = StoryObj<typeof CheckBox>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const LoadingState: Story = {
  args: {
    loading: true,
  },
};

export const SmallSize: Story = {
  args: {
    size: "small",
  },
};

export const LargeSize: Story = {
  args: {
    size: "large",
  },
};
