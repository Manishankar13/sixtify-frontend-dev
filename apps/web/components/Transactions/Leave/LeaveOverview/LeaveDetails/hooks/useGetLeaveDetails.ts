import { useQuery } from "@tanstack/react-query";
import { LEAVE_OVERVIEW_ROUTES } from "../../../../../../constants/routes/transactions/leave/leave-overview/route";
import { useAxiosPrivate } from "../../../../../../hooks/useAxiosPrivate";
import { leaveOverviewKey } from "../../../../../../queryKeysFactories/leaveOverview";
import type { ApiSuccessResponse } from "../../../../../../types/apiResponse";

export type LeaveBalanceType = {
  id: string;
  leave_type_name: string;
  leave_type: string;
  leave_type_colour_code: string;
  available_balance: number;
  annual_leaves: number;
  used_leaves: number;
  accrual_leave: number;
  quota_type: string;
};

export type LeaveDetailsData = {
  leave_details: LeaveBalanceType[];
};

type UseGetLeaveDetailsArgs = {
  employeeId: string;
  from_date: string;
  to_date: string;
};
export function useGetLeaveDetails({
  employeeId,
  from_date,
  to_date,
}: UseGetLeaveDetailsArgs) {
  const { axiosPrivate } = useAxiosPrivate();

  const fetchEmployee = async () => {
    const {
      data: { data },
    } = await axiosPrivate.get<ApiSuccessResponse<LeaveDetailsData>>(
      LEAVE_OVERVIEW_ROUTES.getLeaveBalances(employeeId, from_date, to_date)
    );

    return data;
  };

  return useQuery({
    queryKey: leaveOverviewKey.getLeaveBalances(employeeId, from_date, to_date),
    queryFn: fetchEmployee,
    enabled: !!employeeId && !!from_date && !!to_date,
  });
}
