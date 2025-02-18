import { DeleteDialog, toasts } from "@repo/shared-components";
import { useTranslation } from "react-i18next";
import type { OvertimeRules } from "../OvertimeRulesList/hooks/useGetOvertimeRulesList";
import { onError } from "../../../../../utils/errors";
import { useDeleteOverTimeRules } from "./hooks/useDeleteOvertimesRules";

type DeleteOvertimeRulesDialogProps = {
  open: boolean;
  onClose: () => void;
  onDeleteSuccess: () => void;
  overTimeRules: OvertimeRules;
};

export const DeleteOvertimeRulesDialog = ({
  overTimeRules,
  open,
  onDeleteSuccess,
  onClose,
}: DeleteOvertimeRulesDialogProps) => {
  const { t } = useTranslation();

  const { mutate, isPending } = useDeleteOverTimeRules({
    overtimeRulesId: overTimeRules.id,
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
      title={t("overTimeRules.dialog.delete.message", {
        overtimeRulesName: overTimeRules.company_name,
      })}
      open={open}
      isDeleteLoading={isPending}
      onDelete={() => mutate()}
      onClose={() => onClose()}
    />
  );
};
