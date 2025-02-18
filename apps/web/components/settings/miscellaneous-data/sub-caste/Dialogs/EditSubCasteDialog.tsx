import { Stack } from "@mui/material";
import { Button, Dialog, toasts } from "@repo/shared-components";
import { useRef } from "react";
import { useDisabledButtonsCache } from "../../../../../app/context/DisabledButtonsCacheContext/DisabledButtonsCacheContext";
import { onError } from "../../../../../utils/errors";
import type { SubCaste } from "../SubCasteList/hooks/useGetSubCastes";
import { useEditSubCaste } from "./hooks/useEditSubCaste";
import { useGetSubCaste } from "./hooks/useGetSubCaste";
import type { FormRef } from "./SubCasteForm";
import { SubCasteForm } from "./SubCasteForm";
import { submitButtonId } from "../../../../../hooks/useEnableDisableSubmitButtonToggle";

type EditSubCasteDialogProps = {
  open: boolean;
  onClose: () => void;
  onEditSuccess: () => void;
  subCasteId: SubCaste["id"];
};

export const EditSubCasteDialog = ({
  subCasteId,
  open,
  onClose,
  onEditSuccess,
}: EditSubCasteDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { isDisabled } = useDisabledButtonsCache(submitButtonId);

  const { data: latestSubCasteData, isPending: isPendingLatestSubCasteData } =
    useGetSubCaste({
      subCasteId,
    });

  const { mutate, isPending } = useEditSubCaste({
    subCasteId,
    options: {
      onSuccess: (data) => {
        onClose();
        onEditSuccess();
        toasts.success({ title: data.message });
      },
      onError: (error) => onError(error, formRef.current?.setError),
    },
  });

  const onEditSubCaste = () => {
    formRef.current?.submitForm((formValues) => {
      mutate(formValues);
    });
  };

  return (
    <Dialog
      maxWidth="sm"
      onClose={onClose}
      open={open}
      title="Edit Sub Caste"
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={onEditSubCaste}
            loading={isPending}
            disabled={isDisabled()}
          >
            Edit
          </Button>
        </Stack>
      }
    >
      <SubCasteForm
        ref={formRef}
        defaultValues={latestSubCasteData}
        loading={isPendingLatestSubCasteData}
      />
    </Dialog>
  );
};
