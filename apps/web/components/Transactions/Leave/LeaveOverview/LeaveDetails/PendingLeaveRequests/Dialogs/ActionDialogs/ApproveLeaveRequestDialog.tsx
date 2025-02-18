import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { Button, Dialog, TextField, toasts } from "@repo/shared-components";
import { t } from "i18next";
import { useForm } from "react-hook-form";
import { onError } from "../../../../../../../../utils/errors";
import {
  applyLeaveDefaultValues,
  ApplyLeaveFormSchema,
} from "../../../Dialogs/ApplyLeaveForm";
import { useEditLeaveRequest } from "../hooks/useEditLeaveRequest";
import { useGetLeaveRequest } from "../hooks/useGetPendingLeaveRequest";
import { LeaveDetailsSection } from "./LeaveDetailsSection";

type ApproveLeaveRequestDialogProps = {
  leaveRequestId: string;
  employeeId: string;
  open: boolean;
  onClose: () => void;
  onEditSuccess: () => void;
};

export const ApproveLeaveRequestDialog = ({
  leaveRequestId,
  employeeId,
  open,
  onClose,
  onEditSuccess,
}: ApproveLeaveRequestDialogProps) => {
  const methods = useForm({
    values: applyLeaveDefaultValues,
    resolver: zodResolver(ApplyLeaveFormSchema),
    mode: "all",
  });

  const {
    control,
    formState: { errors },
  } = methods;

  const errorMessages = (messageKey?: string) => {
    return messageKey && t(messageKey);
  };

  const { data: LeaveRequestDetails, isLoading: isLeaveRequestDetailsLoading } =
    useGetLeaveRequest({ leaveRequestId, employeeId });

  const { mutate, isPending } = useEditLeaveRequest({
    leaveRequestId,
    employeeId,
    status: "approved",
    options: {
      onSuccess: (data) => {
        onClose();
        onEditSuccess();
        toasts.success({ title: data.message });
      },
      onError: (error) => onError(error),
    },
  });

  const onEditLeaveRequest = () => {
    const formValues = methods.getValues();

    const payload = {
      ...(formValues.reason ? { reason: formValues.reason } : {}),
    };

    mutate(payload);
  };

  return (
    <Dialog
      maxWidth="sm"
      onClose={onClose}
      title="Approve Leave"
      open={open}
      isHideDividers
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button onClick={onEditLeaveRequest} loading={isPending}>
            Confirm
          </Button>
        </Stack>
      }
    >
      <Stack gap="30px">
        <LeaveDetailsSection
          LeaveRequestDetails={LeaveRequestDetails}
          isLeaveRequestDetailsLoading={isLeaveRequestDetailsLoading}
        />

        <TextField
          label="Approve Remark"
          name="reason"
          control={control}
          loading={isLeaveRequestDetailsLoading}
          multiline
          error={!!errors.reason}
          helperText={errorMessages(errors.reason?.message)}
        />
      </Stack>
    </Dialog>
  );
};
