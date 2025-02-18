import { Stack, Typography } from "@mui/material";
import { ActionCell, LoadingCell } from "@repo/shared-components";
import type { CustomCellRendererProps } from "ag-grid-react";
import { DateTime } from "luxon";
import type { AgColumnsArgs, AgColumnsWithActions } from "../../../../../../../../types/agGrid";
import type { DialogTypes } from "../../../../../../../../types/dialogs";
import { dateFormat } from "../../../../../../../../utils/date";
import type { IncomeTaxRegimePayload } from "./usegetIncomeTaxRegime";

type UseIncomeTaxColumns = {
  onAction: (actionType: DialogTypes, rowData: IncomeTaxRegimePayload) => void;
};

export const useIncomeTaxRegimeColumns = ({
  onAction,
  loading,
}: AgColumnsArgs<UseIncomeTaxColumns>) => {
  const columns: AgColumnsWithActions<IncomeTaxRegimePayload> = [
    {
      headerName: "Tax Regime",
      field: "regime_type",
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
      headerName: "Financial Year",
      field: "financial_year",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        if (value) {
          const startYear = DateTime.fromISO(value.start_date).toFormat("LLLL yyyy");

          const endYear = DateTime.fromISO(value.end_date).toFormat("LLLL yyyy")

          return `${startYear} - ${endYear}`;
        }
      },
      filter: "agTextColumnFilter",
      sortable: true,
    },
    {
      headerName: "Action By",
      field: "action_by",
      filter: "agTextColumnFilter",
      sortable: true,
      cellRenderer: ({ data }: CustomCellRendererProps<IncomeTaxRegimePayload>) => {
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
      maxWidth: 70,
      lockPinned: true,
      cellRenderer: ({ data }: CustomCellRendererProps<IncomeTaxRegimePayload>) => {
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
