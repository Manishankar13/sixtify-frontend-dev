import { useQuery } from "@tanstack/react-query";
import { LEAVE_OVERVIEW_ROUTES } from "../../../../../../../../constants/routes/transactions/leave/leave-overview/route";
import { useAxiosPrivate } from "../../../../../../../../hooks/useAxiosPrivate";
import { leaveOverviewKey } from "../../../../../../../../queryKeysFactories/leaveOverview";
import type { ApiSuccessResponse } from "../../../../../../../../types/apiResponse";
import type { StatusType } from "../../../LeaveBalance/colorVariant";

type useGetLeaveRequestHistoryArgs = {
  leaveRequestId: string;
  employeeId: string;
};

type Notifies = {
  id: string;
  employee_id: string;
  employee_name: string;
  avatar: string;
};

export type LeaveRequest = {
  id: string;
  employee_id: string;
  employee_name: string;
  avatar: string;
  company_id: string;
  leave_plan_id: string;
  leave_type_id: string;
  leave_type_name: string;
  leave_type: string;
  from_date: string;
  to_date: string;
  from_half: string;
  to_half: string;
  reason: string;
  status: StatusType;
  attachments: string[];
  notifies: Notifies[];
  requested_by: string;
  requested_at: string;
  action_details: {
    id: string;
    employee_name: string;
    action_at: string;
    action_reason: string;
    avatar: string;
  };
};

export function useGetLeaveRequestHistory({
  leaveRequestId,
  employeeId,
}: useGetLeaveRequestHistoryArgs) {
  const { axiosPrivate } = useAxiosPrivate();

  const fetchPendingLeaveRequestHistory = async () => {
    const {
      data: { data },
    } = await axiosPrivate.get<ApiSuccessResponse<LeaveRequest>>(
      LEAVE_OVERVIEW_ROUTES.getLeaveRequestHistoryUrl(
        employeeId,
        leaveRequestId
      )
    );

    return data;
  };

  return useQuery({
    queryKey: leaveOverviewKey.getLeaveRequestHistory(
      leaveRequestId,
      employeeId
    ),
    queryFn: fetchPendingLeaveRequestHistory,
    enabled: !!leaveRequestId && !!employeeId,
  });
}
