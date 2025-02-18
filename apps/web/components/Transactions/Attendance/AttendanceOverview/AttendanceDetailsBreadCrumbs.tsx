import { Breadcrumbs, SvgsHome } from "@repo/shared-components";
import { useRouter } from "next/navigation";

export const AttendanceDetailsBreadCrumbs = () => {
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
          text: "Attendance Overview",
          onClick: () =>
            router.push("/transactions/attendance/attendance-overview"),
        },
        {
          text: "Attendance Details",
        },
      ]}
    />
  );
};
