import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../../../../hooks/useAxiosPrivate";
import { locationKeys } from "../../../../../queryKeysFactories/location";
import type { ApiSuccessResponse } from "../../../../../types/apiResponse";
import type { Location } from "../../LocationList/hooks/useGetLocations";
import { BUSINESS_UNIT_LOCATION_ROUTES } from "../../../../../constants/routes/organization/business-unit-location/routes";

type UseGetLocationArgs = {
  locationId: Location["id"];
};

export function useGetLocation({ locationId }: UseGetLocationArgs) {
  const { axiosPrivate } = useAxiosPrivate();

  const fetchLocation = async () => {
    const {
      data: { data },
    } = await axiosPrivate.get<ApiSuccessResponse<Location>>(
      BUSINESS_UNIT_LOCATION_ROUTES.get(locationId)
    );

    return data;
  };

  return useQuery({
    queryKey: locationKeys.get(locationId),
    queryFn: fetchLocation,
    enabled: !!locationId,
  });
}
