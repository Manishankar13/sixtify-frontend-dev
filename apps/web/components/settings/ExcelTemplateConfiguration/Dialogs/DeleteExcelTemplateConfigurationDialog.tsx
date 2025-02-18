import { DeleteDialog, toasts } from "@repo/shared-components";
import { useTranslation } from "react-i18next";
import { useDeleteExcelTemplateConfiguration } from "./hooks/useDeleteExcelTemplateConfiguration";
import { onError } from "../../../../utils/errors";
import type { ExcelTemplate } from "../ExcelTemplateConfigurationList/hooks/useGetExcelTemplates";

type DeleteExcelTemplateConfigurationDialogProps = {
  open: boolean;
  onClose: () => void;
  onDeleteSuccess: () => void;
  excelTemplate: ExcelTemplate;
};

export const DeleteExcelTemplateConfigurationDialog = ({
  excelTemplate,
  open,
  onDeleteSuccess,
  onClose,
}: DeleteExcelTemplateConfigurationDialogProps) => {
  const { t } = useTranslation();

  const { mutate, isPending } = useDeleteExcelTemplateConfiguration({
    excelTemplateId: excelTemplate.id,
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
      title={t("excelTemplateConfiguration.dialog.delete.message", {
        excelTemplateName: excelTemplate.template_name,
      })}
      open={open}
      isDeleteLoading={isPending}
      onDelete={() => mutate()}
      onClose={() => onClose()}
    />
  );
};
