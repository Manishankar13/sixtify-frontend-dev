export const incomeTaxRegimeKeys = {
    all: ["income-tax-regime"] as const,
  
    listing: (body: object = {}) => [...incomeTaxRegimeKeys.all, "listing", body],
  
    add: () => [...incomeTaxRegimeKeys.all, "add"],
  
    edit: (companyId: string) => [...incomeTaxRegimeKeys.all, "edit", companyId],
  
    get: (companyId: string) => [...incomeTaxRegimeKeys.all, "get", companyId],
  
    delete: (companyId: string) => [...incomeTaxRegimeKeys.all, "delete", companyId],
  
    options: () => [...incomeTaxRegimeKeys.all, "options"],
  };
  