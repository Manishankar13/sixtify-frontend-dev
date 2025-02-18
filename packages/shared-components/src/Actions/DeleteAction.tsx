import type { IconButtonProps } from "@mui/material";
import { IconButton } from "@mui/material";
import { SvgDelete } from "../Svgs/SvgDelete";

export type DeleteActionProps = IconButtonProps;

export const DeleteAction = (props: DeleteActionProps) => {
  return (
    <IconButton {...props}>
      <SvgDelete />
    </IconButton>
  );
};
