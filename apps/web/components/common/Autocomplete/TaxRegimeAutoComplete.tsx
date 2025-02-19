import { Autocomplete, type AutocompleteProps } from "@repo/shared-components";
import type { FieldValues } from "react-hook-form";
import { useGetTaxRegimeOptions } from "./hooks/useGetTaxRegimeOptions";

type TaxRegimeAutoCompleteProps<P extends FieldValues> = Omit<
  AutocompleteProps<P>,
  "options"
> & {
  loading?: boolean;
  hideLabel?: boolean;
};

export const TaxRegimeAutoComplete = <P extends FieldValues>({
  loading = false,
  hideLabel = false,
  ...props
}: TaxRegimeAutoCompleteProps<P>) => {
  const { taxRegimeOption } = useGetTaxRegimeOptions();

  return (
    <Autocomplete
      label={hideLabel ? "" : "Regime"}
      options={taxRegimeOption}
      placeholder="Select Regime"
      loading={loading}
      {...props}
    />
  );
};
