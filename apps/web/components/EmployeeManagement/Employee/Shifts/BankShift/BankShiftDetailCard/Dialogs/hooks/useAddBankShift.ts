"use client";

import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../../../../../../../hooks/useAxiosPrivate";
import { employeeBankShiftDetailKeys } from "../../../../../../../../queryKeysFactories/employeeBankShift";
import type {
  ApiErrorResponse,
  ApiSuccessResponse,
} from "../../../../../../../../types/apiResponse";
import type { BankShiftDetail } from "../../BankShiftList/hooks/useGetBankShiftList";
import type { BankShiftFormFieldValues } from "../BankShiftForm";
import { BANK_SHIFT_TYPE_ROUTES } from "../../../../../../../../constants/routes/employee-management/bank-shift-type/routes";

type AddBankShiftApiSuccessResponse = ApiSuccessResponse<BankShiftDetail>;

type UseAddBankShiftArgs = {
  options: UseMutationOptions<
    AddBankShiftApiSuccessResponse,
    ApiErrorResponse,
    Partial<BankShiftFormFieldValues>
  >;
};

export function useAddBankShift({ options = {} }: UseAddBankShiftArgs) {
  const { axiosPrivate } = useAxiosPrivate();

  return useMutation({
    mutationKey: employeeBankShiftDetailKeys.add(),
    mutationFn: async (formValues) => {
      const { data } = await axiosPrivate.post<AddBankShiftApiSuccessResponse>(
        BANK_SHIFT_TYPE_ROUTES.post,
        formValues
      );

      return data;
    },
    ...options,
  });
}
