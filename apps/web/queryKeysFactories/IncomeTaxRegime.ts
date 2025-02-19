export const incomeTaxRegimeKeys = {
  all: ["income-tax-regime"] as const,

  listing: (body: object = {}) => [...incomeTaxRegimeKeys.all, "listing", body],

  add: () => [...incomeTaxRegimeKeys.all, "add"],

  edit: (incomeTaxRegimeId: string) => [
    ...incomeTaxRegimeKeys.all,
    "edit",
    incomeTaxRegimeId,
  ],

  get: (incomeTaxRegimeId: string) => [
    ...incomeTaxRegimeKeys.all,
    "get",
    incomeTaxRegimeId,
  ],

  delete: (incomeTaxRegimeId: string) => [
    ...incomeTaxRegimeKeys.all,
    "delete",
    incomeTaxRegimeId,
  ],

  options: () => [...incomeTaxRegimeKeys.all, "options"],
};
