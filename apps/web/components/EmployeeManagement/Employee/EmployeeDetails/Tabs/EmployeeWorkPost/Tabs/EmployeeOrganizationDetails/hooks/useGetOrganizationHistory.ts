import { useQuery } from "@tanstack/react-query";
import type { IGetRowsParams } from "ag-grid-community";
import { useAxiosPrivate } from "../../../../../../../../../hooks/useAxiosPrivate";
import type { ApiSuccessResponse } from "../../../../../../../../../types/apiResponse";
import type { SectionKeys } from "./useGetOrganizationDetails";
import {
  CURRENT,
  CURRENT_COLOR,
  PAST,
  PAST_COLOR,
  UPCOMING,
  UPCOMING_COLOR,
} from "./constant";
import { employeeOrganizationDetails } from "../../../../../../../../../queryKeysFactories/employeeOrganizationDetails";
import { EMPLOYEE_ORGANIZATION_DETAILS_ROUTES } from "../../../../../../../../../constants/routes/employee-management/organization-details/routes";

type Color = typeof CURRENT_COLOR | typeof PAST_COLOR | typeof UPCOMING_COLOR;

export const StatusOptions = {
  [UPCOMING]: "Upcoming",
  [CURRENT]: "Current",
  [PAST]: "Past",
};

export type StatusKeys = keyof typeof StatusOptions;

export const StatusColorOptions: Record<StatusKeys, Color> = {
  [UPCOMING]: UPCOMING_COLOR,
  [CURRENT]: CURRENT_COLOR,
  [PAST]: PAST_COLOR,
};

type useGetOrganizationHistoryArgs = {
  employeeId: string;
  section: SectionKeys;
  body?: IGetRowsParams;
};
export type Histories = {
  effective_from: string;
  effective_to: string | null;
  status: StatusKeys;
  remark: string;
  action_by: string;
  action_at: string;
  name: string;
};

export function useGetOrganizationHistoryQueryFn() {
  const { axiosPrivate } = useAxiosPrivate();

  const fetchOrganizationHistory = async ({
    employeeId,
    section,
    body,
  }: useGetOrganizationHistoryArgs) => {
    const { data } = await axiosPrivate.post<
      ApiSuccessResponse<{
        histories: Histories[];
        totalCount: number;
      }>
    >(EMPLOYEE_ORGANIZATION_DETAILS_ROUTES.post(employeeId, section), body);

    return data.data;
  };

  return { fetchOrganizationHistory };
}
export function useGetOrganizationHistory({
  employeeId,
  section,
  body,
}: useGetOrganizationHistoryArgs) {
  const { fetchOrganizationHistory } = useGetOrganizationHistoryQueryFn();

  return useQuery({
    queryKey: employeeOrganizationDetails.getHistory(employeeId, section),
    queryFn: () => fetchOrganizationHistory({ employeeId, section, body }),
    initialData: { histories: [], totalCount: 0 },
  });
}
