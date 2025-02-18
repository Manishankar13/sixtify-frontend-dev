import { Stack } from "@mui/material";
import { Button, Dialog, toasts } from "@repo/shared-components";
import { useRef } from "react";
import { useDisabledButtonsCache } from "../../../../../../../../app/context/DisabledButtonsCacheContext/DisabledButtonsCacheContext";
import { submitButtonId } from "../../../../../../../../hooks/useEnableDisableSubmitButtonToggle";
import { onError } from "../../../../../../../../utils/errors";
import type { FormRef } from "./InsuranceDetailForm";
import { InsuranceDetailForm } from "./InsuranceDetailForm";
import { useEditInsuranceDetail } from "./hooks/useEditInsuranceDetail";
import { useGetInsuranceDetail } from "./hooks/useGetInsuranceDetail";

type EditInsuranceDetailDialogProps = {
  open: boolean;
  employeeId: string;
  onClose: () => void;
  onEdit: () => void;
  insuranceDetailId: string;
};
export const EditInsuranceDetailDialog = ({
  insuranceDetailId,
  employeeId,
  open,
  onClose,
  onEdit,
}: EditInsuranceDetailDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { isDisabled } = useDisabledButtonsCache(submitButtonId);

  const { data: latestInsuranceData, isPending: isPendingInsuranceData } =
    useGetInsuranceDetail({
      employeeId,
      insuranceDetailId,
    });

  const { mutate, isPending } = useEditInsuranceDetail({
    insuranceDetailId,
    employeeId,
    options: {
      onSuccess: (data) => {
        onClose();
        onEdit();
        toasts.success({ title: data.message });
      },
      onError: (error) => onError(error, formRef.current?.setError),
    },
  });

  const onEditInsuranceDetail = () => {
    formRef.current?.submitForm((formValues) => {
      mutate(formValues);
    });
  };

  return (
    <Dialog
      maxWidth="md"
      onClose={onClose}
      open={open}
      title="Edit Insurance"
      actions={
        <Stack direction="row" gap="5px">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={onEditInsuranceDetail}
            loading={isPending}
            disabled={isDisabled()}
          >
            Edit
          </Button>
        </Stack>
      }
    >
      <InsuranceDetailForm
        ref={formRef}
        defaultValues={latestInsuranceData}
        loading={isPendingInsuranceData}
      />
    </Dialog>
  );
};
