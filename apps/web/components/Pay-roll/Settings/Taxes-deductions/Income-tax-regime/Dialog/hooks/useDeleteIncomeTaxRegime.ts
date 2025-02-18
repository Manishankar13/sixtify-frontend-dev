"use client";

import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { INCOME_TAX_REGIME_ROUTES } from "../../../../../../../constants/routes/pay-roll/settings/taxes-deductions/income-tax-regime/routes";
import { useAxiosPrivate } from "../../../../../../../hooks/useAxiosPrivate";
import type {
  ApiErrorResponse,
  ApiSuccessResponse,
} from "../../../../../../../types/apiResponse";
import type { IncomeTaxRegime } from "../../IncomeTaxRegimeList/hooks/useGetIncomeTaxRegime";

type DeleteCompanyApiResponse = ApiSuccessResponse<IncomeTaxRegime>;

type UseDeleteCompanyArgs = {
  options: UseMutationOptions<DeleteCompanyApiResponse, ApiErrorResponse>;
  incomeTaxRegimeId: string;
};

export function useDeleteIncomeTaxRegime({
  incomeTaxRegimeId,
  options = {},
}: UseDeleteCompanyArgs) {
  const { axiosPrivate } = useAxiosPrivate();

  return useMutation({
    mutationKey: ["companyKeys.delete(companyId)"],
    mutationFn: async () => {
      const { data } = await axiosPrivate.delete<DeleteCompanyApiResponse>(
        INCOME_TAX_REGIME_ROUTES.delete(incomeTaxRegimeId)
      );

      return data;
    },
    ...options,
  });
}
