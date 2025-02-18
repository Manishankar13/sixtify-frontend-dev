import { Stack } from "@mui/material";
import { Button, Dialog, toasts } from "@repo/shared-components";
import { useRef } from "react";
import { useDisabledButtonsCache } from "../../../../../../../../app/context/DisabledButtonsCacheContext/DisabledButtonsCacheContext";
import { onError } from "../../../../../../../../utils/errors";
import type { FormRef } from "./EducationForm";
import { EducationForm } from "./EducationForm";
import { useEditEducation } from "./hooks/useEditEducation";
import { useGetEducation } from "./hooks/useGetEducation";
import { submitButtonId } from "../../../../../../../../hooks/useEnableDisableSubmitButtonToggle";

type EditEducationDialogProps = {
  open: boolean;
  employeeId: string;
  onClose: () => void;
  onEdit: () => void;
  educationDetailId: string;
};
export const EditEducationDialog = ({
  educationDetailId,
  open,
  employeeId,
  onClose,
  onEdit,
}: EditEducationDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { isDisabled } = useDisabledButtonsCache(submitButtonId);

  const { data: latestCompanyData, isPending: isPendingLatestCompanyData } =
    useGetEducation({
      employeeId,
      educationDetailId,
    });

  const { mutate, isPending } = useEditEducation({
    educationDetailId,
    employeeId,
    options: {
      onSuccess: (data) => {
        onClose();
        onEdit();
        toasts.success({ title: data.message });
      },
      onError: (error) => onError(error, formRef.current?.setError),
    },
  });

  const onEditEducationDetails = () => {
    formRef.current?.submitForm((formValues) => {
      mutate(formValues);
    });
  };

  return (
    <Dialog
      maxWidth="md"
      onClose={onClose}
      open={open}
      title="Edit Education"
      actions={
        <Stack direction="row" gap="5px">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={onEditEducationDetails}
            loading={isPending}
            disabled={isDisabled()}
          >
            Edit
          </Button>
        </Stack>
      }
    >
      <EducationForm
        ref={formRef}
        defaultValues={latestCompanyData}
        loading={isPendingLatestCompanyData}
      />
    </Dialog>
  );
};
