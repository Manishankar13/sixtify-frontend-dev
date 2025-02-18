import { Button, Dialog } from "@repo/shared-components";
import { useRef } from "react";
import type { AttendanceDetails } from "../../../../../AttendanceSummary/hooks/type";
import {
  AddOvertimeRequestForm,
  type FormRef,
} from "../../Add/AddOvertimeRequestForm";
import { useGetOneOvertimeRequest } from "../../Add/hooks/useGetOneOvertimeRequest";

type ViewOvertimeRequestDialogProps = {
  open: boolean;
  onClose: () => void;
  attendanceDetails: AttendanceDetails;
  otRequestId: string;
  employeeId: string;
};

export const ViewOvertimeRequestDialog = ({
  open,
  onClose,
  attendanceDetails,
  otRequestId,
  employeeId,
}: ViewOvertimeRequestDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { data: overtimeRequest, isPending: isRequestOtRequestPending } =
    useGetOneOvertimeRequest({
      employeeId,
      otRequestId,
    });

  const defaultValues = {
    overtime_date: null,
    in_time_overtime: overtimeRequest?.in_time_overtime ?? null,
    out_time_overtime: overtimeRequest?.out_time_overtime ?? null,
    remark: overtimeRequest?.remark ?? null,
    shift_start: null,
    shift_end: null,
  };

  return (
    <Dialog
      maxWidth="md"
      onClose={onClose}
      open={open}
      title="View Overtime Request"
      actions={
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
      }
    >
      <AddOvertimeRequestForm
        ref={formRef}
        loading={isRequestOtRequestPending}
        defaultValues={defaultValues}
        overtimeDetails={overtimeRequest}
        attendanceDetails={attendanceDetails}
        isView
      />
    </Dialog>
  );
};
