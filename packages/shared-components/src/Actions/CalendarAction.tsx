import type { IconButtonProps } from "@mui/material";
import { IconButton } from "@mui/material";
import { SvgCalendar } from "../Svgs";

export type CalendarActionProps = IconButtonProps;

export const CalendarAction = (props: CalendarActionProps) => {
  return (
    <IconButton sx={{ color: "#4C5D70" }} {...props}>
      <SvgCalendar />
    </IconButton>
  );
};
