import { Button, Dialog } from "@repo/shared-components";
import type { Grade } from "../GradeList/hooks/useGetGrades";
import { GradeForm } from "./GradeForm";
import { useGetGrade } from "./hooks/useGetGrade";

type ViewGradeDialogProps = {
  open: boolean;
  onClose: () => void;
  gradeId: Grade["id"];
};

export const ViewGradeDialog = ({
  gradeId,
  open,
  onClose,
}: ViewGradeDialogProps) => {
  const { data: grade, isPending: isPendingGradeData } = useGetGrade({
    gradeId,
  });

  return (
    <Dialog
      maxWidth="sm"
      onClose={onClose}
      open={open}
      title="View Grade"
      actions={
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
      }
    >
      <GradeForm defaultValues={grade} loading={isPendingGradeData} disabled />
    </Dialog>
  );
};
