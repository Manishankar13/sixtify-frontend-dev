import { Breadcrumbs, SvgsHome } from "@repo/shared-components";
import { useRouter } from "next/navigation";

export const ShiftdayAllocationBreadcrumbs = () => {
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
          text: "Shift & Day Allocation",
        },
      ]}
    />
  );
};
