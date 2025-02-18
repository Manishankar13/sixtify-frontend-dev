import { Box, Stack } from "@mui/material";
import { AttendancePenaltyRuleCard } from "./AttendancePenaltyRule/AttendancePenaltyRuleCard";
import { BankShiftCard } from "./BankShift/BankShiftCard";
import { HolidayCard } from "./Holiday/HolidayCard";
import { useGetEmployeeSchemaDetails } from "./hooks/useGetSchemaDetails";
import { LeavePlanCard } from "./LeavePlan/LeavePlanCard";
import { OvertimeRuleCard } from "./OvertimeRule/OvertimeRuleCard";
import { ShiftCard } from "./Shift/ShiftCard";
import { WeeklyOffCard } from "./WeeklyOff/WeeklyOffCard";

type SchemaDetailsProps = {
  employeeId: string;
  companyId: string;
  loading: boolean;
};

export const SchemaDetails = ({
  employeeId,
  companyId,
  loading,
}: SchemaDetailsProps) => {
  const { data: schemaDetails, isPending } = useGetEmployeeSchemaDetails({
    employeeId,
  });

  return (
    <Stack gap="15px">
      <Stack direction="row" gap="15px">
        <ShiftCard
          loading={loading || isPending}
          employeeId={employeeId}
          companyId={companyId}
          defaultValues={schemaDetails?.shift_type}
        />

        <BankShiftCard
          loading={loading || isPending}
          employeeId={employeeId}
          companyId={companyId}
          defaultValues={schemaDetails?.bank_shift_type}
        />

        <WeeklyOffCard
          loading={loading || isPending}
          employeeId={employeeId}
          companyId={companyId}
          defaultValues={schemaDetails?.weekly_off_type}
        />
      </Stack>

      <Stack direction="row" gap="15px">
        <HolidayCard
          loading={loading || isPending}
          employeeId={employeeId}
          companyId={companyId}
          defaultValues={schemaDetails?.holiday_group}
        />

        <AttendancePenaltyRuleCard
          employeeId={employeeId}
          companyId={companyId}
          loading={loading || isPending}
          defaultValues={schemaDetails?.attendance_penalty_rule}
        />

        <OvertimeRuleCard
          companyId={companyId}
          employeeId={employeeId}
          loading={loading || isPending}
          defaultValues={schemaDetails?.overtime_rule}
        />
      </Stack>

      <Box width="calc(33% - 5px)">
        <LeavePlanCard
          companyId={companyId}
          employeeId={employeeId}
          loading={loading || isPending}
          defaultValues={schemaDetails?.leave_plan}
        />
      </Box>
    </Stack>
  );
};
