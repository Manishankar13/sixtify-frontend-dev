import { Avatar, Stack, Typography, useTheme } from "@mui/material";
import { CheckBox, LoadingCell } from "@repo/shared-components";
import type { CustomCellRendererProps } from "ag-grid-react";
import { type MouseEvent } from "react";
import { useFormContext } from "react-hook-form";
import type { ShiftDayFormValues } from "../../../../../../app/transactions/shift-day/shift-day-allocation/page";
import { useNavigateToRoute } from "../../../../../../hooks/useNavigateToRoute";
import type { AgColumnsWithActions } from "../../../../../../types/agGrid";
import type { ShiftDayType } from "./useGetShiftDayList";

type UseShiftDayListColumns = {
  combinedData: ShiftDayType[];
  employeeIds: string[];
  loading: boolean;
  handleSelect: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleSingleChecked: (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => void;
};

export const useShiftDayListColumns = ({
  loading,
  handleSelect,
  handleSingleChecked,
  employeeIds,
  combinedData,
}: UseShiftDayListColumns) => {
  const theme = useTheme();

  const { butterflyBlue } = theme.palette.app.color;

  const { control } = useFormContext<ShiftDayFormValues>();

  const navigateToNewPage = useNavigateToRoute();

  const checkboxHeaderComponent = () => {
    return (
      <CheckBox
        name="checkAll"
        control={control}
        size="small"
        onClick={handleSelect}
        indeterminate={
          (employeeIds.length && employeeIds.length < combinedData.length) ||
          false
        }
        disabled={!combinedData.length}
      />
    );
  };

  const columns: AgColumnsWithActions<ShiftDayType> = [
    {
      headerComponent: checkboxHeaderComponent,
      field: "selected",
      minWidth: 50,
      maxWidth: 50,
      cellRenderer: ({ data }: CustomCellRendererProps<ShiftDayType>) => {
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
            size="small"
            onClick={(event) => handleSingleChecked(event, data.id)}
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
      cellRenderer: ({ data }: CustomCellRendererProps<ShiftDayType>) => {
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
                {data.employee_name
                  ? `${data.employee_name} (${data.employee_code})`
                  : "-"}
              </Typography>
            </Stack>
          </Stack>
        );
      },
      filter: "agTextColumnFilter",
      sortable: true,
      floatingFilter: false,
    },
    {
      minWidth: 200,
      headerName: "Department",
      field: "department_name",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return <span>{value ? value : "-"}</span>;
      },
      sortable: true,
      filter: "agTextColumnFilter",
      floatingFilter: false,
    },
    {
      minWidth: 200,
      headerName: "Sub Department",
      field: "sub_department_name",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return <span>{value ? value : "-"}</span>;
      },
      sortable: true,
      filter: "agTextColumnFilter",
      floatingFilter: false,
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
      floatingFilter: false,
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
      floatingFilter: false,
    },
    {
      minWidth: 200,
      headerName: "Weekly Off",
      field: "weekly_off_type_name",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return <span>{value ? value : "-"}</span>;
      },
      sortable: true,
      filter: "agTextColumnFilter",
      floatingFilter: false,
    },
    {
      minWidth: 200,
      headerName: "Holiday",
      field: "holiday_group_name",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return <span>{value ? value : "-"}</span>;
      },
      sortable: true,
      filter: "agTextColumnFilter",
      floatingFilter: false,
    },
  ];

  return { columns };
};
