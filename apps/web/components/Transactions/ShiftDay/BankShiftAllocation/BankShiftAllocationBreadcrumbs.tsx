import { Breadcrumbs, SvgsHome } from "@repo/shared-components";
import { useRouter } from "next/navigation";
import React from "react";

const BankShiftAllocationBreadcrumbs = () => {
  const router = useRouter();

  return (
    <Breadcrumbs
      items={[
        {
          icon: <SvgsHome />,
          onClick: () => router.push("/"),
        },
        {
          text: "Transactions",
        },
        {
          text: "Shift & Day",
        },
        {
          text: "Bank Shift Allocation",
        },
      ]}
    />
  );
};

export default BankShiftAllocationBreadcrumbs;
