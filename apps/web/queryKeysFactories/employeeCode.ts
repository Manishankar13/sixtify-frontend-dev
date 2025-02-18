export const employeeCodeKeys = {
  all: ["employeeCode"] as const,

  listing: (body: object = {}) => [...employeeCodeKeys.all, "listing", body],

  add: () => [...employeeCodeKeys.all, "add"],

  edit: (employeeCodeId: string) => [
    ...employeeCodeKeys.all,
    "edit",
    employeeCodeId,
  ],

  get: (employeeCodeId: string) => [
    ...employeeCodeKeys.all,
    "get",
    employeeCodeId,
  ],

  delete: (employeeCodeId: string) => [
    ...employeeCodeKeys.all,
    "delete",
    employeeCodeId,
  ],
  options: (companyId?: string | null) => [
    ...employeeCodeKeys.all,
    "options",
    companyId,
  ],
};
