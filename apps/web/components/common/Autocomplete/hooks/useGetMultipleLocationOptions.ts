import { useQuery } from "@tanstack/react-query";
import { BUSINESS_UNIT_LOCATION_ROUTES } from "../../../../constants/routes/organization/business-unit-location/routes";
import { useAxiosPrivate } from "../../../../hooks/useAxiosPrivate";
import { locationKeys } from "../../../../queryKeysFactories/location";
import type { ApiSuccessResponse } from "../../../../types/apiResponse";
import type { OptionsType } from "../../../../types/options";

type UseGetMultipleLocationOptionsArgs = {
  businessUnitIds?: string[];
};

export function useGetMultipleLocationOptions({
  businessUnitIds,
}: UseGetMultipleLocationOptionsArgs) {
  const { axiosPrivate } = useAxiosPrivate();

  const fetchLocation = async () => {
    const { data } = await axiosPrivate.post<ApiSuccessResponse<OptionsType[]>>(
      BUSINESS_UNIT_LOCATION_ROUTES.multipleOptions,
      { business_unit_ids: businessUnitIds }
    );

    return data.data;
  };

  return useQuery({
    queryKey: locationKeys.multipleOptions(businessUnitIds),
    queryFn: fetchLocation,
    enabled: !!(Array.isArray(businessUnitIds) && businessUnitIds.length),
    initialData: [],
  });
}
