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
import { DepartmentAutocomplete } from "../../../../common/Autocomplete/DepartmentAutocomplete";

const SubDepartmentFormSchema = z.object({
  company_id: z
    .string()
    .trim()
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  department_id: z
    .string()
    .trim()
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  sub_department_code: z
    .string()
    .max(10, "common.maxCodeLength")
    .trim()
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  sub_department_name: z
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

export type SubDepartmentFormFieldValues = z.infer<
  typeof SubDepartmentFormSchema
>;

export type SubDepartmentFormProps = {
  defaultValues?: Partial<SubDepartmentFormFieldValues>;
  isLoading?: boolean;
  disabled?: boolean;
};

export type FormRef = {
  submitForm: (
    onSubmit: (formValues: Partial<SubDepartmentFormFieldValues>) => void
  ) => void;
  setError: UseFormSetError<SubDepartmentFormFieldValues>;
};

const formDefaultValues: SubDepartmentFormFieldValues = {
  company_id: null,
  department_id: null,
  sub_department_name: null,
  sub_department_code: null,
  description: null,
  is_active: true,
};

export const SubDepartmentForm = forwardRef(
  (
    {
      defaultValues = formDefaultValues,
      isLoading = false,
      disabled = false,
    }: SubDepartmentFormProps,
    ref: ForwardedRef<FormRef>
  ) => {
    const { t } = useTranslation();

    const initialValues = useMemo(() => {
      return { ...formDefaultValues, ...defaultValues };
    }, [defaultValues]);

    const {
      watch,
      control,
      setError,
      formState: { errors, dirtyFields },
      handleSubmit,
    } = useForm({
      values: initialValues,
      resolver: zodResolver(SubDepartmentFormSchema),
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
            department_id: true,
          });

          onSubmit(filterFormValues);
        })();
      },
      setError,
    }));

    const errorMessages = (messageKey?: string) => {
      return messageKey && t(messageKey);
    };

    const companyId = watch("company_id");

    return (
      <Stack gap="16px">
        <FormRow maxColumn={2}>
          <CompanyAutocomplete
            control={control}
            loading={isLoading}
            disabled={!!defaultValues.company_id || disabled}
            error={!!errors.company_id}
            helperText={errorMessages(errors.company_id?.message)}
            name="company_id"
            required
          />

          <DepartmentAutocomplete
            name="department_id"
            control={control}
            required
            disabled={!!defaultValues.department_id || disabled}
            loading={isLoading}
            error={!!errors.department_id}
            helperText={errorMessages(errors.department_id?.message)}
            companyId={companyId}
          />
        </FormRow>

        <FormRow maxColumn={2}>
          <TextField
            name="sub_department_code"
            control={control}
            label="Sub Department Code"
            disabled={!!defaultValues.sub_department_code || disabled}
            loading={isLoading}
            required
            error={!!errors.sub_department_code}
            helperText={errorMessages(errors.sub_department_code?.message)}
          />

          <TextField
            name="sub_department_name"
            control={control}
            label="Sub Department Name"
            required
            loading={isLoading}
            error={!!errors.sub_department_name}
            helperText={errorMessages(errors.sub_department_name?.message)}
            disabled={disabled}
          />
        </FormRow>

        <FormRow maxColumn={2}>
          <TextField
            name="description"
            control={control}
            label="Description"
            loading={isLoading}
            error={!!errors.description}
            helperText={errorMessages(errors.description?.message)}
            disabled={disabled}
          />
        </FormRow>
      </Stack>
    );
  }
);

SubDepartmentForm.displayName = "SubDepartmentForm";
