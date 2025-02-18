import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DatePicker, dateFormats } from "@repo/shared-components";
import { Meta, StoryObj } from "@storybook/react";
import { DateTime } from "luxon";
import { FieldValues, useForm } from "react-hook-form";

const meta: Meta<typeof DatePicker> = {
  title: "shared-component/FormFields/DatePicker",
  component: DatePicker,
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
      options: [dateFormats.dateWithISO8601, dateFormats.dateWithEuropean],
      control: { type: "select" },
    },
  },
  render: (args) => {
    const { control } = useForm<FieldValues>({
      defaultValues: {
        dateField: DateTime.now().toISODate(),
      },
    });
    return <DatePicker {...args} name="dateField" control={control} />;
  },
  args: {
    label: "Select Date",
    required: false,
    disabled: false,
    readOnly: false,
    error: false,
    helperText: "",
    loading: false,
    format: dateFormats.dateWithEuropean,
  },
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const DefaultDatePicker: Story = {
  args: {
    label: "Select Date",
  },
};

export const RequiredDatePicker: Story = {
  args: {
    label: "Required Date",
    required: true,
    helperText: "This field is required",
  },
};

export const DisabledDatePicker: Story = {
  args: {
    label: "Disabled Date",
    disabled: true,
    helperText: "This field is disabled",
  },
};

export const LoadingDatePicker: Story = {
  args: {
    label: "Loading Date Picker",
    loading: true,
  },
};

export const ErrorDatePicker: Story = {
  args: {
    label: "Error Date Picker",
    error: true,
    helperText: "Invalid date",
  },
};

export const ReadOnlyDatePicker: Story = {
  args: {
    label: "Read-Only Date Picker",
    readOnly: true,
  },
};
