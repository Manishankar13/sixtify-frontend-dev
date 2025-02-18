import { Breadcrumbs, SvgsHome } from "@repo/shared-components";
import { useRouter } from "next/navigation";

export const EditOvertimeRulesBreadcrumbs = () => {
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
          text: "Overtime",
        },
        {
          text: "Overtime Rules",
          onClick: () =>
            router.push("/policy-configuration/overtime/overtime-rules"),
        },
        {
          text: "Edit Overtime Rules",
        },
      ]}
    />
  );
};
