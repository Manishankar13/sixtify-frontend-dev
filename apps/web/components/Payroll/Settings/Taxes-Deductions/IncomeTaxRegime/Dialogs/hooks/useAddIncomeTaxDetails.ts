"use client";

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../../../../../../hooks/useAxiosPrivate";
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from "../../../../../../../types/apiResponse";
import { incomeTaxKeys } from "../../../../../../../queryKeysFactories/IncomeTax";
import { IncomeTaxFormValues } from "../IncomeTaxForm";
import { INCOME_TAX_ROUTES } from "../../../../../../../constants/routes/payroll/settings/taxes-deductions/routes";

type AddIncomeTaxApiSuccessResponse = ApiSuccessResponse<null>;

type UseAddIncomeTaxDetailsArgs = {
  options: UseMutationOptions<
    AddIncomeTaxApiSuccessResponse,
    ApiErrorResponse,
    Partial<IncomeTaxFormValues>
  >;
};

export function useAddIncomeTaxDetails({
  options = {},
}: UseAddIncomeTaxDetailsArgs) {
  const { axiosPrivate } = useAxiosPrivate();

  return useMutation({
    mutationKey: incomeTaxKeys.add(),
    mutationFn: async (formValues) => {
      const { data } = await axiosPrivate.post<AddIncomeTaxApiSuccessResponse>(
        INCOME_TAX_ROUTES.post(),
        formValues
      );

      return data;
    },
    ...options,
  });
}
