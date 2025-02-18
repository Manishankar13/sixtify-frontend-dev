import { Stack } from "@mui/material";
import { Button, Dialog, toasts } from "@repo/shared-components";
import { isFunction } from "lodash";
import { useRef } from "react";
import { useDisabledButtonsCache } from "../../../../../app/context/DisabledButtonsCacheContext/DisabledButtonsCacheContext";
import { submitButtonId } from "../../../../../hooks/useEnableDisableSubmitButtonToggle";
import { onError } from "../../../../../utils/errors";
import { useAddOvertimeRateType } from "./hooks/useAddOvertimeRateType";
import { OvertimeRateTypeForm, type FormRef } from "./OvertimeRateTypeForm";

type AddOvertimeRateTypeDialogProps = {
  open: boolean;
  onClose: () => void;
  onAddSuccess: () => void;
};

export const AddOvertimeRateTypeDialog = ({
  open,
  onClose,
  onAddSuccess,
}: AddOvertimeRateTypeDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { isDisabled } = useDisabledButtonsCache(submitButtonId);

  const { mutate, isPending } = useAddOvertimeRateType({
    options: {
      onSuccess: (data) => {
        onClose();

        if (isFunction(onAddSuccess)) {
          onAddSuccess();
        }

        toasts.success({ title: data.message });
      },
      onError: (error) => onError(error, formRef.current?.setError),
    },
  });

  const onCreateOvertimeRateType = () => {
    formRef.current?.submitForm((formValues) => {
      mutate(formValues);
    });
  };

  return (
    <Dialog
      maxWidth="lg"
      onClose={onClose}
      open={open}
      title="Add OT Rate Type"
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={onCreateOvertimeRateType}
            loading={isPending}
            disabled={isDisabled()}
          >
            Save
          </Button>
        </Stack>
      }
    >
      <OvertimeRateTypeForm ref={formRef} />
    </Dialog>
  );
};
