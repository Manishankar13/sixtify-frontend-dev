import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../../../hooks/useAxiosPrivate";
import type { ApiSuccessResponse } from "../../../../types/apiResponse";
import type { OptionsType } from "../../../../types/options";
import { excelMasterKeys } from "../../../../queryKeysFactories/excelMaster";
import { EXCEL_MASTER_ROUTES } from "../../../../constants/routes/settings/excel-template-configuration/excel-master/routes";

export function useGetExcelMasterOptions() {
  const { axiosPrivate } = useAxiosPrivate();

  const fetchExcelMaster = async () => {
    const { data } = await axiosPrivate.get<ApiSuccessResponse<OptionsType[]>>(
      EXCEL_MASTER_ROUTES.options()
    );

    return data.data;
  };

  return useQuery({
    queryKey: excelMasterKeys.options(),
    queryFn: fetchExcelMaster,
    initialData: [],
  });
}
