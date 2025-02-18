import { Stack } from "@mui/material";
import { Button, dateFormats, Dialog, toasts } from "@repo/shared-components";
import { DateTime } from "luxon";
import { useRef } from "react";
import { useDisabledButtonsCache } from "../../../../../app/context/DisabledButtonsCacheContext/DisabledButtonsCacheContext";
import { onError } from "../../../../../utils/errors";
import type { FormRef } from "./BankShiftAllocationForm";
import { BankShiftAllocationForm } from "./BankShiftAllocationForm";
import { useEditBankShiftAllocation } from "./Hooks/useEditBankShiftAllocation";
import { submitButtonId } from "../../../../../hooks/useEnableDisableSubmitButtonToggle";

type UpdateBankShiftAllocationDialogProps = {
  open: boolean;
  onClose: () => void;
  onEditSuccess: () => void;
  employeeIds: string[];
  companyId: string;
};

export const UpdateBankShiftAllocationDialog = ({
  employeeIds,
  open,
  onClose,
  onEditSuccess,
  companyId,
}: UpdateBankShiftAllocationDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { isDisabled } = useDisabledButtonsCache(submitButtonId);

  const { mutate, isPending } = useEditBankShiftAllocation({
    employeeIds,
    options: {
      onSuccess: (data) => {
        toasts.success({ title: data.message });
        onClose();
        onEditSuccess();
      },
      onError: (error) => onError(error, formRef.current?.setError),
    },
  });

  const handleSubmit = () => {
    formRef.current?.submitForm((formValues) => {
      const payload = {
        ...formValues,
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
        employee_id: employeeIds,
        current_date: DateTime.now().toISODate(),
      };

      mutate(payload);
    });
  };

  return (
    <Dialog
      maxWidth="sm"
      onClose={onClose}
      open={open}
      title="Edit Bank Shift"
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            loading={isPending}
            variant="contained"
            disabled={isDisabled()}
          >
            Edit
          </Button>
        </Stack>
      }
    >
      <BankShiftAllocationForm
        ref={formRef}
        employeeIds={employeeIds}
        companyId={companyId}
      />
    </Dialog>
  );
};
