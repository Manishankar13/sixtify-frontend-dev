import { BottomDialog, Button } from "@repo/shared-components";
import { AttendancePenaltyRuleHistoryList } from "./AttendancePenaltyRuleHistoryList";

type AttendancePenaltyRuleHistoryDialogProps = {
  onClose: () => void;
  open: boolean;
  employeeId: string;
};

export const AttendancePenaltyRuleHistoryDialog = ({
  onClose,
  open,
  employeeId,
}: AttendancePenaltyRuleHistoryDialogProps) => {
  return (
    <BottomDialog
      open={open}
      onClose={onClose}
      title="Attendance Penalty Rule History"
      actions={
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
      }
    >
      <AttendancePenaltyRuleHistoryList employeeId={employeeId} />
    </BottomDialog>
  );
};
