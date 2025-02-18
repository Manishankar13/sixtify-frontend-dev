import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, Typography } from "@mui/material";
import { Autocomplete, FormRow, TextField } from "@repo/shared-components";
import { ForwardedRef, forwardRef, useImperativeHandle } from "react";
import { useForm, UseFormSetError } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { percentageRegex } from "../../../../../../utils/regex";
import {
  IncomeTaxSlabRateForm,
  TaxSlabs,
  taxSlabsSchema,
} from "./IncomeTaxSlabRateform";
import {
  IncomeTaxFinancialYearDetails,
  useGetFinancialYear,
} from "./hooks/useGetFinancialYear";
import { DateTime } from "luxon";

export const IncomeTaxSchema = z
  .object({
    regime_type: z
      .string()
      .nullable()
      .refine((value) => !!value, {
        message: "common.required",
      }),
    financial_year: z
      .string()
      .nullable()
      .refine((value) => !!value, {
        message: "common.required",
      }),
    standard_deduction_limit: z
      .union([z.string(), z.number()])
      .nullable()
      .refine((value) => !!value, {
        message: "common.required",
      })
      .superRefine((value) => {
        if (value === null || value === "") {
          return;
        }
      }),
    health_education_cess_rate: z
      .union([z.string(), z.number()])
      .nullable()
      .refine((value) => !!value, {
        message: "common.required",
      })
      .superRefine((value, ctx) => {
        if (value === null || value === "") {
          return;
        }

        if (!percentageRegex.test(String(value))) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "common.health.education.cess.maxLength",
          });
        }
      }),
    tax_slabs: z.object({
      standard: z.array(taxSlabsSchema).nullable().optional(),
      senior: z.array(taxSlabsSchema).nullable().optional(),
      super_senior: z.array(taxSlabsSchema).nullable().optional(),
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

export type IncomeTaxFormValues = z.infer<typeof IncomeTaxSchema>;

type IncomeTaxFormProps = {
  defaultValues?: IncomeTaxFormValues;
  loading?: boolean;
  disabled?: boolean;
};

const formDefaultValues: IncomeTaxFormValues = {
  financial_year: null,
  regime_type: null,
  standard_deduction_limit: null,
  health_education_cess_rate: null,
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
};

export type FormRef = {
  submitForm: (
    onSubmit: (formValues: Partial<IncomeTaxFormValues>) => void
  ) => void;
  setError: UseFormSetError<IncomeTaxFormValues>;
};

export const IncomeTaxForm = forwardRef(
  (
    {
      defaultValues = formDefaultValues,
      loading = false,
      disabled = false,
    }: IncomeTaxFormProps,
    ref: ForwardedRef<FormRef>
  ) => {
    const {
      control,
      handleSubmit,
      setError,
      formState: { errors },
    } = useForm<IncomeTaxFormValues>({
      values: defaultValues,
      resolver: zodResolver(IncomeTaxSchema),
      mode: "all",
    });

    const { data: financialYearData } = useGetFinancialYear();

    const financialYearOptions =
      financialYearData?.map((item: IncomeTaxFinancialYearDetails) => ({
        label: `${DateTime.fromISO(item.label.start_date).toFormat("MMM yyyy")} - ${DateTime.fromISO(item.label.end_date).toFormat("MMM yyyy")}`,
        value: item.value,
        start_date: item.label.start_date,
        end_date: item.label.end_date,
      })) ?? [];

    const { t } = useTranslation();

    console.log("errors", errors);

    useImperativeHandle(ref, () => ({
      submitForm(onSubmit) {
        handleSubmit((formValues) => {
          const selectedYear = financialYearOptions.find(
            (option) => option.value === formValues.financial_year
          );

          if (selectedYear) {
            const transformedData = {
              ...formValues,
              financial_year: {
                start_date: selectedYear.start_date,
                end_date: selectedYear.end_date,
              },
            };

            onSubmit(transformedData as any);
          } else {
            onSubmit(formValues);
          }
        })();
      },
      setError,
    }));

    const errorMessages = (messageKey?: string) => {
      return messageKey && t(messageKey);
    };

    return (
      <Stack gap="30px">
        <FormRow maxColumn={2}>
          <Autocomplete
            label="Financial Year"
            control={control}
            loading={loading}
            disabled={disabled}
            name="financial_year"
            options={financialYearOptions}
            required
            error={!!errors.financial_year}
            helperText={errorMessages(errors.financial_year?.message)}
          />

          <Autocomplete
            label="Regime"
            control={control}
            loading={loading}
            disabled={disabled}
            name="regime_type"
            options={[
              { label: "Old Tax Regime", value: "old" },
              { label: "New Tax Regime", value: "new" },
            ]}
            required
            error={!!errors.regime_type}
            helperText={errorMessages(errors.regime_type?.message)}
          />
        </FormRow>

        <Stack mt={2} gap={"10px"}>
          <Typography variant="h6" fontWeight={700}>
            Tax Slab Rate Configuration
          </Typography>
          <IncomeTaxSlabRateForm
            slabType="standard"
            control={control}
            errors={errors}
            disabled={disabled}
            loading={loading}
          />
          <IncomeTaxSlabRateForm
            slabType="senior"
            control={control}
            errors={errors}
            disabled={disabled}
            loading={loading}
          />
          <IncomeTaxSlabRateForm
            slabType="super_senior"
            control={control}
            errors={errors}
            disabled={disabled}
            loading={loading}
          />
        </Stack>

        <Stack direction="row" gap="10px" alignItems="center">
          <Typography variant="body1">Standard Deduction Limit</Typography>

          <TextField
            name="standard_deduction_limit"
            control={control}
            loading={loading}
            required
            type="number"
            disabled={disabled}
            error={!!errors.standard_deduction_limit}
            helperText={errorMessages(errors.standard_deduction_limit?.message)}
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
              type="number"
              disabled={disabled}
              error={!!errors.health_education_cess_rate}
              helperText={errorMessages(
                errors.health_education_cess_rate?.message
              )}
              sx={{ maxwidth: "230px" }}
            />

            <Typography variant="body1">% of Income Tax + Surcharge</Typography>
          </Stack>
        </Stack>
      </Stack>
    );
  }
);

IncomeTaxForm.displayName = "IncomeTaxForm";
