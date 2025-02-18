import type { IconButtonProps } from "@mui/material";
import { IconButton } from "@mui/material";
import { SvgsEdit } from "../Svgs/SvgsEdit";

export type EditActionProps = IconButtonProps;

export const EditAction = (props: EditActionProps) => {
  return (
    <IconButton {...props}>
      <SvgsEdit />
    </IconButton>
  );
};
