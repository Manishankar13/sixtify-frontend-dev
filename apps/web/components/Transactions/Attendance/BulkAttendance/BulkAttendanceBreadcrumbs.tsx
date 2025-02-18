import { Breadcrumbs, SvgsHome } from "@repo/shared-components";
import { useRouter } from "next/navigation";
import React from "react";

const BulkAttendanceBreadcrumbs = () => {
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
          text: "Attendance",
        },
        {
          text: "Bulk Attendance",
        },
      ]}
    />
  );
};

export default BulkAttendanceBreadcrumbs;
