"use client";

import { Breadcrumbs, SvgsHome } from "@repo/shared-components";
import { useRouter } from "next/navigation";

export const BankShiftBreadcrumb = () => {
  const router = useRouter();

  return (
    <Breadcrumbs
      items={[
        {
          icon: <SvgsHome />,
          onClick: () => router.push("/"),
        },
        {
          text: "Employee Management",
        },
        {
          text: "Shifts",
        },
        {
          text: "Bank Shift",
        },
      ]}
    />
  );
};
