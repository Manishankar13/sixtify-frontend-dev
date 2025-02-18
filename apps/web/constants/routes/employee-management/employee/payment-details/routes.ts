import type { OptionKey } from "../../../../../components/EmployeeManagement/Employee/EmployeeDetails/Tabs/EmployeeWorkPost/Tabs/EmployeeOrganizationDetails/BusinessUnit/Dialogs/EditBusinessUnitDialog/hooks/useTabOptions";
import { HISTORY } from "../../../../routes";
import { EMPLOYEE_ROUTES_BASE_URL } from "../routes";

export const EMPLOYEE_PAYMENT_DETAILS_ROUTES_BASE_URL = "payment-details";

export const EMPLOYEE_PAYMENT_DETAILS_ROUTES = {
  get: (employeeId: string) =>
    `${EMPLOYEE_ROUTES_BASE_URL}/${employeeId}/${EMPLOYEE_PAYMENT_DETAILS_ROUTES_BASE_URL}`,

  postHistory: (employeeId: string) =>
    `${EMPLOYEE_ROUTES_BASE_URL}/${employeeId}/${EMPLOYEE_PAYMENT_DETAILS_ROUTES_BASE_URL}/${HISTORY}`,

  patch: (bankId: string, operationType: OptionKey) =>
    `${EMPLOYEE_ROUTES_BASE_URL}/${bankId}/${EMPLOYEE_PAYMENT_DETAILS_ROUTES_BASE_URL}?operationType=${operationType}`,
};
