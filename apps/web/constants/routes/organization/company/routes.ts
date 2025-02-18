import { LIST, OPTIONS } from "../../../routes";
import { ORGANIZATION_BASE_URL } from "../routes";

export const COMPANY_ROUTES_BASE_URL = `${ORGANIZATION_BASE_URL}/company`;

export const COMPANY_ROUTES = {
  post: COMPANY_ROUTES_BASE_URL,

  delete: (companyId: string) => `${COMPANY_ROUTES_BASE_URL}/${companyId}`,

  listing: `${COMPANY_ROUTES_BASE_URL}/${LIST}`,

  options: `${COMPANY_ROUTES_BASE_URL}/${OPTIONS}`,
};
