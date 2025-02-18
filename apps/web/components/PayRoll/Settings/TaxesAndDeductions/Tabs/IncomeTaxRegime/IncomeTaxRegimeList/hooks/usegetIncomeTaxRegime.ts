import { useQuery } from "@tanstack/react-query";
import type { IGetRowsParams } from "ag-grid-community";
import { INCOME_TAX_REGIME_ROUTES } from "../../../../../../../../constants/routes/payroll/settings/taxes/income-tax-regime/routes";
import { useAxiosPrivate } from "../../../../../../../../hooks/useAxiosPrivate";
import { incomeTaxRegimeKeys } from "../../../../../../../../queryKeysFactories/IncomeTaxRegime";
import type { QuickFilter } from "../../../../../../../../types/agGrid";
import type { ApiSuccessResponse } from "../../../../../../../../types/apiResponse";

export type TaxSlab = {
  start_range: number;
  end_range: number;
  tax_rate: number;
  surcharge_rate: number;
};

export type IncomeTaxRegimePayload = {
  financial_year: {
    start_date: string;
    end_date: string;
  };
  action_by: string;
  action_at: string;
  regime_type: "new" | "old";
  health_education_cess_rate: number;
  tax_slabs: {
    standard: TaxSlab[];
    senior: TaxSlab[];
    super_senior: TaxSlab[];
  };
};

type GetIncomeTaxArgs = {
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

  const getIncomeTaxRegime = async ({ body }: GetIncomeTaxArgs) => {
    const { data } = await axiosPrivate.post<
      ApiSuccessResponse<{
        incomeTaxRegimes: IncomeTaxRegimePayload[];
        totalCount: number;
      }>
    >(INCOME_TAX_REGIME_ROUTES.listing, body);

    return data.data;
  };

  return { getIncomeTaxRegime };
}

export function useGetIncomeTax({ body }: GetIncomeTaxArgs) {
  const { getIncomeTaxRegime } = useGetIncomeTaxRegimeQueryFn();

  return useQuery({
    queryKey: incomeTaxRegimeKeys.listing(),
    queryFn: () => getIncomeTaxRegime({ body }),
    initialData: { incomeTaxRegimes: [], totalCount: 0 },
  });
}
