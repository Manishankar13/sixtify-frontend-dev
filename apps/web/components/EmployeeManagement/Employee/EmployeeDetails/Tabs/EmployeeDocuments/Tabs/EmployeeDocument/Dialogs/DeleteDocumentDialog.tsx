import { DeleteDialog, toasts } from "@repo/shared-components";
import { useTranslation } from "react-i18next";
import type { DocumentOptionKey } from "../../../../../../AddEmployee/Document/Dialog/hooks/useDocumentOptions";
import { DocumentOptions } from "../../../../../../AddEmployee/Document/Dialog/hooks/useDocumentOptions";
import type { Document } from "../DocumentList/hooks/useGetDocuments";
import { onError } from "./../../../../../../../../../utils/errors";
import { useDeleteDocument } from "./hooks/useDeleteDocument";

type DeleteDocumentDialogProps = {
  open: boolean;
  employeeId: string;
  onClose: () => void;
  onDeleteSuccess: () => void;
  document: Document;
};

export const DeleteDocumentDialog = ({
  document,
  open,
  employeeId,
  onDeleteSuccess,
  onClose,
}: DeleteDocumentDialogProps) => {
  const { t } = useTranslation();

  const { mutate, isPending } = useDeleteDocument({
    employeeId,
    documentId: document.id,
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
      title={t("document.dialog.delete.message", {
        documentName:
          document.document_type &&
          DocumentOptions[document.document_type as DocumentOptionKey],
      })}
      open={open}
      isDeleteLoading={isPending}
      onDelete={() => mutate()}
      onClose={() => onClose()}
    />
  );
};
