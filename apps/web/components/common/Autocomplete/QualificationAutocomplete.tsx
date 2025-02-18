import { Autocomplete, type AutocompleteProps } from "@repo/shared-components";
import type { FieldValues } from "react-hook-form";
import { useGeQualificationOption } from "./hooks/useGetQualificationOptions";

type QualificationAutocompleteProps<P extends FieldValues> = Omit<
  AutocompleteProps<P>,
  "options" & {
    loading?: boolean;
  }
>;

export const QualificationAutocomplete = <P extends FieldValues>({
  loading,
  ...props
}: QualificationAutocompleteProps<P>) => {
  const { qualificationOption } = useGeQualificationOption();

  return (
    <Autocomplete
      label="Qualification"
      options={qualificationOption}
      placeholder="Select Qualification"
      loading={loading}
      {...props}
    />
  );
};
