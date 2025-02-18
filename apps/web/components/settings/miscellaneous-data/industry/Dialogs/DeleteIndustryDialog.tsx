import { DeleteDialog, toasts } from "@repo/shared-components";
import { useTranslation } from "react-i18next";
import type { Industry } from "../IndustryList/hooks/useGetIndustries";
import { useDeleteIndustry } from "./hooks/useDeleteIndustry";
import { onError } from "../../../../../utils/errors";

type DeleteIndustryDialogProps = {
  open: boolean;
  onClose: () => void;
  onDeleteSuccess: () => void;
  industry: Industry;
};

export const DeleteIndustryDialog = ({
  industry,
  open,
  onDeleteSuccess,
  onClose,
}: DeleteIndustryDialogProps) => {
  const { t } = useTranslation();

  const { mutate, isPending } = useDeleteIndustry({
    industryId: industry.id,
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
      title={t("industry.dialog.delete.message", {
        industryName: industry.industry_name,
      })}
      open={open}
      isDeleteLoading={isPending}
      onDelete={() => mutate()}
      onClose={() => onClose()}
    />
  );
};
