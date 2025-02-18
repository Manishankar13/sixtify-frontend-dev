import { LEAVE_PLAN_ROUTES_BASE_URL } from "../route";

export const LEAVE_PLAN_TYPE_ROUTES = {
  options: (leavePlanId: string) =>
    `${LEAVE_PLAN_ROUTES_BASE_URL}/${leavePlanId}/leave-type/options`,
};
