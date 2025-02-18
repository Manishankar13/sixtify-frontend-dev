import { Stack } from "@mui/material";
import { Button, Dialog, toasts } from "@repo/shared-components";
import { useRef } from "react";
import { useDisabledButtonsCache } from "../../../../../../../app/context/DisabledButtonsCacheContext/DisabledButtonsCacheContext";
import { submitButtonId } from "../../../../../../../hooks/useEnableDisableSubmitButtonToggle";
import { onError } from "../../../../../../../utils/errors";
import type { FormRef } from "./BankShiftForm";
import { BankShiftForm } from "./BankShiftForm";
import { useEditBankShift } from "./hooks/useEditBankShift";
import { useGetBankShift } from "./hooks/useGetBankShift";

type EditBankShiftDialogProps = {
  open: boolean;
  onClose: () => void;
  onEditSuccess: () => void;
  bankshiftId: string;
};
export const EditBankShiftDialog = ({
  bankshiftId,
  open,
  onClose,
  onEditSuccess,
}: EditBankShiftDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { isDisabled } = useDisabledButtonsCache(submitButtonId);

  const { data: latestBankShiftData, isPending: isPendingBankShiftData } =
    useGetBankShift({
      bankshiftId,
    });

  const { mutate, isPending } = useEditBankShift({
    bankshiftId,
    options: {
      onSuccess: (data) => {
        onClose();
        onEditSuccess();
        toasts.success({ title: data.message });
      },
      onError: (error) => onError(error),
    },
  });

  const onEditBankShift = () => {
    formRef.current?.submitForm((formValues) => {
      mutate(formValues);
    });
  };

  return (
    <Dialog
      maxWidth="lg"
      onClose={onClose}
      open={open}
      title="Edit Bank Shift"
      actions={
        <Stack direction="row" gap="5px">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={onEditBankShift}
            loading={isPending}
            disabled={isDisabled()}
          >
            Edit
          </Button>
        </Stack>
      }
    >
      <BankShiftForm
        ref={formRef}
        defaultValues={latestBankShiftData}
        loading={isPendingBankShiftData}
      />
    </Dialog>
  );
};
