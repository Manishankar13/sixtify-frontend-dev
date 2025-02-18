import {
  ListItemButton,
  ListItemText,
  Stack,
  useTheme,
  type SxProps,
  type Theme,
  type ListItemButtonProps,
} from "@mui/material";
import type { HTMLAttributeAnchorTarget, ReactNode } from "react";
import { Bullet } from "./Bullet";

export type MenuItemProps = Omit<ListItemButtonProps, "onClick"> & {
  icon?: ReactNode;
  endAdornment?: ReactNode;
  title?: string;
  sx?: SxProps<Theme>;
  onClick: (target?: HTMLAttributeAnchorTarget) => void;
};

export const MenuItem = ({
  selected = false,
  icon = <Bullet />,
  title,
  endAdornment,
  sx,
  onClick,
  ...props
}: MenuItemProps) => {
  const theme = useTheme();

  const { butterflyBlue, iron } = theme.palette.app.color;

  return (
    <ListItemButton
      {...props}
      onClick={(e) => onClick(e.ctrlKey ? "_blank" : "_self")}
      onMouseDown={(e) => {
        e.preventDefault();

        if (e.button === 1) {
          onClick("_blank");
        }
      }}
      sx={{
        ...sx,
        color: selected ? iron[600] : theme.palette.primary.light,
        ":hover": {
          color: iron[600],
          ".bullet-hover": {
            color: selected ? "" : butterflyBlue[900],
          },
        },
      }}
    >
      <Stack
        alignItems="center"
        direction="row"
        flex={1}
        gap="10px"
        justifyContent="center"
      >
        {icon}
        {title && <ListItemText primary={title} />}
      </Stack>
      {endAdornment}
    </ListItemButton>
  );
};
