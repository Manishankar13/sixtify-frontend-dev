import type { IconButtonProps } from "@mui/material";
import { IconButton } from "@mui/material";
import { SvgAdd } from "../Svgs";

export type AddActionProps = IconButtonProps;

export const AddAction = (props: AddActionProps) => {
  return (
    <IconButton {...props}>
      <SvgAdd />
    </IconButton>
  );
};
