import { Stack } from "@mui/material";
import { Button, Dialog, toasts } from "@repo/shared-components";
import { useRef } from "react";
import { useDisabledButtonsCache } from "../../../../../../app/context/DisabledButtonsCacheContext/DisabledButtonsCacheContext";
import { buttonIds } from "../../../../../../app/context/DisabledButtonsCacheContext/buttonIds";
import { onError } from "../../../../../../utils/errors";
import type { LeaveEmployeeDetails } from "../hooks/useGetLeaveEmployeeDetails";
import { ApplyLeaveForm, type FormRef } from "./ApplyLeaveForm";
import { useApplyLeave } from "./hooks/useApplyLeave";

type ApplyLeaveDialogProps = {
  employeeId: string;
  leaveDetailsData?: LeaveEmployeeDetails;
  open: boolean;
  onClose: () => void;
  onAddSuccess: () => void;
};

export const ApplyLeaveDialog = ({
  open,
  employeeId,
  onClose,
  onAddSuccess,
  leaveDetailsData,
}: ApplyLeaveDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { isDisabled } = useDisabledButtonsCache(buttonIds.onSubmit);

  const { mutate, isPending } = useApplyLeave({
    employeeId,
    options: {
      onSuccess: (data) => {
        onClose();
        onAddSuccess();
        toasts.success({ title: data.message });
      },
      onError: (error) => onError(error, formRef.current?.setError),
    },
  });

  const onApplyLeave = () => {
    formRef.current?.submitForm((formValues) => {
      mutate(formValues);
    });
  };

  return (
    <Dialog
      maxWidth="lg"
      onClose={onClose}
      title="Apply Leave"
      open={open}
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={onApplyLeave}
            loading={isPending}
            disabled={isDisabled()}
          >
            Apply
          </Button>
        </Stack>
      }
    >
      <ApplyLeaveForm ref={formRef} leaveDetailsData={leaveDetailsData} />
    </Dialog>
  );
};
