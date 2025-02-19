import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../../../../../../hooks/useAxiosPrivate";
import { ApiSuccessResponse } from "../../../../../../../types/apiResponse";
import { IncomeTax } from "../../IncomeTaxList/hooks/useGetIncomeTax";
import { incomeTaxKeys } from "../../../../../../../queryKeysFactories/IncomeTax";
import { INCOME_TAX_ROUTES } from "../../../../../../../constants/routes/payroll/settings/taxes-deductions/routes";

type UseGetIncomeTaxArgs = {
  incomeTaxId: IncomeTax["id"];
};

export function useGetViewIncomeTax({ incomeTaxId }: UseGetIncomeTaxArgs) {
  const { axiosPrivate } = useAxiosPrivate();

  const fetchIncomeTax = async () => {
    const {
      data: { data },
    } = await axiosPrivate.get<ApiSuccessResponse<IncomeTax>>(
      INCOME_TAX_ROUTES.get(incomeTaxId)
    );

    return data;
  };

  return useQuery({
    queryKey: incomeTaxKeys.get(incomeTaxId),
    queryFn: fetchIncomeTax,
    enabled: !!incomeTaxId,
  });
}
