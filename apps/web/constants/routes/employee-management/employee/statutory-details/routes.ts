import { EMPLOYEE_ROUTES_BASE_URL } from "../routes";

export const EMPLOYEE_STATUTORY_DETAILS_ROUTES_BASE_URL = "statutory-details";

export const EMPLOYEE_STATUTORY_DETAILS_ROUTES = {
  get: (employeeId: string) =>
    `${EMPLOYEE_ROUTES_BASE_URL}/${employeeId}/${EMPLOYEE_STATUTORY_DETAILS_ROUTES_BASE_URL}`,

  patch: (employeeId: string) =>
    `${EMPLOYEE_ROUTES_BASE_URL}/${employeeId}/${EMPLOYEE_STATUTORY_DETAILS_ROUTES_BASE_URL}`,
};
