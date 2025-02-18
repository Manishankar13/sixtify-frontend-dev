"use client";

import { Tabs as MuiTabs, useTheme } from "@mui/material";
import Tab from "@mui/material/Tab";
import { useSearchParams } from "next/navigation";
import { useTaxesDeductionsTabOption } from "./useTaxesDeductionsTabOption";

export function Tabs() {
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab");

  const { categoryItems } = useTaxesDeductionsTabOption();

  const theme = useTheme();

  const { lightBlue } = theme.palette.app.color;

  return (
    <MuiTabs
      value={tab}
      aria-label="secondary tabs example "
      sx={{
        bgcolor: lightBlue[50],
      }}
    >
      {categoryItems.map((item) => (
        <Tab
          key={item.value}
          value={item.value}
          label={item.title}
          onClick={item.onClick}
        />
      ))}
    </MuiTabs>
  );
}
