"use client";

import { EditPenaltyRules } from "../../../../../components/PolicyConfiguration/Attendance/PenaltyRules/EditPenaltyRules/EditPenaltyRules";
import { useRouter } from "next/navigation";
import { Stack } from "@mui/material";
import { Breadcrumbs, Card, PadBox, SvgsHome } from "@repo/shared-components";

export type PageProps = Readonly<{
  params: {
    penaltyRulesId: string;
  };
}>;

export default function Page({ params }: PageProps) {
  const router = useRouter();

  const { penaltyRulesId } = params;

  return (
    <Stack gap="10px">
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
            text: "Attendance",
          },
          {
            text: "Penalty Rules",
            onClick: () =>
              router.push("/policy-configuration/attendance/penalty-rules"),
          },
          {
            text: "Edit Penalty Rules",
          },
        ]}
      />
      <Card heading="Penalty Rules">
        <PadBox padding={{ padding: "15px" }}>
          <EditPenaltyRules penaltyRulesId={penaltyRulesId} />
        </PadBox>
      </Card>
    </Stack>
  );
}
