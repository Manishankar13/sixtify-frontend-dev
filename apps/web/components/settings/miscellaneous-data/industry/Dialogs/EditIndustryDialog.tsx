import { Stack } from "@mui/material";
import { Button, Dialog, toasts } from "@repo/shared-components";
import { useRef } from "react";
import { useDisabledButtonsCache } from "../../../../../app/context/DisabledButtonsCacheContext/DisabledButtonsCacheContext";
import { submitButtonId } from "../../../../../hooks/useEnableDisableSubmitButtonToggle";
import { onError } from "../../../../../utils/errors";
import type { Industry } from "../IndustryList/hooks/useGetIndustries";
import { type FormRef, IndustryForm } from "./IndustryForm";
import { useEditIndustry } from "./hooks/useEditIndustry";
import { useGetIndustry } from "./hooks/useGetIndustry";

type EditIndustryDialogProps = {
  open: boolean;
  onClose: () => void;
  onEditSuccess: () => void;
  industryId: Industry["id"];
};

export const EditIndustryDialog = ({
  industryId,
  open,
  onEditSuccess,
  onClose,
}: EditIndustryDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { isDisabled } = useDisabledButtonsCache(submitButtonId);

  const { data: industry, isPending: isPendingLatestIndustryData } =
    useGetIndustry({
      industryId,
    });

  const { mutate, isPending } = useEditIndustry({
    industryId,
    options: {
      onSuccess: (data) => {
        onClose();
        onEditSuccess();
        toasts.success({ title: data.message });
      },
      onError: (error) => onError(error, formRef.current?.setError),
    },
  });

  const onEditIndustry = () => {
    formRef.current?.submitForm((formValues) => {
      mutate(formValues);
    });
  };

  return (
    <Dialog
      maxWidth="sm"
      onClose={onClose}
      open={open}
      title="Edit Industry"
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={onEditIndustry}
            loading={isPending}
            disabled={isDisabled()}
          >
            Edit
          </Button>
        </Stack>
      }
    >
      <IndustryForm
        ref={formRef}
        defaultValues={industry}
        loading={isPendingLatestIndustryData}
      />
    </Dialog>
  );
};
