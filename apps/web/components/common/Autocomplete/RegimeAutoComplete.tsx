import { Autocomplete, type AutocompleteProps } from "@repo/shared-components";
import type { FieldValues } from "react-hook-form";
import { z } from "zod";
import type { OptionsType } from "../../../types/options";
import { NEW_TAX_REGIME, OLD_TAX_REGIME } from "./hooks/constant";

const RegimeTypes = {
  [OLD_TAX_REGIME]: "Old Tax Regime",
  [NEW_TAX_REGIME]: "New Tax Regime",
};

export const RegimeTypeOption: OptionsType[] = [
  { label: RegimeTypes[OLD_TAX_REGIME], value: OLD_TAX_REGIME },
  { label: RegimeTypes[NEW_TAX_REGIME], value: NEW_TAX_REGIME },
];

export type RegimeType = keyof typeof RegimeTypes;

export const RegimeTypeSchema = z.enum([OLD_TAX_REGIME, NEW_TAX_REGIME]);

type RegimeAutoCompleteProps<P extends FieldValues> = Omit<
  AutocompleteProps<P>,
  "options"
>;

export const RegimeAutoComplete = <P extends FieldValues>(
  props: RegimeAutoCompleteProps<P>
) => {
  return (
    <Autocomplete
      label="Regime Type"
      required
      options={RegimeTypeOption}
      placeholder="Select Regime Type"
      {...props}
    />
  );
};
