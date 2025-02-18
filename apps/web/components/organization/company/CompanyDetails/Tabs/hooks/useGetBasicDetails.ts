import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../../../../../hooks/useAxiosPrivate";
import { basicDetailsKey } from "../../../../../../queryKeysFactories/basicDetails";
import type { ApiSuccessResponse } from "../../../../../../types/apiResponse";
import { BASIC_DETAILS_ROUTES } from "../../../../../../constants/routes/organization/company/basic-details/routes";

export type BasicDetails = {
  id: string;
  company_name: string;
  email: string;
  phone_no: string;
  mobile_no: string;
  industry_id: string;
  industry_name: string;
  company_start_date: string;
  about_company: string;
  vision_and_mission: string;
  company_logo: string;
  address: string;
  city_id: string;
  city_name: string;
  state_id: string;
  state_name: string;
  country_id: string;
  country_name: string;
  pin_code: string;
};

type companyId = {
  companyId: string;
};

export function useGetBasicDetails({ companyId }: companyId) {
  const { axiosPrivate } = useAxiosPrivate();

  const fetchBasicDetailsList = async () => {
    const { data } = await axiosPrivate.get<ApiSuccessResponse<BasicDetails>>(
      BASIC_DETAILS_ROUTES.get(companyId)
    );

    return data.data;
  };

  return useQuery({
    queryKey: basicDetailsKey.get(companyId),
    queryFn: fetchBasicDetailsList,
    enabled: !!companyId,
  });
}
