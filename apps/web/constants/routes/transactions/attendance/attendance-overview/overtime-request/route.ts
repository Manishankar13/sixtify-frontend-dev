import { ATTENDANCE_OVERVIEW_BASE_URL } from "../routes";

export const OVERTIME_REQUEST_ROUTES = {
  post: `${ATTENDANCE_OVERVIEW_BASE_URL}/logs`,

  listing: (employeeId: string) =>
    `${ATTENDANCE_OVERVIEW_BASE_URL}/${employeeId}/attendance-details/overtime-request/list`,

  get: (employeeId: string, currentDate: string | null) =>
    `${ATTENDANCE_OVERVIEW_BASE_URL}/${employeeId}/attendance-details/overtime-request?currentDate=${currentDate}`,

  getOne: (employeeId: string, otRequestId: string) =>
    `${ATTENDANCE_OVERVIEW_BASE_URL}/${employeeId}/attendance-details/overtime-request/${otRequestId}`,

  add: (employeeId: string) =>
    `${ATTENDANCE_OVERVIEW_BASE_URL}/${employeeId}/attendance-details/overtime-request`,

  getMetaData: (employeeId: string) =>
    `${ATTENDANCE_OVERVIEW_BASE_URL}/${employeeId}/attendance-details/overtime-request/meta-data`,

  edit: (employeeId: string, OTRequestId: string) =>
    `${ATTENDANCE_OVERVIEW_BASE_URL}/${employeeId}/attendance-details/overtime-request/${OTRequestId}`,
};
