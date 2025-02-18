"use client";

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../../../../../../hooks/useAxiosPrivate";
import { ApiErrorResponse, ApiSuccessResponse } from "../../../../../../../types/apiResponse";
import { IncomeTax } from "../../IncomeTaxList/hooks/useGetIncomeTax";
import { incomeTaxKeys } from "../../../../../../../queryKeysFactories/IncomeTax";
import { INCOME_TAX_ROUTES } from "../../../../../../../constants/routes/payroll/settings/taxes-deductions/routes";

type DeleteIncomeTaxApiResponse = ApiSuccessResponse<IncomeTax>;

type UseDeleteIncomeTaxArgs = {
  options: UseMutationOptions<DeleteIncomeTaxApiResponse, ApiErrorResponse>;
  incomeTaxId: string;
};

export function useDeleteIncomeTax({
  incomeTaxId,
  options = {},
}: UseDeleteIncomeTaxArgs) {
  const { axiosPrivate } = useAxiosPrivate();

  return useMutation({
    mutationKey: incomeTaxKeys.delete(incomeTaxId),
    mutationFn: async () => {
      const { data } = await axiosPrivate.delete<DeleteIncomeTaxApiResponse>(
        INCOME_TAX_ROUTES.delete(incomeTaxId)
      );

      return data;
    },
    ...options,
  });
}
