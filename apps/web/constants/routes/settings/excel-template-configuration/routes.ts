export const EXCEL_TEMPLATE_ROUTES_BASE_URL =
  "api/settings/excel-template-configuration";

export const EXCEL_TEMPLATE_ROUTES = {
  post: EXCEL_TEMPLATE_ROUTES_BASE_URL,

  listing: `${EXCEL_TEMPLATE_ROUTES_BASE_URL}/list`,

  get: (companyBankId: string) =>
    `${EXCEL_TEMPLATE_ROUTES_BASE_URL}/${companyBankId}`,

  patch: (companyBankId: string) =>
    `${EXCEL_TEMPLATE_ROUTES_BASE_URL}/${companyBankId}`,

  delete: (companyBankId: string) =>
    `${EXCEL_TEMPLATE_ROUTES_BASE_URL}/${companyBankId}`,
};
