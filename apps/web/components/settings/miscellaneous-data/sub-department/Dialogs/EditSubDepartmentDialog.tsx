import { Stack } from "@mui/material";
import { Button, Dialog, toasts } from "@repo/shared-components";
import { useRef } from "react";
import { useDisabledButtonsCache } from "../../../../../app/context/DisabledButtonsCacheContext/DisabledButtonsCacheContext";
import { submitButtonId } from "../../../../../hooks/useEnableDisableSubmitButtonToggle";
import { onError } from "../../../../../utils/errors";
import type { SubDepartment } from "../SubDepartmentList/hooks/useGetSubDepartments";
import { useEditSubDepartment } from "./hooks/useEditSubDepartment";
import { useGetSubDepartment } from "./hooks/useGetSubDepartment";
import { type FormRef, SubDepartmentForm } from "./SubDepartmentForm";

type EditSubDepartmentDialogProps = {
  open: boolean;
  onClose: () => void;
  onEditSuccess: () => void;
  subDepartmentId: SubDepartment["id"];
};

export const EditSubDepartmentDialog = ({
  subDepartmentId,
  open,
  onClose,
  onEditSuccess,
}: EditSubDepartmentDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { isDisabled } = useDisabledButtonsCache(submitButtonId);

  const { data: subDepartment, isPending: isPendingSubDepartmentData } =
    useGetSubDepartment({
      subDepartmentId,
    });

  const { mutate, isPending } = useEditSubDepartment({
    subDepartmentId,
    options: {
      onSuccess: (data) => {
        onClose();
        onEditSuccess();
        toasts.success({ title: data.message });
      },
      onError: (error) => onError(error, formRef.current?.setError),
    },
  });

  const onEditSubDepartment = () => {
    formRef.current?.submitForm((formValues) => {
      mutate(formValues);
    });
  };

  return (
    <Dialog
      maxWidth="sm"
      onClose={onClose}
      open={open}
      title="Edit Sub Department"
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={onEditSubDepartment}
            loading={isPending}
            disabled={isDisabled()}
          >
            Edit
          </Button>
        </Stack>
      }
    >
      <SubDepartmentForm
        ref={formRef}
        defaultValues={subDepartment}
        isLoading={isPendingSubDepartmentData}
      />
    </Dialog>
  );
};
