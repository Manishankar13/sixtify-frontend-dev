import { Autocomplete, type AutocompleteProps } from "@repo/shared-components";
import type { FieldValues } from "react-hook-form";
import { useGetBankShiftOptions } from "./hooks/useGetBankShiftSchemeOptions";
import { useMemo } from "react";
import { formatToLocalTime } from "../../../utils/date";

type BankShiftSchemaAutocompleteProps<P extends FieldValues> = Omit<
  AutocompleteProps<P>,
  "options"
> & {
  companyId: string;
};

export const BankShiftSchemaAutocomplete = <P extends FieldValues>({
  companyId,
  ...props
}: BankShiftSchemaAutocompleteProps<P>) => {
  const { data: bankShiftSchemeOptions } = useGetBankShiftOptions({
    companyId,
  });

  const formattedBankShiftSchemeOptions = useMemo(() => {
    return bankShiftSchemeOptions.map((bankShift) => {
      const formattedStart = formatToLocalTime(bankShift.shift_start, "HH:mm");

      const formattedEnd = formatToLocalTime(bankShift.shift_end, "HH:mm");

      return {
        ...bankShift,
        label: `${bankShift.label} (${formattedStart} - ${formattedEnd})`,
      };
    });
  }, [bankShiftSchemeOptions]);

  return (
    <Autocomplete
      label="Bank Shift"
      options={formattedBankShiftSchemeOptions}
      placeholder="Select Bank Shift"
      {...props}
    />
  );
};
