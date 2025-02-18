// IncomeTaxRegimeForm

import { zodResolver } from "@hookform/resolvers/zod";
import { Add } from "@mui/icons-material";
import { Divider, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import {
    Autocomplete,
    Button,
    FormContainer,
    FormRow,
    FormSection,
    PadBox,
    TextField
} from "@repo/shared-components";
import type { ForwardedRef } from "react";
import { forwardRef, useImperativeHandle } from "react";
import type { UseFormSetError } from "react-hook-form";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import type { OptionsType } from "../../../../../../../types/options";
import { percentageRegex } from "../../../../../../../utils/regex";
import { YearPeriodAutocomplete } from "../../../../../../common/Autocomplete/YearPeriodAutocomplete";
import { IncomeTaxSlabsForm } from "./IncomeTaxSlabsForm";

export const taxSlabSchema = z
    .object({
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

const CompanyFormSchema = z.object({
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
        super_senior: z.array(taxSlabSchema).nullable().optional()
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
        const categories: (keyof TaxSlabs)[] = ["standard", "senior", "super_senior"];

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
    slapType: "standard" | "senior" | "super_senior"
};

export const regimeTypeOption: OptionsType[] = [
    { label: "Old Tax Regime", value: "old" },
    { label: "New Tax Regime", value: "new" },
]

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

const Headers = [
    "Start Range",
    "End Range",
    "Tax Rate",
    "Surcharge Rate",
    "Action"
];

export const IncomeTaxRegimeForm = forwardRef(
    (
        { defaultValues = formDefaultValues, loading = false, slapType }: CompanyFormProps,
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
            watch,
            setError,
            setValue,
            formState: { errors },
        } = formMethods;

        const theme = useTheme();

        const { slate } = theme.palette.app.color;

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

        const { append, fields, remove } = useFieldArray({
            name: `tax_slabs.${slapType}`,
            keyName: "id",
            control,
        });

        const handleAddNewRow = () => {
            append({
                start_range: null,
                end_range: null,
                tax_rate: null,
                surcharge_rate: null,
            });
        };

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
                            <YearPeriodAutocomplete
                                name="financial_year"
                                label="Financial Year"
                                required
                                joiningDate=""
                                leavePlanStartMonth={0}
                                error={!!errors.financial_year}
                                helperText={errorMessages(errors.financial_year?.message)}
                            />
                        </FormRow>

                        <Stack direction="column" gap="10px" mt={2}>
                            <Typography variant="h6" fontWeight={500}>Tax Slab Rate Configuration</Typography>
                            <Typography variant="body1" fontWeight={500}>Standard Taxpayer(Below 60)</Typography>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: slate[700] }}>
                                        {Headers.map((item) => (
                                            <TableCell key={uuidv4()}>{item}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {fields.map((field, index) => {
                                        return (
                                            <IncomeTaxSlabsForm
                                                title="standard"
                                                key={field.id}
                                                watch={watch}
                                                field={field}
                                                setValue={setValue}
                                                index={index}
                                                removeTaxSlab={() => remove(index)}
                                                formType="standard"
                                                errors={errors}
                                                headersLength={Headers.length}
                                            />
                                        );
                                    })}
                                </TableBody>
                            </Table>

                            <PadBox padding={{ padding: "15px" }}>
                                <Divider>
                                    <Button
                                        variant="contained"
                                        startIcon={<Add />}
                                        onClick={handleAddNewRow}
                                        disabled={
                                            Object.keys(errors).some((key) =>
                                                key.startsWith("tax_slabs.standard")
                                            )
                                        }
                                    >
                                        Add New
                                    </Button>
                                </Divider>
                            </PadBox>
                        </Stack>

                        <Stack direction="column" gap="10px" mt={2}>
                            <Typography variant="body1" fontWeight={500}>Senior Citizen(60 to 80)</Typography>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: slate[700] }}>
                                        {Headers.map((item) => (
                                            <TableCell key={uuidv4()}>{item}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {fields.map((field, index) => {
                                        return (
                                            <IncomeTaxSlabsForm
                                                title="senior"
                                                key={field.id}
                                                watch={watch}
                                                field={field}
                                                setValue={setValue}
                                                index={index}
                                                removeTaxSlab={() => remove(index)}
                                                formType="senior"
                                                errors={errors}
                                                headersLength={Headers.length}
                                            />
                                        );
                                    })}
                                </TableBody>
                            </Table>

                            <PadBox padding={{ padding: "15px" }}>
                                <Divider>
                                    <Button
                                        variant="contained"
                                        startIcon={<Add />}
                                        onClick={handleAddNewRow}
                                        disabled={
                                            Object.keys(errors).some((key) =>
                                                key.startsWith("tax_slabs.senior")
                                            )
                                        }
                                    >
                                        Add New
                                    </Button>
                                </Divider>
                            </PadBox>
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

                                <Typography variant="body1">% of Income Tax + Surcharge</Typography>
                            </Stack>
                        </Stack>
                    </FormProvider>
                </FormSection>
            </FormContainer>
        );
    }
);

IncomeTaxRegimeForm.displayName = "IncomeTaxRegimeForm";
