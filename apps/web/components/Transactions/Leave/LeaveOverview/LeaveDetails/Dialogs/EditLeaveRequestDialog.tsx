import { Stack } from "@mui/material";
import { Button, Dialog, toasts } from "@repo/shared-components";
import { isEqual } from "lodash";
import { useMemo, useRef } from "react";
import { useDisabledButtonsCache } from "../../../../../../app/context/DisabledButtonsCacheContext/DisabledButtonsCacheContext";
import { submitButtonId } from "../../../../../../hooks/useEnableDisableSubmitButtonToggle";
import { onError } from "../../../../../../utils/errors";
import type { LeaveEmployeeDetails } from "../hooks/useGetLeaveEmployeeDetails";
import { useEditLeaveRequest } from "../PendingLeaveRequests/Dialogs/hooks/useEditLeaveRequest";
import { useGetLeaveRequest } from "../PendingLeaveRequests/Dialogs/hooks/useGetPendingLeaveRequest";
import { ApplyLeaveForm, type FormRef } from "./ApplyLeaveForm";

type EditLeaveRequestDialogProps = {
  open: boolean;
  onClose: () => void;
  onEditSuccess: () => void;
  employeeId: string;
  leaveRequestId: string;
  leaveDetailsData?: LeaveEmployeeDetails;
};
export const EditLeaveRequestDialog = ({
  open,
  onClose,
  onEditSuccess,
  employeeId,
  leaveRequestId,
  leaveDetailsData,
}: EditLeaveRequestDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { isDisabled } = useDisabledButtonsCache(submitButtonId);

  const { data: latestLeaveTypeData, isPending: isPendingLeaveTypeData } =
    useGetLeaveRequest({
      employeeId,
      leaveRequestId,
    });

  const defaultValues = useMemo(() => {
    const {
      from_date,
      to_date,
      from_half,
      to_half,
      leave_type_id,
      reason,
      attachments,
      ...rest
    } = latestLeaveTypeData || {};

    const updatedFromHalf =
      from_date &&
      to_date &&
      isEqual(from_date, to_date) &&
      to_half !== "first_half"
        ? "full_day"
        : from_half;

    return {
      ...rest,
      from_half: updatedFromHalf ?? null,
      from_date: from_date ?? null,
      to_date: to_date ?? null,
      to_half: to_half ?? null,
      leave_type_id: leave_type_id ?? null,
      reason: reason ?? null,
      attachments: attachments ?? [],
      notifies: latestLeaveTypeData?.notifies?.map(
        ({ employee_id }) => employee_id
      ),
    };
  }, [latestLeaveTypeData]);

  const { mutate, isPending } = useEditLeaveRequest({
    employeeId,
    leaveRequestId,
    options: {
      onSuccess: (data) => {
        onClose();
        onEditSuccess();
        toasts.success({ title: data.message });
      },
      onError: (error) => onError(error),
    },
  });

  const onEditLeaveType = () => {
    formRef.current?.submitForm((formValues) => {
      mutate(formValues);
    });
  };

  return (
    <Dialog
      maxWidth="lg"
      onClose={onClose}
      open={open}
      title="Edit Leave Request"
      actions={
        <Stack direction="row" gap="5px">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={onEditLeaveType}
            loading={isPending}
            disabled={isDisabled()}
          >
            Edit
          </Button>
        </Stack>
      }
    >
      <ApplyLeaveForm
        ref={formRef}
        defaultValues={defaultValues}
        leaveDetailsData={leaveDetailsData}
        loading={isPendingLeaveTypeData}
      />
    </Dialog>
  );
};
