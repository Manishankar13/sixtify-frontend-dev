"use client";

import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type {
  ApiErrorResponse,
  ApiSuccessResponse,
} from "../../../../../types/apiResponse";
import { useAxiosPrivate } from "../../../../../hooks/useAxiosPrivate";
import { excelTemplateKeys } from "../../../../../queryKeysFactories/excelTemplate";
import { EXCEL_TEMPLATE_ROUTES } from "../../../../../constants/routes/settings/excel-template-configuration/routes";

type DeleteExcelTemplateApiResponse = ApiSuccessResponse<{
  message: string;
  data: null;
}>;

type useDeleteExcelTemplateConfigurationArgs = {
  options: UseMutationOptions<DeleteExcelTemplateApiResponse, ApiErrorResponse>;
  excelTemplateId: string;
};

export function useDeleteExcelTemplateConfiguration({
  excelTemplateId,
  options = {},
}: useDeleteExcelTemplateConfigurationArgs) {
  const { axiosPrivate } = useAxiosPrivate();

  return useMutation({
    mutationKey: excelTemplateKeys.delete(excelTemplateId),
    mutationFn: async () => {
      const { data } =
        await axiosPrivate.delete<DeleteExcelTemplateApiResponse>(
          EXCEL_TEMPLATE_ROUTES.delete(excelTemplateId)
        );

      return data;
    },
    ...options,
  });
}
