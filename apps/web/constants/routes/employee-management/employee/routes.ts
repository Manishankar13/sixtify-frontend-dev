import { LIST } from "../../../routes";
import { EMPLOYEE_MANAGEMENT_ROUTES_BASE_URL } from "../routes";

export type QueryParams = Partial<{
  address: boolean;
  label: boolean;
  mobile_no: boolean;
  employee_code: boolean;
  punch_code: boolean;
  avatar: boolean;
}>;

export const EMPLOYEE_ROUTES_BASE_URL = `${EMPLOYEE_MANAGEMENT_ROUTES_BASE_URL}/employee`;

export const EMPLOYEE_ROUTES = {
  post: EMPLOYEE_ROUTES_BASE_URL,

  listing: `${EMPLOYEE_ROUTES_BASE_URL}/${LIST}`,

  options: (companyId: string, queryParams: QueryParams) => {
    const queryString = new URLSearchParams(
      Object.entries(queryParams)
        .filter(([, value]) => value != undefined && value != null)
        .reduce(
          (acc, [key, value]) => {
            acc[key] = value.toString();

            return acc;
          },
          {} as Record<string, string>
        )
    ).toString();

    return `${EMPLOYEE_ROUTES_BASE_URL}/options/${companyId}?${queryString}`;
  },
};
