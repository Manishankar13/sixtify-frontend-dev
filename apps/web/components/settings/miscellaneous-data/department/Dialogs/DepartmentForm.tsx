import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { FormRow, TextField } from "@repo/shared-components";
import {
  type ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import type { UseFormSetError } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useEnableDisableSubmitButton } from "../../../../../hooks/useEnableDisableSubmitButton";
import { filterChangedFormFields } from "../../../../../utils/helper";
import { CompanyAutocomplete } from "../../../../common/Autocomplete/CompanyAutocomplete";

const DepartmentFormSchema = z.object({
  company_id: z
    .string()
    .trim()
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  department_code: z
    .string()
    .max(10, "common.maxCodeLength")
    .trim()
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  department_name: z
    .string()
    .max(255, "common.maxLength")
    .trim()
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  description: z.string().max(255, "common.maxLength").nullable(),
  is_active: z.boolean().nullable().optional(),
});

export type DepartmentFormFieldValues = z.infer<typeof DepartmentFormSchema>;

export type DepartmentFormProps = {
  defaultValues?: Partial<DepartmentFormFieldValues>;
  loading?: boolean;
  disabled?: boolean;
};

export type FormRef = {
  submitForm: (
    onSubmit: (formValues: Partial<DepartmentFormFieldValues>) => void
  ) => void;
  setError: UseFormSetError<DepartmentFormFieldValues>;
};

const formDefaultValues: DepartmentFormFieldValues = {
  company_id: null,
  department_code: null,
  department_name: null,
  description: null,
};

export const DepartmentForm = forwardRef(
  (
    {
      defaultValues = formDefaultValues,
      loading = false,
      disabled = false,
    }: DepartmentFormProps,
    ref: ForwardedRef<FormRef>
  ) => {
    const { t } = useTranslation();

    const initialValues = useMemo(() => {
      return { ...formDefaultValues, ...defaultValues };
    }, [defaultValues]);

    const {
      control,
      setError,
      formState: { errors, dirtyFields },
      handleSubmit,
    } = useForm({
      values: initialValues,
      resolver: zodResolver(DepartmentFormSchema),
      mode: "all",
    });

    useEnableDisableSubmitButton({
      control,
      defaultValues: initialValues,
      errors,
    });

    useImperativeHandle(ref, () => ({
      submitForm(onSubmit) {
        handleSubmit((formValues) => {
          //TODO: Manish, need to add default value.
          const filterFormValues = filterChangedFormFields(formValues, {
            ...dirtyFields,
            company_id: true,
          });

          onSubmit(filterFormValues);
        })();
      },
      setError,
    }));

    const errorMessages = (messageKey?: string) => {
      return messageKey && t(messageKey);
    };

    return (
      <Stack gap="16px">
        <FormRow maxColumn={2}>
          <CompanyAutocomplete
            control={control}
            loading={loading}
            error={!!errors.company_id}
            helperText={errorMessages(errors.company_id?.message)}
            name="company_id"
            disabled={!!defaultValues.company_id || disabled}
            required
          />

          <TextField
            name="department_code"
            control={control}
            loading={loading}
            label="Department Code"
            required
            disabled={!!defaultValues.department_code || disabled}
            error={!!errors.department_code}
            helperText={errorMessages(errors.department_code?.message)}
          />
        </FormRow>

        <FormRow maxColumn={2}>
          <TextField
            name="department_name"
            control={control}
            loading={loading}
            label="Department Name"
            required
            error={!!errors.department_name}
            helperText={errorMessages(errors.department_name?.message)}
            disabled={disabled}
          />

          <TextField
            name="description"
            control={control}
            label="Description"
            loading={loading}
            error={!!errors.description}
            helperText={errorMessages(errors.description?.message)}
            disabled={disabled}
          />
        </FormRow>
      </Stack>
    );
  }
);

DepartmentForm.displayName = "DepartmentForm";
