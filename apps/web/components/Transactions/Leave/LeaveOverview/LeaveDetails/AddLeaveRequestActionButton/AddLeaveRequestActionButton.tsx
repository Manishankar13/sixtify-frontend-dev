"use client";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Button } from "@repo/shared-components";
import { useDialogActions } from "../../../../../../hooks/useDialogActions";
import type { DialogRenderer } from "../../../../../../types/dialogs";
import { ApplyLeaveDialog } from "../Dialogs/ApplyLeaveDialog";
import type { LeaveEmployeeDetails } from "../hooks/useGetLeaveEmployeeDetails";

type AddLeaveRequestActionButtonProps = {
  employeeId: string;
  fromDate: string;
  toDate: string;
  leaveDetailsData?: LeaveEmployeeDetails;
  onAddSuccess: () => void;
};

export function AddLeaveRequestActionButton({
  employeeId,
  leaveDetailsData,
  onAddSuccess,
}: Readonly<AddLeaveRequestActionButtonProps>) {
  const { openedDialog, onDialogClose, onDialogOpen } = useDialogActions();

  const dialogRenderer: DialogRenderer = {
    add: (
      <ApplyLeaveDialog
        open
        onClose={onDialogClose}
        employeeId={employeeId}
        leaveDetailsData={leaveDetailsData}
        onAddSuccess={onAddSuccess}
      />
    ),
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => onDialogOpen("add")}
        startIcon={<AddRoundedIcon />}
      >
        Apply Leave
      </Button>

      {openedDialog && dialogRenderer[openedDialog]}
    </>
  );
}
