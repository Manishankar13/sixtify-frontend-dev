import { Breadcrumbs, SvgsHome } from "@repo/shared-components";
import { useRouter } from "next/navigation";

export const CompanyDetailsBreadcrumb = () => {
  const router = useRouter();

  return (
    <Breadcrumbs
      items={[
        {
          icon: <SvgsHome />,
          onClick: () => router.push("/"),
        },
        {
          text: "Organization",
        },
        {
          text: "Company",
          onClick: () => router.push("/organization/company"),
        },
        {
          text: "Company Details",
        },
      ]}
    />
  );
};
