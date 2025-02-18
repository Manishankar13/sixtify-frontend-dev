import { LIST, OPTIONS } from "../../../routes";
import { EMPLOYEE_MANAGEMENT_ROUTES_BASE_URL } from "../routes";

export const BANK_SHIFT_TYPE_ROUTES_BASE_URL = `${EMPLOYEE_MANAGEMENT_ROUTES_BASE_URL}/shifts/bank-shift-type`;

export const BANK_SHIFT_TYPE_ROUTES = {
  post: BANK_SHIFT_TYPE_ROUTES_BASE_URL,

  delete: (bankShiftTypeId: string) =>
    `${BANK_SHIFT_TYPE_ROUTES_BASE_URL}/${bankShiftTypeId}`,

  listing: `${BANK_SHIFT_TYPE_ROUTES_BASE_URL}/${LIST}`,

  patch: (bankShiftTypeId: string) =>
    `${BANK_SHIFT_TYPE_ROUTES_BASE_URL}/${bankShiftTypeId}`,

  get: (bankShiftTypeId: string) =>
    `${BANK_SHIFT_TYPE_ROUTES_BASE_URL}/${bankShiftTypeId}`,

  options: (companyId: string) =>
    `${BANK_SHIFT_TYPE_ROUTES_BASE_URL}/${OPTIONS}/${companyId}`,
};
