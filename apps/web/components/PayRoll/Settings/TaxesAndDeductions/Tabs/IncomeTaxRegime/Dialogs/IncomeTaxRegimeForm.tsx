// IncomeTaxRegimeForm

import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, Typography } from "@mui/material";
import {
  Autocomplete,
  FormContainer,
  FormRow,
  FormSection,
  TextField,
} from "@repo/shared-components";
import { DateTime } from "luxon";
import type { ForwardedRef } from "react";
import { forwardRef, useImperativeHandle } from "react";
import type { UseFormSetError } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import type { OptionsType } from "../../../../../../../types/options";
import { percentageRegex } from "../../../../../../../utils/regex";
import { IncomeTaxSlabsForm } from "./IncomeTaxSlabsForm";
import { useGetIncomeTaxRegimeOptions } from "./hooks/usegetIncomeTaxRegimeOptions";

export const taxSlabSchema = z.object({
  start_range: z
    .number()
    .positive("Start range must be a positive number")
    .nullable(),
  end_range: z
    .number()
    .positive("End range must be a positive number")
    .nullable(),
  tax_rate: z
    .string()
    .regex(percentageRegex, "Valid percentage")
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  surcharge_rate: z
    .string()
    .regex(percentageRegex, "Valid percentage")
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
});

type TaxSlabs = {
  standard?: Array<typeof taxSlabSchema._type> | null;
  senior?: Array<typeof taxSlabSchema._type> | null;
  super_senior?: Array<typeof taxSlabSchema._type> | null;
};

const CompanyFormSchema = z
  .object({
    financial_year: z
      .string()
      .nullable()
      .refine((value) => !!value, {
        message: "common.required",
      }),
    regime_type: z
      .string()
      .nullable()
      .refine((value) => !!value, {
        message: "common.required",
      }),
    tax_slabs: z.object({
      standard: z.array(taxSlabSchema).nullable().optional(),
      senior: z.array(taxSlabSchema).nullable().optional(),
      super_senior: z.array(taxSlabSchema).nullable().optional(),
    }),
    standard_deduction: z
      .number()
      .positive("Standard deduction must be a positive number")
      .nullable(),
    health_education_cess_rate: z
      .string()
      .regex(percentageRegex, "Valid percentage")
      .nullable()
      .refine((value) => !!value, {
        message: "common.required",
      }),
  })
  .superRefine((val, ctx) => {
    const categories: (keyof TaxSlabs)[] = [
      "standard",
      "senior",
      "super_senior",
    ];

    categories.forEach((category) => {
      const taxSlabs = val.tax_slabs[category];

      if (taxSlabs && Array.isArray(taxSlabs)) {
        taxSlabs.forEach((slab, index) => {
          const { start_range, end_range } = slab;

          if (start_range !== null && end_range !== null) {
            if (start_range >= end_range) {
              ctx.addIssue({
                path: ["tax_slabs", category, index, "start_range"],
                message: "Start range must be less than End range",
                code: z.ZodIssueCode.custom,
              });
            }

            if (end_range <= start_range) {
              ctx.addIssue({
                path: ["tax_slabs", category, index, "end_range"],
                message: "End range must be greater than Start range",
                code: z.ZodIssueCode.custom,
              });
            }
          }
        });
      }
    });
  });

export type CompanyFormFieldType = z.infer<typeof CompanyFormSchema>;

type CompanyFormProps = {
  defaultValues?: CompanyFormFieldType;
  loading?: boolean;
};

export const regimeTypeOption: OptionsType[] = [
  { label: "Old Tax Regime", value: "old" },
  { label: "New Tax Regime", value: "new" },
];

export type FormRef = {
  submitForm: (onSubmit: (formValues: CompanyFormFieldType) => void) => void;
  setError: UseFormSetError<CompanyFormFieldType>;
};

const formDefaultValues: CompanyFormFieldType = {
  financial_year: null,
  regime_type: null,
  tax_slabs: {
    standard: [
      {
        start_range: null,
        end_range: null,
        tax_rate: null,
        surcharge_rate: null,
      },
    ],
    senior: [
      {
        start_range: null,
        end_range: null,
        tax_rate: null,
        surcharge_rate: null,
      },
    ],
    super_senior: [
      {
        start_range: null,
        end_range: null,
        tax_rate: null,
        surcharge_rate: null,
      },
    ],
  },
  standard_deduction: null,
  health_education_cess_rate: null,
};

