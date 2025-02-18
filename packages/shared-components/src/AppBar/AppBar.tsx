"use client";

import { Toolbar } from "@mui/material";
import type { PropsWithChildren } from "react";
import { StyledAppBar } from "./AppBar.styled";

export type AppBarProps = {
  drawerOpen: boolean;
};

export const AppBar = ({
  drawerOpen,
  children,
}: PropsWithChildren<AppBarProps>) => {
  return (
    <StyledAppBar position="fixed" open={drawerOpen}>
      <Toolbar>{children}</Toolbar>
    </StyledAppBar>
  );
};
