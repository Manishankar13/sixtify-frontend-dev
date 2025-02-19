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
import type { IncomeTaxRegime } from "../../IncomeTaxRegimeList/hooks/useGetIncomeTaxRegime";

type DeleteIncomeTaxRegimeApiResponse = ApiSuccessResponse<IncomeTaxRegime>;

type UseIncomeTaxRegimeArgs = {
  options: UseMutationOptions<
    DeleteIncomeTaxRegimeApiResponse,
    ApiErrorResponse
  >;
  incomeTaxRegimeId: string;
};

export function useDeleteIncomeTaxRegime({
  incomeTaxRegimeId,
  options = {},
}: UseIncomeTaxRegimeArgs) {
  const { axiosPrivate } = useAxiosPrivate();

  return useMutation({
    mutationKey: incomeTaxRegimeKeys.delete(incomeTaxRegimeId),
    mutationFn: async () => {
      const { data } =
        await axiosPrivate.delete<DeleteIncomeTaxRegimeApiResponse>(
          INCOME_TAX_REGIME_ROUTES.delete(incomeTaxRegimeId)
        );

      return data;
    },
    ...options,
  });
}
