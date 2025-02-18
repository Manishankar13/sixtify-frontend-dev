import { Meta, StoryObj } from "@storybook/react";
import { RadioGroupField, TextField } from "@repo/shared-components";
import { useForm, FieldValues } from "react-hook-form";
import { Box, Stack, Typography } from "@mui/material";

const meta: Meta<typeof RadioGroupField> = {
  title: "shared-component/FormFields/RadioGroupField",
  component: RadioGroupField,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
    },
    options: {
      control: "object",
    },
    loading: {
      control: "boolean",
    },
    size: {
      options: ["small", "medium"],
      control: { type: "select" },
    },
    direction: {
      options: ["row", "column"],
      control: { type: "select" },
    },
    color: {
      options: ["primary", "secondary"],
      control: { type: "select" },
    },
  },
  render: (args) => {
    const { control } = useForm<FieldValues>({
      defaultValues: {
        radioOption: "",
      },
    });
    return <RadioGroupField {...args} control={control} name="radioOption" />;
  },
  args: {
    label: "Choose an option",
    options: [
      { values: "option1", label: "Option 1", disabled: false },
      { values: "option2", label: "Option 2", disabled: false },
      { values: "option3", label: "Option 3", disabled: false },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof RadioGroupField>;

export const DefaultRadioGroupField: Story = {
  args: {
    label: "Default Radio Group",
    size: "small",
    color: "secondary",
    loading: false,
  },
};

export const DisabledRadioOptions: Story = {
  args: {
    label: "Radio Group with Disabled Option",
    size: "small",
    color: "primary",
    options: [
      { values: "option1", label: "Option 1", disabled: true },
      { values: "option2", label: "Option 2", disabled: true },
      { values: "option3", label: "Option 3", disabled: true },
    ],
  },
};

export const LoadingRadioGroupField: Story = {
  args: {
    label: "Loading Radio Group",
    loading: true,
    size: "small",
    color: "secondary",
  },
};

export const RequiredRadioGroupField: Story = {
  args: {
    label: "Required Radio Group",
    size: "medium",
    color: "primary",
    required: true,
  },
};

export const RadioGroupFieldColumnDirection: Story = {
  args: {
    label: "Required Radio Group",
    size: "medium",
    color: "primary",
    required: true,
  },
};

export const RadioGroupFieldWithReactNodeOptions: Story = {
  args: {
    size: "medium",
    color: "primary",
    label: "",
    options: [
      {
        values: "option1",
        label: (
          <Typography variant="body1">Radio Button with TextField</Typography>
        ),
        disabled: false,
      },
    ],
  },
  render: (args) => {
    const { control } = useForm<FieldValues>({
      defaultValues: {
        textFieldValue: "",
        radioOption: "",
      },
    });

    return (
      <Stack gap="10px" direction="row">
        <RadioGroupField {...args} control={control} name="radioOption" />
        <TextField
          name="textFieldValue"
          control={control}
          variant="outlined"
          placeholder="Enter additional details"
        />
      </Stack>
    );
  },
};

export const RadioGroupFieldPropsWithLabelDescription: Story = {
  args: {
    size: "medium",
    color: "primary",
    label: "",
    options: [
      {
        values: "option1",
        label: (
          <Stack gap="5px">
            <Typography variant="body1">
              Radio Button with Description
            </Typography>
            <Typography variant="body2">Additional details</Typography>
          </Stack>
        ),
        disabled: false,
      },
    ],
  },
  render: (args) => {
    const { control } = useForm<FieldValues>({
      defaultValues: {
        example: "",
      },
    });

    return <RadioGroupField {...args} name="example" control={control} />;
  },
};
