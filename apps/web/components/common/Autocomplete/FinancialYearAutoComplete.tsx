import { Autocomplete, type AutocompleteProps } from "@repo/shared-components";
import type { FieldValues } from "react-hook-form";

type FinancialYearAutocompleteProps<P extends FieldValues> = Omit<
  AutocompleteProps<P>,
  "options"
> & {
  financialYearOptions: { label: string; value: string }[];
};

export const FinancialYearAutoComplete = <P extends FieldValues>({
  financialYearOptions,
  ...props
}: FinancialYearAutocompleteProps<P>) => {
  return (
    <Autocomplete
      label="Financial Year"
      options={financialYearOptions}
      placeholder="Select Financial Year"
      {...props}
    />
  );
};
