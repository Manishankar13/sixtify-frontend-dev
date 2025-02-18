import { Box, Stack } from "@mui/material";
import {
  ActionCell,
  ConfigureAction,
  LoadingCell,
} from "@repo/shared-components";
import type { CustomCellRendererProps } from "ag-grid-react";
import type {
  AgColumnsArgs,
  AgColumnsWithActions,
} from "../../../../../../types/agGrid";
import type { DialogTypes } from "../../../../../../types/dialogs";

export type LeaveTypeList = {
  id: string;
  leave_type_name: string;
  yearly_quota: number;
  is_setup_complete: boolean;
};

type UseGetLeavePlanTypeListColumnsArgs = {
  loading: boolean;
  onAction: (actionType: DialogTypes, rowData: LeaveTypeList) => void;
};

export const useGetLeavePlanTypeListColumns = ({
  loading,
  onAction,
}: AgColumnsArgs<UseGetLeavePlanTypeListColumnsArgs>) => {
  const column: AgColumnsWithActions<LeaveTypeList> = [
    {
      headerName: "Leave Type",
      field: "leave_type_name",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return value ?? "-";
      },
      sortable: false,
    },
    {
      headerName: "Leave Yearly Quota",
      field: "yearly_quota",
      cellRenderer: ({ data }: CustomCellRendererProps<LeaveTypeList>) => {
        if (loading || !data) {
          return <LoadingCell />;
        }

        return (
          <Box>
            {data.is_setup_complete
              ? (data.yearly_quota ?? "-")
              : "Not Configured"}
          </Box>
        );
      },
      sortable: false,
    },
    {
      headerName: "",
      field: "action",
      sortable: false,
      pinned: "right",
      maxWidth: 90,
      lockPinned: true,
      cellRenderer: ({ data }: CustomCellRendererProps<LeaveTypeList>) => {
        if (loading || !data) {
          return <LoadingCell />;
        }

        // TODO: Add onClick handlers in upcoming PR
        const items = data.is_setup_complete
          ? [
              { title: "view", onClick: () => "" },
              { title: "Edit", onClick: () => "" },
              { title: "Delete", onClick: () => onAction("delete", data) },
            ]
          : [{ title: "Delete", onClick: () => onAction("delete", data) }];

        return (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            width="100%"
          >
            {!data.is_setup_complete && (
              <ConfigureAction sx={{ width: "39px" }} />
            )}

            <Box width="20px">
              <ActionCell items={items}></ActionCell>
            </Box>
          </Stack>
        );
      },
    },
  ];

  return { column };
};
