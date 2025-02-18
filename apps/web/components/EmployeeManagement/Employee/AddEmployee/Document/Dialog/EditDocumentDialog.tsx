import { Stack } from "@mui/material";
import { Button, Dialog } from "@repo/shared-components";
import { useRef } from "react";
import type { DocumentFormFieldValues, FormRef } from "./DocumentForm";
import { DocumentForm } from "./DocumentForm";
import { useDocumentOptions } from "./hooks/useDocumentOptions";

type EditDocumentDialogProps = {
  open: boolean;
  document: DocumentFormFieldValues;
  onEdit: (formValues: Partial<DocumentFormFieldValues>) => void;
  onClose: () => void;
};

export const EditDocumentDialog = ({
  open,
  onEdit,
  document,
  onClose,
}: EditDocumentDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { documentTypeOptions } = useDocumentOptions();

  const onEditDocument = () => {
    formRef.current?.submitForm((formValues) => {
      onEdit(formValues);
    });
  };

  return (
    <Dialog
      maxWidth="sm"
      onClose={onClose}
      open={open}
      title="Edit Document"
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button onClick={onEditDocument}>Edit</Button>
        </Stack>
      }
    >
      <DocumentForm
        ref={formRef}
        defaultValues={document}
        documentTypeOptions={documentTypeOptions}
      />
    </Dialog>
  );
};
