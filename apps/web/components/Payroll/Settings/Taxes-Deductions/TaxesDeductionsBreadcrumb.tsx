"use client";

import { Stack } from "@mui/material";
import { Breadcrumbs, SvgsHome } from "@repo/shared-components";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { CategoryKeys } from "./hooks/useTaxesDeductionsTabOption";
import { Tabs } from "./hooks/useTaxesDeductionsTabs";
import IncomeTaxRegime from "./IncomeTaxRegime/IncomeTaxList/IncomeTaxRegime";

export function TaxesDeductionsBreadcrumb() {
  const router = useRouter();
  const categoryRenderer: Record<CategoryKeys, ReactNode> = {
    "income-tax-regime": <IncomeTaxRegime />,
    "pt-group": <IncomeTaxRegime />,
    "investment-deduction": <IncomeTaxRegime />,
  };
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab");

  if (!tab) {
    router.replace("/payroll/settings/taxes-deductions?tab=income-tax-regime");
    return null;
  }

  return (
    <Stack gap="20px">
      <Breadcrumbs
        items={[
          {
            icon: <SvgsHome />,
            onClick: () => router.push("/"),
          },
          {
            text: "Payroll",
          },
          {
            text: "Settings",
          },
          {
            text: "Taxes & Deductions",
          },
        ]}
      />

      <Tabs />
      {tab && categoryRenderer[tab as CategoryKeys]}
    </Stack>
  );
}
