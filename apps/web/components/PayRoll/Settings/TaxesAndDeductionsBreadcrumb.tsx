import { Breadcrumbs, SvgsHome } from "@repo/shared-components";
import { useRouter } from "next/navigation";

export const TaxesAndDeductionsBreadcrumb = () => {
    const router = useRouter();

    return (
        <Breadcrumbs
            items={[
                {
                    icon: <SvgsHome />,
                    onClick: () => router.push("/"),
                },
                {
                    text: "Pay Roll",
                },
                {
                    text: "Settings",
                },
                {
                    text: "Taxes & Deductions",
                },
            ]}
        />
    );
};
