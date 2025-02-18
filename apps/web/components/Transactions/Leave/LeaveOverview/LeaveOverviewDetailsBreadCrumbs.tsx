import { Breadcrumbs, SvgsHome } from "@repo/shared-components";
import { useRouter } from "next/navigation";

export const LeaveDetailsBreadCrumbs = () => {
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
          text: "Leave",
        },
        {
          text: "Leave Overview",
          onClick: () => router.push("/transactions/leave/leave-overview"),
        },
        {
          text: "Leave Details",
        },
      ]}
    />
  );
};
