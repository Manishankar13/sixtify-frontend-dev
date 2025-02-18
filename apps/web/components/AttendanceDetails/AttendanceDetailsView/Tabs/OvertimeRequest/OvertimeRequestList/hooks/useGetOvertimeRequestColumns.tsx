import {
  CancelOutlined,
  CheckCircleOutlineOutlined,
} from "@mui/icons-material";
import { alpha, Stack, Typography } from "@mui/material";
import { ActionCell, Chip, LoadingCell } from "@repo/shared-components";
import {
  formatDate,
  getTimeInHHmm,
} from "@repo/shared-components/src/utils/date";
import type { CustomCellRendererProps } from "ag-grid-react";
import { capitalize } from "lodash";
import type {
  AgColumnsArgs,
  AgColumnsWithActions,
} from "../../../../../../../types/agGrid";
import type { DialogTypes } from "../../../../../../../types/dialogs";
import { dateFormat } from "../../../../../../../utils/date";
import {
  APPROVE,
  CANCEL,
  REJECT,
} from "../../../../../../common/Autocomplete/hooks/constant";
import { getColorByVariant } from "../../../../../../Transactions/Leave/LeaveOverview/LeaveDetails/LeaveBalance/colorVariant";
import type { OvertimeRequest } from "./useGetOvertimeRequest";
type OvertimeRequestListColumnsArgs = {
  onAction?: (actionType: DialogTypes, rowData: OvertimeRequest) => void;
};

export const useGetOvertimeRequestListColumns = ({
  onAction,
  loading,
}: AgColumnsArgs<OvertimeRequestListColumnsArgs>) => {
  const column: AgColumnsWithActions<OvertimeRequest> = [
    {
      headerName: "Overtime Date",
      field: "overtime_date",
      sortable: true,
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return (
          <Typography variant="body2">
            {value ? formatDate(value) : "-"}
          </Typography>
        );
      },
    },
    {
      headerName: "Requested By/Date",
      field: "requested_by",
      sortable: true,
      cellRenderer: ({ data }: CustomCellRendererProps<OvertimeRequest>) => {
        if (loading) {
          return <LoadingCell />;
        }

        if (!data) {
          return null;
        }

        return (
          <Stack>
            <Typography variant="body2">{data.requested_by ?? "-"}</Typography>

            <Typography variant="body2">
              {data.requested_date ? dateFormat(data.requested_date) : "-"}
            </Typography>
          </Stack>
        );
      },
    },
    {
      headerName: "OT In Time",
      field: "in_time_overtime",
      sortable: true,
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return (
          <Typography variant="body2">
            {value ? getTimeInHHmm(value) : "-"}
          </Typography>
        );
      },
    },
    {
      headerName: "OT Out Time",
      field: "out_time_overtime",
      sortable: true,
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return (
          <Typography variant="body2">
            {value ? getTimeInHHmm(value) : "-"}
          </Typography>
        );
      },
    },
    {
      headerName: "Total OT",
      field: "total_overtime_work_hours",
      sortable: true,
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return value ? value : "-";
      },
    },
    {
      headerName: "Status",
      field: "status",
      sortable: true,
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
      headerName: "Remark",
      field: "remark",
      sortable: true,
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return value ? value : "-";
      },
    },
    {
      headerName: "Last Action By/Date",
      field: "approval_by",
      sortable: true,
      cellRenderer: ({ data }: CustomCellRendererProps<OvertimeRequest>) => {
        if (loading) {
          return <LoadingCell />;
        }

        if (!data) {
          return null;
        }

        return (
          // eslint-disable-next-line sonarjs/jsx-no-useless-fragment
          <>
            {data.approval_by && data.approval_at ? (
              <Stack>
                <Typography variant="body2">{data.approval_by}</Typography>

                <Typography variant="body2">
                  {dateFormat(data.approval_at)}
                </Typography>
              </Stack>
            ) : (
              "-"
            )}
          </>
        );
      },
    },
    {
      headerName: "Next Approver",
      field: "next_approver",
      sortable: true,
      cellRenderer: ({ value }: CustomCellRendererProps<OvertimeRequest>) => {
        if (loading) {
          return <LoadingCell />;
        }

        return (
          <Typography variant="body2">
            {value ? value.join(", ") : "-"}
          </Typography>
        );
      },
    },
    {
      headerName: "Action",
      field: "action",
      sortable: false,
      pinned: "right",
      lockPinned: true,
      maxWidth: 120,
      cellRenderer: ({ data }: CustomCellRendererProps<OvertimeRequest>) => {
        if (loading || !data) {
          return <LoadingCell />;
        }

        const view = {
          title: "View",
          onClick: () => onAction && onAction("view", data),
        };

        const cancel = {
          title: "Cancel",
          onClick: () => onAction && onAction(CANCEL, data),
        };

        const edit = {
          title: "Edit",
          onClick: () => onAction && onAction("edit", data),
        };

        const items =
          data.status === "rejected" || data.status === "cancelled"
            ? [view]
            : // eslint-disable-next-line sonarjs/no-nested-conditional
              data.status === "approved"
              ? [view, cancel]
              : [view, edit, cancel];

        return (
          <Stack direction="row" gap="10px" alignItems="center">
            {data.status === "pending" && (
              <>
                <CheckCircleOutlineOutlined
                  fontSize="medium"
                  color="success"
                  style={{ cursor: "pointer" }}
                  onClick={() => onAction && onAction(APPROVE, data)}
                />

                <CancelOutlined
                  fontSize="medium"
                  color="error"
                  style={{ cursor: "pointer" }}
                  onClick={() => onAction && onAction(REJECT, data)}
                />
              </>
            )}

            <ActionCell items={items} />
          </Stack>
        );
      },
    },
  ];

  return { column };
};
