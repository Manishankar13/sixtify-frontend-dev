export const leaveOverviewKey = {
  all: ["leave-overview-employee"] as const,

  listing: (body: object = {}) => [...leaveOverviewKey.all, "listing", body],

  getLeaveEmployee: (employeeId: string | null) => [
    ...leaveOverviewKey.all,
    "employeeDetails",
    employeeId,
  ],

  getLeaveBalances: (
    employeeId: string | null,
    from_date: string,
    to_date: string
  ) => [...leaveOverviewKey.all, "details", employeeId, from_date, to_date],

  getHistory: (
    employeeId: string | null,
    leaveTypeId: string | null,
    from_date: string | null,
    to_date: string | null
  ) => [
    ...leaveOverviewKey.all,
    "history",
    employeeId,
    leaveTypeId,
    from_date,
    to_date,
  ],

  getRequestList: (
    employeeId: string | null,
    from_date: string | null,
    to_date: string | null
  ) => [...leaveOverviewKey.all, "requestList", employeeId, from_date, to_date],

  getLeaveRequest: (leaveRequestId: string, selectedEmployeeId: string) => [
    ...leaveOverviewKey.all,
    "get",
    leaveRequestId,
    selectedEmployeeId,
  ],

  getLeaveRequestHistory: (
    leaveRequestId: string,
    selectedEmployeeId: string
  ) => [...leaveOverviewKey.all, "get", leaveRequestId, selectedEmployeeId],

  add: (employeeId: string | null) => [
    ...leaveOverviewKey.all,
    "add",
    employeeId,
  ],

  edit: (
    selectedEmployeeId: string,
    leaveRequestId: string,
    status?: "approved" | "rejected" | "cancelled"
  ) => [
    ...leaveOverviewKey.all,
    "edit",
    selectedEmployeeId,
    leaveRequestId,
    status,
  ],
};
