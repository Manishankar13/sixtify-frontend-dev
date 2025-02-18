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

type RejectOvertimeDialogProps = {
  open: boolean;
  onClose: () => void;
  onRejectSuccess: () => void;
  otRequestId: string;
  attendanceDetails: AttendanceDetails;
};

export const RejectOvertimeDialog = ({
  open,
  onClose,
  onRejectSuccess,
  otRequestId,
  attendanceDetails,
}: RejectOvertimeDialogProps) => {
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

        if (isFunction(onRejectSuccess)) {
          onRejectSuccess();
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
        in_time_overtime: requestOtRequest.in_time_overtime,
        out_time_overtime: requestOtRequest.out_time_overtime,
        status: "rejected",
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
      title="Reject Overtime Request"
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button onClick={onEditTCreateOTRequest} loading={isPending}>
            Reject
          </Button>
        </Stack>
      }
    >
      <RequestOtForm
        defaultValues={defaultValues}
        ref={formRef}
        overtimeDetails={requestOtRequest}
        loading={isRequestOtRequest}
        attendanceDetails={attendanceDetails}
      />
    </Dialog>
  );
};
