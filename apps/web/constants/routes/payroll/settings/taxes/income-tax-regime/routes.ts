import { LIST, OPTIONS } from "../../../../../routes";
import { TAXES_BASE_URL } from "../routes";

export const INCOME_TAX_REGIME_URL = `${TAXES_BASE_URL}/income-tax-regime`;

export const INCOME_TAX_REGIME_ROUTES = {
  post: INCOME_TAX_REGIME_URL,

  //   delete: (companyId: string) => `${COMPANY_ROUTES_BASE_URL}/${companyId}`,

  listing: `${INCOME_TAX_REGIME_URL}/${LIST}`,

  options: `${INCOME_TAX_REGIME_URL}/${OPTIONS}`,
};
