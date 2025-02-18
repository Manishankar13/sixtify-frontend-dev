import type { IconButtonProps } from "@mui/material";
import { IconButton } from "@mui/material";
import { SvgsHistory } from "../Svgs/SvgsHistory";

export type HistoryActionProps = IconButtonProps;

export const HistoryAction = (props: HistoryActionProps) => {
  return (
    <IconButton {...props}>
      <SvgsHistory />
    </IconButton>
  );
};
