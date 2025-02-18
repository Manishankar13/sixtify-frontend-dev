"use client";

import { Stack, Typography, useTheme } from "@mui/material";
import { PadBox } from "@repo/shared-components";
import type { ForwardedRef } from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { LeaveHistoryList } from "./LeaveHistoryList/LeaveHistoryList";

type LeaveHistoryProps = {
  employeeId: string;
  fromDate: string;
  toDate: string;
  onEditSuccess: () => void;
};

export type LeaveHistoryListRef = {
  refreshLeaveHistoryList: () => void;
};

export const LeaveHistory = forwardRef(
  (
    {
      employeeId,
      fromDate,
      toDate,
      onEditSuccess,
    }: Readonly<LeaveHistoryProps>,
    ref: ForwardedRef<LeaveHistoryListRef>
  ) => {
    const leaveHistoryListRef = useRef<LeaveHistoryListRef>(null);

    const theme = useTheme();

    const { lightBlue } = theme.palette.app.color;

    useImperativeHandle(ref, () => ({
      refreshLeaveHistoryList() {
        leaveHistoryListRef.current?.refreshLeaveHistoryList();
      },
    }));

    return (
      <Stack bgcolor={lightBlue[50]} borderRadius="5px">
        <PadBox padding={{ padding: "10px" }}>
          <Typography variant="h6">Leave History</Typography>
        </PadBox>

        <LeaveHistoryList
          employeeId={employeeId}
          fromDate={fromDate}
          toDate={toDate}
          ref={leaveHistoryListRef}
          onEditSuccess={onEditSuccess}
        />
      </Stack>
    );
  }
);

LeaveHistory.displayName = "LeaveHistory";
