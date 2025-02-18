import { Autocomplete } from "@repo/shared-components";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { FieldValues, useForm } from "react-hook-form";

const meta: Meta<typeof Autocomplete> = {
  title: "shared-component/FormFields/Autocomplete",
  component: Autocomplete,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    isShowAvatar: { control: "boolean" },
    shouldCloseOnSelect: { control: "boolean" },
    label: { control: "text" },
    loading: { control: "boolean" },
    multiple: { control: "boolean" },
    error: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    required: false,
    label: "Select Option",
    loading: false,
    multiple: false,
    error: false,
    isShowAvatar: false,
    shouldCloseOnSelect: false,
    disabled: false,
    placeholder: "Choose an option",
    options: [
      {
        label: "Option 1",
        value: "option1",
        avatar:
          "https://sixtify.s3.amazonaws.com/1723787550246_androgynous-avatar-non-binary-queer-person.jpg",
      },
      { label: "Option 2", value: "option2", disabled: true },
      { label: "Option 3", value: "option3" },
    ],
  },
  render: (args) => {
    const { control } = useForm<FieldValues>({
      values: {
        example: "",
      },
    });
    return <Autocomplete {...args} name="example" control={control} />;
  },
};
export default meta;

type Story = StoryObj<typeof Autocomplete>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithAction: Story = {
  args: {
    onAction: fn(),
  },
};

export const MultipleSelection: Story = {
  args: {
    multiple: true,
  },
};

export const LoadingState: Story = {
  args: {
    loading: true,
  },
};

export const ErrorState: Story = {
  args: {
    error: true,
    required: true,
    helperText: "This field is required",
  },
};
