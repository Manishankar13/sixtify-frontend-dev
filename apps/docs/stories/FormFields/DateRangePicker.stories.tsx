import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateRangePicker, dateFormats } from "@repo/shared-components";
import { Meta, StoryObj } from "@storybook/react";
import { DateTime } from "luxon";
import { FieldValues, useForm } from "react-hook-form";

const meta: Meta<typeof DateRangePicker> = {
  title: "shared-component/FormFields/DateRangePicker",
  component: DateRangePicker,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <Story />
      </LocalizationProvider>
    ),
  ],
  render: (args) => {
    const { control } = useForm<FieldValues>({
      defaultValues: {
        dateField: DateTime.now().toISODate(),
      },
    });
    return <DateRangePicker {...args} name="dateField" control={control} />;
  },
};

export default meta;

type Story = StoryObj<typeof DateRangePicker>;

export const DefaultDateRangerPicker: Story = {
  args: {
    label: "Select Date",
  },
};
