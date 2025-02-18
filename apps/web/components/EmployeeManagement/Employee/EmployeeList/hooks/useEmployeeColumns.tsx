import { Avatar, Stack, Typography, useTheme } from "@mui/material";
import { ActionCell, Chip, LoadingCell } from "@repo/shared-components";
import type { CustomCellRendererProps } from "ag-grid-react";
import { capitalize } from "lodash";
import { useMemo, type MouseEvent } from "react";
import type {
  AgColumnsArgs,
  AgColumnsWithActions,
} from "../../../../../types/agGrid";
import { dateFormat } from "../../../../../utils/date";
import type { Employee } from "./useGetEmployees";

type UseEmployeeColumns = {
  loading: boolean;
  isDraft: boolean;
  handleClickOnEmployee: (
    employeeId: string,
    e: MouseEvent<HTMLSpanElement>
  ) => void;

  onAction: (type: string, rowData: Employee) => void;
};

export const useEmployeeColumns = ({
  loading,
  isDraft,
  onAction,
  handleClickOnEmployee,
}: AgColumnsArgs<UseEmployeeColumns>) => {
  const theme = useTheme();

  const { butterflyBlue } = theme.palette.app.color;

  const columnsWithoutDraft: AgColumnsWithActions<Employee> = [
    {
      pinned: "left",
      width: 150,
      maxWidth: 300,
      headerName: "Emp Code",
      field: "employee_code",
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
      pinned: "left",
      width: 150,
      maxWidth: 300,
      headerName: "Pun Code",
      field: "punch_code",
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
      pinned: "left",
      minWidth: 360,
      headerName: "Employee Name",
      field: "employee_name",
      cellRenderer: ({ data }: CustomCellRendererProps<Employee>) => {
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
                onMouseDown={(e) => handleClickOnEmployee(data.id, e)}
              >
                {data.employee_name ?? "-"}
              </Typography>
            </Stack>

            {isDraft && (
              <Chip
                label="Draft"
                size="small"
                color="error"
                variant="outlined"
              />
            )}
          </Stack>
        );
      },
      filter: "agTextColumnFilter",
      sortable: true,
    },
    {
      minWidth: 200,
      headerName: "Joining Date",
      field: "joining_date",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return (
          <Typography variant="body2">
            {value ? dateFormat(value, true) : "-"}
          </Typography>
        );
      },
      filter: "agDateColumnFilter",
      sortable: true,
    },
    {
      minWidth: 200,
      headerName: "Date of Birth",
      field: "date_of_birth",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return (
          <Typography variant="body2">
            {value ? dateFormat(value, true) : "-"}
          </Typography>
        );
      },
      filter: "agDateColumnFilter",
      sortable: true,
    },
    {
      minWidth: 300,
      headerName: "Email",
      field: "email",
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
      headerName: "Mobile No",
      field: "mobile_no",
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
      headerName: "Company Name",
      field: "company_name",
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
      headerName: "Business Unit Name",
      field: "business_unit_name",
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
      headerName: "Location Name",
      field: "business_unit_location_name",
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
      headerName: "Department Name",
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
      headerName: "Sub Department Name",
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
      minWidth: 300,
      headerName: "Designation Name",
      field: "designation_name",
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
      headerName: "Grade Name",
      field: "grade_name",
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
      headerName: "Work Type Name",
      field: "work_type_name",
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
      headerName: "Skill Type Name",
      field: "skill_type_name",
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
      headerName: "Reporting Manager Name",
      field: "reporting_manager_name",
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
      minWidth: 150,
      headerName: "Payment Type",
      field: "payment_type",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return <span>{value ? capitalize(value) : "-"}</span>;
      },
      filterParams: {
        defaultOption: "equals",
        filterOptions: ["equals"],
      },
      filter: "agTextColumnFilter",
      sortable: true,
    },
    {
      minWidth: 200,
      headerName: "Bank Name",
      field: "bank_name",
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
      headerName: "Pan Card No",
      field: "pan_card_no",
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
      headerName: "Aadhaar Card No",
      field: "aadhaar_card_no",
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
      headerName: "Uan No",
      field: "uan_no",
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
      headerName: "Action By",
      field: "action_by",
      filter: "agTextColumnFilter",
      sortable: true,
      cellRenderer: ({ data }: CustomCellRendererProps<Employee>) => {
        if (loading) {
          return <LoadingCell />;
        }

        if (!data) {
          return null;
        }

        return (
          <Stack>
            <Typography variant="body2">{data.action_by}</Typography>

            <Typography variant="body2">
              {dateFormat(data.action_at)}
            </Typography>
          </Stack>
        );
      },
    },
  ];

  const draftColumns: AgColumnsWithActions<Employee> = [
    {
      headerName: "",
      field: "action",
      sortable: false,
      pinned: "right",
      maxWidth: 70,
      lockPinned: true,
      cellRenderer: ({ data }: CustomCellRendererProps<Employee>) => {
        if (loading || !data) {
          return <LoadingCell />;
        }

        const items = [
          { title: "Edit", onClick: () => onAction("edit", data) },
          { title: "Delete", onClick: () => onAction("delete", data) },
        ];

        return <ActionCell items={items}></ActionCell>;
      },
    },
  ];

  const columns = useMemo(() => {
    return isDraft
      ? [...columnsWithoutDraft, ...draftColumns]
      : [...columnsWithoutDraft];
  }, [isDraft, loading]);

  return { columns };
};
