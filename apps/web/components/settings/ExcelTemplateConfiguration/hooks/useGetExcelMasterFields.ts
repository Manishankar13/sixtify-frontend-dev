import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../../../hooks/useAxiosPrivate";
import type { ApiSuccessResponse } from "../../../../types/apiResponse";
import { excelMasterKeys } from "../../../../queryKeysFactories/excelMaster";
import { EXCEL_MASTER_ROUTES } from "../../../../constants/routes/settings/excel-template-configuration/excel-master/routes";

type UseGetDepartmentArgs = {
  excelMasterId: string;
};

type ExcelMasterField = {
  id: string;
  field_name: string;
  required: boolean;
};

export function useGetExcelMasterFields({
  excelMasterId,
}: UseGetDepartmentArgs) {
  const { axiosPrivate } = useAxiosPrivate();

  const fetchExcelMasterFields = async () => {
    const { data } = await axiosPrivate.get<
      ApiSuccessResponse<ExcelMasterField[]>
    >(EXCEL_MASTER_ROUTES.get(excelMasterId));

    return data.data;
  };

  return useQuery({
    queryKey: excelMasterKeys.get(excelMasterId),
    queryFn: fetchExcelMasterFields,
    enabled: !!excelMasterId,
    initialData: [],
  });
}
