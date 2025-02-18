import { FilterListV2 } from "@repo/shared-components";
import { FilterListType } from "@repo/shared-components/src/FilterList/FilterTypeWrapper";
import { Meta, StoryObj } from "@storybook/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { fn } from "@storybook/test";

const filterList: FilterListType[] = [
  {
    label: "Single AutoComplete",
    key: "status",
    value: "",
    type: "autoComplete",
    options: [
      {
        value: "active",
        label: "Active",
      },
      {
        value: "pending",
        label: "Pending",
      },
    ],
  },
  {
    label: "Job Title",
    key: "jobtitle",
    value: "",
    type: "text",
  },
  {
    label: "Multi AutoComplete",
    key: "persona",
    value: "",
    type: "autoComplete",
    multiSelect: true,
    options: [
      {
        value: "ituser",
        label: "IT User",
      },
      {
        value: "itadmin",
        label: "IT Admin",
      },
    ],
  },
  {
    label: "Date",
    key: "date",
    value: "",
    type: "date",
  },
  {
    label: "Date Range",
    key: "dateRange",
    value: "",
    type: "dateRange",
    menuInfo: "Start ~ End",
  },
  {
    key: "switch",
    label: "Switch",
    type: "switch",
    value: "",
  },
];

const meta: Meta<typeof FilterListV2> = {
  title: "shared-component/FilterList/FilterListV2",
  component: FilterListV2,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <Story />
      </LocalizationProvider>
    ),
  ],
  args: {
    filterListItems: filterList,
    onChange: fn(),
    onApply: fn(),
    onClear: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof FilterListV2>;

export const DefaultFilterListV2: Story = {};
