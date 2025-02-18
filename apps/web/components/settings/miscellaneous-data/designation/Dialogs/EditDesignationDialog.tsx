import { Stack } from "@mui/material";
import { Button, Dialog, toasts } from "@repo/shared-components";
import { useRef } from "react";
import { useDisabledButtonsCache } from "../../../../../app/context/DisabledButtonsCacheContext/DisabledButtonsCacheContext";
import { onError } from "../../../../../utils/errors";
import type { Designation } from "../DesignationList/hooks/useDesignations";
import { DesignationForm, type FormRef } from "./DesignationForm";
import { useEditDesignation } from "./hooks/useEditDesignation";
import { useGetDesignation } from "./hooks/useGetDesignation";
import { submitButtonId } from "../../../../../hooks/useEnableDisableSubmitButtonToggle";

type EditDesignationDialogProps = {
  open: boolean;
  onClose: () => void;
  onEditSuccess: () => void;
  designationId: Designation["id"];
};

export const EditDesignationDialog = ({
  designationId,
  open,
  onClose,
  onEditSuccess,
}: EditDesignationDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { isDisabled } = useDisabledButtonsCache(submitButtonId);

  const { data: designation, isPending: isPendingLatestDesignationData } =
    useGetDesignation({
      designationId,
    });

  const { mutate, isPending } = useEditDesignation({
    designationId,
    options: {
      onSuccess: (data) => {
        onClose();
        onEditSuccess();
        toasts.success({ title: data.message });
      },
      onError: (error) => onError(error, formRef.current?.setError),
    },
  });

  const onEditDesignation = () => {
    formRef.current?.submitForm((formValues) => {
      mutate(formValues);
    });
  };

  return (
    <Dialog
      maxWidth="sm"
      onClose={onClose}
      open={open}
      title="Edit Designation"
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={onEditDesignation}
            loading={isPending}
            disabled={isDisabled()}
          >
            Edit
          </Button>
        </Stack>
      }
    >
      <DesignationForm
        ref={formRef}
        defaultValues={designation}
        loading={isPendingLatestDesignationData}
      />
    </Dialog>
  );
};
