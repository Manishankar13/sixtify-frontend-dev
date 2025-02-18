import type { TooltipProps as MuiTooltipProps } from "@mui/material";
import { Box, Tooltip as MuiTooltip, Typography } from "@mui/material";
import { ReactNode, type PropsWithChildren } from "react";

type TooltipProps = PropsWithChildren<{
  toolTipLabel: ReactNode;
  placement?: MuiTooltipProps["placement"];
}>;

export const Tooltip = ({
  toolTipLabel,
  children,
  placement = "top-start",
  ...rest
}: TooltipProps) => {
  return (
    <MuiTooltip arrow placement={placement} title={toolTipLabel} {...rest}>
      {typeof children === "string" ? (
        <Typography
          variant="body2"
          fontWeight={500}
          sx={{
            maxWidth: "150px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {children}
        </Typography>
      ) : (
        <Box>{children}</Box>
      )}
    </MuiTooltip>
  );
};
