"use client";

import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../../../../../../../../../hooks/useAxiosPrivate";
import { bankKeys } from "../../../../../../../../../../queryKeysFactories/bank";
import type {
  ApiErrorResponse,
  ApiSuccessResponse,
} from "../../../../../../../../../../types/apiResponse";
import type { BankInfoFormFieldValues } from "../../../../../../../AddEmployee/BankInfoForm";
import type { PaymentDetails } from "./useGetPaymentDetails";
import type { OptionKey } from "../../../../../EmployeeWorkPost/Tabs/EmployeeOrganizationDetails/BusinessUnit/Dialogs/EditBusinessUnitDialog/hooks/useTabOptions";
import { EMPLOYEE_PAYMENT_DETAILS_ROUTES } from "../../../../../../../../../../constants/routes/employee-management/employee/payment-details/routes";

type EditPaymentDetailsApiResponse = ApiSuccessResponse<PaymentDetails>;

type UseEditPaymentDetailsArgs = {
  options: UseMutationOptions<
    EditPaymentDetailsApiResponse,
    ApiErrorResponse<BankInfoFormFieldValues>,
    Partial<BankInfoFormFieldValues>
  >;
  bankId: string;
  operationType: OptionKey;
};

export function useEditPaymentDetails({
  bankId,
  operationType,
  options = {},
}: UseEditPaymentDetailsArgs) {
  const { axiosPrivate } = useAxiosPrivate();

  return useMutation({
    mutationKey: bankKeys.edit(bankId),
    mutationFn: async (formValues) => {
      const { data } = await axiosPrivate.patch<EditPaymentDetailsApiResponse>(
        EMPLOYEE_PAYMENT_DETAILS_ROUTES.patch(bankId, operationType),
        formValues
      );

      return data;
    },
    ...options,
  });
}
