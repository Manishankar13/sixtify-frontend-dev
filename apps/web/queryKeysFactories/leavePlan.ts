export const leavePlanKeys = {
  all: ["leave_plan"] as const,

  listing: (requestBody: object = {}) =>
    [...leavePlanKeys.all, "listing", requestBody] as const,

  add: () => [...leavePlanKeys.all, "add"],

  edit: (currentLeavePlanId: string) => [
    ...leavePlanKeys.all,
    "edit",
    currentLeavePlanId,
  ],

  delete: (currentLeavePlanId: string) => [
    ...leavePlanKeys.all,
    "delete",
    currentLeavePlanId,
  ],

  get: (currentLeavePlanId: string) => [
    ...leavePlanKeys.all,
    "get",
    currentLeavePlanId,
  ],

  options: (companyId?: string | null) => [
    ...leavePlanKeys.all,
    "options",
    companyId,
  ],
};

export const leavePlanTypeKeys = {
  all: ["leave_plan_type"] as const,

  listing: (leavePlanId: string) =>
    [...leavePlanTypeKeys.all, "listing", leavePlanId] as const,

  add: (leavePlanId: string) => [...leavePlanTypeKeys.all, "add", leavePlanId],

  delete: (leavePlanId: string, LeaveTypeId: string) => [
    ...leavePlanTypeKeys.all,
    "delete",
    leavePlanId,
    LeaveTypeId,
  ],
};
