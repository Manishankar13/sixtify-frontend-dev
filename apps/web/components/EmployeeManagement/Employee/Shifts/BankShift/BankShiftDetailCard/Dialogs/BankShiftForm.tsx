import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { FormRow, TextField } from "@repo/shared-components";
import { DateTime } from "luxon";
import type { ForwardedRef } from "react";
import { forwardRef, useCallback, useEffect, useImperativeHandle } from "react";
import type { UseFormSetError } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useEnableDisableSubmitButton } from "../../../../../../../hooks/useEnableDisableSubmitButton";
import { filterChangedFormFields } from "../../../../../../../utils/helper";
import { CompanyAutocomplete } from "../../../../../../common/Autocomplete/CompanyAutocomplete";
import { BankShiftTimingForm } from "./BankShiftTimingFrom";

const DaySchema = z.object({
  shift_start: z
    .string()
    .nullable()
    .refine((value) => !!value, { message: "common.required" })
    .refine(
      (value) => {
        if (!value) {
          return false;
        }

        return DateTime.fromISO(value).isValid;
      },
      { message: "common.invalidTime" }
    ),
  shift_end: z
    .string()
    .nullable()
    .refine((value) => !!value, { message: "common.required" })
    .refine(
      (value) => {
        if (!value) {
          return false;
        }

        return DateTime.fromISO(value).isValid;
      },
      { message: "common.invalidTime" }
    ),
});

const BankShiftFormSchema = z.object({
  company_id: z
    .string()
    .nullable()
    .refine((value) => !!value, { message: "common.required" }),
  bank_shift_type_name: z
    .string()
    .max(50, "common.maxNameLength")
    .nullable()
    .refine((value) => !!value, { message: "common.required" }),
  bank_shift_type_code: z
    .string()
    .max(10, "common.maxCodeLength")
    .nullable()
    .refine((value) => !!value, { message: "common.required" }),
  description: z.string().nullable(),
  timings: z.object({
    monday: DaySchema,
    tuesday: DaySchema,
    wednesday: DaySchema,
    thursday: DaySchema,
    friday: DaySchema,
    saturday: DaySchema,
    sunday: DaySchema,
  }),
});

export type BankShiftFormFieldValues = z.infer<typeof BankShiftFormSchema>;

type DayValues = z.infer<typeof DaySchema>;

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type FormRef = {
  submitForm: (
    onSubmit: (formValues: Partial<BankShiftFormFieldValues>) => void
  ) => void;
  setError: UseFormSetError<BankShiftFormFieldValues>;
};

type BankShiftFormProps = {
  defaultValues?: BankShiftFormFieldValues;
  loading?: boolean;
  disabled?: boolean;
};

type DayConfigurationKeys =
  `timings.${Lowercase<DayOfWeek>}.${keyof DayValues}`;

const dayValue: DayValues = {
  shift_start: null,
  shift_end: null,
};

const formDefaultValues: BankShiftFormFieldValues = {
  company_id: null,
  bank_shift_type_name: null,
  bank_shift_type_code: null,
  description: null,
  timings: {
    monday: dayValue,
    tuesday: dayValue,
    wednesday: dayValue,
    thursday: dayValue,
    friday: dayValue,
    saturday: dayValue,
    sunday: dayValue,
  },
};

export const BankShiftForm = forwardRef(
  (
    {
      defaultValues = formDefaultValues,
      loading = false,
      disabled = false,
    }: BankShiftFormProps,
    ref: ForwardedRef<FormRef>
  ) => {
    const { t } = useTranslation();

    const {
      watch,
      control,
      setError,
      formState: { errors, dirtyFields },
      handleSubmit,
      setValue,
    } = useForm({
      values: defaultValues,
      resolver: zodResolver(BankShiftFormSchema),
      mode: "all",
    });

    useEnableDisableSubmitButton({ control, defaultValues, errors });

    useImperativeHandle(ref, () => ({
      submitForm(onSubmit) {
        handleSubmit((formValues) => {
          const filterFormValues = filterChangedFormFields(
            formValues,
            dirtyFields
          );

          onSubmit(filterFormValues);
        })();
      },
      setError,
    }));

    const fieldKeys: Array<keyof DayValues> = ["shift_start", "shift_end"];

    const syncDayValues = useCallback(
      (mondayValues: DayValues) => {
        const days: Array<Lowercase<DayOfWeek>> = [
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ];

        days.forEach((day) => {
          fieldKeys.forEach((key) => {
            const path = `timings.${day}.${key}` as DayConfigurationKeys;

            setValue(path, mondayValues[key], {
              shouldValidate: true,
              shouldDirty: true,
            });
          });
        });
      },
      [setValue]
    );

    useEffect(() => {
      const subscription = watch((values, { name }) => {
        if (
          name === "timings.monday.shift_start" ||
          name === "timings.monday.shift_end"
        ) {
          const mondayValues = values.timings?.monday as DayValues;

          syncDayValues(mondayValues);
        }
      });

      return () => subscription.unsubscribe();
    }, [watch, syncDayValues]);

    const errorMessages = (messageKey?: string) => messageKey && t(messageKey);

    return (
      <Stack gap="20px">
        <Stack gap="10px">
          <FormRow>
            <CompanyAutocomplete
              control={control}
              loading={loading}
              disabled={!!defaultValues.company_id || disabled}
              error={!!errors.company_id}
              helperText={errorMessages(errors.company_id?.message)}
              name="company_id"
              required
            />
          </FormRow>

          <FormRow>
            <TextField
              control={control}
              label="Bank Shift Code"
              name="bank_shift_type_code"
              loading={loading}
              disabled={!!defaultValues.bank_shift_type_code || disabled}
              required
              error={!!errors.bank_shift_type_code}
              helperText={errorMessages(errors.bank_shift_type_code?.message)}
            />
            <TextField
              control={control}
              label="Bank Shift Name"
              name="bank_shift_type_name"
              loading={loading}
              required
              error={!!errors.bank_shift_type_name}
              helperText={errorMessages(errors.bank_shift_type_name?.message)}
              disabled={disabled}
            />
            <TextField
              loading={loading}
              name="description"
              control={control}
              label="Description"
              disabled={disabled}
            />
          </FormRow>
        </Stack>
        <BankShiftTimingForm
          control={control}
          watch={watch}
          errors={errors}
          loading={loading}
          disabled={disabled}
        />
      </Stack>
    );
  }
);

BankShiftForm.displayName = "BankShiftForm";
