import { Stack } from "@mui/material";
import { Button, Dialog, toasts } from "@repo/shared-components";
import { useRef } from "react";
import { useDisabledButtonsCache } from "../../../../../../../../app/context/DisabledButtonsCacheContext/DisabledButtonsCacheContext";
import { submitButtonId } from "../../../../../../../../hooks/useEnableDisableSubmitButtonToggle";
import { onError } from "../../../../../../../../utils/errors";
import type { BasicDetailsFormFieldValues, FormRef } from "./BasicDetailsForm";
import { BasicDetailsForm } from "./BasicDetailsForm";
import { useEditBasicDetails } from "./hooks/useEditBasicDetails";

type EditBasicDetailsDialogProps = {
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
  companyId: string;
  companyData?: BasicDetailsFormFieldValues;
};
export const EditBasicDetailsDialog = ({
  open,
  onClose,
  companyId,
  onEdit,
  companyData,
}: EditBasicDetailsDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { isDisabled } = useDisabledButtonsCache(submitButtonId);

  const { mutate, isPending } = useEditBasicDetails({
    companyId,
    options: {
      onSuccess: (data) => {
        onClose();
        onEdit();
        toasts.success({ title: data.message });
      },
      onError: (error) => onError(error, formRef.current?.setError),
    },
  });

  const onEditBasicDetails = () => {
    formRef.current?.submitForm((formValues) => {
      mutate(formValues);
    });
  };

  return (
    <Dialog
      maxWidth="xl"
      onClose={onClose}
      open={open}
      title="Edit Basic Details"
      actions={
        <Stack direction="row" gap="5px">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={onEditBasicDetails}
            loading={isPending}
            disabled={isDisabled()}
          >
            Edit
          </Button>
        </Stack>
      }
    >
      <BasicDetailsForm ref={formRef} defaultValues={companyData} />
    </Dialog>
  );
};
