"use client";

import { Avatar, Box, Stack, Typography, useTheme } from "@mui/material";
import { DatePicker, PadBox } from "@repo/shared-components";
import { DateTime } from "luxon";
import type { Control } from "react-hook-form";
import { AddAttendanceActionButton } from "../AddAttendanceActionButton/AddAttendanceActionButton";
import type { AttendanceDetails } from "../AttendanceSummary/hooks/type";

type AttendanceDetailsHeaderArgs = {
  employeeData: AttendanceDetails;
  control: Control<{ datePeriod: string }>;
  employeeId: string;
  date: string;
};

export function AttendanceDetailsHeader({
  employeeData,
  control,
  employeeId,
  date,
}: Readonly<AttendanceDetailsHeaderArgs>) {
  const theme = useTheme();

  const { iron, lightBlue } = theme.palette.app.color;

  return (
    <Box bgcolor={lightBlue[50]} sx={{ borderRadius: "5px" }}>
      <PadBox padding={{ padding: 1 }}>
        <Stack flexDirection="row" justifyContent="space-between">
          <Stack flexDirection="row" gap="15px" alignItems="center">
            <Avatar
              sx={{ height: "50px", width: "50px" }}
              src={employeeData.avatar ?? ""}
            />

            <Box>
              <Typography variant="subtitle1" fontWeight={500}>
                {employeeData.employee_name}
              </Typography>

              <Typography variant="subtitle2" color={iron[500]}>
                {employeeData.designation_name}
              </Typography>
            </Box>
          </Stack>

          <Stack flexDirection="row" gap="15px" alignItems="center">
            <DatePicker
              clearable={false}
              format="MMM yyyy"
              views={["year", "month"]}
              name="datePeriod"
              maxDate={DateTime.now()}
              minDate={DateTime.fromISO(employeeData.joining_date)}
              control={control}
              sx={{ height: 50, maxWidth: "200px" }}
            />

            <AddAttendanceActionButton employeeId={employeeId} date={date} />
          </Stack>
        </Stack>
      </PadBox>
    </Box>
  );
}
