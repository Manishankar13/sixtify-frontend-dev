import { Avatar, Stack, Typography, useTheme } from "@mui/material";
import { CheckBox, LoadingCell } from "@repo/shared-components";
import type { CustomCellRendererProps } from "ag-grid-react";
import type {
  AgColumnsArgs,
  AgColumnsWithActions,
} from "../../../../../../types/agGrid";

import { type MouseEvent } from "react";
import { useFormContext } from "react-hook-form";
import type { BulkAttendanceFormValues } from "../../../../../../app/transactions/attendance/bulk-attendance/page";
import { useNavigateToRoute } from "../../../../../../hooks/useNavigateToRoute";
import type { BulkAttendanceType } from "./useGetBulkAttendances";

type UseGetBulkAttendanceColumns = {
  loading: boolean;
  allBulkAttendanceData: BulkAttendanceType[];
  employeeIds: string[];
  handleSelect: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleSingleChecked: (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => void;
};

export const useGetBulkAttendanceColumns = ({
  loading,
  employeeIds,
  allBulkAttendanceData,
  handleSelect,
  handleSingleChecked,
}: AgColumnsArgs<UseGetBulkAttendanceColumns>) => {
  const theme = useTheme();

  const { butterflyBlue } = theme.palette.app.color;

  const { control } = useFormContext<BulkAttendanceFormValues>();

  const navigateToNewPage = useNavigateToRoute();

  const checkboxHeaderComponent = () => (
    <CheckBox
      name="checkAll"
      control={control}
      loading={loading}
      size="small"
      indeterminate={
        employeeIds.length && employeeIds.length < allBulkAttendanceData.length
          ? true
          : false
      }
      disabled={!allBulkAttendanceData.length}
      onClick={handleSelect}
    />
  );

  const columns: AgColumnsWithActions<BulkAttendanceType> = [
    {
      headerComponent: checkboxHeaderComponent,
      field: "selected",
      minWidth: 50,
      maxWidth: 50,
      cellRenderer: ({ data }: CustomCellRendererProps<BulkAttendanceType>) => {
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
      cellRenderer: ({ data }: CustomCellRendererProps<BulkAttendanceType>) => {
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
                    `/employee-management/employee/${data.id}?tab=attendance&type=day&view=list_view`
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
      minWidth: 200,
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
      minWidth: 200,
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
      minWidth: 200,
      headerName: "Reporting Manager",
      field: "reporting_manager_name",
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
      minWidth: 200,
      headerName: "Shift",
      field: "shift_type_name",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return <span>{value ? value : "-"}</span>;
      },
      sortable: true,
      filter: "agTextColumnFilter",
    },
  ];

  return { columns };
};
