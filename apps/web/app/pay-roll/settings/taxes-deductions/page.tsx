"use client"

import { Stack } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs } from "../../../../components/PayRoll/Settings/TaxesAndDeductions/Tabs/Tabs";
import { TaxesAndDeductionsBreadcrumb } from "../../../../components/PayRoll/Settings/TaxesAndDeductionsBreadcrumb";

export default function Page() {
    const searchParams = useSearchParams();

    const tab = searchParams.get("tab");

    const router = useRouter();

    if (!tab) {
        return router.replace("/pay-roll/settings/taxes-deductions?tab=income-tax-regime");
    }

    return (
        <Stack gap="10px">
            <TaxesAndDeductionsBreadcrumb />
            <Tabs />
        </Stack>
    )
}