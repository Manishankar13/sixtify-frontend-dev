"use client";

import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { INCOME_TAX_REGIME_ROUTES } from "../../../../../../../constants/routes/pay-roll/settings/taxes-deductions/income-tax-regime/routes";
import { useAxiosPrivate } from "../../../../../../../hooks/useAxiosPrivate";
import { incomeTaxRegimeKeys } from "../../../../../../../queryKeysFactories/IncomeTaxRegime";
import type {
  ApiErrorResponse,
  ApiSuccessResponse,
} from "../../../../../../../types/apiResponse";
import type {
  FinancialYearSchemaFieldValues,
  IncomeTaxRegimeFormFieldValues,
} from "../IncomeTaxRegimeForm";

type AddIncomeTaxRegimeApiSuccessResponse = ApiSuccessResponse<
  Omit<IncomeTaxRegimeFormFieldValues, "financial_year"> & {
    financial_year: FinancialYearSchemaFieldValues;
  }
>;

type UseAddIncomeTaxRegimeArgs = {
  options: UseMutationOptions<
    AddIncomeTaxRegimeApiSuccessResponse,
    ApiErrorResponse<Record<string, string>>,
    Partial<
      Omit<IncomeTaxRegimeFormFieldValues, "financial_year"> & {
        financial_year: FinancialYearSchemaFieldValues;
      }
    >
  >;
};

export function useAddIncomeTaxRegime({
  options = {},
}: UseAddIncomeTaxRegimeArgs) {
  const { axiosPrivate } = useAxiosPrivate();

  return useMutation({
    mutationKey: incomeTaxRegimeKeys.add(),
    mutationFn: async (formValues) => {
      const { data } =
        await axiosPrivate.post<AddIncomeTaxRegimeApiSuccessResponse>(
          INCOME_TAX_REGIME_ROUTES.post,
          formValues
        );

      return data;
    },
    ...options,
  });
}
