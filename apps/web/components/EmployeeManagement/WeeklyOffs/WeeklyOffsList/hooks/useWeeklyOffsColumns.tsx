import { Stack, Typography } from "@mui/material";
import { ActionCell, LoadingCell } from "@repo/shared-components";
import type { CustomCellRendererProps } from "ag-grid-react";
import type {
  AgColumnsArgs,
  AgColumnsWithActions,
} from "../../../../../types/agGrid";
import type { DialogTypes } from "../../../../../types/dialogs";
import { dateFormat } from "../../../../../utils/date";
import type { WeeklyOffs } from "./useGetWeeklyOffs";

type UseWeeklyOffsColumns = {
  onAction: (actionType: DialogTypes, rowData: WeeklyOffs) => void;
};

export const useWeeklyOffsColumns = ({
  onAction,
  loading,
}: AgColumnsArgs<UseWeeklyOffsColumns>) => {
  const columns: AgColumnsWithActions<WeeklyOffs> = [
    {
      headerName: "Company Name",
      field: "company_name",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return value;
      },
      filter: "agTextColumnFilter",
      sortable: true,
    },
    {
      headerName: "Weekly Off Name",
      field: "weekly_off_type_name",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return value;
      },
      filter: "agTextColumnFilter",
      sortable: true,
    },
    {
      headerName: "Description",
      field: "description",
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
      headerName: "Weekly Off Day",
      field: "weekly_off_days",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return value;
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
      cellRenderer: ({ data }: CustomCellRendererProps<WeeklyOffs>) => {
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
    {
      headerName: "",
      field: "action",
      sortable: false,
      pinned: "right",
      lockPinned: true,
      maxWidth: 70,
      cellRenderer: ({ data }: CustomCellRendererProps<WeeklyOffs>) => {
        if (loading || !data) {
          return <LoadingCell />;
        }

        const items = [
          { title: "View", onClick: () => onAction("view", data) },
          { title: "Edit", onClick: () => onAction("edit", data) },
          { title: "Delete", onClick: () => onAction("delete", data) },
        ];

        return <ActionCell items={items}></ActionCell>;
      },
    },
  ];

  return { columns };
};
