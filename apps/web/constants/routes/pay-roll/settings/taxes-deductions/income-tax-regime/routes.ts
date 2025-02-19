import { LIST } from "../../../../../routes";
import { TAXES_DEDUCTIONS_BASE_URL } from "../routes";

export const INCOME_TAX_REGIME_ROUTES_BASE_URL = `${TAXES_DEDUCTIONS_BASE_URL}/income-tax-regime`;

export const INCOME_TAX_REGIME_ROUTES = {
  post: INCOME_TAX_REGIME_ROUTES_BASE_URL,

  delete: (incomeTaxRegimeId: string) =>
    `${INCOME_TAX_REGIME_ROUTES_BASE_URL}/${incomeTaxRegimeId}`,

  listing: `${INCOME_TAX_REGIME_ROUTES_BASE_URL}/${LIST}`,

  //   patch: (bankId: string) => `${INCOME_TAX_REGIME_ROUTES_BASE_URL}/${bankId}`,

  get: (incomeTaxRegimeId: string) =>
    `${INCOME_TAX_REGIME_ROUTES_BASE_URL}/${incomeTaxRegimeId}`,

  //   options: `${INCOME_TAX_REGIME_ROUTES_BASE_URL}/${OPTIONS}`,
};
