import { Breadcrumbs, SvgsHome } from "@repo/shared-components";
import { useRouter } from "next/navigation";

export const LeaveOverviewBreadCrumbs = () => {
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
        },
      ]}
    />
  );
};
