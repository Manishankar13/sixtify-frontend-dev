import { LEAVE_OVERVIEW_BASE_URL } from "../route";

export const LEAVE_HISTORY_ROUTES = {
  getLeaveHistory: (
    selectedEmployeeId: string,
    from_date: string,
    to_date: string
  ) =>
    `${LEAVE_OVERVIEW_BASE_URL}/${selectedEmployeeId}/leave-requests/list?from=${from_date}&to=${to_date}&viewType=history`,

  getLeaveHistoryItemUrl: (
    selectedEmployeeId: string,
    leaveRequestId: string
  ) =>
    `${LEAVE_OVERVIEW_BASE_URL}/${selectedEmployeeId}/leave-history/${leaveRequestId}`,
};
