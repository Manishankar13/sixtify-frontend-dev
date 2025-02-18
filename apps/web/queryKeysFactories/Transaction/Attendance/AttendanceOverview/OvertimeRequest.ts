export const overTimeRequestKeys = {
  all: ["OvertimeRequest"] as const,

  listing: (body: object = {}) => [...overTimeRequestKeys.all, "listing", body],

  add: () => [...overTimeRequestKeys.all, "add"],

  edit: (OTRequestId: string) => [
    ...overTimeRequestKeys.all,
    "edit",
    OTRequestId,
  ],
  get: (employeeId: string, selectDate: string) => [
    ...overTimeRequestKeys.all,
    "get",
    employeeId,
    selectDate,
  ],

  getMetaData: (employeeId: string) => [
    ...overTimeRequestKeys.all,
    "getMetaData",
    employeeId,
  ],

  getOne: (employeeId: string) => [
    ...overTimeRequestKeys.all,
    "getOne",
    employeeId,
  ],
};
