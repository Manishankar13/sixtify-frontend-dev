import type { IGetRowsParams } from "ag-grid-community";
import { useAxiosPrivate } from "../../../../../../hooks/useAxiosPrivate";
import type { ApiSuccessResponse } from "../../../../../../types/apiResponse";
import type { QuickFilter } from "../../../../../../types/agGrid";
import { useQuery } from "@tanstack/react-query";
import { bankShiftAllocationKeys } from "../../../../../../queryKeysFactories/bankShiftAllocation";
import { DateTime } from "luxon";
import type { FieldValues } from "react-hook-form";
import { BANK_SHIFT_ALLOCATION_ROUTES } from "../../../../../../constants/routes/transactions/shift-day/bank-shift-allocation/routes";

export type BankShiftAllocationType = {
  id: string;
  employee_name: string;
  company_name: string;
  business_unit_name: string;
  department_name: string;
  sub_department_name: string;
  designation_name: string;
  reporting_manager_name: string;
  employee_code: string;
  punch_code: string;
  avatar: string;
  business_unit_location_name: string;
  bank_shift_type_name: string;
  selected: boolean;
  checkAll: boolean;
  selectedRecords: {
    [key: string]: boolean;
  } | null;
};

type GetBankShiftAllocationArgs = {
  body?:
    | IGetRowsParams
    | QuickFilter
    | Partial<{
        is_active: boolean;
        responseFields: string[];
        externalFilter: FieldValues;
      }>;
  companyId?: string;
};

export function useGetBankShiftAllocationQueryFn() {
  const { axiosPrivate } = useAxiosPrivate();

  const currentDate = DateTime.now().toISODate();

  const getBankShiftAllocation = async ({
    body,
    companyId,
  }: GetBankShiftAllocationArgs) => {
    if (!companyId) {
      return { list: [], totalCount: 0 };
    }

    const { data } = await axiosPrivate.post<
      ApiSuccessResponse<{
        list: BankShiftAllocationType[];
        totalCount: number;
      }>
    >(BANK_SHIFT_ALLOCATION_ROUTES.listing(currentDate), body);

    return data.data;
  };

  return { getBankShiftAllocation };
}

export function useGetBankShiftAllocation({
  body,
}: GetBankShiftAllocationArgs) {
  const { getBankShiftAllocation } = useGetBankShiftAllocationQueryFn();

  return useQuery({
    queryKey: bankShiftAllocationKeys.listing(body),
    queryFn: () => getBankShiftAllocation({ body }),
    initialData: { list: [], totalCount: 0 },
  });
}
