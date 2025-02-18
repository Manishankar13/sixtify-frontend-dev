import { Breadcrumbs, SvgsHome } from "@repo/shared-components";
import { useRouter } from "next/navigation";

export const LeaveTypeBreadcrumbs = () => {
  const router = useRouter();

  return (
    <Breadcrumbs
      items={[
        {
          icon: <SvgsHome />,
          onClick: () => router.push("/"),
        },
        {
          text: "Policy Configuration",
        },
        {
          text: "Leave",
        },
        {
          text: "Leave Type",
        },
      ]}
    />
  );
};
