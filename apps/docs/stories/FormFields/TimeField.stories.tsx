import { Meta, StoryObj } from "@storybook/react";
import { useForm, FieldValues } from "react-hook-form";
import { DateTime } from "luxon";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { TimeField } from "@repo/shared-components";

const meta: Meta<typeof TimeField> = {
  title: "shared-component/FormFields/TimeField",
  component: TimeField,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <Story />
      </LocalizationProvider>
    ),
  ],
  argTypes: {
    label: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    error: { control: "boolean" },
    helperText: { control: "text" },
    loading: { control: "boolean" },
    format: {
      options: ["HH:mm", "hh:mm a"],
      control: { type: "select" },
    },
  },
  render: (args) => {
    const { control } = useForm<FieldValues>({
      defaultValues: {
        timeField: DateTime.now().toISOTime(),
      },
    });
    return <TimeField {...args} name="timeField" control={control} />;
  },
  args: {
    label: "Select Time",
    required: false,
    disabled: false,
    readOnly: false,
    error: false,
    helperText: "",
    loading: false,
    format: "HH:mm",
  },
};

export default meta;

type Story = StoryObj<typeof TimeField>;

export const DefaultTimeField: Story = {
  args: {
    label: "Select Time",
  },
};

export const RequiredTimeField: Story = {
  args: {
    label: "Required Time",
    required: true,
    helperText: "This field is required",
  },
};

export const DisabledTimeField: Story = {
  args: {
    label: "Disabled Time Picker",
    disabled: true,
  },
};

export const ReadOnlyTimeField: Story = {
  args: {
    label: "Read-Only Time Picker",
    readOnly: true,
  },
};
