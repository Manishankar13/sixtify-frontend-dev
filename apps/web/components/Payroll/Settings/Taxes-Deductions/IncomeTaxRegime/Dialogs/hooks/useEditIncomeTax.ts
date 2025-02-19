"use client";

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { INCOME_TAX_ROUTES } from "../../../../../../../constants/routes/payroll/settings/taxes-deductions/routes";
import { useAxiosPrivate } from "../../../../../../../hooks/useAxiosPrivate";
import { incomeTaxKeys } from "../../../../../../../queryKeysFactories/IncomeTax";
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from "../../../../../../../types/apiResponse";
import { IncomeTax } from "../../IncomeTaxList/hooks/useGetIncomeTax";
import { IncomeTaxFormValues } from "../IncomeTaxForm";

type EditIncomeTaxApiResponse = ApiSuccessResponse<IncomeTax>;

type UseEditIncomeTaxArgs = {
  options: UseMutationOptions<
    EditIncomeTaxApiResponse,
    ApiErrorResponse<IncomeTaxFormValues>,
    Partial<
      Omit<IncomeTaxFormValues, "financial_year"> & {
        financial_year: { start_date: string; end_date: string };
      }
    >
  >;
  incomeTaxId: string;
};

export function useEditIncomeTax({
  incomeTaxId,
  options = {},
}: UseEditIncomeTaxArgs) {
  const { axiosPrivate } = useAxiosPrivate();

  return useMutation({
    mutationKey: incomeTaxKeys.edit(incomeTaxId),
    mutationFn: async (formValues) => {
      const { data } = await axiosPrivate.patch<EditIncomeTaxApiResponse>(
        INCOME_TAX_ROUTES.patch(incomeTaxId),
        formValues
      );

      return data;
    },
    ...options,
  });
}
