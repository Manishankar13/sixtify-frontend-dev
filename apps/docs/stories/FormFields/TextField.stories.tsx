import { TextField } from "@repo/shared-components";
import { Meta, StoryObj } from "@storybook/react";
import { FieldValues, useForm } from "react-hook-form";

const meta: Meta<typeof TextField> = {
  title: "shared-component/FormFields/TextField",
  component: TextField,
  tags: ["autodocs"],
  argTypes: {
    type: {
      options: ["text", "number", "password"],
      control: { type: "select" },
    },
    label: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
    loading: {
      control: "boolean",
    },
    required: {
      control: "boolean",
    },
    isCapitalize: {
      control: "boolean",
    },
    isTrimStartDisabled: {
      control: "boolean",
    },
  },
  render: (args) => {
    const { control } = useForm<FieldValues>({
      values: {
        example: "",
      },
    });
    return <TextField {...args} name="example" control={control} />;
  },
  args: {
    placeholder: "Type here...",
  },
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const DefaultTextField: Story = {
  args: {
    label: "Default Label",
    type: "text",
    isCapitalize: false,
    isTrimStartDisabled: false,
    required: false,
    disabled: false,
  },
};

export const NumberField: Story = {
  args: {
    label: "Number Field",
    type: "number",
    isCapitalize: false,
    isTrimStartDisabled: true,
    required: false,
    disabled: false,
  },
};

export const CapitalizedTextField: Story = {
  args: {
    label: "Capitalized Text Field",
    type: "text",
    isCapitalize: true,
    isTrimStartDisabled: false,
    required: false,
    disabled: false,
  },
};

export const LoadingTextField: Story = {
  args: {
    label: "Loading State",
    loading: true,
    required: false,
    disabled: true,
  },
};

export const PasswordField: Story = {
  args: {
    label: "Password",
    type: "password",
    isCapitalize: false,
    isTrimStartDisabled: false,
    required: true,
  },
};
export const TextInputValidation: Story = {
  args: {
    label: "Text Input Validation",
    type: "text",
    isCapitalize: false,
    isTrimStartDisabled: false,
    required: true,
    error: true,
    helperText: "This filed is required",
  },
};
