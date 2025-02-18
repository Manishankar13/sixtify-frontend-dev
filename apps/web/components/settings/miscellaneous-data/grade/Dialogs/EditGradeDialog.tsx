import { Stack } from "@mui/material";
import { Button, Dialog, toasts } from "@repo/shared-components";
import { useRef } from "react";
import { useDisabledButtonsCache } from "../../../../../app/context/DisabledButtonsCacheContext/DisabledButtonsCacheContext";
import { submitButtonId } from "../../../../../hooks/useEnableDisableSubmitButtonToggle";
import { onError } from "../../../../../utils/errors";
import type { Grade } from "../GradeList/hooks/useGetGrades";
import { GradeForm, type FormRef } from "./GradeForm";
import { useEditGrade } from "./hooks/useEditGrade";
import { useGetGrade } from "./hooks/useGetGrade";

type EditGradeDialogProps = {
  open: boolean;
  onClose: () => void;
  onEditSuccess: () => void;
  gradeId: Grade["id"];
};

export const EditGradeDialog = ({
  gradeId,
  open,
  onEditSuccess,
  onClose,
}: EditGradeDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { isDisabled } = useDisabledButtonsCache(submitButtonId);

  const { data: grade, isPending: isPendingGradeData } = useGetGrade({
    gradeId,
  });

  const { mutate, isPending } = useEditGrade({
    gradeId,
    options: {
      onSuccess: (data) => {
        onClose();
        onEditSuccess();
        toasts.success({ title: data.message });
      },
      onError: (error) => onError(error, formRef.current?.setError),
    },
  });

  const onEditGrade = () => {
    formRef.current?.submitForm((formValues) => {
      mutate(formValues);
    });
  };

  return (
    <Dialog
      maxWidth="sm"
      onClose={onClose}
      open={open}
      title="Edit Grade"
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={onEditGrade}
            loading={isPending}
            disabled={isDisabled()}
          >
            Edit
          </Button>
        </Stack>
      }
    >
      <GradeForm
        ref={formRef}
        defaultValues={grade}
        loading={isPendingGradeData}
      />
    </Dialog>
  );
};
