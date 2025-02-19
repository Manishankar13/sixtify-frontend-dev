import { Stack, Typography, useTheme } from "@mui/material";
import { ActionCell, LoadingCell } from "@repo/shared-components";
import type { CustomCellRendererProps } from "ag-grid-react";
import type {
  AgColumnsArgs,
  AgColumnsWithActions,
} from "../../../../../../../types/agGrid";
import type { DialogTypes } from "../../../../../../../types/dialogs";
import { dateFormat } from "../../../../../../../utils/date";
import type { IncomeTaxRegime } from "./useGetIncomeTaxRegime";

type IncomeTaxRegimeColumns = {
  onAction: (actionType: DialogTypes, rowData: IncomeTaxRegime) => void;
};

export const useIncomeTaxRegimeColumns = ({
  onAction,
  loading,
}: AgColumnsArgs<IncomeTaxRegimeColumns>) => {
  const theme = useTheme();

  const column: AgColumnsWithActions<IncomeTaxRegime> = [
    {
      headerName: "Tax Regime",
      field: "regime_type",
      cellRenderer: ({ data }: CustomCellRendererProps<IncomeTaxRegime>) => {
        if (loading) {
          return <LoadingCell />;
        }

        const { butterflyBlue } = theme.palette.app.color;

        return (
          <Typography
            sx={{
              cursor: "pointer",
              color: butterflyBlue[900],
            }}
          >
            {data?.regime_type ?? "-"}
          </Typography>
        );
      },
      filter: "agTextColumnFilter",
      sortable: true,
    },
    {
      headerName: "Financial Year",
      field: "financial_year.start_date",
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
      headerName: "Action By",
      field: "action_by",
      filter: "agTextColumnFilter",
      sortable: true,
      cellRenderer: ({ data }: CustomCellRendererProps<IncomeTaxRegime>) => {
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
      cellRenderer: ({ data }: CustomCellRendererProps<IncomeTaxRegime>) => {
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

  return { column };
};
