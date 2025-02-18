"use client";

import { Stack } from "@mui/material";
import { DateTime } from "luxon";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDebounceValue } from "usehooks-ts";
import { Debounce_Delay } from "../../../../../utils/helper";
import { LeaveBalance } from "./LeaveBalance/LeaveBalance";
import { LeaveDetailsHeader } from "./LeaveDetailsHeader/LeaveDetailsHeader";
import type { LeaveHistoryListRef } from "./LeaveHistory/LeaveHistory";
import { LeaveHistory } from "./LeaveHistory/LeaveHistory";
import type { PendingLeaveRequestsListRef } from "./PendingLeaveRequests/PendingLeaveRequests";
import { PendingLeaveRequests } from "./PendingLeaveRequests/PendingLeaveRequests";
import { useGetLeaveEmployeeDetails } from "./hooks/useGetLeaveEmployeeDetails";

export const getDefaultCurrentYearValue = () => {
  const currentYear = DateTime.now().year;

  const currentMonth = DateTime.now().month;

  const leavePlanStartMonth = 4;

  const baseYear =
    currentMonth >= leavePlanStartMonth ? currentYear : currentYear - 1;

  const from = DateTime.local(baseYear, leavePlanStartMonth, 1);

  const to = from.plus({ years: 1 }).minus({ days: 1 });

  return `${from.toISODate()}/${to.toISODate()}`;
};

export function LeaveDetails() {
  const params = useParams();

  const employeeId = params.employeeId as string;

  const formMethods = useForm({
    defaultValues: {
      yearPeriod: getDefaultCurrentYearValue(),
    },
  });

  const { watch } = formMethods;

  const yearPeriod = watch("yearPeriod");

  const [fromDate = "", toDate = ""] = yearPeriod?.split("/") ?? [];

  const [to_date] = useDebounceValue(
    DateTime.fromISO(toDate)?.toISODate() ?? "",
    Debounce_Delay
  );

  const [from_date] = useDebounceValue(
    DateTime.fromISO(fromDate)?.toISODate() ?? "",
    Debounce_Delay
  );

  const pendingLeaveRequestsRef = useRef<PendingLeaveRequestsListRef>(null);

  const leaveHistoryListRef = useRef<LeaveHistoryListRef>(null);

  const { data, isPending } = useGetLeaveEmployeeDetails({
    employeeId,
  });

  return (
    <Stack gap="10px">
      <FormProvider {...formMethods}>
        <LeaveDetailsHeader
          employeeId={employeeId}
          leaveDetailsData={data}
          isPending={isPending}
          fromDate={from_date}
          toDate={to_date}
          onAddSuccess={() =>
            pendingLeaveRequestsRef.current?.refreshPendingLeaveRequestsList()
          }
        />

        <LeaveBalance
          employeeId={employeeId}
          fromDate={from_date}
          toDate={to_date}
        />

        <PendingLeaveRequests
          employeeId={employeeId}
          fromDate={fromDate}
          toDate={toDate}
          leaveDetailsData={data}
          ref={pendingLeaveRequestsRef}
          onEditSuccess={() =>
            leaveHistoryListRef.current?.refreshLeaveHistoryList()
          }
        />

        <LeaveHistory
          employeeId={employeeId}
          fromDate={fromDate}
          toDate={toDate}
          ref={leaveHistoryListRef}
          onEditSuccess={() =>
            leaveHistoryListRef.current?.refreshLeaveHistoryList()
          }
        />
      </FormProvider>
    </Stack>
  );
}
