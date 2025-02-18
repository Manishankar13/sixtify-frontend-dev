import { Typography } from "@mui/material";
import { LoadingCell } from "@repo/shared-components";
import { formatDate } from "@repo/shared-components/src/utils/date";
import type { CustomCellRendererProps } from "ag-grid-react";
import type {
  AgColumnsArgs,
  AgColumnsWithActions,
} from "../../../../../../../types/agGrid";
import type { LeaveBalanceType } from "../../hooks/useGetLeaveDetails";

type UseLeaveHistoryColumns = {
  loading: boolean;
};

export type LeaveHistoryType = LeaveBalanceType & {
  id: string;
  transaction_date: string;
  balance_changes: string;
  balance: string;
  log_type: string;
};
export const useGetLeaveHistoryColumns = ({
  loading,
}: AgColumnsArgs<UseLeaveHistoryColumns>) => {
  const column: AgColumnsWithActions<LeaveHistoryType> = [
    {
      headerName: "Transaction Date",
      field: "transaction_date",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return (
          <Typography variant="body2">
            {value ? formatDate(value, "dd-MMM-yyyy") : "-"}
          </Typography>
        );
      },
      sortable: true,
    },
    {
      headerName: "Leave Balance Change",
      field: "balance_changes",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return value ? value : "-";
      },
      sortable: true,
    },
    {
      headerName: "Balance",
      field: "balance",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return value ? value : "-";
      },
      sortable: true,
    },
    {
      headerName: "Activity Type",
      field: "log_type",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return value ? value : "-";
      },
      sortable: true,
    },
  ];

  return { column };
};
