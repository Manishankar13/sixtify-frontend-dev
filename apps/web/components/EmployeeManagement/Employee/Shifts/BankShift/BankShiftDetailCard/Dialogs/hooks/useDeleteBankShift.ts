"use client";

import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../../../../../../../hooks/useAxiosPrivate";
import { employeeBankShiftDetailKeys } from "../../../../../../../../queryKeysFactories/employeeBankShift";
import type {
  ApiErrorResponse,
  ApiSuccessResponse,
} from "../../../../../../../../types/apiResponse";
import type { BankShiftDetail } from "../../BankShiftList/hooks/useGetBankShiftList";
import { BANK_SHIFT_TYPE_ROUTES } from "../../../../../../../../constants/routes/employee-management/bank-shift-type/routes";

type DeleteBankShiftApiResponse = ApiSuccessResponse<BankShiftDetail>;

type UseDeleteBankShiftArgs = {
  options: UseMutationOptions<DeleteBankShiftApiResponse, ApiErrorResponse>;
  bankShiftTypeId: string;
};

export function useDeleteBankShift({
  bankShiftTypeId,
  options = {},
}: UseDeleteBankShiftArgs) {
  const { axiosPrivate } = useAxiosPrivate();

  return useMutation({
    mutationKey: employeeBankShiftDetailKeys.delete(bankShiftTypeId),
    mutationFn: async () => {
      const { data } = await axiosPrivate.delete<DeleteBankShiftApiResponse>(
        BANK_SHIFT_TYPE_ROUTES.delete(bankShiftTypeId)
      );

      return data;
    },
    ...options,
  });
}
