import { Avatar, Stack } from "@mui/material";
import { Button, LoadingCell } from "@repo/shared-components";
import type { CustomCellRendererProps } from "ag-grid-react";
import { type MouseEvent } from "react";
import { useNavigateToRoute } from "../../../../../../hooks/useNavigateToRoute";
import type {
  AgColumnsArgs,
  AgColumnsWithActions,
} from "../../../../../../types/agGrid";
import type { LeaveEmployeeData } from "./useGetLeaveOverviewEmployees";

type UseLeaveColumns = {
  loading: boolean;
};

export const useLeaveOverviewColumns = ({
  loading,
}: AgColumnsArgs<UseLeaveColumns>) => {
  const navigateToNewPage = useNavigateToRoute();

  const columns: AgColumnsWithActions<LeaveEmployeeData> = [
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
      minWidth: 300,
      cellRenderer: ({ data }: CustomCellRendererProps<LeaveEmployeeData>) => {
        if (loading) {
          return <LoadingCell />;
        }

        return (
          <Stack direction="row" gap="10px" alignItems="center">
            <Button
              variant="text"
              startIcon={
                <Avatar src={data?.avatar ?? ""} alt="Employee Photo" />
              }
              onMouseDown={(e: MouseEvent<HTMLSpanElement>) => {
                navigateToNewPage(
                  e,
                  `/transactions/leave/leave-overview/leave-details/employee/${data?.id}`
                );
              }}
            >
              {data?.employee_name ?? "-"}
            </Button>
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
      headerName: "Leave Plan",
      field: "leave_plan_name",
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
