import { useQuery } from "@tanstack/react-query";
import { INCOME_TAX_REGIME_ROUTES } from "../../../../../../../../constants/routes/payroll/settings/taxes/income-tax-regime/routes";
import { useAxiosPrivate } from "../../../../../../../../hooks/useAxiosPrivate";
import { incomeTaxRegimeKeys } from "../../../../../../../../queryKeysFactories/IncomeTaxRegime";
import type { ApiSuccessResponse } from "../../../../../../../../types/apiResponse";

export type IncomeTaxRegimeOptions = {
  value: string;
  label: {
    start_date: string;
    end_date: string;
  };
};

export function useGetIncomeTaxRegimeOptionsQueryFn() {
  const { axiosPrivate } = useAxiosPrivate();

  const getIncomeTaxRegime = async () => {
    const { data } = await axiosPrivate.get<
      ApiSuccessResponse<{
        incomeTaxRegimes: IncomeTaxRegimeOptions[];
        totalCount: number;
      }>
    >(INCOME_TAX_REGIME_ROUTES.options);

    return data.data;
  };

  return { getIncomeTaxRegime };
}

export function useGetIncomeTaxRegimeOptions() {
  const { getIncomeTaxRegime } = useGetIncomeTaxRegimeOptionsQueryFn();

  return useQuery({
    queryKey: incomeTaxRegimeKeys.options(),
    queryFn: () => getIncomeTaxRegime(),
  });
}
