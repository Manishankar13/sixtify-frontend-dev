import { Breadcrumbs, SvgsHome } from "@repo/shared-components";
import { useRouter } from "next/navigation";

export const ShiftDetailBreadcrumb = () => {
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
          text: "Shift",
        },
      ]}
    />
  );
};
