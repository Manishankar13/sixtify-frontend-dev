import { useQuery } from "@tanstack/react-query";
import { OVERTIME_REQUEST_ROUTES } from "../../../../../../../constants/routes/transactions/attendance/attendance-overview/overtime-request/route";
import { useAxiosPrivate } from "../../../../../../../hooks/useAxiosPrivate";
import { overTimeRequestKeys } from "../../../../../../../queryKeysFactories/Transaction/Attendance/AttendanceOverview/OvertimeRequest";
import type { ApiSuccessResponse } from "../../../../../../../types/apiResponse";

export type MetaDataResponse = {
  is_overtime_request_enabled: boolean;
};

type UseGetMetaDataOvertimeArgs = {
  employeeId: string;
};

export function useGetMetaDataOvertime({
  employeeId,
}: UseGetMetaDataOvertimeArgs) {
  const { axiosPrivate } = useAxiosPrivate();

  const fetchMetaData = async () => {
    const { data } = await axiosPrivate.get<
      ApiSuccessResponse<MetaDataResponse>
    >(OVERTIME_REQUEST_ROUTES.getMetaData(employeeId));

    return data.data;
  };

  return useQuery({
    queryKey: overTimeRequestKeys.getMetaData(employeeId),
    queryFn: fetchMetaData,
    enabled: !!employeeId,
  });
}