type IncomeTaxFinancialOption = {
  value: string;
  label: {
    start_date: string;
    end_date: string;
  };
};

export const IncomeTaxRegimeForm = forwardRef(
  (
    { defaultValues = formDefaultValues, loading = false }: CompanyFormProps,
    ref: ForwardedRef<FormRef>
  ) => {
    const { t } = useTranslation();

    const formMethods = useForm<CompanyFormFieldType>({
      resolver: zodResolver(CompanyFormSchema),
      values: defaultValues,
      mode: "all",
    });

    const {
      control,
      handleSubmit,
      setError,
      watch,
      formState: { errors },
    } = formMethods;

    useImperativeHandle(ref, () => ({
      submitForm(onSubmit) {
        handleSubmit((formValues) => {
          // const filterFormValues = filterChangedFormFields(
          //     formValues,
          //     dirtyFields
          // );
          onSubmit(formValues);
        })();
      },
      setError,
    }));

    const errorMessages = (messageKey?: string) => {
      return messageKey && t(messageKey);
    };

    const { data: financialYearOption } = useGetIncomeTaxRegimeOptions();

    const financialYearOptions =
      financialYearOption?.map((item: IncomeTaxFinancialOption) => ({
        label: `${DateTime.fromISO(item.label.start_date).toFormat("MMM yyyy")} - ${DateTime.fromISO(item.label.end_date).toFormat("MMM yyyy")}`,
        value: item.value,
        start_date: item.label.start_date,
        end_date: item.label.end_date,
      })) ?? [];

    return (
      <FormContainer>
        <FormSection title="Basic Details">
          <FormProvider {...formMethods}>
            <FormRow maxColumn={2}>
              <Autocomplete
                label="Regime"
                loading={loading}
                name="regime_type"
                options={regimeTypeOption}
                required
                error={!!errors.regime_type}
                helperText={errorMessages(errors.regime_type?.message)}
              />
              <Autocomplete
                label="Financial Year"
                loading={loading}
                name="financial_year"
                // options={regimeTypeOption}
                options={financialYearOptions}
                required
                error={!!errors.financial_year}
                helperText={errorMessages(errors.financial_year?.message)}
              />
            </FormRow>

            <Stack direction="column" gap="10px" mt={2}>
              <Typography variant="h6" fontWeight={500}>
                Tax Slab Rate Configuration
              </Typography>
              <IncomeTaxSlabsForm
                title="Standard Taxpayer (Below 60)"
                slapType="standard"
                errors={errors}
                control={control}
                watch={watch}
              />
              <IncomeTaxSlabsForm
                title="Senior Citizen(60 to 80)"
                slapType="senior"
                errors={errors}
                control={control}
                watch={watch}
              />
              <IncomeTaxSlabsForm
                title="Super Senior Citizen(80 and Above)"
                slapType="super_senior"
                errors={errors}
                control={control}
                watch={watch}
              />
            </Stack>

            <Stack direction="row" gap="10px" alignItems="center">
              <Typography variant="body1">Standard Deduction Limit</Typography>

              <TextField
                name="standard_deduction"
                control={control}
                loading={loading}
                required
                type="number"
                error={!!errors.standard_deduction}
                helperText={errorMessages(errors.standard_deduction?.message)}
              />

              <Typography variant="body1">Rs</Typography>
            </Stack>

            <Stack>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Health and Education Cess:
              </Typography>

              <Stack
                direction="row"
                gap="10px"
                alignItems="center"
                paddingLeft="10px"
              >
                <Typography variant="body1">
                  Health and Education Cess is calculated as
                </Typography>

                <TextField
                  name="health_education_cess_rate"
                  control={control}
                  loading={loading}
                  required
                  error={!!errors.health_education_cess_rate}
                  helperText={errorMessages(
                    errors.health_education_cess_rate?.message
                  )}
                  sx={{ maxwidth: "230px" }}
                />

                <Typography variant="body1">
                  % of Income Tax + Surcharge
                </Typography>
              </Stack>
            </Stack>
          </FormProvider>
        </FormSection>
      </FormContainer>
    );
  }
);

IncomeTaxRegimeForm.displayName = "IncomeTaxRegimeForm";
