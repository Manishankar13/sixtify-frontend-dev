import { FilterList } from "@repo/shared-components";
import { FilterListType } from "@repo/shared-components/src/FilterList/FilterTypeWrapper";
import { Meta, StoryObj } from "@storybook/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

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

const meta: Meta<typeof FilterList> = {
  title: "shared-component/FilterList/FilterList",
  component: FilterList,
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
  },
};

export default meta;

type Story = StoryObj<typeof FilterList>;

export const DefaultFilterList: Story = {};
