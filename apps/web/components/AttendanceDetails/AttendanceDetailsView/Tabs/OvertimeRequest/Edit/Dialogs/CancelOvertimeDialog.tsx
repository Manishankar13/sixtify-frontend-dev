import { Stack } from "@mui/material";
import { Button, Dialog, toasts } from "@repo/shared-components";
import { isFunction } from "lodash";
import { useMemo, useRef } from "react";
import { onError } from "../../../../../../../utils/errors";
import type { AttendanceDetails } from "../../../../../AttendanceSummary/hooks/type";
import { useGetOneOvertimeRequest } from "../../Add/hooks/useGetOneOvertimeRequest";
import { useEditOvertimeRequest } from "../Hooks/useEditOvertimeRequest";
import {
  type FormRef,
  RequestOtForm,
  type RequestOtFormFieldValues,
} from "./RequestOtForm";

type CancelOvertimeDialogProps = {
  open: boolean;
  onClose: () => void;
  onCancelSuccess: () => void;
  otRequestId: string;
  attendanceDetails: AttendanceDetails;
};

export const CancelOvertimeDialog = ({
  open,
  onClose,
  onCancelSuccess,
  otRequestId,
  attendanceDetails,
}: CancelOvertimeDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { data: requestOtRequest, isPending: isRequestOtRequest } =
    useGetOneOvertimeRequest({
      employeeId: attendanceDetails.id,
      otRequestId,
    });

  const { mutate, isPending } = useEditOvertimeRequest({
    OTRequestId: otRequestId,
    employeeId: attendanceDetails.id,
    options: {
      onSuccess: (data) => {
        onClose();

        if (isFunction(onCancelSuccess)) {
          onCancelSuccess();
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

  const defaultValues = useMemo(() => {
    if (requestOtRequest) {
      const requestOtFormFieldValues: RequestOtFormFieldValues = {
        status: "cancelled",
        in_time_overtime: requestOtRequest.in_time_overtime ?? null,
        out_time_overtime: requestOtRequest.out_time_overtime ?? null,
        remark: null,
        shift_start: null,
        shift_end: null,
      };

      return requestOtFormFieldValues;
    }
  }, [requestOtRequest]);

  return (
    <Dialog
      maxWidth="md"
      onClose={onClose}
      open={open}
      title="Cancel Overtime Request"
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button onClick={onEditTCreateOTRequest} loading={isPending}>
            Confirm
          </Button>
        </Stack>
      }
    >
      <RequestOtForm
        loading={isRequestOtRequest}
        defaultValues={defaultValues}
        ref={formRef}
        overtimeDetails={requestOtRequest}
        attendanceDetails={attendanceDetails}
      />
    </Dialog>
  );
};
