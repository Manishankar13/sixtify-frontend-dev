import { DeleteDialog, toasts } from "@repo/shared-components";
import { useTranslation } from "react-i18next";
import { onError } from "../../../../../../utils/errors";
import type { IncomeTaxRegime } from "../IncomeTaxRegimeList/hooks/useGetIncomeTaxRegime";
import { useDeleteIncomeTaxRegime } from "./hooks/useDeleteIncomeTaxRegime";

type DeleteIncomeTaxRegimeDialogProps = {
  open: boolean;
  onClose: () => void;
  onDeleteSuccess: () => void;
  incomeTaxRegime: IncomeTaxRegime;
};

export const DeleteIncomeTaxRegimeDialog = ({
  incomeTaxRegime,
  open,
  onDeleteSuccess,
  onClose,
}: DeleteIncomeTaxRegimeDialogProps) => {
  const { t } = useTranslation();

  const { mutate, isPending } = useDeleteIncomeTaxRegime({
    incomeTaxRegimeId: incomeTaxRegime.id,
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
      title={t("company.dialog.delete.message", {
        companyName: "incomeTaxRegime.company_name",
      })}
      open={open}
      isDeleteLoading={isPending}
      onDelete={() => mutate()}
      onClose={() => onClose()}
    />
  );
};
