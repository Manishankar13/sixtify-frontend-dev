import { Stack } from "@mui/material";
import { Button, Dialog, toasts } from "@repo/shared-components";
import { isFunction } from "lodash";
import { useRef } from "react";
import { onError } from "../../../../../../../utils/errors";
import { type FormRef, IncomeTaxRegimeForm } from "./IncomeTaxRegimeForm";
import { useAddIncomeTaxRegime } from "./hooks/useAddIncomeTaxRegime";

type AddIncomeTaxRegimeDialogProps = {
  open: boolean;
  onClose: () => void;
  onAddSuccess: () => void;
};

export const AddIncomeTaxRegimeDialog = ({
  open,
  onClose,
  onAddSuccess,
}: AddIncomeTaxRegimeDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { mutate, isPending } = useAddIncomeTaxRegime({
    options: {
      onSuccess: (data) => {
        onClose();

        if (isFunction(onAddSuccess)) {
          onAddSuccess();
        }

        toasts.success({ title: data.message });
      },
      onError: (error) => onError(error, formRef.current?.setError),
    },
  });

  const onCreateIncomeTaxRegime = () => {
    formRef.current?.submitForm((payloadData) => {
      // console.log("payloadData-Dialog", payloadData)
      mutate(payloadData);
    });
  };

  return (
    <Dialog
      maxWidth="xl"
      onClose={onClose}
      open={open}
      title="Add Company"
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={onCreateIncomeTaxRegime}
            loading={isPending}
            // disabled={isDisabled()}
          >
            Save
          </Button>
        </Stack>
      }
    >
      <IncomeTaxRegimeForm ref={formRef} />
    </Dialog>
  );
};
