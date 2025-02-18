import type { IconButtonProps } from "@mui/material";
import { IconButton } from "@mui/material";
import { SvgConfigure } from "../Svgs";

export type ConfigureActionProps = IconButtonProps;

export const ConfigureAction = (props: ConfigureActionProps) => {
  return (
    <IconButton {...props}>
      <SvgConfigure />
    </IconButton>
  );
};
