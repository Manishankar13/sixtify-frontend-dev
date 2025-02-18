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
import { EditLeaveRequestDialog } from "../../Dialogs/EditLeaveRequestDialog";
import type { LeaveEmployeeDetails } from "../../hooks/useGetLeaveEmployeeDetails";
import { ApproveLeaveRequestDialog } from "../Dialogs/ActionDialogs/ApproveLeaveRequestDialog";
import { CancelLeaveRequestDialog } from "../Dialogs/ActionDialogs/CancelLeaveRequestDialog";
import { RejectLeaveRequestDialog } from "../Dialogs/ActionDialogs/RejectLeaveRequestDialog";
import { ViewPendingLeaveRequestDialog } from "../Dialogs/ViewLeaveRequestDetailsDialog";
import type { PendingLeaveRequestsListRef } from "../PendingLeaveRequests";
import {
  useGetPendingLeaveRequestsQueryFn,
  type LeaveRequestData,
} from "./hooks/useGetPendingLeaveRequests";
import { usePendingLeaveRequestsColumns } from "./hooks/usePendingLeaveRequestsColumns";

type PendingLeaveRequestsListProps = {
  employeeId: string;
  fromDate: string;
  toDate: string;
  leaveDetailsData?: LeaveEmployeeDetails;
  onEditSuccess: () => void;
};

export const PendingLeaveRequestsList = forwardRef(
  (
    {
      employeeId,
      fromDate,
      toDate,
      leaveDetailsData,
      onEditSuccess,
    }: PendingLeaveRequestsListProps,
    ref: ForwardedRef<PendingLeaveRequestsListRef>
  ) => {
    const gridRef = useRef<AgGridReact<LeaveRequestData>>(null);

    const queryClient = useQueryClient();

    const [loading, setLoading] = useState(false);

    const [currentPendingLeaveRequest, setCurrentPendingLeaveRequest] =
      useState<LeaveRequestData>();

    const { openedDialog, onDialogClose, onDialogOpen } = useDialogActions();

    const { columns } = usePendingLeaveRequestsColumns({
      onAction: (actionType, pendingLeaveRequest) => {
        onDialogOpen(actionType);
        setCurrentPendingLeaveRequest(pendingLeaveRequest);
      },
      loading,
    });

    const { getPendingLeaveRequest } = useGetPendingLeaveRequestsQueryFn();

    const getRows = async (params: IGetRowsParams) => {
      setLoading(true);

      const { list, totalCount } = await getPendingLeaveRequest({
        employeeId,
        fromDate,
        toDate,
      });

      let lastRow = -1;

      if (list?.length <= defaultPageSize) {
        lastRow = totalCount;
      }
      setLoading(false);

      if (!list?.length) {
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
      refreshPendingLeaveRequestsList() {
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
      edit: currentPendingLeaveRequest?.id && (
        <EditLeaveRequestDialog
          open
          employeeId={employeeId}
          leaveDetailsData={leaveDetailsData}
          leaveRequestId={currentPendingLeaveRequest.id}
          onClose={onDialogClose}
          onEditSuccess={refreshCache}
        />
      ),
      view: currentPendingLeaveRequest?.id && (
        <ViewPendingLeaveRequestDialog
          open
          employeeId={employeeId}
          leaveRequestId={currentPendingLeaveRequest.id}
          onClose={onDialogClose}
        />
      ),
      approve: currentPendingLeaveRequest?.id && (
        <ApproveLeaveRequestDialog
          open
          employeeId={employeeId}
          leaveRequestId={currentPendingLeaveRequest.id}
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
      reject: currentPendingLeaveRequest?.id && (
        <RejectLeaveRequestDialog
          open
          employeeId={employeeId}
          leaveRequestId={currentPendingLeaveRequest.id}
          onClose={onDialogClose}
          onEditSuccess={refreshData}
        />
      ),
      cancel: currentPendingLeaveRequest?.id && (
        <CancelLeaveRequestDialog
          open
          employeeId={employeeId}
          leaveRequestId={currentPendingLeaveRequest.id}
          onClose={onDialogClose}
          onEditSuccess={refreshData}
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

PendingLeaveRequestsList.displayName = "PendingLeaveRequestsList";
