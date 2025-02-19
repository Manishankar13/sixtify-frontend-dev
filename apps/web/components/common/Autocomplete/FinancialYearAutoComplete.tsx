import { Autocomplete, type AutocompleteProps } from "@repo/shared-components";
import { useMemo } from "react";
import type { FieldValues } from "react-hook-form";

type YearPeriodAutocompleteProps<P extends FieldValues> = Omit<
  AutocompleteProps<P>,
  "options"
> & {
  loading?: boolean;
};

export const FinancialYearAutoComplete = <P extends FieldValues>({
  loading,
  ...props
}: YearPeriodAutocompleteProps<P>) => {
  function getLastFinancialYears() {
    const currentYear = new Date().getFullYear();

    const currentMonth = new Date().getMonth() + 1;

    const financialStartYear =
      currentMonth >= 4 ? currentYear : currentYear - 1;

    const years = [
      {
        label: `${2042}-04-01 / ${2043}-03-31`,
        value: `${2042}-04-01 / ${2043}-03-31`,
      },
    ];

    for (let i = 0; i < 3; i++) {
      const startYear = financialStartYear - i;

      const endYear = startYear + 1;

      years.push({
        label: `${startYear}-04-01 / ${endYear}-03-31`,
        value: `${startYear}-04-01 / ${endYear}-03-31`,
      });
    }

    return years;
  }

  const yearPeriodOptions = useMemo(() => {
    return getLastFinancialYears();
  }, []);

  return (
    <Autocomplete
      options={yearPeriodOptions}
      placeholder="Select Time Period"
      loading={loading}
      {...props}
    />
  );
};
