import { Breadcrumbs, SvgsHome } from "@repo/shared-components";
import { useRouter, useSearchParams } from "next/navigation";
import type { CategoryKeys } from "./Tabs/hooks/useTabItems";
import { categories } from "./Tabs/hooks/useTabItems";

export const TaxesAndDeductionsBreadcrumbs = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const tab = searchParams.get("tab");

  return (
    <Breadcrumbs
      items={[
        {
          icon: <SvgsHome />,
          onClick: () => router.push("/"),
        },
        {
          text: "Pay Roll",
        },
        {
          text: "Settings",
        },
        {
          text: "Taxes & Deductions",
        },
        {
          text: categories[tab as CategoryKeys],
        },
      ]}
    />
  );
};
