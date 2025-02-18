import { Stack } from "@mui/material";
import { DateTime } from "luxon";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useDebounceValue } from "usehooks-ts";
import { Debounce_Delay } from "../../../../../../utils/helper";
import { YearPeriodAutocomplete } from "../../../../../common/Autocomplete/YearPeriodAutocomplete";
import { AddLeaveRequestActionButton } from "../../../../../Transactions/Leave/LeaveOverview/LeaveDetails/AddLeaveRequestActionButton/AddLeaveRequestActionButton";
import { useGetLeaveEmployeeDetails } from "../../../../../Transactions/Leave/LeaveOverview/LeaveDetails/hooks/useGetLeaveEmployeeDetails";
import { LeaveBalance } from "../../../../../Transactions/Leave/LeaveOverview/LeaveDetails/LeaveBalance/LeaveBalance";
import { getDefaultCurrentYearValue } from "../../../../../Transactions/Leave/LeaveOverview/LeaveDetails/LeaveDetails";
import type { LeaveHistoryListRef } from "../../../../../Transactions/Leave/LeaveOverview/LeaveDetails/LeaveHistory/LeaveHistory";
import { LeaveHistory } from "../../../../../Transactions/Leave/LeaveOverview/LeaveDetails/LeaveHistory/LeaveHistory";
import type { PendingLeaveRequestsListRef } from "../../../../../Transactions/Leave/LeaveOverview/LeaveDetails/PendingLeaveRequests/PendingLeaveRequests";
import { PendingLeaveRequests } from "../../../../../Transactions/Leave/LeaveOverview/LeaveDetails/PendingLeaveRequests/PendingLeaveRequests";

type LeaveDetailsSectionProps = Readonly<{
  employeeId: string;
}>;

export const LeaveDetailsSection = ({
  employeeId,
}: LeaveDetailsSectionProps) => {
  const formMethods = useForm({
    defaultValues: {
      yearPeriod: getDefaultCurrentYearValue(),
    },
  });

  const { control, watch } = formMethods;

  const yearPeriod = watch("yearPeriod");

  const [fromDate = "", toDate = ""] = yearPeriod?.split("/") ?? [];

  const [to_date] = useDebounceValue(
    DateTime.fromISO(toDate).toISODate() ?? "",
    Debounce_Delay
  );

  const [from_date] = useDebounceValue(
    DateTime.fromISO(fromDate).toISODate() ?? "",
    Debounce_Delay
  );

  const pendingLeaveRequestsRef = useRef<PendingLeaveRequestsListRef>(null);

  const leaveHistoryListRef = useRef<LeaveHistoryListRef>(null);

  const { data } = useGetLeaveEmployeeDetails({
    employeeId,
  });

  return (
    <Stack gap="20px">
      <LeaveBalance
        employeeId={employeeId}
        fromDate={from_date}
        toDate={to_date}
        action={
          <Stack flexDirection="row" gap="5px" alignItems="center">
            <YearPeriodAutocomplete
              name="yearPeriod"
              joiningDate={data?.joining_date ?? ""}
              leavePlanStartMonth={data?.leave_plan_year_start_month ?? 0}
              control={control}
              sx={{ minWidth: "260px" }}
            />

            <AddLeaveRequestActionButton
              employeeId={employeeId}
              leaveDetailsData={data}
              fromDate={fromDate}
              toDate={toDate}
              onAddSuccess={() =>
                pendingLeaveRequestsRef.current?.refreshPendingLeaveRequestsList()
              }
            />
          </Stack>
        }
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
          pendingLeaveRequestsRef.current?.refreshPendingLeaveRequestsList()
        }
      />
    </Stack>
  );
};
