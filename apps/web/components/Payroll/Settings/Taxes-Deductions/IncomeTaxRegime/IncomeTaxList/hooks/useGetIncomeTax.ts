import { useQuery } from "@tanstack/react-query";
import type { IGetRowsParams } from "ag-grid-community";
import { useAxiosPrivate } from "../../../../../../../hooks/useAxiosPrivate";
import { incomeTaxKeys } from "../../../../../../../queryKeysFactories/IncomeTax";
import { QuickFilter } from "../../../../../../../types/agGrid";
import { ApiSuccessResponse } from "../../../../../../../types/apiResponse";
import { INCOME_TAX_ROUTES } from "../../../../../../../constants/routes/payroll/settings/taxes-deductions/routes";

export type TaxSlab = {
  start_range: number;
  end_range: number;
  tax_rate: number;
  surcharge_rate: number;
};

export type IncomeTax = {
  id: string;
  financial_year: string | null;
  action_by: string;
  standard_deduction_limit: null;
  action_at: string;
  regime_type: "new" | "old";
  health_education_cess_rate: number;
  tax_slabs: {
    standard: {
      start_range: number | null;
      end_range: number | null;
      tax_rate: number | null;
      surcharge_rate: number | null;
    }[];
    senior: {
      start_range: number | null;
      end_range: number | null;
      tax_rate: number | null;
      surcharge_rate: number | null;
    }[];
    super_senior: {
      start_range: number | null;
      end_range: number | null;
      tax_rate: number | null;
      surcharge_rate: number | null;
    }[];
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

export function useGetIncomeTaxQueryFn() {
  const { axiosPrivate } = useAxiosPrivate();

  const getIncomeTax = async ({ body }: GetIncomeTaxArgs) => {
    const { data } = await axiosPrivate.post<
      ApiSuccessResponse<{
        incomeTaxRegimes: IncomeTax[];
        totalCount: number;
      }>
    >(INCOME_TAX_ROUTES.listing, body);

    return data.data;
  };

  return { getIncomeTax };
}

export function useGetIncomeTax({ body }: GetIncomeTaxArgs) {
  const { getIncomeTax } = useGetIncomeTaxQueryFn();

  return useQuery({
    queryKey: incomeTaxKeys.listing(body),
    queryFn: () => getIncomeTax({ body }),
    initialData: { incomeTaxRegimes: [], totalCount: 0 },
  });
}
