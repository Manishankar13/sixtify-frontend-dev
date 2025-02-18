import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { Button, Dialog, TextField, toasts } from "@repo/shared-components";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEnableDisableSubmitButtonToggle } from "../../../../../../../../hooks/useEnableDisableSubmitButtonToggle";
import { onError } from "../../../../../../../../utils/errors";
import {
  applyLeaveDefaultValues,
  ApplyLeaveFormSchema,
} from "../../../Dialogs/ApplyLeaveForm";
import { useEditLeaveRequest } from "../hooks/useEditLeaveRequest";
import { useGetLeaveRequest } from "../hooks/useGetPendingLeaveRequest";
import { LeaveDetailsSection } from "./LeaveDetailsSection";

type RejectLeaveRequestDialogProps = {
  leaveRequestId: string;
  employeeId: string;
  open: boolean;
  onClose: () => void;
  onEditSuccess: () => void;
};

export const RejectLeaveRequestDialog = ({
  leaveRequestId,
  employeeId,
  open,
  onClose,
  onEditSuccess,
}: RejectLeaveRequestDialogProps) => {
  const { t } = useTranslation();

  const methods = useForm({
    values: applyLeaveDefaultValues,
    resolver: zodResolver(ApplyLeaveFormSchema),
    mode: "all",
  });

  const {
    control,
    formState: { errors, dirtyFields },
  } = methods;

  const errorMessages = (messageKey?: string) => {
    return messageKey && t(messageKey);
  };

  useEnableDisableSubmitButtonToggle({
    errors,
    isFormChanged: !dirtyFields,
  });

  const { data: LeaveRequestDetails, isLoading: isLeaveRequestDetailsLoading } =
    useGetLeaveRequest({ leaveRequestId, employeeId });

  const { mutate, isPending } = useEditLeaveRequest({
    leaveRequestId,
    employeeId,
    status: "rejected",
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

    if (!formValues.reason) {
      methods.setError("reason", {
        type: "manual",
        message: "common.required",
      });

      return;
    }

    mutate({ reason: formValues.reason });
  };

  return (
    <Dialog
      maxWidth="sm"
      onClose={onClose}
      title="Reject Leave"
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
          label="Reject Remark"
          name="reason"
          control={control}
          loading={isLeaveRequestDetailsLoading}
          multiline
          required
          error={!!errors.reason}
          helperText={errorMessages(errors.reason?.message)}
        />
      </Stack>
    </Dialog>
  );
};
