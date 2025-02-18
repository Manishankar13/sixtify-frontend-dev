import { Stack } from "@mui/material";
import { Button, Dialog, toasts } from "@repo/shared-components";
import { isFunction } from "lodash";
import { useRef } from "react";
import { useDisabledButtonsCache } from "../../../../../app/context/DisabledButtonsCacheContext/DisabledButtonsCacheContext";
import { submitButtonId } from "../../../../../hooks/useEnableDisableSubmitButtonToggle";
import { onError } from "../../../../../utils/errors";
import type { AttendanceRecord } from "../../../../AttendanceDetails/AttendanceSummary/hooks/type";
import type { FormRef } from "./AttendanceForm";
import { AttendanceForm } from "./AttendanceForm";
import { useAddAttendance } from "./hooks/useAddAttendanceDetails";

type AddAttendanceDialogProps = {
  onClose: () => void;
  open: boolean;
  onAddSuccess: () => void;
  employeeId?: string;
  currentAttendance?: AttendanceRecord;
};

export const AddAttendanceDialog = ({
  open,
  onClose,
  onAddSuccess,
  employeeId,
  currentAttendance,
}: AddAttendanceDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { isDisabled } = useDisabledButtonsCache(submitButtonId);

  const { mutate, isPending } = useAddAttendance({
    options: {
      onSuccess: (data) => {
        onClose();

        if (isFunction(onAddSuccess)) {
          onAddSuccess();
        }

        toasts.success({ title: data.message });
      },
      onError: (error) => {
        onError(error);
      },
    },
  });

  const onCreateAttendance = () => {
    formRef.current?.submitForm((formValues) => {
      mutate(formValues);
    });
  };

  return (
    <Dialog
      maxWidth={employeeId ? "md" : "lg"}
      onClose={onClose}
      open={open}
      title="Add Attendance"
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={onCreateAttendance}
            loading={isPending}
            variant="contained"
            disabled={isDisabled()}
          >
            Save
          </Button>
        </Stack>
      }
    >
      <AttendanceForm
        ref={formRef}
        employeeId={employeeId}
        currentAttendance={currentAttendance}
      />
    </Dialog>
  );
};
