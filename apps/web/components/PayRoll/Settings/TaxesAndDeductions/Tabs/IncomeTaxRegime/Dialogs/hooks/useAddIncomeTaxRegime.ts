"use client";

import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { INCOME_TAX_REGIME_ROUTES } from "../../../../../../../../constants/routes/payroll/settings/taxes/income-tax-regime/routes";
import { useAxiosPrivate } from "../../../../../../../../hooks/useAxiosPrivate";
import { incomeTaxRegimeKeys } from "../../../../../../../../queryKeysFactories/IncomeTaxRegime";
import type { ApiErrorResponse, ApiSuccessResponse } from "../../../../../../../../types/apiResponse";
import type { IncomeTaxRegimePayload } from "../../IncomeTaxRegimeList/hooks/usegetIncomeTaxRegime";
import type { CompanyFormFieldType } from "../IncomeTaxRegimeForm";

type AddIncomeTaxRegimeApiSuccessResponse = ApiSuccessResponse<CompanyFormFieldType>;

type UseAddIncomeTaxRegimeArgs = {
  options: UseMutationOptions<
    AddIncomeTaxRegimeApiSuccessResponse,
    ApiErrorResponse<IncomeTaxRegimePayload>,
    IncomeTaxRegimePayload
  >;
};


export function useAddIncomeTaxRegime({ options = {} }: UseAddIncomeTaxRegimeArgs) {
  const { axiosPrivate } = useAxiosPrivate();

  return useMutation({
    mutationKey: incomeTaxRegimeKeys.add(),
    mutationFn: async (formValues) => {
      const { data } = await axiosPrivate.post<AddIncomeTaxRegimeApiSuccessResponse>(
        INCOME_TAX_REGIME_ROUTES.post,
        formValues
      );

      return data;
    },
    ...options,
  });
}