import { Avatar, Stack, Typography, useTheme } from "@mui/material";
import { CheckBox, LoadingCell } from "@repo/shared-components";
import type { CustomCellRendererProps } from "ag-grid-react";
import { type MouseEvent } from "react";
import { useFormContext } from "react-hook-form";
import type { PenaltyRulesAllocationFormValues } from "../../../../../../app/policy-configuration/attendance/penalty-rule-allocation/page";
import { useNavigateToRoute } from "../../../../../../hooks/useNavigateToRoute";
import type {
  AgColumnsArgs,
  AgColumnsWithActions,
} from "../../../../../../types/agGrid";
import type { PenaltyRulesAllocationListType } from "./useGetPenaltyRulesAllocationList";

type UseGetPenaltyRulesAllocationColumns = {
  loading: boolean;
  penaltyRulesList: PenaltyRulesAllocationListType[];
  employeeIds: string[];
  handleSelect: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleSingleChecked: (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => void;
};

export const useGetPenaltyRulesAllocationColumns = ({
  loading,
  employeeIds,
  penaltyRulesList,
  handleSelect,
  handleSingleChecked,
}: AgColumnsArgs<UseGetPenaltyRulesAllocationColumns>) => {
  const theme = useTheme();

  const { butterflyBlue } = theme.palette.app.color;

  const navigateToNewPage = useNavigateToRoute();

  const { control } = useFormContext<PenaltyRulesAllocationFormValues>();

  const checkboxHeaderComponent = () => (
    <CheckBox
      name="checkAll"
      control={control}
      loading={loading}
      size="small"
      indeterminate={
        employeeIds.length && employeeIds.length < penaltyRulesList.length
          ? true
          : false
      }
      disabled={!penaltyRulesList.length}
      onClick={handleSelect}
    />
  );

  const columns: AgColumnsWithActions<PenaltyRulesAllocationListType> = [
    {
      headerComponent: checkboxHeaderComponent,
      field: "selected",
      minWidth: 50,
      maxWidth: 50,
      cellRenderer: ({
        data,
      }: CustomCellRendererProps<PenaltyRulesAllocationListType>) => {
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
      }: CustomCellRendererProps<PenaltyRulesAllocationListType>) => {
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
            sx={{ cursor: "pointer" }}
          >
            <Stack direction="row" gap="10px" alignItems="center">
              <Avatar src={data.avatar} alt="Employee Photo" />
              <Typography
                sx={{
                  width: "100%",
                  color: butterflyBlue[900],
                }}
                onMouseDown={(e: MouseEvent<HTMLSpanElement>) => {
                  navigateToNewPage(
                    e,
                    `/employee-management/employee/${data.id}?tab=work-post-type&subtab=scheme-details&view=list`
                  );
                }}
              >
                {data.employee_name ?? "-"}
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
      headerName: "Attendance Penalty Rule",
      field: "attendance_penalty_rule_name",
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
