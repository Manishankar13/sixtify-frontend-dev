import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../../../../../../../hooks/useAxiosPrivate";
import { employeeReferenceDetails } from "../../../../../../../../queryKeysFactories/employeeReferenceDetails";
import type { ApiSuccessResponse } from "../../../../../../../../types/apiResponse";
import { EMPLOYEE_REFERENCE_DETAIL_ROUTES } from "../../../../../../../../constants/routes/employee-management/employee/reference-detail/routes";

export type ReferenceDetails = {
  id: string;
  reference_type: string;
  reference_employee_id: string;
  reference_name: string;
  reference_mobile_no: string;
  reference_address: string;
  company_id: string;
};

type UseGetReferenceDetailsArgs = {
  employeeId: ReferenceDetails["id"];
};

export function useGetReferenceDetails({
  employeeId,
}: UseGetReferenceDetailsArgs) {
  const { axiosPrivate } = useAxiosPrivate();

  const fetchReferenceDetails = async () => {
    const {
      data: { data },
    } = await axiosPrivate.get<ApiSuccessResponse<ReferenceDetails>>(
      EMPLOYEE_REFERENCE_DETAIL_ROUTES.get(employeeId)
    );

    return data;
  };

  return useQuery({
    queryKey: employeeReferenceDetails.get(employeeId),
    queryFn: fetchReferenceDetails,
    enabled: !!employeeId,
  });
}
