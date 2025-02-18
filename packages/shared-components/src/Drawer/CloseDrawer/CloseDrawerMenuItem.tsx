import { ChevronRight } from "@mui/icons-material";
import { Box, useTheme } from "@mui/material";
import { Bullet } from "../Bullet";
import { MenuItem, type MenuItemProps } from "../MenuItem";

type CloseDrawerMenuItemProps = {
  icon?: MenuItemProps["icon"];
  title?: MenuItemProps["title"];
  isShowEndAdornment?: boolean;
  onClick: MenuItemProps["onClick"];
  selected?: MenuItemProps["selected"];
  onMouseEnter?: MenuItemProps["onMouseEnter"];
};

export const CloseDrawerMenuItem = ({
  icon = <Bullet />,
  title,
  isShowEndAdornment = false,
  onClick,
  selected = false,
  onMouseEnter,
}: CloseDrawerMenuItemProps) => {
  const theme = useTheme();

  const { butterflyBlue, slate } = theme.palette.app.color;

  return (
    <Box
      component="li"
      sx={{
        bgcolor: selected && !isShowEndAdornment ? butterflyBlue[900] : "",
      }}
    >
      <MenuItem
        sx={{
          ":focus-visible": {
            border: `1px solid ${butterflyBlue[900]}`,
            backgroundColor: slate[900],
          },
        }}
        selected={selected}
        title={title}
        icon={icon}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        endAdornment={isShowEndAdornment && <ChevronRight />}
      />
    </Box>
  );
};
