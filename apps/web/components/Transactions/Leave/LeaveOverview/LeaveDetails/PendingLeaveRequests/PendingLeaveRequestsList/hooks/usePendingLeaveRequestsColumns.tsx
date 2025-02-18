import {
  CancelOutlined,
  CheckCircleOutlineOutlined,
} from "@mui/icons-material";
import { Stack, Typography, useTheme } from "@mui/material";
import {
  ActionCell,
  Chip,
  LoadingCell,
  Tooltip,
} from "@repo/shared-components";
import { formatDate } from "@repo/shared-components/src/utils/date";
import type { CustomCellRendererProps } from "ag-grid-react";
import { capitalize } from "lodash";
import { DateTime } from "luxon";
import type {
  AgColumnsArgs,
  AgColumnsWithActions,
} from "../../../../../../../../types/agGrid";
import type { DialogTypes } from "../../../../../../../../types/dialogs";
import { dateFormat } from "../../../../../../../../utils/date";
import { calculateLeaveDetails } from "../../../Dialogs/ApplyLeaveForm";
import type { LeaveRequestData } from "./useGetPendingLeaveRequests";

type UsePendingLeaveRequestsColumns = {
  loading: boolean;
  onAction: (actionType: DialogTypes, rowData: LeaveRequestData) => void;
};

export const formatDateRange = (fromDate: string, toDate: string): string => {
  const from = DateTime.fromISO(fromDate);

  const to = DateTime.fromISO(toDate);

  if (from.hasSame(to, "month")) {
    return `${formatDate(fromDate, "dd")} - ${formatDate(toDate, "dd MMM, yyyy")}`;
  }

  return `${formatDate(fromDate, "dd MMM")} - ${formatDate(toDate, "dd MMM, yyyy")}`;
};

export const usePendingLeaveRequestsColumns = ({
  onAction,
  loading,
}: AgColumnsArgs<UsePendingLeaveRequestsColumns>) => {
  const theme = useTheme();

  const { butterflyBlue, darkOrange } = theme.palette.app.color;

  const columns: AgColumnsWithActions<LeaveRequestData> = [
    {
      minWidth: 200,
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
      maxWidth: 150,
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
      maxWidth: 200,
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
      minWidth: 350,
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
              color: darkOrange[900],
              backgroundColor: darkOrange[600],
            }}
          />
        );
      },
    },
    {
      headerName: "",
      field: "action",
      pinned: "right",
      sortable: false,
      maxWidth: 150,
      cellStyle: { justifyContent: "center" },
      cellRenderer: ({ data }: CustomCellRendererProps<LeaveRequestData>) => {
        if (loading || !data) {
          return <LoadingCell />;
        }

        const items = [
          { title: "Edit", onClick: () => onAction("edit", data) },
          { title: "View", onClick: () => onAction("view", data) },
          { title: "Cancel", onClick: () => onAction("cancel", data) },
        ];

        return (
          <Stack direction="row" gap="10px" alignItems="center">
            <CheckCircleOutlineOutlined
              fontSize="medium"
              color="success"
              style={{ cursor: "pointer" }}
              onClick={() => onAction("approve", data)}
            />

            <CancelOutlined
              fontSize="medium"
              color="error"
              style={{ cursor: "pointer" }}
              onClick={() => onAction("reject", data)}
            />

            <ActionCell items={items} />
          </Stack>
        );
      },
    },
  ];

  return { columns };
};
