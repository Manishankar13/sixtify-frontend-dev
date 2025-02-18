import { AgGrid } from "@repo/shared-components";
import { Meta, StoryObj } from "@storybook/react";
import { ColDef } from "ag-grid-community";

const column: ColDef[] = [
  {
    headerName: "Id",
    field: "id",
    sortable: false,
    width: 150,
  },
  {
    headerName: "name",
    field: "name",
    width: 150,
  },
  {
    headerName: "age",
    field: "age",
    width: 150,
  },
];

const rowData = [
  { id: 1, name: "John", age: 25 },
  { id: 2, name: "Jane", age: 30 },
  { id: 3, name: "Bob", age: 40 },
];

const meta: Meta<typeof AgGrid> = {
  title: "shared-component/AgGrid",
  component: AgGrid,
  tags: ["autodocs"],
  argTypes: {
    height: { control: "text" },
    totalRecords: { control: "number" },
    rowModelType: { control: "select", options: ["clientSide", "infinite"] },
    ref: { control: false },
    overlayNoRowsTemplate: { control: false },
  },
  args: {
    rowData,
    rowModelType: "clientSide",
  },
};

export default meta;

type Story = StoryObj<typeof AgGrid>;

export const DefaultAgGrid: Story = {
  args: {
    rowModelType: "clientSide",
    totalRecords: 3,
  },
  render: (args) => {
    return <AgGrid {...args} columnDefs={column} height="500px" />;
  },
};

export const NoRecordsAgGridWithOverlay: Story = {
  args: {
    rowData: [],
    overlayNoRowsTemplate: '<span class="no-rows">No records to display</span>',
  },
  render: (args) => {
    return <AgGrid {...args} columnDefs={column} height="500px" />;
  },
};
