import { Add } from "@mui/icons-material";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Button, PadBox } from "@repo/shared-components";
import { useRef } from "react";
import { useDialogActions } from "../../../../../hooks/useDialogActions";
import type { DialogRenderer } from "../../../../../types/dialogs";
import type { AttendanceDetails } from "../../../AttendanceSummary/hooks/type";
import { AddOvertimeRequestDialog } from "./Add/Dialog/AddOvertimeRequestDialog";
import { OvertimeRequestList } from "./OvertimeRequestList/OvertimeRequestList";
import { useGetMetaDataOvertime } from "./OvertimeRequestList/hooks/useGetMetaDataOvertime";

export type OvertimeRequestListRef = {
  refreshOvertimeRulesList: () => void;
};

type OvertimeRequestProps = {
  attendanceDetails: AttendanceDetails;
  employeeId: string;
  date: string;
};
export const OvertimeRequest = ({
  attendanceDetails,
  employeeId,
  date,
}: OvertimeRequestProps) => {
  const theme = useTheme();

  const { iron, butterflyBlue } = theme.palette.app.color;

  const overtimeRulesListRef = useRef<OvertimeRequestListRef>(null);

  const { openedDialog, onDialogClose, onDialogOpen } = useDialogActions();

  const { data: metaData } = useGetMetaDataOvertime({
    employeeId,
  });

  const dialogRenderer: DialogRenderer = {
    add: attendanceDetails && (
      <AddOvertimeRequestDialog
        open
        attendanceDetails={attendanceDetails}
        onAddSuccess={() => {
          overtimeRulesListRef.current?.refreshOvertimeRulesList();
        }}
        onClose={onDialogClose}
      />
    ),
  };

  return (
    <Box
      sx={{
        background: iron[600],
        border: `1px solid ${butterflyBlue[300]}`,
        borderRadius: "6px",
        height: "100%",
        width: "100%",
      }}
    >
      <PadBox padding={{ padding: "10px" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle1">Overtime Request</Typography>

          {metaData && metaData.is_overtime_request_enabled && (
            <Button
              startIcon={<Add />}
              variant="outlined"
              onClick={() => onDialogOpen("add")}
            >
              Add Overtime Request
            </Button>
          )}
        </Stack>
      </PadBox>

      <OvertimeRequestList
        employeeId={employeeId}
        ref={overtimeRulesListRef}
        attendanceDetails={attendanceDetails}
        date={date}
      />

      {openedDialog && dialogRenderer[openedDialog]}
    </Box>
  );
};
