import { useQuery } from "@tanstack/react-query";
import { INCOME_TAX_REGIME_ROUTES } from "../../../../../../../constants/routes/pay-roll/settings/taxes-deductions/income-tax-regime/routes";
import { useAxiosPrivate } from "../../../../../../../hooks/useAxiosPrivate";
import type { ApiSuccessResponse } from "../../../../../../../types/apiResponse";
import type {
  FinancialYearSchemaFieldValues,
  IncomeTaxRegimeFormFieldValues,
} from "../IncomeTaxRegimeForm";

type IncomeTaxRegimeSuccessResponse = Partial<
  Omit<IncomeTaxRegimeFormFieldValues, "financial_year"> & {
    financial_year?: Partial<FinancialYearSchemaFieldValues>;
  }
>;

type IncomeTaxRegimeId = {
  id: string;
};
export function useGetIncomeTaxRegimeById({ id }: IncomeTaxRegimeId) {
  const { axiosPrivate } = useAxiosPrivate();

  const getIncomeTaxRegimeById = async () => {
    const { data } = await axiosPrivate.get<
      ApiSuccessResponse<IncomeTaxRegimeSuccessResponse>
    >(INCOME_TAX_REGIME_ROUTES.get(id));

    const resp = data.data;

    return {
      ...resp,
      financial_year: `${resp?.financial_year?.start_date} / ${resp?.financial_year?.end_date}`,
    };
  };

  return useQuery({
    queryKey: ["companyKeys.listing(body)"],
    queryFn: getIncomeTaxRegimeById,
    enabled: !!id,
  });
}
