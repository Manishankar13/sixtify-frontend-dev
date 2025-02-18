import { useQuery } from "@tanstack/react-query";
import type { IGetRowsParams } from "ag-grid-community";
import { LEAVE_HISTORY_ROUTES } from "../../../../../../../../constants/routes/transactions/leave/leave-overview/leave-history/route";
import { useAxiosPrivate } from "../../../../../../../../hooks/useAxiosPrivate";
import { leaveOverviewKey } from "../../../../../../../../queryKeysFactories/leaveOverview";
import type { ApiSuccessResponse } from "../../../../../../../../types/apiResponse";
import type { LeaveRequestData } from "../../../PendingLeaveRequests/PendingLeaveRequestsList/hooks/useGetPendingLeaveRequests";

type LeaveHistoryListArgs = {
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

export function useGetLeaveHistoryListQueryFn() {
  const { axiosPrivate } = useAxiosPrivate();

  const getLeaveHistoryList = async ({
    body = {},
    employeeId,
    fromDate,
    toDate,
  }: LeaveHistoryListArgs) => {
    const { data } = await axiosPrivate.post<
      ApiSuccessResponse<{
        list: LeaveRequestData[];
        totalCount: number;
      }>
    >(LEAVE_HISTORY_ROUTES.getLeaveHistory(employeeId, fromDate, toDate), body);

    return data.data;
  };

  return { getLeaveHistoryList };
}

export function useGetLeaveHistoryList({
  body,
  employeeId,
  fromDate,
  toDate,
}: LeaveHistoryListArgs) {
  const { getLeaveHistoryList } = useGetLeaveHistoryListQueryFn();

  return useQuery({
    queryKey: leaveOverviewKey.getRequestList(employeeId, fromDate, toDate),
    queryFn: () => getLeaveHistoryList({ body, employeeId, fromDate, toDate }),
    initialData: { list: [], totalCount: 0 },
  });
}
