import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../../../hooks/useAxiosPrivate";
import { companyKeys } from "../../../../queryKeysFactories/company";
import type { ApiSuccessResponse } from "../../../../types/apiResponse";
import type { OptionsType } from "../../../../types/options";
import { COMPANY_ROUTES } from "../../../../constants/routes/organization/company/routes";

export function useGetCompanyQueryOptionFn() {
  const { axiosPrivate } = useAxiosPrivate();

  const getCompanyOptions = async () => {
    const { data } = await axiosPrivate.get<ApiSuccessResponse<OptionsType[]>>(
      COMPANY_ROUTES.options
    );

    return data.data;
  };

  return { getCompanyOptions };
}

//NOTE: for future use
export function useGetCompanyOptions() {
  const { getCompanyOptions } = useGetCompanyQueryOptionFn();

  return useQuery({
    queryKey: companyKeys.options(),
    queryFn: () => getCompanyOptions(),
    initialData: [],
  });
}
