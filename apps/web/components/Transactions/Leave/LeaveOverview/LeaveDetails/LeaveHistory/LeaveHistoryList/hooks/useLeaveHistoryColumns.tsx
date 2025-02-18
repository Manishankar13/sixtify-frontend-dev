import { alpha, Stack, Typography, useTheme } from "@mui/material";
import {
  ActionCell,
  Chip,
  LoadingCell,
  Tooltip,
} from "@repo/shared-components";
import type { CustomCellRendererProps } from "ag-grid-react";
import { capitalize } from "lodash";
import type {
  AgColumnsArgs,
  AgColumnsWithActions,
} from "../../../../../../../../types/agGrid";
import type { DialogTypes } from "../../../../../../../../types/dialogs";
import { dateFormat } from "../../../../../../../../utils/date";
import { calculateLeaveDetails } from "../../../Dialogs/ApplyLeaveForm";
import { getColorByVariant } from "../../../LeaveBalance/colorVariant";
import type { LeaveRequestData } from "../../../PendingLeaveRequests/PendingLeaveRequestsList/hooks/useGetPendingLeaveRequests";
import { formatDateRange } from "../../../PendingLeaveRequests/PendingLeaveRequestsList/hooks/usePendingLeaveRequestsColumns";

type UseLeaveHistoryColumns = {
  loading: boolean;
  onAction: (actionType: DialogTypes, rowData: LeaveRequestData) => void;
};

export const useLeaveHistoryColumns = ({
  onAction,
  loading,
}: AgColumnsArgs<UseLeaveHistoryColumns>) => {
  const theme = useTheme();

  const { butterflyBlue } = theme.palette.app.color;

  const columns: AgColumnsWithActions<LeaveRequestData> = [
    {
      sortable: false,
      headerName: "Leave Date/Days",
      field: "from_date",
      cellRenderer: ({ data }: CustomCellRendererProps<LeaveRequestData>) => {
        if (loading) {
          return <LoadingCell />;
        }

        if (!data) {
          return null;
        }

        return (
          <Stack>
            <Typography variant="body2">
              {" "}
              {data.from_date &&
                data.to_date &&
                formatDateRange(data.from_date, data.to_date)}
            </Typography>

            <Typography
              color={butterflyBlue[400]}
              fontWeight={400}
              variant="body2"
            >
              {data.from_date &&
                data.to_date &&
                calculateLeaveDetails(
                  data.from_date,
                  data.to_date,
                  data.from_half,
                  data.to_half,
                  true
                )}
            </Typography>
          </Stack>
        );
      },
    },
    {
      maxWidth: 120,
      headerName: "Leave Type",
      field: "leave_type",
      sortable: false,
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return (
          <Typography variant="body2">
            {value ? capitalize(value) : "-"}
          </Typography>
        );
      },
    },
    {
      maxWidth: 140,
      headerName: "Leave Name",
      field: "leave_type_name",
      sortable: false,
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return value;
      },
    },
    {
      headerName: "Request By",
      field: "applied_by",
      sortable: false,
      cellRenderer: ({ data }: CustomCellRendererProps<LeaveRequestData>) => {
        if (loading) {
          return <LoadingCell />;
        }

        if (!data) {
          return null;
        }

        return (
          <Stack>
            <Typography variant="body2">{data.applied_by}</Typography>

            <Typography
              color={butterflyBlue[400]}
              fontWeight={400}
              variant="body2"
            >
              {data.applied_at ? dateFormat(data.applied_at) : "-"}
            </Typography>
          </Stack>
        );
      },
    },
    {
      headerName: "Leave Remark",
      field: "reason",
      sortable: false,
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return (
          <Tooltip toolTipLabel={value}>
            <Typography variant="body2" color={butterflyBlue[400]}>
              {value}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      maxWidth: 150,
      headerName: "Status",
      field: "status",
      sortable: false,
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return (
          <Chip
            label={value ? capitalize(value) : "-"}
            sx={{
              width: "fit-content",
              color: getColorByVariant(value),
              backgroundColor: alpha(
                getColorByVariant(value) ?? "transparent",
                0.2
              ),
            }}
          />
        );
      },
    },
    {
      headerName: "Action By",
      field: "action_by",
      sortable: false,
      cellRenderer: ({ data }: CustomCellRendererProps<LeaveRequestData>) => {
        if (loading) {
          return <LoadingCell />;
        }

        if (!data) {
          return null;
        }

        return (
          <Stack>
            {data.action_by ? (
              <>
                <Typography variant="body2">{data.action_by}</Typography>
                <Typography
                  color={butterflyBlue[400]}
                  fontWeight={400}
                  variant="body2"
                >
                  {data.action_at ? dateFormat(data.action_at) : "-"}
                </Typography>
              </>
            ) : (
              "-"
            )}
          </Stack>
        );
      },
    },
    {
      headerName: "Remark",
      field: "action_reason",
      sortable: false,
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return (
          <Tooltip toolTipLabel={value}>
            <Typography variant="body2" color={butterflyBlue[400]}>
              {value}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      headerName: "",
      field: "action",
      pinned: "right",
      sortable: false,
      maxWidth: 100,
      cellRenderer: ({ data }: CustomCellRendererProps<LeaveRequestData>) => {
        if (loading || !data) {
          return <LoadingCell />;
        }

        const items = [
          { title: "View", onClick: () => onAction("view", data) },
          ...(data.status !== "cancelled" && data.status !== "rejected"
            ? [{ title: "Cancel", onClick: () => onAction("cancel", data) }]
            : []),
        ];

        return <ActionCell items={items}></ActionCell>;
      },
    },
  ];

  return { columns };
};
