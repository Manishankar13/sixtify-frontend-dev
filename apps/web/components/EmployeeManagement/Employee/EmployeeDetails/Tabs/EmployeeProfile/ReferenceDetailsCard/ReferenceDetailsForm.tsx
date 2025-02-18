import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  FormContainer,
  FormRow,
  TextField,
} from "@repo/shared-components";
import type { ForwardedRef } from "react";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import type { UseFormSetError } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useEnableDisableSubmitButton } from "../../../../../../../hooks/useEnableDisableSubmitButton";
import { filterChangedFormFields } from "../../../../../../../utils/helper";
import { mobileNumberRegex } from "../../../../../../../utils/regex";
import { ReferenceTypeAutocomplete } from "../../../../../../common/Autocomplete/ReferenceTypeAutoComplete";
import { useGetEmployeeOption } from "../../../../../../common/Autocomplete/hooks/useGetEmployeeOption";

const ReferenceDetailsFormSchema = z
  .object({
    reference_type: z.string().nullable().nullable(),
    reference_employee_id: z.string().nullable().nullable(),
    reference_name: z.string().max(255, "common.maxLength").nullable(),

    reference_mobile_no: z
      .string()
      .regex(mobileNumberRegex, "common.mobileNumber.invalid")
      .nullable(),
    reference_address: z.string().max(255, "common.maxLength").nullable(),
  })
  .superRefine((val, ctx) => {
    if (!val.reference_employee_id && !val.reference_name) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "common.required",
        path: ["reference_employee_id"],
      });
    }
  });

export type ReferenceDetailsFormFieldValues = z.infer<
  typeof ReferenceDetailsFormSchema
>;

type ReferenceDetailsFormProps = {
  defaultValues?: ReferenceDetailsFormFieldValues;
  loading?: boolean;
  companyId: string;
};

export type FormRef = {
  submitForm: (
    onSubmit: (formValues: Partial<ReferenceDetailsFormFieldValues>) => void
  ) => void;
  setError: UseFormSetError<ReferenceDetailsFormFieldValues>;
};

const formDefaultValues: ReferenceDetailsFormFieldValues = {
  reference_type: null,
  reference_employee_id: null,
  reference_name: null,
  reference_mobile_no: null,
  reference_address: null,
};

export const ReferenceDetailsForm = forwardRef(
  (
    {
      defaultValues = formDefaultValues,
      loading = false,
      companyId,
    }: ReferenceDetailsFormProps,
    ref: ForwardedRef<FormRef>
  ) => {
    const { t } = useTranslation();

    const {
      watch,
      control,
      setValue,
      setError,
      formState: { errors, dirtyFields },
      handleSubmit,
    } = useForm({
      values: defaultValues,
      resolver: zodResolver(ReferenceDetailsFormSchema),
      mode: "all",
    });

    useEnableDisableSubmitButton({ control, defaultValues, errors });

    const { data: reportingMemberOptions } = useGetEmployeeOption({
      companyId,
      queryParams: {
        mobile_no: true,
        address: true,
      },
    });

    useImperativeHandle(ref, () => ({
      submitForm(onSubmit) {
        handleSubmit((formValues) => {
          const filterFormValues = filterChangedFormFields(formValues, {
            ...dirtyFields,
            reference_employee_id: formValues.reference_name ? false : true,
          });

          onSubmit(filterFormValues);
        })();
      },
      setError,
    }));

    const referenceEmployeeId = watch("reference_employee_id");

    useEffect(() => {
      if (referenceEmployeeId) {
        const selectedEmployee = reportingMemberOptions?.find(
          (emp) => referenceEmployeeId === emp.value
        );

        if (selectedEmployee) {
          setValue("reference_name", null);
          setValue("reference_mobile_no", selectedEmployee.mobile_no, {
            shouldDirty: true,
          });
          setValue("reference_address", selectedEmployee.address, {
            shouldDirty: true,
          });
        }
      }
    }, [referenceEmployeeId]);

    const errorMessages = (messageKey?: string) => {
      return messageKey && t(messageKey);
    };

    return (
      <FormContainer>
        <FormRow maxColumn={2}>
          <ReferenceTypeAutocomplete
            control={control}
            name="reference_type"
            loading={loading}
          />

          <Autocomplete
            name="reference_employee_id"
            freeSolo
            control={control}
            loading={loading}
            label="Employee Name"
            options={reportingMemberOptions}
            onInputChange={(_, newValue, reason) => {
              if (reason === "input") {
                setValue("reference_employee_id", null);
                setValue("reference_name", newValue, { shouldDirty: true });
              } else if (!newValue) {
                setValue("reference_employee_id", null);
                setValue("reference_name", null);
              }
            }}
            required
            error={!!errors.reference_employee_id}
            helperText={errorMessages(errors.reference_employee_id?.message)}
          />
        </FormRow>

        <FormRow maxColumn={2}>
          <TextField
            control={control}
            label="Reference Mobile No"
            name="reference_mobile_no"
            loading={loading}
            error={!!errors.reference_mobile_no}
            helperText={errorMessages(errors.reference_mobile_no?.message)}
          />

          <TextField
            control={control}
            label="Reference Address"
            name="reference_address"
            loading={loading}
          />
        </FormRow>
      </FormContainer>
    );
  }
);

ReferenceDetailsForm.displayName = "ReferenceDetailsForm";
