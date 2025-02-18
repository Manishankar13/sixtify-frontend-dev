"use client";

import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { INCOME_TAX_REGIME_ROUTES } from "../../../../../../../constants/routes/pay-roll/settings/taxes-deductions/income-tax-regime/routes";
import { useAxiosPrivate } from "../../../../../../../hooks/useAxiosPrivate";
import type {
  ApiErrorResponse,
  ApiSuccessResponse,
} from "../../../../../../../types/apiResponse";
import type {
  FinancialYearSchemaFieldValues,
  IncomeTaxRegimeFormFieldValues,
} from "../IncomeTaxRegimeForm";
// import { useAxiosPrivate } from "../../../../../hooks/useAxiosPrivate";
// import { employeeDraftKeys } from "../../../../../queryKeysFactories/employeeDraft";
// import type {
//   ApiErrorResponse,
//   ApiSuccessResponse,
// } from "../../../../../types/apiResponse";
// import type { EmployeeDetail } from "../../EditEmployee/hooks/useGetEmployeeDraft";
// import type { EmployeeFormFieldValues } from "../EmployeeForm";
// import { EMPLOYEE_DRAFT_ROUTES } from "../../../../../constants/routes/employee-management/employee/draft/routes";

type AddEmployeeDraftApiSuccessResponse = ApiSuccessResponse<
  Omit<IncomeTaxRegimeFormFieldValues, "financial_year"> & {
    financial_year: FinancialYearSchemaFieldValues;
  }
>;

type UseAddEmployeeDraftArgs = {
  options: UseMutationOptions<
    AddEmployeeDraftApiSuccessResponse,
    ApiErrorResponse<Record<string, string>>,
    Partial<
      Omit<IncomeTaxRegimeFormFieldValues, "financial_year"> & {
        financial_year: FinancialYearSchemaFieldValues;
      }
    >
  >;
};

export function useAddIncomeTaxRegime({
  options = {},
}: UseAddEmployeeDraftArgs) {
  const { axiosPrivate } = useAxiosPrivate();

  return useMutation({
    mutationKey: ["employeeDraftKeys.add()"],
    mutationFn: async (formValues) => {
      const { data } =
        await axiosPrivate.post<AddEmployeeDraftApiSuccessResponse>(
          INCOME_TAX_REGIME_ROUTES.post,
          formValues
        );

      return data;
    },
    ...options,
  });
}
