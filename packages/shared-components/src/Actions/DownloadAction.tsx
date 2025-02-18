import type { IconButtonProps } from "@mui/material";
import { IconButton } from "@mui/material";
import { SvgDownload } from "../Svgs";

export type DownloadActionProps = IconButtonProps;

export const DownloadAction = (props: DownloadActionProps) => {
  return (
    <IconButton {...props}>
      <SvgDownload />
    </IconButton>
  );
};
