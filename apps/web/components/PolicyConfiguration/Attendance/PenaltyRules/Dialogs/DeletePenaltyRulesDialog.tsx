import { DeleteDialog, toasts } from "@repo/shared-components";
import { useTranslation } from "react-i18next";
import type { PenaltyRules } from "../PenaltyRulesList/hooks/useGetPenaltyRules";
import { useDeletePenaltyRules } from "./hooks/useDeletePenaltyRules";
import { onError } from "../../../../../utils/errors";

type DeletePenaltyRulesDialogProps = {
  open: boolean;
  onClose: () => void;
  onDeleteSuccess: () => void;
  penaltyRules: PenaltyRules;
};

export const DeletePenaltyRulesDialog = ({
  penaltyRules,
  open,
  onDeleteSuccess,
  onClose,
}: DeletePenaltyRulesDialogProps) => {
  const { t } = useTranslation();

  const { mutate, isPending } = useDeletePenaltyRules({
    penaltyRulesId: penaltyRules.id,
    options: {
      onSuccess: (data) => {
        onClose();
        onDeleteSuccess();
        toasts.success({ title: data.message });
      },
      onError: (error) => onError(error),
    },
  });

  return (
    <DeleteDialog
      title={t("attendancePenaltyRule.dialog.delete.message", {
        penaltyRuleName: penaltyRules.attendance_penalty_rule_name,
      })}
      open={open}
      isDeleteLoading={isPending}
      onDelete={() => mutate()}
      onClose={() => onClose()}
    />
  );
};
