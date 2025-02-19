import { Stack } from "@mui/material";
import { Button, Dialog } from "@repo/shared-components";
import { useRef } from "react";
import type { DialogTypes } from "../../../../../../types/dialogs";
import type { FormRef } from "./IncomeTaxRegimeForm";
import { IncomeTaxRegimeForm } from "./IncomeTaxRegimeForm";
import { useGetIncomeTaxRegimeById } from "./hooks/useGetIncomeTaxRegimeById";

type EditAndViewIncomeTaxRegimeDialogProps = {
  open: boolean;
  onClose: () => void;
  incomeTaxRegimeId: string;
  onAddSuccess: () => void;
  openedDialog: DialogTypes;
};

export const EditAndViewIncomeTaxRegimeDialog = ({
  open,
  onClose,
  incomeTaxRegimeId,
  openedDialog,
}: EditAndViewIncomeTaxRegimeDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const {
    data: incomeTaxRegimeDetail,
    isLoading: isIncomeTaxRegimeDetailLoading,
  } = useGetIncomeTaxRegimeById({ id: incomeTaxRegimeId ?? "" });

  const onEditIncomeTaxRegime = () => {
    formRef.current?.submitForm((formValues) => {
      alert(JSON.stringify(formValues));
    });
  };

  return (
    <Dialog
      maxWidth="lg"
      onClose={onClose}
      open={open}
      title="Add Income Tax Regime"
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          {openedDialog === "edit" && (
            <Button
              onClick={onEditIncomeTaxRegime}
              disabled={isIncomeTaxRegimeDetailLoading}
            >
              Save
            </Button>
          )}
        </Stack>
      }
    >
      <IncomeTaxRegimeForm
        ref={formRef}
        isIncomeTaxRegimeDetailLoading={isIncomeTaxRegimeDetailLoading}
        isEdit={openedDialog === "edit"}
        isView={openedDialog === "view"}
        defaultValues={incomeTaxRegimeDetail}
      />
    </Dialog>
  );
};
