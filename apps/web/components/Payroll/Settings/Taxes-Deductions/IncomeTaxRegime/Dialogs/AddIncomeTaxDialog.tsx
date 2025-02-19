import { Stack } from "@mui/material";
import { Button, Dialog, toasts } from "@repo/shared-components";
import React, { useRef } from "react";
import { FormRef, IncomeTaxForm } from "./IncomeTaxForm";
import { useAddIncomeTaxDetails } from "./hooks/useAddIncomeTaxDetails";
import { onError } from "../../../../../../utils/errors";

type AddIncomeTaxDialogProps = {
  open: boolean;
  onClose: () => void;
  onAddSuccess: () => void;
};

export const AddIncomeTaxDialog = ({
  open,
  onClose,
  onAddSuccess,
}: AddIncomeTaxDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { mutate } = useAddIncomeTaxDetails({
    options: {
      onSuccess: (data) => {
        toasts.success({ title: data.message });
        onClose();
      },
      onError: (error) => onError(error, formRef.current?.setError),
    },
  });

  const handleSave = () => {
    formRef.current?.submitForm((formValues) => {
      mutate(formValues);
    });
  };

  return (
    <Dialog
      maxWidth="xl"
      onClose={onClose}
      open={open}
      title="Add Income Tax Regime"
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button onClick={handleSave}>Save</Button>
        </Stack>
      }
    >
      <IncomeTaxForm ref={formRef} />
    </Dialog>
  );
};
