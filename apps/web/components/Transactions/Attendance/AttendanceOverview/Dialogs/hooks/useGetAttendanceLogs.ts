import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { ATTENDANCE_OVERVIEW_ROUTES } from "../../../../../../constants/routes/transactions/attendance/attendance-overview/routes";
import { useAxiosPrivate } from "../../../../../../hooks/useAxiosPrivate";
import { attendanceLogsKey } from "../../../../../../queryKeysFactories/attendanceView";
import type { ApiSuccessResponse } from "../../../../../../types/apiResponse";
import type { AttendanceLogs } from "./type";

type UseGetAttendanceLogsArgs = {
  selectedEmployeeId: string;
  date: string | null;
};

export function useGetAttendanceLogs({
  selectedEmployeeId,
  date,
}: UseGetAttendanceLogsArgs) {
  const { axiosPrivate } = useAxiosPrivate();

  const currentDate = date && DateTime.fromISO(date).toISODate();

  const fetchAttendanceLogs = async () => {
    const {
      data: { data },
    } = await axiosPrivate.get<ApiSuccessResponse<AttendanceLogs>>(
      ATTENDANCE_OVERVIEW_ROUTES.get(selectedEmployeeId, currentDate)
    );

    return data;
  };

  return useQuery({
    queryKey: attendanceLogsKey.get(selectedEmployeeId, date),
    queryFn: () => fetchAttendanceLogs(),
    enabled: !!selectedEmployeeId && !!date,
    initialData: {} as AttendanceLogs,
  });
}
