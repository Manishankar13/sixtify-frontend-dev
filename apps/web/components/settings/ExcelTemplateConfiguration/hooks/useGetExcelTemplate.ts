import { useQuery } from "@tanstack/react-query";
import { excelTemplateKeys } from "../../../../queryKeysFactories/excelTemplate";
import type { ExcelTemplate } from "../ExcelTemplateConfigurationList/hooks/useGetExcelTemplates";
import { EXCEL_TEMPLATE_ROUTES } from "../../../../constants/routes/settings/excel-template-configuration/routes";
import { useAxiosPrivate } from "../../../../hooks/useAxiosPrivate";
import type { ApiSuccessResponse } from "../../../../types/apiResponse";

type UseGetExcelTemplateArgs = {
  excelTemplateId: ExcelTemplate["id"];
};

export function useGetExcelTemplate({
  excelTemplateId,
}: UseGetExcelTemplateArgs) {
  const { axiosPrivate } = useAxiosPrivate();

  const fetchExcelTemplate = async () => {
    const {
      data: { data },
    } = await axiosPrivate.get<ApiSuccessResponse<ExcelTemplate>>(
      EXCEL_TEMPLATE_ROUTES.get(excelTemplateId)
    );

    return data;
  };

  return useQuery({
    queryKey: excelTemplateKeys.get(excelTemplateId),
    queryFn: fetchExcelTemplate,
    enabled: !!excelTemplateId,
  });
}
