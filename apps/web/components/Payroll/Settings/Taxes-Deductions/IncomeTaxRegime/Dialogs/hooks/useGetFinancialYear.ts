import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../../../../../../hooks/useAxiosPrivate";
import { ApiSuccessResponse } from "../../../../../../../types/apiResponse";
import { incomeTaxKeys } from "../../../../../../../queryKeysFactories/IncomeTax";
import { INCOME_TAX_ROUTES } from "../../../../../../../constants/routes/payroll/settings/taxes-deductions/routes";

export type IncomeTaxFinancialYearDetails = {
  value: string;
  label: {
    start_date: string;
    end_date: string;
  };
};

export function useGetFinancialYear() {
  const { axiosPrivate } = useAxiosPrivate();

  const fetchFinancialYearDetails = async () => {
    const {
      data: { data },
    } = await axiosPrivate.get<
      ApiSuccessResponse<IncomeTaxFinancialYearDetails[]>
    >(INCOME_TAX_ROUTES.option());

    return data;
  };

  return useQuery({
    queryKey: incomeTaxKeys.options(),
    queryFn: fetchFinancialYearDetails,
  });
}
