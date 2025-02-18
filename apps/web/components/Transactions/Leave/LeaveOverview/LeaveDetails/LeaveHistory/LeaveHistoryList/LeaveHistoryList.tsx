"use client";

import { AgGrid, defaultPageSize } from "@repo/shared-components";
import { useQueryClient } from "@tanstack/react-query";
import type {
  GridReadyEvent,
  IDatasource,
  IGetRowsParams,
} from "ag-grid-community";
import type { AgGridReact } from "ag-grid-react";
import type { ForwardedRef } from "react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useDialogActions } from "../../../../../../../hooks/useDialogActions";
import { leaveOverviewKey } from "../../../../../../../queryKeysFactories/leaveOverview";
import type { AgDataWithActions } from "../../../../../../../types/agGrid";
import type { DialogRenderer } from "../../../../../../../types/dialogs";
import { CancelLeaveRequestDialog } from "../../PendingLeaveRequests/Dialogs/ActionDialogs/CancelLeaveRequestDialog";
import type { LeaveRequestData } from "../../PendingLeaveRequests/PendingLeaveRequestsList/hooks/useGetPendingLeaveRequests";
import { ViewLeaveHistoryDetailsDialog } from "../Dialogs/ViewLeaveHistoryDetailsDialog";
import type { LeaveHistoryListRef } from "../LeaveHistory";
import { useGetLeaveHistoryListQueryFn } from "./hooks/useGetLeaveHistoryList";
import { useLeaveHistoryColumns } from "./hooks/useLeaveHistoryColumns";

type LeaveHistoryListProps = {
  employeeId: string;
  fromDate: string;
  toDate: string;
  onEditSuccess: () => void;
};

export const LeaveHistoryList = forwardRef(
  (
    { employeeId, fromDate, toDate, onEditSuccess }: LeaveHistoryListProps,
    ref: ForwardedRef<LeaveHistoryListRef>
  ) => {
    const gridRef = useRef<AgGridReact<LeaveRequestData>>(null);

    const queryClient = useQueryClient();

    const [loading, setLoading] = useState(false);

    const [currentLeaveHistoryRequest, setCurrentLeaveHistoryRequest] =
      useState<LeaveRequestData>();

    const { openedDialog, onDialogClose, onDialogOpen } = useDialogActions();

    const { columns } = useLeaveHistoryColumns({
      onAction: (actionType, leaveHistoryRequest) => {
        onDialogOpen(actionType);
        setCurrentLeaveHistoryRequest(leaveHistoryRequest);
      },
      loading,
    });

    const { getLeaveHistoryList } = useGetLeaveHistoryListQueryFn();

    const getRows = async (params: IGetRowsParams) => {
      setLoading(true);

      const { list, totalCount } = await getLeaveHistoryList({
        employeeId,
        fromDate,
        toDate,
      });

      let lastRow = -1;

      if (list?.length <= defaultPageSize) {
        lastRow = totalCount;
      }
      setLoading(false);

      if (!list.length) {
        gridRef.current?.api.showNoRowsOverlay();
      } else {
        gridRef.current?.api.hideOverlay();
      }

      params.successCallback(list, lastRow);
    };

    const dataSource: IDatasource = {
      getRows: (params) => {
        getRows(params);
      },
    };

    const refreshCache = () => {
      gridRef.current?.api.refreshInfiniteCache();
    };

    useEffect(() => {
      if (gridRef.current?.api) {
        gridRef.current.api.setGridOption("datasource", dataSource);
      }
    }, [fromDate, toDate]);

    useImperativeHandle(ref, () => ({
      refreshLeaveHistoryList() {
        refreshCache();
      },
    }));

    const onGridReady = useCallback(
      (params: GridReadyEvent) => {
        params.api.setGridOption("datasource", dataSource);
      },
      [dataSource]
    );

    const refreshData = () => {
      onEditSuccess();
      refreshCache();
    };

    const dialogRenderer: DialogRenderer = {
      view: currentLeaveHistoryRequest?.id && (
        <ViewLeaveHistoryDetailsDialog
          open
          selectedEmployeeId={employeeId}
          leaveRequestId={currentLeaveHistoryRequest.id}
          onClose={onDialogClose}
        />
      ),
      cancel: currentLeaveHistoryRequest?.id && (
        <CancelLeaveRequestDialog
          open
          employeeId={employeeId}
          leaveRequestId={currentLeaveHistoryRequest.id}
          onClose={onDialogClose}
          onEditSuccess={() => {
            refreshData();
            queryClient.invalidateQueries({
              queryKey: leaveOverviewKey.getLeaveBalances(
                employeeId,
                fromDate,
                toDate
              ),
            });
          }}
        />
      ),
    };

    if (loading) {
      gridRef.current?.api.hideOverlay();
    }

    return (
      <>
        <AgGrid<AgDataWithActions<LeaveRequestData>>
          ref={gridRef}
          columnDefs={columns}
          onGridReady={onGridReady}
          height="30vh"
        />
        {openedDialog && dialogRenderer[openedDialog]}
      </>
    );
  }
);

LeaveHistoryList.displayName = "LeaveHistoryList";
