"use client";

import { Box, Stack, useTheme } from "@mui/material";
import { PadBox } from "@repo/shared-components";
import { useState, type PropsWithChildren } from "react";
import { Drawer } from "../Drawer/Drawer";
import { Header } from "../Header/Header";

export function PrivatePageLayout({ children }: Readonly<PropsWithChildren>) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const theme = useTheme();

  const { slate } = theme.palette.app.color;

  return (
    <Stack direction="row" sx={{ height: "100vh" }}>
      <Drawer open={isDrawerOpen} />

      <Stack spacing="64px" flexGrow={1} sx={{ overflowX: "hidden" }}>
        <Header isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            background: slate[800],
          }}
        >
          <PadBox padding={{ padding: "15px 30px" }}>{children}</PadBox>
        </Box>
      </Stack>
    </Stack>
  );
}
