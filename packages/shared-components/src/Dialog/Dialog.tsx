import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Dialog as MuiDialog,
  Stack,
  Typography,
  type DialogProps as MuiDialogProps,
} from "@mui/material";
import type { PropsWithChildren, ReactNode } from "react";
import { PadBox } from "../PadBox";

export type DialogProps = PropsWithChildren<
  MuiDialogProps & {
    isHideCloseIcon?: boolean;
    title?: string;
    actions?: ReactNode;
    isHideDividers?: boolean;
  }
>;

export const Dialog = ({
  title,
  isHideCloseIcon = false,
  isHideDividers = false,
  children,
  onClose,
  actions,
  ...props
}: DialogProps) => {
  return (
    <MuiDialog fullWidth {...props}>
      <DialogTitle textAlign="center">
        <Stack direction="row" alignItems="center">
          <Typography variant="h5" fontWeight={500} flex={1}>
            {title}
          </Typography>

          {!isHideCloseIcon && (
            <IconButton
              onClick={(event) => onClose && onClose(event, "escapeKeyDown")}
              color="secondary"
            >
              <HighlightOffIcon fontSize="large" />
            </IconButton>
          )}
        </Stack>
      </DialogTitle>

      <DialogContent dividers={!isHideDividers}>
        <PadBox padding={{ padding: "10px" }}>{children}</PadBox>
      </DialogContent>

      {actions && (
        <DialogActions sx={{ py: "16px", px: "24px" }}>{actions}</DialogActions>
      )}
    </MuiDialog>
  );
};
