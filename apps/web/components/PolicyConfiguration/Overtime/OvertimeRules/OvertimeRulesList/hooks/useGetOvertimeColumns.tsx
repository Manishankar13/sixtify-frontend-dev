import { Stack, Typography } from "@mui/material";
import { ActionCell, LoadingCell } from "@repo/shared-components";
import type { CustomCellRendererProps } from "ag-grid-react";
import type {
  AgColumnsArgs,
  AgColumnsWithActions,
} from "../../../../../../types/agGrid";
import type { DialogTypes } from "../../../../../../types/dialogs";
import { dateFormat } from "../../../../../../utils/date";
import type { OvertimeRules } from "./useGetOvertimeRulesList";

type OvertimeRulesListColumnsArgs = {
  onAction?: (actionType: DialogTypes, rowData: OvertimeRules) => void;
};

export const useGetOvertimeRulesListColumns = ({
  onAction,
  loading,
}: AgColumnsArgs<OvertimeRulesListColumnsArgs>) => {
  const column: AgColumnsWithActions<OvertimeRules> = [
    {
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
      headerName: "Overtime Rule",
      field: "overtime_rule_name",
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
      headerName: "Overtime Rule Code",
      field: "overtime_rule_code",
      filter: "agTextColumnFilter",
      sortable: true,
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return value ? value : "-";
      },
    },
    {
      headerName: "Action By",
      field: "action_by",
      filter: "agTextColumnFilter",
      sortable: true,
      cellRenderer: ({ data }: CustomCellRendererProps<OvertimeRules>) => {
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
      cellRenderer: ({ data }: CustomCellRendererProps<OvertimeRules>) => {
        if (loading || !data) {
          return <LoadingCell />;
        }

        const items = [
          {
            title: "View",
            onClick: () => onAction && onAction("view", data),
          },
          {
            title: "Edit",
            onClick: () => onAction && onAction("edit", data),
          },
          {
            title: "Delete",
            onClick: () => onAction && onAction("delete", data),
          },
        ];

        return <ActionCell items={items}></ActionCell>;
      },
    },
  ];

  return { column };
};
