import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, Typography } from "@mui/material";
import { FormRow, FormSection, TextField } from "@repo/shared-components";
import _ from "lodash";
import type { ForwardedRef } from "react";
import { forwardRef, useImperativeHandle } from "react";
import type { UseFormSetError } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { filterNestedChangedFormFields } from "../../../../../../utils/helper";
import { FinancialYearAutoComplete } from "../../../../../common/Autocomplete/FinancialYearAutoComplete";
import { RegimeAutoComplete } from "../../../../../common/Autocomplete/RegimeAutoComplete";
import { TaxSlabRateConfiguration } from "./TaxSlabRateConfiguration";

const taxSlabSchema = z.object({
  start_range: z
    .number()
    .min(0, "Start range must be non-negative")
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  end_range: z
    .number()
    .min(0, "End range must be non-negative")
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  tax_rate: z
    .number()
    .min(0, "Tax rate must be non-negative")
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  surcharge_rate: z
    .number()
    .min(0, "Surcharge rate must be non-negative")
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
});

const financialYearSchema = z.object({
  start_date: z.string().nullable(),
  end_date: z.string().nullable(),
});

export type FinancialYearSchemaFieldValues = z.infer<
  typeof financialYearSchema
>;

const IncomeTaxRegimeFormSchema = z.object({
  financial_year: z.string().nullable(),
  regime_type: z
    .string()
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  tax_slabs: z.object({
    standard: z.array(taxSlabSchema),
    senior: z.array(taxSlabSchema),
    super_senior: z.array(taxSlabSchema),
  }),
  standard_deduction_limit: z
    .number()
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  health_education_cess_rate: z
    .number()
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
});

export type IncomeTaxRegimeFormFieldValues = z.infer<
  typeof IncomeTaxRegimeFormSchema
> & {
  id?: string;
};

type IncomeTaxRegimeFormProps = {
  defaultValues?: Partial<IncomeTaxRegimeFormFieldValues>;
  isIncomeTaxRegimeDetailLoading?: boolean;
  isView?: boolean;
  isEdit?: boolean;
  loading?: boolean;
  disabled?: boolean;
};

export type FormRef = {
  submitForm: (
    onSubmit: (
      formValues: Partial<
        Omit<IncomeTaxRegimeFormFieldValues, "financial_year"> & {
          financial_year: FinancialYearSchemaFieldValues;
        }
      >
    ) => void
  ) => void;
  setError: UseFormSetError<IncomeTaxRegimeFormFieldValues>;
};

const defaultTax_slabs = {
  start_range: null,
  end_range: null,
  tax_rate: null,
  surcharge_rate: null,
};

const formDefaultValues: Partial<IncomeTaxRegimeFormFieldValues> = {
  financial_year: null,
  regime_type: null,
  tax_slabs: {
    standard: [defaultTax_slabs],
    senior: [defaultTax_slabs],
    super_senior: [defaultTax_slabs],
  },
  standard_deduction_limit: null,
  health_education_cess_rate: null,
};

export const IncomeTaxRegimeForm = forwardRef(
  (
    {
      defaultValues = formDefaultValues,
      isView = false,
      isIncomeTaxRegimeDetailLoading,
    }: IncomeTaxRegimeFormProps,
    ref: ForwardedRef<FormRef>
  ) => {
    const { t } = useTranslation();

    const {
      watch,
      control,
      setError,
      formState: { errors, dirtyFields },
      handleSubmit,
    } = useForm({
      values: defaultValues,
      resolver: zodResolver(IncomeTaxRegimeFormSchema),
      mode: "all",
    });

    useImperativeHandle(ref, () => ({
      submitForm(onSubmit) {
        handleSubmit((formValues) => {
          const filterFormValues = filterNestedChangedFormFields(
            formValues,
            dirtyFields
          );

          const [startDate, endDate] = (
            filterFormValues.financial_year ?? ""
          ).split("/");

          onSubmit({
            ...filterFormValues,
            financial_year: {
              end_date: endDate ?? "",
              start_date: startDate ?? "",
            },
          });
        })();
      },
      setError,
    }));

    return (
      <Stack gap="20px">
        <FormSection title="Add Tax Regime">
          <FormRow>
            <FinancialYearAutoComplete
              disabled={isView}
              name="financial_year"
              label="Financial Year"
              loading={isIncomeTaxRegimeDetailLoading}
              defaultValue={defaultValues?.financial_year}
              control={control}
              sx={{ minWidth: "260px" }}
            />

            <RegimeAutoComplete
              loading={isIncomeTaxRegimeDetailLoading}
              disabled={isView}
              control={control}
              name="regime_type"
              error={!!errors.regime_type}
              helperText={t(errors.regime_type?.message ?? "")}
            />
          </FormRow>
        </FormSection>

        <FormSection title="Tax Slab Rate Configuration">
          <TaxSlabRateConfiguration
            disabled={isView}
            control={control}
            errors={errors}
            watch={watch}
            loading={isIncomeTaxRegimeDetailLoading}
          />
        </FormSection>

        <Stack direction="row" gap="10px" alignItems="center">
          <Typography variant="body1">Standard Deduction Limit</Typography>

          <TextField
            name="standard_deduction_limit"
            control={control}
            required
            disabled={isView}
            type="number"
            loading={isIncomeTaxRegimeDetailLoading}
            error={!!errors.standard_deduction_limit}
            helperText={t(
              _.get(errors, "standard_deduction_limit.message", "")
            )}
          />

          <Typography variant="body1">Rs</Typography>
        </Stack>

        <Stack gap="16px">
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            Health and Education Cess
          </Typography>

          <Stack direction="row" gap="10px" alignItems="center">
            <Typography variant="body1">
              Health and Education Cess is calculated as
            </Typography>

            <TextField
              name="health_education_cess_rate"
              control={control}
              required
              loading={isIncomeTaxRegimeDetailLoading}
              disabled={isView}
              type="number"
              error={!!errors.health_education_cess_rate}
              helperText={t(
                _.get(errors, "health_education_cess_rate.message", "")
              )}
            />

            <Typography variant="body1">% of Income Tax + Surcharge</Typography>
          </Stack>
        </Stack>
      </Stack>
    );
  }
);

IncomeTaxRegimeForm.displayName = "IncomeTaxRegimeForm";
