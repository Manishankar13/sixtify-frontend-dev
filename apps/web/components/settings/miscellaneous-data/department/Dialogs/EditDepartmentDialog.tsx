import { Stack } from "@mui/material";
import { Button, Dialog, toasts } from "@repo/shared-components";
import { useRef } from "react";
import { useDisabledButtonsCache } from "../../../../../app/context/DisabledButtonsCacheContext/DisabledButtonsCacheContext";
import { submitButtonId } from "../../../../../hooks/useEnableDisableSubmitButtonToggle";
import { onError } from "../../../../../utils/errors";
import type { Department } from "../DepartmentList/hooks/useGetDepartments";
import { DepartmentForm, type FormRef } from "./DepartmentForm";
import { useEditDepartment } from "./hooks/useEditDepartment";
import { useGetDepartment } from "./hooks/useGetDepartment";

type EditDepartmentDialogProps = {
  open: boolean;
  onClose: () => void;
  onEditSuccess: () => void;
  departmentId: Department["id"];
};

export const EditDepartmentDialog = ({
  departmentId,
  open,
  onClose,
  onEditSuccess,
}: EditDepartmentDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { isDisabled } = useDisabledButtonsCache(submitButtonId);

  const {
    data: latestDepartmentData,
    isPending: isPendingLatestDepartmentData,
  } = useGetDepartment({
    departmentId,
  });

  const { mutate, isPending } = useEditDepartment({
    departmentId,
    options: {
      onSuccess: (data) => {
        onClose();
        onEditSuccess();
        toasts.success({ title: data.message });
      },
      onError: (error) => onError(error, formRef.current?.setError),
    },
  });

  const onEditDepartment = () => {
    formRef.current?.submitForm((formValues) => {
      mutate(formValues);
    });
  };

  return (
    <Dialog
      maxWidth="sm"
      onClose={onClose}
      open={open}
      title="Edit Department"
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={onEditDepartment}
            loading={isPending}
            disabled={isDisabled()}
          >
            Edit
          </Button>
        </Stack>
      }
    >
      <DepartmentForm
        ref={formRef}
        defaultValues={latestDepartmentData}
        loading={isPendingLatestDepartmentData}
      />
    </Dialog>
  );
};
