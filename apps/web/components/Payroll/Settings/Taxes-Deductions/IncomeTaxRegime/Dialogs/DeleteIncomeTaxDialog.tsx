import { useTranslation } from "react-i18next";
import { useDeleteIncomeTax } from "./hooks/useDeleteIncomeTax";
import { DeleteDialog, toasts } from "@repo/shared-components";
import { onError } from "../../../../../../utils/errors";
import { IncomeTax } from "../IncomeTaxList/hooks/useGetIncomeTax";

type DeletePenaltyRulesDialogProps = {
  open: boolean;
  onClose: () => void;
  onDeleteSuccess: () => void;
  IncomeTax: IncomeTax;
};

export const DeleteIncomeTaxDialog = ({
  IncomeTax,
  open,
  onDeleteSuccess,
  onClose,
}: DeletePenaltyRulesDialogProps) => {
  const { t } = useTranslation();

  const { mutate, isPending } = useDeleteIncomeTax({
    incomeTaxId: IncomeTax.id,
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
      title={t("incometax.dialog.delete.message", {
        incometax: IncomeTax.regime_type,
      })}
      open={open}
      isDeleteLoading={isPending}
      onDelete={() => mutate()}
      onClose={() => onClose()}
    />
  );
};
