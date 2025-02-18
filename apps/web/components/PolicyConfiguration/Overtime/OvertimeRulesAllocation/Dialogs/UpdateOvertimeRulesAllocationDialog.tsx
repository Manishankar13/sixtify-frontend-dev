import { Stack } from "@mui/material";
import { Button, dateFormats, Dialog, toasts } from "@repo/shared-components";
import { DateTime } from "luxon";
import { useRef } from "react";
import { useDisabledButtonsCache } from "../../../../../app/context/DisabledButtonsCacheContext/DisabledButtonsCacheContext";
import { submitButtonId } from "../../../../../hooks/useEnableDisableSubmitButtonToggle";
import { onError } from "../../../../../utils/errors";
import { useEditOvertimeRulesAllocation } from "./Hooks/useEditOvertimeRulesAllocation";
import {
  OvertimeRulesAllocationEditForm,
  type FormRef,
} from "./OvertimeRulesAllocationEditForm";

type UpdateOvertimeRulesAllocationDialogProps = {
  open: boolean;
  onClose: () => void;
  onEditSuccess: () => void;
  employeeIds: string[];
  companyId: string;
};
export const UpdateOvertimeRulesAllocationDialog = ({
  employeeIds,
  open,
  onClose,
  onEditSuccess,
  companyId,
}: UpdateOvertimeRulesAllocationDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { isDisabled } = useDisabledButtonsCache(submitButtonId);

  const { mutate, isPending } = useEditOvertimeRulesAllocation({
    employeeIds,
    options: {
      onSuccess: (data) => {
        onClose();
        onEditSuccess();
        toasts.success({ title: data.message });
      },
      onError: (error) => onError(error),
    },
  });

  const onEditOvertimeRulesAllocation = () => {
    formRef.current?.submitForm((formValues) => {
      const payload = {
        overtime_rule_id: formValues.overtime_rule_id,
        has_no_end_date: formValues.has_no_end_date,
        remark: formValues.remark,
        effective_from:
          formValues?.effective_from &&
          DateTime.fromISO(formValues.effective_from).toFormat(
            dateFormats.dateWithISO8601
          ),
        effective_to:
          formValues?.effective_to &&
          DateTime.fromISO(formValues.effective_to).toFormat(
            dateFormats.dateWithISO8601
          ),
        employee_ids: employeeIds,
      };

      mutate(payload);
    });
  };

  return (
    <Dialog
      maxWidth="sm"
      onClose={onClose}
      open={open}
      title="Edit Overtime Rules Allocation"
      actions={
        <Stack direction="row" gap="5px">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={onEditOvertimeRulesAllocation}
            loading={isPending}
            disabled={isDisabled()}
          >
            Edit
          </Button>
        </Stack>
      }
    >
      <OvertimeRulesAllocationEditForm
        ref={formRef}
        employeeIds={employeeIds}
        companyId={companyId}
      />
    </Dialog>
  );
};
