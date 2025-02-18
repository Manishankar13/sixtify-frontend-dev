import { zodResolver } from "@hookform/resolvers/zod";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box, Divider, InputLabel, Stack, useTheme } from "@mui/material";
import { CheckBox, FormRow, PadBox, TextField } from "@repo/shared-components";
import type { ForwardedRef } from "react";
import { forwardRef, useImperativeHandle, useMemo } from "react";
import { useForm, type UseFormSetError } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { useEnableDisableSubmitButton } from "../../../hooks/useEnableDisableSubmitButton";
import { CompanyAutocomplete } from "../../common/Autocomplete/CompanyAutocomplete";
import { ExcelMasterAutocomplete } from "../../common/Autocomplete/ExcelMasterAutocomplete";
import type { ExcelConfigurationPayload } from "./hooks/useAddExcelTemplateConfiguration";
import { useGetExcelMasterFields } from "./hooks/useGetExcelMasterFields";
import { MappedColumnList } from "./MappedColumnList/MappedColumnList";

const ExcelConfigurationFormSchema = z.object({
  company_id: z
    .string()
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  excel_master_id: z
    .string()
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  template_name: z
    .string()
    .trim()
    .max(255, "common.maxLength")
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  excel_template_fields: z
    .array(
      z.object({
        id: z.string(),
        field_name: z.string(),
        template_field_name: z.string(),
        required: z.boolean(),
        selected: z.boolean(),
      })
    )
    .or(z.array(z.never())),
});

export type ExcelConfigurationFormFieldValues = z.infer<
  typeof ExcelConfigurationFormSchema
>;

export type ExcelTemplateFields =
  ExcelConfigurationFormFieldValues["excel_template_fields"];

export type FormRef = {
  submitForm: (
    onSubmit: (formValues: ExcelConfigurationPayload) => void
  ) => void;
  setError: UseFormSetError<ExcelConfigurationPayload>;
};

const formDefaultValues: ExcelConfigurationFormFieldValues = {
  company_id: null,
  excel_master_id: null,
  template_name: null,
  excel_template_fields: [],
};

type ExcelTemplateConfigurationFormProps = {
  defaultValues?: ExcelConfigurationPayload;
  loading?: boolean;
  disabled?: boolean;
};

export const ExcelTemplateConfigurationForm = forwardRef(
  (
    {
      defaultValues = formDefaultValues,
      loading,
      disabled = false,
    }: ExcelTemplateConfigurationFormProps,
    ref: ForwardedRef<FormRef>
  ) => {
    const theme = useTheme();

    const { t } = useTranslation();

    const initialValues = useMemo(() => {
      if (defaultValues) {
        return { ...defaultValues, excel_template_fields: [] };
      }

      return formDefaultValues;
    }, [defaultValues]);

    const {
      control,
      watch,
      setValue,
      setError,
      formState: { errors },
      handleSubmit,
    } = useForm<ExcelConfigurationFormFieldValues>({
      values: initialValues,
      resolver: zodResolver(ExcelConfigurationFormSchema),
      mode: "all",
    });

    const excel_master_id = watch("excel_master_id");

    const excel_template_fields = watch("excel_template_fields");

    const { data: excelMasterFieldsList } = useGetExcelMasterFields({
      excelMasterId: excel_master_id ?? "",
    });

    useEnableDisableSubmitButton({
      control,
      defaultValues: initialValues,
      errors,
    });

    useMemo(() => {
      if (excelMasterFieldsList.length > 0) {
        if (defaultValues.excel_template_fields?.length > 0) {
          const excelMasterFields = excelMasterFieldsList.map((field) => {
            const excelMasterField = defaultValues.excel_template_fields.find(
              (field2) => field.id === field2.id
            );

            return excelMasterField
              ? {
                  ...field,
                  selected: true,
                  template_field_name: field.field_name,
                }
              : {
                  ...field,
                  selected: field.required,
                  template_field_name: field.field_name,
                };
          });

          setValue("excel_template_fields", excelMasterFields);
        } else {
          const excelMasterFields = excelMasterFieldsList.map((field) => {
            return {
              ...field,
              selected: field.required,
              template_field_name: field.field_name,
            };
          });

          setValue("excel_template_fields", excelMasterFields);
        }
      } else if (excel_template_fields?.length !== 0) {
        setValue("excel_template_fields", []);
      }
    }, [excelMasterFieldsList]);

    const getPayload = (values: ExcelConfigurationFormFieldValues) => {
      const excelTemplateFieldsList = values.excel_template_fields
        .filter((field) => field.selected)
        .map((field) => {
          return {
            id: field.id,
            template_field_name: field.template_field_name,
          };
        });

      return {
        ...values,
        excel_template_fields: excelTemplateFieldsList,
      };
    };

    useImperativeHandle(ref, () => ({
      submitForm(onSubmit) {
        handleSubmit((formValues) => {
          const payload = getPayload(formValues);

          onSubmit(payload);
        })();
      },
      setError,
    }));

    const errorMessages = (messageKey?: string) => {
      return messageKey && t(messageKey);
    };

    return (
      <Stack gap="20px">
        <FormRow>
          <CompanyAutocomplete
            name="company_id"
            control={control}
            required
            loading={loading}
            error={!!errors.company_id}
            helperText={errorMessages(errors.company_id?.message)}
            disabled={disabled}
          />

          <ExcelMasterAutocomplete
            name="excel_master_id"
            control={control}
            required
            loading={loading}
            error={!!errors.excel_master_id}
            helperText={errorMessages(errors.excel_master_id?.message)}
            disabled={disabled}
          />

          <TextField
            name="template_name"
            control={control}
            label="Excel Template Name"
            required
            loading={loading}
            error={!!errors.template_name}
            helperText={errorMessages(errors.template_name?.message)}
            disabled={disabled}
          />
        </FormRow>

        {excel_template_fields.length > 0 && (
          <>
            <Divider />

            <Stack direction="row" gap="25px" sx={{ flex: 1 }}>
              <Stack gap="10px" sx={{ width: "400px" }}>
                <InputLabel>Default Field List</InputLabel>

                <Box
                  sx={{
                    border: `1px solid ${theme.palette.app.color.butterflyBlue[300]}`,
                    borderRadius: "6px",
                    maxHeight: "550px",
                    overflowY: "auto",
                  }}
                >
                  <PadBox padding={{ padding: "20px" }}>
                    <Stack gap="10px">
                      {excel_template_fields.map((field, index) => {
                        return (
                          <Stack key={uuidv4()} direction="row" gap="10px">
                            <span
                              style={{
                                height: "25px",
                                width: "25px",
                                textAlign: "center",
                              }}
                            >
                              {field.required ? (
                                <LockOutlinedIcon color="disabled" />
                              ) : (
                                <CheckBox
                                  name={`excel_template_fields.${index}.selected`}
                                  control={control}
                                  size="small"
                                  disabled={field.required || disabled}
                                />
                              )}
                            </span>

                            <InputLabel>{field.field_name}</InputLabel>
                          </Stack>
                        );
                      })}
                    </Stack>
                  </PadBox>
                </Box>
              </Stack>

              <Stack gap="10px" flexGrow={1}>
                <InputLabel>Mapped Column</InputLabel>

                <MappedColumnList
                  setValue={setValue}
                  defaultFields={excel_template_fields}
                  disabled={disabled}
                />
              </Stack>
            </Stack>
          </>
        )}
      </Stack>
    );
  }
);

ExcelTemplateConfigurationForm.displayName = "ExcelTemplateConfigurationForm";
