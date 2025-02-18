import { TRANSACTIONS_BASE_URL } from "../../routes";
import { LEAVE_BASE_URL } from "../route";
export const LEAVE_OVERVIEW_BASE_URL = `${TRANSACTIONS_BASE_URL}/${LEAVE_BASE_URL}/leave-overview/employee`;

export const buildStatusQueryParam = (
  status?: "approved" | "rejected" | "cancelled"
): string => {
  return status ? `?status=${encodeURIComponent(status)}` : "";
};

export const LEAVE_OVERVIEW_ROUTES = {
  listing: () => `${LEAVE_OVERVIEW_BASE_URL}/list`,

  getLeaveEmployeeDetails: (selectedEmployeeId: string) =>
    `${LEAVE_OVERVIEW_BASE_URL}/${selectedEmployeeId}`,

  getLeaveBalances: (
    selectedEmployeeId: string,
    from_date: string,
    to_date: string
  ) =>
    `${LEAVE_OVERVIEW_BASE_URL}/${selectedEmployeeId}/leave-balances?from=${from_date}&to=${to_date}`,

  getHistory: (
    employeeId: string,
    leaveTypeId: string,
    from_date: string,
    to_date: string
  ) =>
    `${LEAVE_OVERVIEW_BASE_URL}/${employeeId}/leave-balances/history/${leaveTypeId}?from=${from_date}&to=${to_date}`,

  post: (selectedEmployeeId: string) =>
    `${LEAVE_OVERVIEW_BASE_URL}/${selectedEmployeeId}/leave-requests`,

  patch: (
    selectedEmployeeId: string,
    leaveRequestId: string,
    status?: "approved" | "rejected" | "cancelled"
  ) =>
    `${LEAVE_OVERVIEW_BASE_URL}/${selectedEmployeeId}/leave-requests/${leaveRequestId}${buildStatusQueryParam(status)}`,

  pendingList: (
    selectedEmployeeId: string,
    from_date: string,
    to_date: string
  ) =>
    `${LEAVE_OVERVIEW_BASE_URL}/${selectedEmployeeId}/leave-requests/list?from=${from_date}&to=${to_date}&viewType=pending`,

  getLeaveRequestUrl: (selectedEmployeeId: string, leaveRequestId: string) =>
    `${LEAVE_OVERVIEW_BASE_URL}/${selectedEmployeeId}/leave-requests/${leaveRequestId}`,

  getLeaveRequestHistoryUrl: (
    selectedEmployeeId: string,
    leaveRequestId: string
  ) =>
    `${LEAVE_OVERVIEW_BASE_URL}/${selectedEmployeeId}/leave-requests/${leaveRequestId}/history`,
};
