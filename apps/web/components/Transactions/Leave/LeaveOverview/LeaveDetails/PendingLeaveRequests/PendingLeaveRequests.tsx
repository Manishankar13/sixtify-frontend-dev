"use client";

import { Stack, Typography, useTheme } from "@mui/material";
import { PadBox } from "@repo/shared-components";
import type { ForwardedRef } from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import type { LeaveEmployeeDetails } from "../hooks/useGetLeaveEmployeeDetails";
import { PendingLeaveRequestsList } from "./PendingLeaveRequestsList/PendingLeaveRequestsList";

type PendingLeaveRequestsProps = {
  employeeId: string;
  fromDate: string;
  toDate: string;
  leaveDetailsData?: LeaveEmployeeDetails;
  onEditSuccess: () => void;
};

export type PendingLeaveRequestsListRef = {
  refreshPendingLeaveRequestsList: () => void;
};

export const PendingLeaveRequests = forwardRef(
  (
    {
      employeeId,
      fromDate,
      toDate,
      leaveDetailsData,
      onEditSuccess,
    }: Readonly<PendingLeaveRequestsProps>,
    ref: ForwardedRef<PendingLeaveRequestsListRef>
  ) => {
    const pendingLeaveRequestsListRef =
      useRef<PendingLeaveRequestsListRef>(null);

    const theme = useTheme();

    const { lightBlue } = theme.palette.app.color;

    useImperativeHandle(ref, () => ({
      refreshPendingLeaveRequestsList() {
        pendingLeaveRequestsListRef.current?.refreshPendingLeaveRequestsList();
      },
    }));

    return (
      <Stack bgcolor={lightBlue[50]} borderRadius="5px">
        <PadBox padding={{ padding: "10px" }}>
          <Typography variant="h6">Pending Leave Requests</Typography>
        </PadBox>

        <PendingLeaveRequestsList
          employeeId={employeeId}
          leaveDetailsData={leaveDetailsData}
          fromDate={fromDate}
          toDate={toDate}
          ref={pendingLeaveRequestsListRef}
          onEditSuccess={onEditSuccess}
        />
      </Stack>
    );
  }
);

PendingLeaveRequests.displayName = "PendingLeaveRequests";
