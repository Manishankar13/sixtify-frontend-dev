import { useQuery } from "@tanstack/react-query";
import type { IGetRowsParams } from "ag-grid-community";
import { LEAVE_OVERVIEW_ROUTES } from "../../../../../../../../constants/routes/transactions/leave/leave-overview/route";
import { useAxiosPrivate } from "../../../../../../../../hooks/useAxiosPrivate";
import { leaveOverviewKey } from "../../../../../../../../queryKeysFactories/leaveOverview";
import type { ApiSuccessResponse } from "../../../../../../../../types/apiResponse";

export type LeaveRequestData = {
  id: string | null;
  from_date: string | null;
  to_date: string | null;
  from_half: string | null;
  to_half: string | null;
  reason: string | null;
  status: string | null;
  leave_type: string | null;
  leave_type_name: string | null;
  applied_by: string | null;
  applied_at: string | null;
  action_reason: null;
  action_by: string | null;
  action_at: string | null;
  full_count: string | null;
};

type PendingLeaveRequestParams = {
  body?:
    | Partial<IGetRowsParams>
    | Partial<{
        is_active: boolean;
        responseFields: string[];
      }>;
  employeeId: string;
  fromDate: string;
  toDate: string;
};

export function useGetPendingLeaveRequestsQueryFn() {
  const { axiosPrivate } = useAxiosPrivate();

  const getPendingLeaveRequest = async ({
    body = {},
    employeeId,
    fromDate,
    toDate,
  }: PendingLeaveRequestParams) => {
    const { data } = await axiosPrivate.post<
      ApiSuccessResponse<{
        list: LeaveRequestData[];
        totalCount: number;
      }>
    >(LEAVE_OVERVIEW_ROUTES.pendingList(employeeId, fromDate, toDate), body);

    return data.data;
  };

  return { getPendingLeaveRequest };
}

export function useGetPendingLeaveRequests({
  body,
  employeeId,
  fromDate,
  toDate,
}: PendingLeaveRequestParams) {
  const { getPendingLeaveRequest } = useGetPendingLeaveRequestsQueryFn();

  return useQuery({
    queryKey: leaveOverviewKey.getRequestList(employeeId, fromDate, toDate),
    queryFn: () =>
      getPendingLeaveRequest({ body, employeeId, fromDate, toDate }),
    initialData: { list: [], totalCount: 0 },
    enabled: !!employeeId,
  });
}
