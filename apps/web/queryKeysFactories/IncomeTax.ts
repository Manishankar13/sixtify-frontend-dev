export const incomeTaxKeys = {
  all: ["income-tax-regime"] as const,

  listing: (body: object = {}) => [...incomeTaxKeys.all, "listing", body],

  add: () => [...incomeTaxKeys.all, "add"],

  edit: (incomeTaxId: string) => [...incomeTaxKeys.all, "edit", incomeTaxId],

  get: (incomeTaxId: string) => [...incomeTaxKeys.all, "get", incomeTaxId],

  delete: (incomeTaxId: string) => [
    ...incomeTaxKeys.all,
    "delete",
    incomeTaxId,
  ],

  options: (incomeTaxId?: string | null) => [
    ...incomeTaxKeys.all,
    "options",
    incomeTaxId,
  ],
};
