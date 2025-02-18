"use client";

import { Stack } from "@mui/material";
import { AttendanceCard } from "@repo/shared-components";
import {
  getStatusLabel,
  type WorkDayType,
} from "@repo/shared-components/src/utils/colorVariant";

type employeeSummaryCardsProps = {
  cardData: Record<WorkDayType, string>;
  type: string;
  isLoading: boolean;
};

export function EmployeeSummaryCards({
  cardData,
  type,
  isLoading,
}: Readonly<employeeSummaryCardsProps>) {
  const customSeverityOptions: WorkDayType[] = [
    "present",
    "absent",
    "weekly_off",
    "holiday",
    "paid_leave",
    "unpaid_leave",
  ];

  return (
    <Stack
      gap="5px"
      marginTop="10px"
      flexDirection="row"
      justifyContent="space-between"
    >
      {customSeverityOptions.map((variant) => {
        return (
          <AttendanceCard
            key={variant}
            variant={variant}
            label={getStatusLabel(variant)}
            value={`${cardData?.[variant]} ${type}`}
            isLoading={isLoading}
          />
        );
      })}
    </Stack>
  );
}
