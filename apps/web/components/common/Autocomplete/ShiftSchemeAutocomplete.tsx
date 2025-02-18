import { Autocomplete, type AutocompleteProps } from "@repo/shared-components";
import type { FieldValues } from "react-hook-form";
import { useGetShiftOptions } from "./hooks/useGetShiftSchemeOptions";
import { useMemo } from "react";
import { formatToLocalTime } from "../../../utils/date";

type ShiftSchemeAutocompleteProps<P extends FieldValues> = Omit<
  AutocompleteProps<P>,
  "options"
> & {
  companyId: string;
};

export const ShiftSchemeAutocomplete = <P extends FieldValues>({
  companyId,
  ...props
}: ShiftSchemeAutocompleteProps<P>) => {
  const { data: ShiftSchemeOptions } = useGetShiftOptions({
    companyId,
  });

  const formattedShiftSchemeOptions = useMemo(() => {
    return ShiftSchemeOptions.map((shift) => {
      const formattedStart = formatToLocalTime(shift.shift_start, "HH:mm");

      const formattedEnd = formatToLocalTime(shift.shift_end, "HH:mm");

      return {
        ...shift,
        label: `${shift.label} (${formattedStart} - ${formattedEnd})`,
      };
    });
  }, [ShiftSchemeOptions]);

  return (
    <Autocomplete
      label="Shift"
      options={formattedShiftSchemeOptions}
      placeholder="Select Shift"
      {...props}
    />
  );
};
