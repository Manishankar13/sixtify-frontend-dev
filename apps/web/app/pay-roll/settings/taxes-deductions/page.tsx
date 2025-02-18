"use client";

import { Stack } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import IncomeTaxRegime from "../../../../components/Pay-roll/Settings/Taxes-deductions/Income-tax-regime/IncomeTaxRegime";
import type { CategoryKeys } from "../../../../components/Pay-roll/Settings/Taxes-deductions/Tabs/hooks/useTabItems";
import { Tabs } from "../../../../components/Pay-roll/Settings/Taxes-deductions/Tabs/Tabs";
import { TaxesAndDeductionsBreadcrumbs } from "../../../../components/Pay-roll/Settings/Taxes-deductions/TaxesAndDeductionsBreadcrumbs";

export default function Page() {
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab");

  const router = useRouter();

  if (!tab) {
    return router.replace(
      "/pay-roll/settings/taxes-deductions?tab=income-tax-regime"
    );
  }

  const categoryRenderer: Record<CategoryKeys, ReactNode> = {
    "income-tax-regime": <IncomeTaxRegime />,
    "pt-group": <IncomeTaxRegime />,
    "investment-deduction": <IncomeTaxRegime />,
  };

  return (
    <Stack gap="10px">
      <TaxesAndDeductionsBreadcrumbs />
      <Tabs />
      {tab && categoryRenderer[tab as CategoryKeys]}
    </Stack>
  );
}
