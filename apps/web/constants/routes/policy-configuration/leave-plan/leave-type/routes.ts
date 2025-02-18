import { LIST } from "../../../../routes";
import { LEAVE_PLAN_ROUTES_BASE_URL } from "../routes";

export const LEAVE_PLAN_TYPE_ROUTES = {
  listing: (leavePlanId: string) =>
    `${LEAVE_PLAN_ROUTES_BASE_URL}/${leavePlanId}/leave-type/${LIST}`,

  add: (leavePlanId: string) =>
    `${LEAVE_PLAN_ROUTES_BASE_URL}/${leavePlanId}/leave-type`,

  delete: (leavePlanId: string, leaveTypeId: string) =>
    `${LEAVE_PLAN_ROUTES_BASE_URL}/${leavePlanId}/leave-type/${leaveTypeId}`,
};
