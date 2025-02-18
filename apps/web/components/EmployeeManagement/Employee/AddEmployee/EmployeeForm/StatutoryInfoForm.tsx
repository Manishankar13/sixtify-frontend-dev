import { InputLabel, Stack } from "@mui/material";
import {
  CheckBox,
  DatePicker,
  FormRow,
  TextField,
} from "@repo/shared-components";
import { t } from "i18next";
import type { Control, FieldErrors, UseFormWatch } from "react-hook-form";
import { z } from "zod";

export const StatutoryInfoFormSchema = z.object({
  pf_applicable: z.boolean().optional().nullable(),
  pf_account_no: z.string().optional().nullable(),
  pf_joining_date: z.string().optional().nullable(),
  uan_no: z.string().optional().nullable(),
  esic_applicable: z.boolean().optional().nullable(),
  esic_no: z.string().optional().nullable(),
  esic_joining_date: z.string().optional().nullable(),
  lwf_applicable: z.boolean().optional().nullable(),
  pt_applicable: z.boolean().optional().nullable(),
  tds_applicable: z.boolean().optional().nullable(),
});

export type StatutoryFormFieldValues = z.infer<typeof StatutoryInfoFormSchema>;

type StatutoryInfoFormProps = {
  control: Control<StatutoryFormFieldValues>;
  watch: UseFormWatch<StatutoryFormFieldValues>;
  loading?: boolean;
  errors?: FieldErrors<StatutoryFormFieldValues>;
};
export const StatutoryInfoForm = ({
  control,
  watch,
  errors = {},
  loading = false,
}: StatutoryInfoFormProps) => {
  const isPfApplicable = watch("pf_applicable");

  const isEsicApplicable = watch("esic_applicable");

  const errorMessages = (messageKey?: string) => {
    return messageKey && t(messageKey);
  };

  return (
    <Stack gap="10px">
      <FormRow>
        <Stack direction="row" gap="10px">
          <CheckBox
            name="pf_applicable"
            loading={loading}
            control={control}
            size="small"
          />

          <InputLabel>PF Applicable</InputLabel>
        </Stack>
      </FormRow>

      {isPfApplicable && (
        <FormRow>
          <Stack gap="15px">
            <TextField
              control={control}
              loading={loading}
              label="PF Number"
              name="pf_account_no"
              error={!!errors.pf_account_no}
              helperText={errorMessages(errors.pf_account_no?.message)}
            />
          </Stack>

          <DatePicker
            name="pf_joining_date"
            control={control}
            loading={loading}
            label="PF Join Date"
          />

          <TextField
            control={control}
            label="UAN Number"
            name="uan_no"
            error={!!errors.uan_no}
            helperText={errorMessages(errors.uan_no?.message)}
            loading={loading}
          />
        </FormRow>
      )}

      <FormRow>
        <Stack direction="row" gap="10px">
          <CheckBox
            name="esic_applicable"
            loading={loading}
            control={control}
            size="small"
          />

          <InputLabel>ESIC Applicable</InputLabel>
        </Stack>
      </FormRow>

      {isEsicApplicable && (
        <FormRow>
          <TextField
            control={control}
            label="ESIC Number"
            name="esic_no"
            error={!!errors.esic_no}
            helperText={errorMessages(errors.esic_no?.message)}
            loading={loading}
          />

          <DatePicker
            control={control}
            loading={loading}
            label="ESIC Join Date"
            name="esic_joining_date"
          />
        </FormRow>
      )}

      <FormRow>
        <Stack direction="row" gap="10px">
          <CheckBox
            name="lwf_applicable"
            loading={loading}
            control={control}
            size="small"
          />

          <InputLabel>LWF Applicable</InputLabel>
        </Stack>
      </FormRow>

      <FormRow>
        <Stack direction="row" gap="10px">
          <CheckBox
            name="pt_applicable"
            loading={loading}
            control={control}
            size="small"
          />

          <InputLabel>PT Applicable</InputLabel>
        </Stack>
      </FormRow>

      <FormRow>
        <Stack direction="row" gap="10px">
          <CheckBox
            name="tds_applicable"
            loading={loading}
            control={control}
            size="small"
          />

          <InputLabel>TDS Applicable</InputLabel>
        </Stack>
      </FormRow>
    </Stack>
  );
};
