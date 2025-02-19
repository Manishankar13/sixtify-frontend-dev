import { LIST, OPTIONS } from "../../../../routes";
import { SETTINGS_BASE_URL } from "../routes";

export const TAXES_DEDUCTIONS_BASE_URL = `${SETTINGS_BASE_URL}/income-tax-regime`;

export const INCOME_TAX_ROUTES = {
  delete: (incomeTaxId: string) =>
    `${TAXES_DEDUCTIONS_BASE_URL}/${incomeTaxId}`,

  listing: `${TAXES_DEDUCTIONS_BASE_URL}/${LIST}`,

  patch: (incomeTaxId: string) => `${TAXES_DEDUCTIONS_BASE_URL}/${incomeTaxId}`,

  get: (incomeTaxId: string) => `${TAXES_DEDUCTIONS_BASE_URL}/${incomeTaxId}`,

  post: () => `${TAXES_DEDUCTIONS_BASE_URL}`,

  option: () => `${TAXES_DEDUCTIONS_BASE_URL}/${OPTIONS}`,
};
