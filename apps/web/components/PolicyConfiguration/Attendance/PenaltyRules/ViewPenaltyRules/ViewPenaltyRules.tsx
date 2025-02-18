import { Stack } from "@mui/material";
import { Button } from "@repo/shared-components";
import { useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { FormRef } from "../AddPenaltyRules/PenaltyRulesForm";
import { PenaltyRulesForm } from "../AddPenaltyRules/PenaltyRulesForm";
import { useGetPenaltyRule } from "../EditPenaltyRules/hooks/useGetPenaltyRules";

export const ViewPenaltyRules = () => {
  const formRef = useRef<FormRef>(null);

  const router = useRouter();

  const searchParams = useSearchParams();

  const penaltyRulesId = searchParams.get("id") ?? "";

  const { data: penaltyRuleDetails, isLoading: isPenaltyRuleLoading } =
    useGetPenaltyRule({ penaltyRulesId });

  const defaultValues = useMemo(() => {
    if (penaltyRuleDetails) {
      const penaltyRulesValues = penaltyRuleDetails;

      return penaltyRulesValues;
    }
  }, [penaltyRuleDetails]);

  return (
    <Stack spacing={2}>
      <PenaltyRulesForm
        ref={formRef}
        defaultValues={defaultValues}
        loading={isPenaltyRuleLoading}
      />
      <Stack alignItems="flex-end">
        <Button
          variant="outlined"
          onClick={() => {
            router.push("/policy-configuration/attendance/penalty-rules");
          }}
        >
          Cancel
        </Button>
      </Stack>
    </Stack>
  );
};
