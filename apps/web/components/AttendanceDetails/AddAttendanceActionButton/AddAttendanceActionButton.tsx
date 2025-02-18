"use client";

import { Button } from "@repo/shared-components";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useDialogActions } from "../../../hooks/useDialogActions";
import type { DialogRenderer } from "../../../types/dialogs";
import { AddAttendanceDialog } from "../../Transactions/Attendance/AttendanceOverview/Dialogs/AddAttendanceDialog";
import { useQueryClient } from "@tanstack/react-query";
import { attendanceDetailsKey } from "../../../queryKeysFactories/attendanceView";

type AddAttendanceActionButtonProps = {
  employeeId: string;
  date: string;
};

export function AddAttendanceActionButton({
  employeeId,
  date,
}: Readonly<AddAttendanceActionButtonProps>) {
  const { openedDialog, onDialogClose, onDialogOpen } = useDialogActions();

  const queryClient = useQueryClient();

  const dialogRenderer: DialogRenderer = {
    add: (
      <AddAttendanceDialog
        onClose={onDialogClose}
        open
        onAddSuccess={() => {
          queryClient.invalidateQueries({
            queryKey: attendanceDetailsKey.get(employeeId, date),
          });
        }}
        employeeId={employeeId}
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
        Add Attendance Logs
      </Button>

      {openedDialog && dialogRenderer[openedDialog]}
    </>
  );
}
