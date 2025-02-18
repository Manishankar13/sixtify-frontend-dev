import { Stack } from "@mui/material";
import { SvgsIndicator } from "../Svgs/SvgsIndicator";
import { type WorkDayType } from "../utils/colorVariant";

type IndicatorProps = {
  label?: string;
  variant?: WorkDayType;
  colourCode?: string;
};

export const Indicator = ({ label, variant, colourCode }: IndicatorProps) => {
  return (
    <Stack gap="10px" direction="row" alignItems="center">
      <SvgsIndicator variant={variant} colourCode={colourCode} />
      {label}
    </Stack>
  );
};
