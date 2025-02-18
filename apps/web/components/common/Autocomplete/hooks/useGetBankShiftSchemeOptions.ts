import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../../../hooks/useAxiosPrivate";
import { employeeBankShiftDetailKeys } from "../../../../queryKeysFactories/employeeBankShift";
import type { ApiSuccessResponse } from "../../../../types/apiResponse";
import type { ShiftOptionsType } from "./useGetShiftSchemeOptions";
import { BANK_SHIFT_TYPE_ROUTES } from "../../../../constants/routes/employee-management/bank-shift-type/routes";

type UseGetBankShiftOptionsArgs = {
  companyId: string;
};

export function useGetBankShiftOptions({
  companyId,
}: UseGetBankShiftOptionsArgs) {
  const { axiosPrivate } = useAxiosPrivate();

  const fetchBankShiftOption = async () => {
    const { data } = await axiosPrivate.get<
      ApiSuccessResponse<ShiftOptionsType[]>
    >(BANK_SHIFT_TYPE_ROUTES.options(companyId));

    return data.data;
  };

  return useQuery({
    queryKey: employeeBankShiftDetailKeys.options(companyId),
    queryFn: fetchBankShiftOption,
    enabled: !!companyId,
    initialData: [],
  });
}
