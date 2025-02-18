"use client";

import {
  Avatar,
  Box,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { YearPeriodAutocomplete } from "../../../../../common/Autocomplete/YearPeriodAutocomplete";
import { AddLeaveRequestActionButton } from "../AddLeaveRequestActionButton/AddLeaveRequestActionButton";
import type { LeaveEmployeeDetails } from "../hooks/useGetLeaveEmployeeDetails";

type LeaveDetailsHeaderProps = {
  employeeId: string;
  leaveDetailsData?: LeaveEmployeeDetails;
  isPending: boolean;
  fromDate: string;
  toDate: string;
  onAddSuccess: () => void;
};

export function LeaveDetailsHeader({
  employeeId,
  fromDate,
  toDate,
  leaveDetailsData,
  isPending,
  onAddSuccess,
}: Readonly<LeaveDetailsHeaderProps>) {
  const { control } = useFormContext();

  const theme = useTheme();

  const { lightBlue, iron } = theme.palette.app.color;

  return (
    <Stack
      flexDirection="row"
      bgcolor={lightBlue[50]}
      padding="10px"
      borderRadius="5px"
      justifyContent="space-between"
    >
      <Stack flexDirection="row" gap="15px" alignItems="center">
        <Avatar
          sx={{ height: "50px", width: "50px" }}
          src={leaveDetailsData?.avatar ?? ""}
        />

        <Box>
          {isPending ? (
            <Skeleton height="30px" width="150px" />
          ) : (
            <Typography variant="subtitle1" fontWeight={500}>
              {leaveDetailsData?.employee_name}
            </Typography>
          )}

          {isPending ? (
            <Skeleton height="24px" width="100px" />
          ) : (
            <Typography variant="subtitle2" color={iron[500]}>
              {leaveDetailsData?.designation_name}
            </Typography>
          )}
        </Box>
      </Stack>

      <Stack flexDirection="row" gap="5px" alignItems="center">
        <YearPeriodAutocomplete
          name="yearPeriod"
          joiningDate={leaveDetailsData?.joining_date ?? ""}
          leavePlanStartMonth={
            leaveDetailsData?.leave_plan_year_start_month ?? 0
          }
          disableClearable
          control={control}
          sx={{ minWidth: "260px" }}
        />

        <AddLeaveRequestActionButton
          employeeId={employeeId}
          onAddSuccess={onAddSuccess}
          leaveDetailsData={leaveDetailsData}
          fromDate={fromDate}
          toDate={toDate}
        />
      </Stack>
    </Stack>
  );
}
