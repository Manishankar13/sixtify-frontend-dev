import { Stack } from "@mui/material";
import { Button, Dialog, toasts } from "@repo/shared-components";
import { isFunction } from "lodash";
import { useRef } from "react";
import { useDisabledButtonsCache } from "../../../../../../../app/context/DisabledButtonsCacheContext/DisabledButtonsCacheContext";
import { submitButtonId } from "../../../../../../../hooks/useEnableDisableSubmitButtonToggle";
import { onError } from "../../../../../../../utils/errors";
import type { AttendanceDetails } from "../../../../../AttendanceSummary/hooks/type";
import {
  AddOvertimeRequestForm,
  type FormRef,
} from "../../Add/AddOvertimeRequestForm";
import { useGetOneOvertimeRequest } from "../../Add/hooks/useGetOneOvertimeRequest";
import { useEditOvertimeRequest } from "../Hooks/useEditOvertimeRequest";

type EditOvertimeRequestDialogProps = {
  open: boolean;
  onClose: () => void;
  onEditSuccess: () => void;
  attendanceDetails: AttendanceDetails;
  otRequestId: string;
  employeeId: string;
};

export const EditOvertimeRequestDialog = ({
  open,
  onClose,
  onEditSuccess,
  attendanceDetails,
  otRequestId,
  employeeId,
}: EditOvertimeRequestDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { isDisabled } = useDisabledButtonsCache(submitButtonId);

  const { data: overtimeRequest, isPending: isRequestOtRequestPending } =
    useGetOneOvertimeRequest({
      employeeId,
      otRequestId,
    });

  const { mutate, isPending } = useEditOvertimeRequest({
    OTRequestId: otRequestId,
    employeeId,
    options: {
      onSuccess: (data) => {
        onClose();

        if (isFunction(onEditSuccess)) {
          onEditSuccess();
        }

        toasts.success({ title: data.message });
      },
      onError: (error) => onError(error, formRef.current?.setError),
    },
  });

  const onEditTCreateOTRequest = () => {
    formRef.current?.submitForm((formValues) => {
      mutate(formValues);
    });
  };

  const defaultValues = {
    overtime_date: overtimeRequest?.overtime_date ?? null,
    in_time_overtime: overtimeRequest?.in_time_overtime ?? null,
    out_time_overtime: overtimeRequest?.out_time_overtime ?? null,
    remark: overtimeRequest?.remark ?? null,
    shift_start: overtimeRequest?.shift_start ?? null,
    shift_end: overtimeRequest?.shift_end ?? null,
  };

  return (
    <Dialog
      maxWidth="md"
      onClose={onClose}
      open={open}
      title="Edit Overtime Request"
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={onEditTCreateOTRequest}
            loading={isPending}
            disabled={isDisabled()}
          >
            Edit
          </Button>
        </Stack>
      }
    >
      <AddOvertimeRequestForm
        isEnabled={false}
        ref={formRef}
        loading={isRequestOtRequestPending}
        defaultValues={defaultValues}
        attendanceDetails={attendanceDetails}
        overtimeDetails={overtimeRequest}
      />
    </Dialog>
  );
};
