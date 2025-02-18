export const companyKeys = {
  all: ["company"] as const,

  listing: (body: object = {}) => [...companyKeys.all, "listing", body],

  add: () => [...companyKeys.all, "add"],

  edit: (companyId: string) => [...companyKeys.all, "edit", companyId],

  get: (companyId: string) => [...companyKeys.all, "get", companyId],

  delete: (companyId: string) => [...companyKeys.all, "delete", companyId],

  options: () => [...companyKeys.all, "options"],
};
