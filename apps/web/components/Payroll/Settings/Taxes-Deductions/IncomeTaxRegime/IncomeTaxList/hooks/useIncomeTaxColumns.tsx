import { Stack, Typography } from "@mui/material";
import { ActionCell, LoadingCell } from "@repo/shared-components";
import type { CustomCellRendererProps } from "ag-grid-react";
import { DialogTypes } from "../../../../../../../types/dialogs";
import {
  AgColumnsArgs,
  AgColumnsWithActions,
} from "../../../../../../../types/agGrid";
import type { IncomeTax } from "./useGetIncomeTax";
import { dateFormat } from "../../../../../../../utils/date";

type UseIncomeTaxColumns = {
  onAction: (actionType: DialogTypes, rowData: IncomeTax) => void;
};

export const useIncomeTaxColumns = ({
  onAction,
  loading,
}: AgColumnsArgs<UseIncomeTaxColumns>) => {
  const columns: AgColumnsWithActions<IncomeTax> = [
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
          const startYear = new Date(value.start_date).getFullYear();
          const endYear = new Date(value.end_date).getFullYear();
          return `Apr ${startYear} - Mar ${endYear}`;
        }

        return "";
      },
      filter: "agTextColumnFilter",
      sortable: true,
    },
    {
      headerName: "Action By",
      field: "action_by",
      filter: "agTextColumnFilter",
      sortable: true,
      cellRenderer: ({ data }: CustomCellRendererProps<IncomeTax>) => {
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
      cellRenderer: ({ data }: CustomCellRendererProps<IncomeTax>) => {
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
