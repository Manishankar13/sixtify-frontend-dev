import { Stack } from "@mui/material";
import { Button, Dialog, toasts } from "@repo/shared-components";
import { useRef } from "react";
import { useDisabledButtonsCache } from "../../../../../../app/context/DisabledButtonsCacheContext/DisabledButtonsCacheContext";
import { submitButtonId } from "../../../../../../hooks/useEnableDisableSubmitButtonToggle";
import { onError } from "../../../../../../utils/errors";
import { BulkAttendanceForm, type FormRef } from "../BulkAttendanceForm";
import { useEditBulkAttendance } from "./useEditBulkAttendance";

type UpdateBulkAttendanceDialogProps = {
  open: boolean;
  onClose: () => void;
  onEditSuccess: () => void;
  employeeIds: string[];
};

export const UpdateBulkAttendanceDialog = ({
  employeeIds,
  open,
  onClose,
  onEditSuccess,
}: UpdateBulkAttendanceDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { isDisabled } = useDisabledButtonsCache(submitButtonId);

  const { mutate, isPending } = useEditBulkAttendance({
    employeeIds,
    options: {
      onSuccess: (data) => {
        toasts.success({ title: data.message });
        onClose();
        onEditSuccess();
      },
      onError: (error) => onError(error, formRef.current?.setError),
    },
  });

  const handleSubmit = () => {
    formRef.current?.submitForm((formValues) => {
      mutate(formValues);
    });
  };

  return (
    <Dialog
      maxWidth="md"
      onClose={onClose}
      open={open}
      title="Edit Bulk Attendance"
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button
            disabled={isDisabled()}
            onClick={handleSubmit}
            loading={isPending}
            variant="contained"
          >
            Edit
          </Button>
        </Stack>
      }
    >
      <BulkAttendanceForm ref={formRef} employeeIds={employeeIds} />
    </Dialog>
  );
};
