"use client";

import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { useAxiosPrivate } from "../../../../../../../../../hooks/useAxiosPrivate";
import { employeeSchemaDetails } from "../../../../../../../../../queryKeysFactories/employeeSchemaDetails";
import type {
  ApiSuccessResponse,
  ApiErrorResponse,
} from "../../../../../../../../../types/apiResponse";
import type { SectionKeys } from "./useGetSchemaDetails";
import type { OptionKey } from "../../EmployeeOrganizationDetails/BusinessUnit/Dialogs/EditBusinessUnitDialog/hooks/useTabOptions";
import { EMPLOYEE_SCHEME_DETAILS_ROUTES } from "../../../../../../../../../constants/routes/employee-management/employee/scheme-details/routes";

type EditSchemaDetailArgsApiResponse = ApiSuccessResponse<null>;

export type EditSchemaPayload = Partial<{
  id: string | null;
  name: string | null;
  effective_from: string | null;
  effective_to: string | null;
  has_no_end_date: boolean;
  remark: string | null;
  action_by: string | null;
  action_at: string | null;
  joining_date: string | null;
}>;

type UseEditSchemaDetailArgs = {
  options: UseMutationOptions<
    EditSchemaDetailArgsApiResponse,
    ApiErrorResponse<EditSchemaPayload>,
    Partial<EditSchemaPayload>
  >;
  employeeId: string;
  section: SectionKeys;
  operationType: OptionKey;
};

export function useEditSchemaDetails({
  employeeId,
  section,
  operationType,
  options = {},
}: UseEditSchemaDetailArgs) {
  const { axiosPrivate } = useAxiosPrivate();

  const currentDate = DateTime.now().toISODate();

  return useMutation({
    mutationKey: employeeSchemaDetails.edit(employeeId),
    mutationFn: async (formValues) => {
      const { data } =
        await axiosPrivate.patch<EditSchemaDetailArgsApiResponse>(
          EMPLOYEE_SCHEME_DETAILS_ROUTES.patch(
            employeeId,
            section,
            operationType,
            currentDate
          ),
          formValues
        );

      return data;
    },
    ...options,
  });
}
