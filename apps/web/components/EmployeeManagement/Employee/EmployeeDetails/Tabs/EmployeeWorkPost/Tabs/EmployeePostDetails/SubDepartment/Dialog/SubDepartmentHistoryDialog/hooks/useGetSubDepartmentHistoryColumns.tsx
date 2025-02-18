import { Chip, Stack } from "@mui/material";
import { LoadingCell } from "@repo/shared-components";
import type { CustomCellRendererProps } from "ag-grid-react";
import type {
  AgColumnsArgs,
  AgColumnsWithActions,
} from "../../../../../../../../../../../../types/agGrid";
import { dateFormat } from "../../../../../../../../../../../../utils/date";
import {
  type Histories,
  StatusOptions,
  StatusColorOptions,
} from "../../../../../EmployeeOrganizationDetails/hooks/useGetOrganizationHistory";

type UseSubDepartmentColumns = {
  loading: boolean;
};

export const useGetSubDepartmentHistoryColumns = ({
  loading,
}: AgColumnsArgs<UseSubDepartmentColumns>) => {
  const column: AgColumnsWithActions<Histories> = [
    {
      headerName: "Sub Department",
      field: "name",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return value ? value : "-";
      },
      sortable: true,
    },
    {
      headerName: "Status",
      field: "status",
      cellRenderer: ({ data }: CustomCellRendererProps<Histories>) => {
        if (loading) {
          return <LoadingCell />;
        }

        if (!data) {
          return null;
        }

        return (
          <Chip
            label={StatusOptions[data.status]}
            size="small"
            color={StatusColorOptions[data.status]}
            variant="outlined"
          />
        );
      },
      sortable: true,
    },
    {
      headerName: "Effective From",
      field: "effective_from",
      // eslint-disable-next-line sonarjs/function-return-type
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return dateFormat(value, true) ?? "-";
      },
      sortable: true,
    },
    {
      headerName: "Effective To",
      field: "effective_to",
      // eslint-disable-next-line sonarjs/function-return-type
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return value ? dateFormat(value, true) : "No End Date Yet";
      },
      sortable: true,
    },
    {
      headerName: "Remark",
      field: "remark",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return value ?? "-";
      },
      sortable: true,
    },
    {
      headerName: "Change Date",
      field: "action_at",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return <Stack>{dateFormat(value) ?? "-"}</Stack>;
      },
      sortable: true,
    },
    {
      headerName: "Action By",
      field: "action_by",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return value ?? "";
      },
    },
  ];

  return { column };
};
