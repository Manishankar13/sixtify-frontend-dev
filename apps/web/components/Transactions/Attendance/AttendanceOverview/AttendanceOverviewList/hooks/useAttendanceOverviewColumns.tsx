import { Avatar, Stack, Typography, useTheme } from "@mui/material";
import { LoadingCell } from "@repo/shared-components";
import type { CustomCellRendererProps } from "ag-grid-react";
import { type MouseEvent } from "react";
import { useNavigateToRoute } from "../../../../../../hooks/useNavigateToRoute";
import type {
  AgColumnsArgs,
  AgColumnsWithActions,
} from "../../../../../../types/agGrid";
import type { AttendanceEmployeeData } from "./useGetAttendanceOverViewEmployees";

type UseAttendanceColumns = {
  loading: boolean;
};

export const useAttendanceOverviewColumns = ({
  loading,
}: AgColumnsArgs<UseAttendanceColumns>) => {
  const theme = useTheme();

  const { butterflyBlue } = theme.palette.app.color;

  const navigateToNewPage = useNavigateToRoute();

  const columns: AgColumnsWithActions<AttendanceEmployeeData> = [
    {
      headerName: "Employee Code",
      field: "employee_code",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return value ?? "-";
      },
      filter: "agTextColumnFilter",
      sortable: true,
    },
    {
      headerName: "Punch Code",
      field: "punch_code",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return value ?? "-";
      },
      filter: "agTextColumnFilter",
      sortable: true,
    },
    {
      headerName: "Employee Name",
      field: "employee_name",
      minWidth: 250,
      cellRenderer: ({
        data,
      }: CustomCellRendererProps<AttendanceEmployeeData>) => {
        if (loading) {
          return <LoadingCell />;
        }

        return (
          <Stack direction="row" gap="10px" alignItems="center">
            <Avatar src={data?.avatar ?? ""} alt="Employee Photo" />
            <Typography
              sx={{
                width: "100%",
                cursor: "pointer",
                color: butterflyBlue[900],
              }}
              onMouseDown={(e: MouseEvent<HTMLSpanElement>) => {
                navigateToNewPage(
                  e,
                  `/transactions/attendance/attendance-overview/attendance-details/employee/${data?.id}?type=day&view=list_view`
                );
              }}
            >
              {data?.employee_name ?? "-"}
            </Typography>
          </Stack>
        );
      },
      filter: "agTextColumnFilter",
      sortable: true,
    },
    {
      headerName: "Department",
      field: "department_name",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return value ?? "-";
      },
      filter: "agTextColumnFilter",
      sortable: true,
    },
    {
      headerName: "Sub Department",
      field: "sub_department_name",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return value ?? "-";
      },
      filter: "agTextColumnFilter",
      sortable: true,
    },
    {
      headerName: "Designation",
      field: "designation_name",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return value ?? "-";
      },
      filter: "agTextColumnFilter",
      sortable: true,
    },
    {
      headerName: "Reporting Manager",
      field: "reporting_manager_name",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return value ?? "-";
      },
      filter: "agTextColumnFilter",
      sortable: true,
    },
    {
      headerName: "Shifts",
      field: "shift_type_name",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return value ?? "-";
      },
      filter: "agTextColumnFilter",
      sortable: true,
    },
  ];

  return { columns };
};
