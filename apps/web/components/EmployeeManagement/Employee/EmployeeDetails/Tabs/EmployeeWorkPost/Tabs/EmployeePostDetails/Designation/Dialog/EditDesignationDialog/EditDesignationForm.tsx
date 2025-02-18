import { zodResolver } from "@hookform/resolvers/zod";
import {
  DatePicker,
  FormContainer,
  FormRow,
  FormSection,
  TextField,
} from "@repo/shared-components";
import { t } from "i18next";
import { DateTime } from "luxon";
import type { ForwardedRef } from "react";
import { forwardRef, useImperativeHandle, useMemo } from "react";
import type { UseFormSetError } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEnableDisableSubmitButton } from "../../../../../../../../../../../hooks/useEnableDisableSubmitButton";
import { filterChangedFormFields } from "../../../../../../../../../../../utils/helper";
import { DesignationAutocomplete } from "../../../../../../../../../../common/Autocomplete/DesignationAutocomplete";
import { CORRECTION_OF_DATA } from "../../../../EmployeeOrganizationDetails/BusinessUnit/Dialogs/EditBusinessUnitDialog/hooks/constant";
import {
  ActionTypeSchema,
  type OptionKey,
} from "../../../../EmployeeOrganizationDetails/BusinessUnit/Dialogs/EditBusinessUnitDialog/hooks/useTabOptions";

const DesignationSchema = z
  .object({
    id: z
      .string()
      .nullable()
      .refine((value) => !!value, {
        message: "common.required",
      }),
    effective_from: z.string().nullable(),
    operationType: ActionTypeSchema,
    remark: z.string().max(255, "common.maxLength").nullable(),
  })
  .superRefine((value, ctx) => {
    if (value.operationType !== CORRECTION_OF_DATA && !value.effective_from) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["effective_from"],
        message: "common.required",
      });
    }
  });

export type EditDesignationFormFieldValues = z.infer<typeof DesignationSchema>;
export type EditDesignationFormProps = {
  defaultValues?: EditDesignationFormFieldValues & {
    joining_date: string;
  };
  companyId?: string;
  loading: boolean;
  operationType: OptionKey;
};
export type FormRef = {
  submitForm: (
    onSubmit: (formValues: Partial<EditDesignationFormFieldValues>) => void
  ) => void;
  setError: UseFormSetError<EditDesignationFormFieldValues>;
};

const formDefaultValues: EditDesignationFormFieldValues = {
  id: null,
  effective_from: null,
  remark: null,
  operationType: CORRECTION_OF_DATA,
};

export const EditDesignationForm = forwardRef(
  (
    {
      defaultValues,
      loading,
      operationType,
      companyId,
    }: EditDesignationFormProps,
    ref: ForwardedRef<FormRef>
  ) => {
    const initialValues = useMemo(() => {
      return { ...formDefaultValues, ...defaultValues };
    }, [defaultValues]);

    const {
      control,
      setError,
      setValue,
      clearErrors,
      formState: { errors, dirtyFields },
      handleSubmit,
    } = useForm({
      values: initialValues,
      resolver: zodResolver(DesignationSchema),
      mode: "all",
    });

    useEnableDisableSubmitButton({
      control,
      defaultValues: initialValues,
      errors,
    });

    useMemo(() => {
      setValue("operationType", operationType);

      if (operationType === CORRECTION_OF_DATA && defaultValues) {
        setValue("effective_from", defaultValues.effective_from, {
          shouldDirty: true,
        });
      }

      clearErrors();
    }, [operationType]);

    useImperativeHandle(ref, () => ({
      submitForm(onSubmit) {
        handleSubmit((formValues) => {
          const filterFormValues =
            operationType === CORRECTION_OF_DATA
              ? filterChangedFormFields(formValues, dirtyFields)
              : { ...formValues };

          onSubmit(filterFormValues);
        })();
      },
      setError,
    }));

    const errorMessages = (messageKey?: string) => {
      return messageKey && t(messageKey);
    };

    return (
      <FormContainer>
        <FormSection>
          <FormRow maxColumn={2}>
            <DesignationAutocomplete
              required={true}
              name="id"
              control={control}
              loading={loading}
              companyId={companyId}
              error={!!errors.id}
              helperText={errorMessages(errors.id?.message)}
            />

            <TextField
              name="remark"
              control={control}
              label="Remark"
              loading={loading}
              error={!!errors.remark}
              helperText={errorMessages(errors.remark?.message)}
            />
          </FormRow>

          <FormRow maxColumn={1}>
            {operationType !== CORRECTION_OF_DATA && (
              <DatePicker
                name="effective_from"
                control={control}
                label="Effective From"
                loading={loading}
                setError={setError}
                required
                maxDate={DateTime.now()}
                minDate={
                  defaultValues?.joining_date
                    ? DateTime.fromISO(defaultValues?.joining_date)
                    : undefined
                }
                error={!!errors.effective_from}
                helperText={errorMessages(errors.effective_from?.message)}
              />
            )}
          </FormRow>
        </FormSection>
      </FormContainer>
    );
  }
);
EditDesignationForm.displayName = "EditDesignationForm";
