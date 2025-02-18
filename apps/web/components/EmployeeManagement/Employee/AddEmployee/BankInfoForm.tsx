import { Stack } from "@mui/material";
import { DatePicker, FormRow, TextField } from "@repo/shared-components";
import type {
  Control,
  FieldErrors,
  UseFormSetError,
  UseFormWatch,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { bankAcNoRegex, ifscRegex } from "../../../../utils/regex";
import {
  AccountTypeAutocomplete,
  AccountTypeSchema,
} from "../../../common/Autocomplete/AccountTypeAutoComplete";
import { BankAutocomplete } from "../../../common/Autocomplete/BankAutocomplete";
import {
  PaymentTypeAutocomplete,
  PaymentTypeSchema,
} from "../../../common/Autocomplete/PaymentTypeAutoComplete";
import {
  ActionTypeSchema,
  type OptionKey,
} from "../EmployeeDetails/Tabs/EmployeeWorkPost/Tabs/EmployeeOrganizationDetails/BusinessUnit/Dialogs/EditBusinessUnitDialog/hooks/useTabOptions";
import { CORRECTION_OF_DATA } from "../EmployeeDetails/Tabs/EmployeeWorkPost/Tabs/EmployeeOrganizationDetails/BusinessUnit/Dialogs/EditBusinessUnitDialog/hooks/constant";
import { useMemo } from "react";
import { DateTime } from "luxon";

export const BankInfoFormSchema = z
  .object({
    payment_type: PaymentTypeSchema,
    bank_id: z.string().optional().nullable(),
    branch_name: z.string().optional().nullable(),
    account_type: AccountTypeSchema.optional().nullable(),
    account_no: z.string().optional().nullable(),
    ifsc_code: z.string().optional().nullable(),
    name_as_per_bank: z
      .string()
      .max(50, "name_as_per_bank.maxLength")
      .optional()
      .nullable(),
    effective_from: z.string().nullable().optional(),
    operationType: ActionTypeSchema.optional(),
  })
  // eslint-disable-next-line sonarjs/cognitive-complexity
  .superRefine((val, ctx) => {
    if (val.payment_type === "bank") {
      if (!val.bank_id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "common.required",
          path: ["bank_id"],
        });
      }

      if (!val.branch_name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "common.required",
          path: ["branch_name"],
        });
      }

      if (!val.account_type) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "common.required",
          path: ["account_type"],
        });
      }

      if (!val.account_no) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "common.required",
          path: ["account_no"],
        });
      } else if (!bankAcNoRegex.test(val.account_no)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "common.account_no.invalid",
          path: ["account_no"],
        });
      }

      if (!val.ifsc_code) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "common.required",
          path: ["ifsc_code"],
        });
      } else if (!ifscRegex.test(val.ifsc_code)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "common.ifsc_code.invalid",
          path: ["ifsc_code"],
        });
      }
    }

    if (
      val.operationType &&
      val.operationType !== CORRECTION_OF_DATA &&
      !val.effective_from
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["effective_from"],
        message: "common.required",
      });
    }
  });

export type BankInfoFormFieldValues = z.infer<typeof BankInfoFormSchema>;

type BankInfoFormProps = {
  control: Control<BankInfoFormFieldValues>;
  watch: UseFormWatch<BankInfoFormFieldValues>;
  errors: FieldErrors<BankInfoFormFieldValues>;
  loading?: boolean;
  setError?: UseFormSetError<BankInfoFormFieldValues>;
  operationType?: OptionKey;
  defaultValues?: BankInfoFormFieldValues;
};

export const BankInfoForm = ({
  control,
  watch,
  errors,
  setError,
  operationType,
  defaultValues,
  loading = false,
}: BankInfoFormProps) => {
  const { t } = useTranslation();

  const paymentType = watch("payment_type");

  const errorMessages = (messageKey?: string) => {
    return messageKey && t(messageKey);
  };

  const effectiveDateField = useMemo(() => {
    if (operationType && operationType !== CORRECTION_OF_DATA) {
      return (
        <DatePicker
          name="effective_from"
          control={control}
          label="Effective From"
          loading={loading}
          required
          error={!!errors.effective_from}
          minDate={
            defaultValues?.effective_from
              ? DateTime.fromISO(defaultValues?.effective_from)
              : undefined
          }
          maxDate={DateTime.now()}
          setError={setError}
          helperText={errorMessages(errors.effective_from?.message)}
        />
      );
    }
  }, [operationType, loading, errors, defaultValues]);

  return (
    <Stack gap="10px">
      <FormRow>
        <PaymentTypeAutocomplete
          name="payment_type"
          control={control}
          loading={loading}
          required
          disableClearable
          error={!!errors.payment_type}
          helperText={errorMessages(errors.payment_type?.message)}
        />
        {paymentType !== "bank" && effectiveDateField}

        {paymentType === "bank" && (
          <>
            <BankAutocomplete
              control={control}
              error={!!errors.bank_id}
              loading={loading}
              helperText={errorMessages(errors.bank_id?.message)}
              name="bank_id"
              required
            />

            <TextField
              control={control}
              label="Bank Branch"
              name="branch_name"
              loading={loading}
              required
              error={!!errors.branch_name}
              helperText={errorMessages(errors.branch_name?.message)}
            />
          </>
        )}
      </FormRow>

      {paymentType === "bank" && (
        <>
          <FormRow>
            <AccountTypeAutocomplete
              name="account_type"
              control={control}
              loading={loading}
              required
              error={!!errors.account_type}
              helperText={errorMessages(errors.account_type?.message)}
            />

            <TextField
              control={control}
              label="Account Number"
              name="account_no"
              loading={loading}
              required
              error={!!errors.account_no}
              helperText={errorMessages(errors.account_no?.message)}
            />

            <TextField
              control={control}
              label="IFSC Code"
              name="ifsc_code"
              isCapitalize
              loading={loading}
              required
              error={!!errors.ifsc_code}
              helperText={errorMessages(errors.ifsc_code?.message)}
            />
          </FormRow>

          <FormRow>
            <TextField
              control={control}
              label="Name As Per Bank"
              name="name_as_per_bank"
              loading={loading}
              error={!!errors.name_as_per_bank}
              helperText={errorMessages(errors.name_as_per_bank?.message)}
            />

            {effectiveDateField}
          </FormRow>
        </>
      )}
    </Stack>
  );
};
