import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../../../../../../../../hooks/useAxiosPrivate";
import { statutoryKeys } from "../../../../../../../../../queryKeysFactories/statutory";
import type { ApiSuccessResponse } from "../../../../../../../../../types/apiResponse";
import { EMPLOYEE_STATUTORY_DETAILS_ROUTES } from "../../../../../../../../../constants/routes/employee-management/employee/statutory-details/routes";

export type StatutoryInfo = {
  pf_applicable: boolean;
  pf_account_no: string;
  pf_joining_date: string;
  uan_no: string;
  esic_applicable: boolean;
  esic_no: string;
  esic_joining_date: string;
  pt_applicable: boolean;
  lwf_applicable: boolean;
  tds_applicable: boolean;
};

type UseGetStatutoryInfoArgs = {
  employeeId: string;
};

export function useGetStatutoryInfo({ employeeId }: UseGetStatutoryInfoArgs) {
  const { axiosPrivate } = useAxiosPrivate();

  const fetchStatutoryInformation = async () => {
    const { data } = await axiosPrivate.get<ApiSuccessResponse<StatutoryInfo>>(
      EMPLOYEE_STATUTORY_DETAILS_ROUTES.get(employeeId)
    );

    return data.data;
  };

  return useQuery({
    queryKey: statutoryKeys.get(employeeId),
    queryFn: fetchStatutoryInformation,
    enabled: !!employeeId,
  });
}
