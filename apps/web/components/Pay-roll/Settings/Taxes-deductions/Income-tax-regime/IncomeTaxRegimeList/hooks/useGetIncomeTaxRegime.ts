import { useQuery } from "@tanstack/react-query";
import type { IGetRowsParams } from "ag-grid-community";
import { INCOME_TAX_REGIME_ROUTES } from "../../../../../../../constants/routes/pay-roll/settings/taxes-deductions/income-tax-regime/routes";
import { useAxiosPrivate } from "../../../../../../../hooks/useAxiosPrivate";
import { incomeTaxRegimeKeys } from "../../../../../../../queryKeysFactories/IncomeTaxRegime";
import type { QuickFilter } from "../../../../../../../types/agGrid";
import type { ApiSuccessResponse } from "../../../../../../../types/apiResponse";

type FinancialYear = {
  start_date: string;
  end_date: string;
};

export type IncomeTaxRegime = {
  id: string;
  financial_year: FinancialYear;
  regime_type: "old" | "new";
  action_by: number;
  action_at: string;
  full_count: string;
};

type GetIncomeTaxRegimesArgs = {
  body?:
    | IGetRowsParams
    | QuickFilter
    | Partial<{
        is_active: boolean;
        responseFields: string[];
      }>;
};

export function useGetIncomeTaxRegimeQueryFn() {
  const { axiosPrivate } = useAxiosPrivate();

  const getIncomeTaxRegime = async ({ body }: GetIncomeTaxRegimesArgs) => {
    const { data } = await axiosPrivate.post<
      ApiSuccessResponse<{
        incomeTaxRegimes: IncomeTaxRegime[];
        totalCount: number;
      }>
    >(INCOME_TAX_REGIME_ROUTES.listing, body);

    return data.data;
  };

  return { getIncomeTaxRegime };
}

//NOTE: for future use
export function useGetIncomeTaxRegime({ body }: GetIncomeTaxRegimesArgs) {
  const { getIncomeTaxRegime } = useGetIncomeTaxRegimeQueryFn();

  return useQuery({
    queryKey: incomeTaxRegimeKeys.listing(body),
    queryFn: () => getIncomeTaxRegime({ body }),
    initialData: { incomeTaxRegimes: [], totalCount: 0 },
  });
}
