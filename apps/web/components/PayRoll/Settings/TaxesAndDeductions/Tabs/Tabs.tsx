import { Box, Tabs as MuiTabs, useTheme } from "@mui/material";
import Tab from "@mui/material/Tab";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { type CategoryKeys, useTabsOptions } from "../hooks/useTabsOptions";
import IncomeTaxRegime from "./IncomeTaxRegime/IncomeTaxRegime";

export function Tabs() {
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab");

  const { categoryItems } = useTabsOptions();

  const theme = useTheme();

  const { lightBlue, butterflyBlue, iron } = theme.palette.app.color;

  const categoryRenderer: Record<CategoryKeys, ReactNode> = {
    "income-tax-regime": <IncomeTaxRegime />,
    "pt-group": <IncomeTaxRegime />,
    "investment-deduction": <IncomeTaxRegime />,
  };

  return (
    <>
      <MuiTabs
        value={tab}
        aria-label="secondary tabs example "
        sx={{
          borderRadius: "5px",
          bgcolor: lightBlue[50],
          border: `1px solid ${butterflyBlue[300]}`,
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
      <Box
        sx={{
          background: iron[600],
          border: `1px solid ${butterflyBlue[300]}`,
          borderRadius: "6px",
          height: "100%",
          width: "100%",
          gap: "10px",
        }}
      >
        {tab && categoryRenderer[tab as CategoryKeys]}
      </Box>
    </>
  );
}
