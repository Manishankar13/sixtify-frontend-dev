import { useQuery } from "@tanstack/react-query";
import type { IGetRowsParams } from "ag-grid-community";

import { useAxiosPrivate } from "../../../../../../../../hooks/useAxiosPrivate";
import { employeeBankShiftDetailKeys } from "../../../../../../../../queryKeysFactories/employeeBankShift";
import type { QuickFilter } from "../../../../../../../../types/agGrid";
import type { ApiSuccessResponse } from "../../../../../../../../types/apiResponse";
import { BANK_SHIFT_TYPE_ROUTES } from "../../../../../../../../constants/routes/employee-management/bank-shift-type/routes";

export type BankShiftDetail = {
  id: string;
  company_id: string;
  bank_shift_type_name: string;
  bank_shift_type_code: string;
  shift_time: string;
  shift_hours: string;
  company_name: string;
  action_by: string;
  action_at: string;
  full_count: string;
};

type GetBankShiftDetailArgs = {
  body?:
    | Partial<IGetRowsParams>
    | QuickFilter
    | Partial<{
        is_active: boolean;
        responseFields: string[];
      }>;
};

export function useGetBankShiftListQueryFn() {
  const { axiosPrivate } = useAxiosPrivate();

  const getBankShiftDetail = async ({ body }: GetBankShiftDetailArgs) => {
    const { data } = await axiosPrivate.post<
      ApiSuccessResponse<{
        totalCount: number;
        bankShiftTypes: BankShiftDetail[];
      }>
    >(BANK_SHIFT_TYPE_ROUTES.listing, body);

    return data.data;
  };

  return { getBankShiftDetail };
}

export function useGetBankShiftDetail({ body }: GetBankShiftDetailArgs) {
  const { getBankShiftDetail } = useGetBankShiftListQueryFn();

  return useQuery({
    queryKey: employeeBankShiftDetailKeys.listing(body),
    queryFn: () => getBankShiftDetail({ body }),
    initialData: { bankShiftTypes: [], totalCount: 0 },
  });
}
