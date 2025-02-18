import { zodResolver } from "@hookform/resolvers/zod";
import {
  DatePicker,
  FormContainer,
  FormRow,
  FormSection,
  TextField,
} from "@repo/shared-components";
import { t } from "i18next";
import type { ForwardedRef } from "react";
import { forwardRef, useImperativeHandle, useMemo } from "react";
import type { UseFormSetError } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DateTime } from "luxon";
import { useEnableDisableSubmitButton } from "../../../../../../../../../../../hooks/useEnableDisableSubmitButton";
import { filterChangedFormFields } from "../../../../../../../../../../../utils/helper";
import { LocationAutocomplete } from "../../../../../../../../../../common/Autocomplete/LocationAutocomplete";
import { CORRECTION_OF_DATA } from "../../../BusinessUnit/Dialogs/EditBusinessUnitDialog/hooks/constant";
import {
  ActionTypeSchema,
  type OptionKey,
} from "../../../BusinessUnit/Dialogs/EditBusinessUnitDialog/hooks/useTabOptions";

const LocationUnitSchema = z
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

export type LocationUnitFormFieldValues = z.infer<typeof LocationUnitSchema>;
export type LocationUnitFormProps = {
  defaultValues?: LocationUnitFormFieldValues & {
    joining_date: string;
  };
  businessUnitId?: string;
  loading: boolean;
  operationType: OptionKey;
};
export type FormRef = {
  submitForm: (
    onSubmit: (formValues: Partial<LocationUnitFormFieldValues>) => void
  ) => void;
  setError: UseFormSetError<LocationUnitFormFieldValues>;
};

const formDefaultValues: LocationUnitFormFieldValues = {
  id: null,
  remark: null,
  effective_from: null,
  operationType: CORRECTION_OF_DATA,
};

export const LocationUnitForm = forwardRef(
  (
    {
      defaultValues,
      businessUnitId,
      operationType,
      loading,
    }: LocationUnitFormProps,
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
      resolver: zodResolver(LocationUnitSchema),
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
            <LocationAutocomplete
              required={true}
              name="id"
              control={control}
              loading={loading}
              businessUnitId={businessUnitId}
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

          <FormRow maxColumn={2}>
            {operationType !== CORRECTION_OF_DATA && (
              <DatePicker
                name="effective_from"
                control={control}
                label="Effective From"
                setError={setError}
                minDate={
                  defaultValues?.joining_date
                    ? DateTime.fromISO(defaultValues.joining_date)
                    : undefined
                }
                loading={loading}
                required
                maxDate={DateTime.now()}
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
LocationUnitForm.displayName = "LocationUnitForm";
