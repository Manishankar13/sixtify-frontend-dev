import { Avatar, Stack, Typography, useTheme } from "@mui/material";
import { CheckBox, LoadingCell } from "@repo/shared-components";
import type { CustomCellRendererProps } from "ag-grid-react";
import { type MouseEvent } from "react";
import { useFormContext, type FieldValues } from "react-hook-form";
import { useNavigateToRoute } from "../../../../../../hooks/useNavigateToRoute";
import type {
  AgColumnsArgs,
  AgColumnsWithActions,
} from "../../../../../../types/agGrid";
import type { BankShiftAllocationFormValues } from "../../BankShiftAllocationDetails";
import { type BankShiftAllocationType } from "./useGetBankShiftAllocation";

type UseBankShiftAllocationColumns = {
  allBankShiftAllocationData: BankShiftAllocationType[];
  employeeIds: string[];
  loading: boolean;
  externalFilter?: FieldValues;
  handleSelect: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleSingleChecked: (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => void;
};

export const useBankShiftAllocationColumns = ({
  allBankShiftAllocationData,
  employeeIds,
  loading,
  handleSelect,
  handleSingleChecked,
}: AgColumnsArgs<UseBankShiftAllocationColumns>) => {
  const theme = useTheme();

  const { butterflyBlue } = theme.palette.app.color;

  const navigateToNewPage = useNavigateToRoute();

  const { control } = useFormContext<BankShiftAllocationFormValues>();

  const checkboxHeaderComponent = () => (
    <CheckBox
      indeterminate={
        employeeIds.length &&
        employeeIds.length < allBankShiftAllocationData.length
          ? true
          : false
      }
      disabled={!allBankShiftAllocationData.length}
      name="checkAll"
      control={control}
      loading={loading}
      size="small"
      onClick={handleSelect}
    />
  );

  const columns: AgColumnsWithActions<BankShiftAllocationType> = [
    {
      headerComponent: checkboxHeaderComponent,
      field: "selected",
      minWidth: 50,
      maxWidth: 50,
      cellRenderer: ({
        data,
      }: CustomCellRendererProps<BankShiftAllocationType>) => {
        if (loading) {
          return <LoadingCell />;
        }

        if (!data) {
          return null;
        }

        return (
          <CheckBox
            name={`selectedRecords.${data.id}`}
            control={control}
            loading={loading}
            onClick={(event) => handleSingleChecked(event, data.id)}
            size="small"
          />
        );
      },
      sortable: false,
      filter: false,
    },
    {
      minWidth: 360,
      headerName: "Employee Name",
      field: "employee_name",
      cellRenderer: ({
        data,
      }: CustomCellRendererProps<BankShiftAllocationType>) => {
        if (loading) {
          return <LoadingCell />;
        }

        if (!data?.avatar && !data?.employee_name) {
          return null;
        }

        return (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            flex="1"
          >
            <Stack direction="row" gap="10px" alignItems="center">
              <Avatar src={data.avatar} alt="Employee Photo" />
              <Typography
                sx={{
                  width: "100%",
                  cursor: "pointer",
                  color: butterflyBlue[900],
                }}
                onMouseDown={(e: MouseEvent<HTMLSpanElement>) => {
                  navigateToNewPage(
                    e,
                    `/employee-management/employee/${data.id}?tab=work-post-type&subtab=scheme-details&view=list`
                  );
                }}
              >
                {data.employee_name ?? "-"} {` ( ${data.employee_code} )`}
              </Typography>
            </Stack>
          </Stack>
        );
      },
      filter: "agTextColumnFilter",
      sortable: true,
    },
    {
      minWidth: 300,
      headerName: "Department",
      field: "department_name",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return value ? value : "-";
      },
      filter: "agTextColumnFilter",
      sortable: true,
    },
    {
      minWidth: 300,
      headerName: "Sub Department",
      field: "sub_department_name",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return value ? value : "-";
      },
      filter: "agTextColumnFilter",
      sortable: true,
    },
    {
      minWidth: 200,
      headerName: "Designation",
      field: "designation_name",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return <span>{value ? value : "-"}</span>;
      },
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      minWidth: 300,
      headerName: "Bank Shift",
      field: "bank_shift_type_name",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return value ? value : "-";
      },
      filter: "agTextColumnFilter",
      sortable: true,
    },
  ];

  return { columns };
};
