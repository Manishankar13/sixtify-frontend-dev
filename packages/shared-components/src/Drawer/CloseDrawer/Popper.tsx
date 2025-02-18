import { Popper as MuiPopper, useTheme, type PopperProps } from "@mui/material";
import type { PropsWithChildren } from "react";

type ExtendedPopoverProps = {
  currentMenuIndex: number;
} & PropsWithChildren<PopperProps>;

export const Popper = ({
  open,
  anchorEl,
  children,
  currentMenuIndex,
}: ExtendedPopoverProps) => {
  const theme = useTheme();

  const { mirage } = theme.palette.app.color;

  return (
    <MuiPopper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-end"
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [
              currentMenuIndex ? 79 : 200,
              currentMenuIndex ? currentMenuIndex * 36 + 82 : -56,
            ],
          },
        },
      ]}
      sx={{
        background: mirage[900],
        width: "200px",
        zIndex: 1300,
      }}
    >
      {children}
    </MuiPopper>
  );
};
