import { Stack } from "@mui/material";
import { Button, Dialog, toasts } from "@repo/shared-components";
import { useRef } from "react";
import { useDisabledButtonsCache } from "../../../../../app/context/DisabledButtonsCacheContext/DisabledButtonsCacheContext";
import { submitButtonId } from "../../../../../hooks/useEnableDisableSubmitButtonToggle";
import { onError } from "../../../../../utils/errors";
import type { Bank } from "../BankList/hooks/useGetBanks";
import { BankForm, type FormRef } from "./BankForm";
import { useEditBank } from "./hooks/useAEditBank";
import { useGetBank } from "./hooks/useGetBank";

type EditBankDialogProps = {
  open: boolean;
  onClose: () => void;
  onEditSuccess: () => void;
  bankId: Bank["id"];
};

export const EditBankDialog = ({
  bankId,
  open,
  onClose,
  onEditSuccess,
}: EditBankDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { isDisabled } = useDisabledButtonsCache(submitButtonId);

  const { data: bank, isPending: isPendingBankData } = useGetBank({
    bankId,
  });

  const { mutate, isPending } = useEditBank({
    bankId,
    options: {
      onSuccess: (data) => {
        onClose();
        onEditSuccess();
        toasts.success({ title: data.message });
      },
      onError: (error) => onError(error, formRef.current?.setError),
    },
  });

  const onEditBank = () => {
    formRef.current?.submitForm((formValues) => {
      mutate(formValues);
    });
  };

  return (
    <Dialog
      maxWidth="sm"
      onClose={onClose}
      open={open}
      title="Edit Bank"
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={onEditBank}
            loading={isPending}
            disabled={isDisabled()}
          >
            Edit
          </Button>
        </Stack>
      }
    >
      <BankForm
        ref={formRef}
        defaultValues={bank}
        loading={isPendingBankData}
      />
    </Dialog>
  );
};
