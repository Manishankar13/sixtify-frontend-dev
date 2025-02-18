import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import type { MenuProps } from "@mui/material";
import {
  Avatar,
  Box,
  Divider,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import _isFunction from "lodash/isFunction";
import {
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { IconButtonStyled } from "./UserProfileMenu.styled";

export type UserProfileMenuProps = Omit<MenuProps, "open" | "closeMenu"> & {
  userDetails: {
    name: string;
    email: string;
    avatar: string;
  };
  menuItems: {
    key: string;
    label: string;
    icon?: ReactNode;
    divider?: boolean;
    sx?: CSSProperties;
    onClick?: () => void;
  }[];
};

export function UserProfileMenu({
  userDetails,
  menuItems,
}: UserProfileMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack alignItems="center">
      <IconButtonStyled size="small" onClick={handleClick} isOpened={open}>
        <Stack direction="row" alignItems="center" gap={1} color="black">
          <Avatar src={userDetails.avatar} />
          <Typography>{userDetails.name}</Typography>
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </Stack>
      </IconButtonStyled>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            marginTop: "5px",
            width: "290px",
          },
        }}
      >
        {menuItems.map(
          ({ divider = false, onClick, icon, label, sx = {}, key }) => {
            return (
              <Box key={`${key}_container`}>
                {divider && <Divider />}

                <MenuItem
                  onClick={() => {
                    if (_isFunction(onClick)) {
                      onClick();
                    }
                  }}
                >
                  {(icon || label) && (
                    <Stack
                      gap="1.2rem"
                      alignItems="center"
                      width="100%"
                      flexDirection="row"
                      sx={{ ...sx }}
                    >
                      {icon}
                      {label && <Typography>{label}</Typography>}
                    </Stack>
                  )}
                </MenuItem>
              </Box>
            );
          }
        )}
      </Menu>
    </Stack>
  );
}
