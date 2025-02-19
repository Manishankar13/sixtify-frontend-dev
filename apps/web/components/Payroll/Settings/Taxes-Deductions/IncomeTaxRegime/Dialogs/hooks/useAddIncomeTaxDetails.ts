"use client";

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { INCOME_TAX_ROUTES } from "../../../../../../../constants/routes/payroll/settings/taxes-deductions/routes";
import { useAxiosPrivate } from "../../../../../../../hooks/useAxiosPrivate";
import { incomeTaxKeys } from "../../../../../../../queryKeysFactories/IncomeTax";
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from "../../../../../../../types/apiResponse";
import { IncomeTaxFormValues } from "../IncomeTaxForm";

type AddIncomeTaxApiSuccessResponse = ApiSuccessResponse<null>;

type UseAddIncomeTaxDetailsArgs = {
  options: UseMutationOptions<
    AddIncomeTaxApiSuccessResponse,
    ApiErrorResponse,
    Partial<
      Omit<IncomeTaxFormValues, "financial_year"> & {
        financial_year: { start_date: string; end_date: string };
      }
    >
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
