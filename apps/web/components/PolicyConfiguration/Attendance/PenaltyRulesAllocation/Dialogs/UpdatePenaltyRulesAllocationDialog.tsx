import { Stack } from "@mui/material";
import { Button, Dialog, toasts } from "@repo/shared-components";
import { useRef } from "react";
import { useDisabledButtonsCache } from "../../../../../app/context/DisabledButtonsCacheContext/DisabledButtonsCacheContext";
import { submitButtonId } from "../../../../../hooks/useEnableDisableSubmitButtonToggle";
import { onError } from "../../../../../utils/errors";
import { useEditPenaltyRulesAllocation } from "./hooks/useEditPenaltyRulesAllocation";
import {
  PenaltyRulesAllocationEditForm,
  type FormRef,
} from "./PenaltyRulesAllocationEditForm";

type UpdatePenaltyRulesAllocationDialogProps = {
  open: boolean;
  onClose: () => void;
  onEditSuccess: () => void;
  employeeIds: string[];
  companyId: string;
};
export const UpdatePenaltyRulesAllocationDialog = ({
  employeeIds,
  open,
  onClose,
  onEditSuccess,
  companyId,
}: UpdatePenaltyRulesAllocationDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { isDisabled } = useDisabledButtonsCache(submitButtonId);

  const { mutate, isPending } = useEditPenaltyRulesAllocation({
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

  const onEditPenaltyRulesAllocation = () => {
    formRef.current?.submitForm((formValues) => {
      mutate(formValues);
    });
  };

  return (
    <Dialog
      maxWidth="sm"
      onClose={onClose}
      open={open}
      title="Edit Attendance Penalty Rules Allocation"
      actions={
        <Stack direction="row" gap="5px">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={onEditPenaltyRulesAllocation}
            loading={isPending}
            disabled={isDisabled()}
          >
            Edit
          </Button>
        </Stack>
      }
    >
      <PenaltyRulesAllocationEditForm
        ref={formRef}
        employeeIds={employeeIds}
        companyId={companyId}
      />
    </Dialog>
  );
};
