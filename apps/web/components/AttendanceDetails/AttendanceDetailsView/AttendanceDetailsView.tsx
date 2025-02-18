"use client";

import { Box, Tabs as MuiTabs, Stack, useTheme } from "@mui/material";
import Tab from "@mui/material/Tab";
import { SeverityIndicator } from "@repo/shared-components";
import { type WorkDayType } from "@repo/shared-components/src/utils/colorVariant";
import { DateTime } from "luxon";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import type { AttendanceDetails } from "../AttendanceSummary/hooks/type";
import { useGetSeverityIndicatorOptions } from "./hooks/useGetSeverityIndicatorOptions";
import type { OptionKey } from "./hooks/useTabOptions";
import { useTabOptions } from "./hooks/useTabOptions";
import { AttendanceListView } from "./Tabs/AttendanceListView/AttendanceListView";
import { CalendarView } from "./Tabs/CalendarView/CalendarView";
import { OvertimeRequest } from "./Tabs/OvertimeRequest/OvertimeRequest";

type AttendanceDetailsViewArgs = Readonly<{
  employeeId: string;
  attendanceDetails: AttendanceDetails;
  isLoading: boolean;
  date?: string;
}>;

export function AttendanceDetailsView({
  employeeId,
  attendanceDetails,
  isLoading,
  date = DateTime.now().toFormat("yyyy-MM"),
}: AttendanceDetailsViewArgs) {
  const theme = useTheme();

  const { lightBlue } = theme.palette.app.color;

  const { menuItems } = useTabOptions({ employeeId });

  const searchParams = useSearchParams();

  const dateTime = DateTime.fromFormat(date, "yyyy-MM");

  const year = dateTime.year;

  const month = dateTime.month;

  const categoryRenderer: Record<OptionKey, ReactNode> = {
    list_view: (
      <AttendanceListView
        attendanceRecords={attendanceDetails.attendance_records}
        isLoading={isLoading}
        employeeId={employeeId}
        date={date}
      />
    ),
    calendar_view: (
      <CalendarView
        attendanceRecords={attendanceDetails.attendance_records}
        year={year}
        month={month}
        isLoading={isLoading}
        employeeId={employeeId}
      />
    ),
    overtime_request: (
      <OvertimeRequest
        attendanceDetails={attendanceDetails}
        employeeId={employeeId}
        date={date}
      />
    ),
  };

  const tab = searchParams.get("view");

  const customWorkdayTypeValues: WorkDayType[] = [
    "present",
    "absent",
    "weekly_off",
    "holiday",
    "paid_leave",
    "unpaid_leave",
    "late_in_early_out",
  ];

  const { options } = useGetSeverityIndicatorOptions({
    customSeverityOptions: customWorkdayTypeValues,
  });

  return (
    <Stack gap="10px">
      <Stack
        flexDirection="row"
        bgcolor={lightBlue[50]}
        justifyContent="space-between"
        borderRadius="5px"
        alignItems="center"
      >
        <MuiTabs
          value={tab}
          aria-label="secondary tabs example "
          sx={{
            borderRadius: "5px",
          }}
        >
          {menuItems.map((item) => (
            <Tab
              key={item.value}
              value={item.value}
              label={item.title}
              onClick={item.onClick}
            />
          ))}
        </MuiTabs>

        <Stack flexDirection="row" gap="5px">
          {options.map((item) => (
            <SeverityIndicator
              key={uuidv4()}
              color={item.color}
              label={item.title}
              isBackground={false}
            />
          ))}
        </Stack>
      </Stack>

      <Box bgcolor={lightBlue[50]} sx={{ borderRadius: "5px" }}>
        {tab && categoryRenderer[tab as OptionKey]}
      </Box>
    </Stack>
  );
}
