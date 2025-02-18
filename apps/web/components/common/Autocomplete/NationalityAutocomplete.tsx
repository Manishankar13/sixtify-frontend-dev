import { Autocomplete, type AutocompleteProps } from "@repo/shared-components";
import type { FieldValues } from "react-hook-form";
import { useGetNationalityOption } from "./hooks/useGetNationalityOptions";

type NationalityAutocompleteProps<P extends FieldValues> = Omit<
  AutocompleteProps<P>,
  "options" & {
    loading?: boolean;
  }
>;

export const NationalityAutocomplete = <P extends FieldValues>({
  loading,
  ...props
}: NationalityAutocompleteProps<P>) => {
  const { nationalityOption } = useGetNationalityOption();

  return (
    <Autocomplete
      label="Nationality"
      options={nationalityOption}
      placeholder="Select Nationality"
      loading={loading}
      {...props}
    />
  );
};
