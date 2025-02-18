import { Stack } from "@mui/material";
import { Button, Dialog, toasts } from "@repo/shared-components";
import { useRef } from "react";
import { useDisabledButtonsCache } from "../../../../../../../app/context/DisabledButtonsCacheContext/DisabledButtonsCacheContext";
import { submitButtonId } from "../../../../../../../hooks/useEnableDisableSubmitButtonToggle";
import { onError } from "../../../../../../../utils/errors";
import type { FormRef } from "./AuthorisedPersonForm";
import { AuthorisedPersonForm } from "./AuthorisedPersonForm";
import { useEditAuthorisedPerson } from "./hooks/useEditAuthorisedPerson";
import { useGetAuthorisedPerson } from "./hooks/useGetAuthorisedPerson";

type EditAuthorisedPersonDialogProps = {
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
  personId: string;
  companyId: string;
};
export const EditAuthorisedPersonDialog = ({
  personId,
  open,
  onClose,
  companyId,
  onEdit,
}: EditAuthorisedPersonDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { isDisabled } = useDisabledButtonsCache(submitButtonId);

  const { data: latestPersonData, isPending: isPendingLatestPersonData } =
    useGetAuthorisedPerson({
      personId,
      companyId,
    });

  const { mutate, isPending } = useEditAuthorisedPerson({
    companyId,
    personId,
    options: {
      onSuccess: (data) => {
        onClose();
        onEdit();
        toasts.success({ title: data.message });
      },
      onError: (error) => onError(error, formRef.current?.setError),
    },
  });

  const onEditAuthorisedPersonDetails = () => {
    formRef.current?.submitForm((formValues) => {
      mutate(formValues);
    });
  };

  return (
    <Dialog
      maxWidth="md"
      onClose={onClose}
      open={open}
      title="Edit Authorised Person"
      actions={
        <Stack direction="row" gap="5px">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={onEditAuthorisedPersonDetails}
            loading={isPending}
            disabled={isDisabled()}
          >
            Edit
          </Button>
        </Stack>
      }
    >
      <AuthorisedPersonForm
        ref={formRef}
        defaultValues={latestPersonData}
        loading={isPendingLatestPersonData}
      />
    </Dialog>
  );
};
