"use client";

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../../../../../../hooks/useAxiosPrivate";
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from "../../../../../../../types/apiResponse";
import { IncomeTax } from "../../IncomeTaxList/hooks/useGetIncomeTax";
import { IncomeTaxFormValues } from "../IncomeTaxForm";
import { incomeTaxKeys } from "../../../../../../../queryKeysFactories/IncomeTax";
import { INCOME_TAX_ROUTES } from "../../../../../../../constants/routes/payroll/settings/taxes-deductions/routes";

type EditIncomeTaxApiResponse = ApiSuccessResponse<IncomeTax>;

type UseEditIncomeTaxArgs = {
  options: UseMutationOptions<
    EditIncomeTaxApiResponse,
    ApiErrorResponse<IncomeTaxFormValues>,
    Partial<IncomeTaxFormValues>
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
