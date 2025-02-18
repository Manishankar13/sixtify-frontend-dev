import { Autocomplete, type AutocompleteProps } from "@repo/shared-components";
import type { FieldValues } from "react-hook-form";
import { useGetCompanyOptions } from "./hooks/useGetCompanyOptions";
type CompanyAutocompleteProps<P extends FieldValues> = Omit<
  AutocompleteProps<P>,
  "options"
>;

export const CompanyAutocomplete = <P extends FieldValues>(
  props: CompanyAutocompleteProps<P>
) => {
  const { data: companyOptions } = useGetCompanyOptions();

  const { loading } = props;

  return (
    <Autocomplete
      label="Company"
      loading={loading}
      options={companyOptions}
      placeholder="Select Company"
      {...props}
    />
  );
};
