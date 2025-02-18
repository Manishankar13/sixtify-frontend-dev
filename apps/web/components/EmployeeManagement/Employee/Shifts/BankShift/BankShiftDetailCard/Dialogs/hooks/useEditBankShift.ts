"use client";

import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../../../../../../../hooks/useAxiosPrivate";
import { employeeBankShiftDetailKeys } from "../../../../../../../../queryKeysFactories/employeeBankShift";
import type {
  ApiErrorResponse,
  ApiSuccessResponse,
} from "../../../../../../../../types/apiResponse";
import type { BankShiftDetail } from "../../../BankShiftDetailCard/BankShiftList/hooks/useGetBankShiftList";
import type { BankShiftFormFieldValues } from "../BankShiftForm";
import { BANK_SHIFT_TYPE_ROUTES } from "../../../../../../../../constants/routes/employee-management/bank-shift-type/routes";

type EditBankShiftApiResponse = ApiSuccessResponse<BankShiftDetail>;

type UseEditBankShiftArgs = {
  options: UseMutationOptions<
    EditBankShiftApiResponse,
    ApiErrorResponse,
    Partial<BankShiftFormFieldValues>
  >;
  bankshiftId: string;
};

export function useEditBankShift({
  bankshiftId,
  options = {},
}: UseEditBankShiftArgs) {
  const { axiosPrivate } = useAxiosPrivate();

  return useMutation({
    mutationKey: employeeBankShiftDetailKeys.edit(bankshiftId),
    mutationFn: async (formValues) => {
      const { data } = await axiosPrivate.patch<EditBankShiftApiResponse>(
        BANK_SHIFT_TYPE_ROUTES.patch(bankshiftId),
        formValues
      );

      return data;
    },
    ...options,
  });
}
