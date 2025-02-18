import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { TimePicker } from "@repo/shared-components";
import { DateTime } from "luxon";
import { useMemo } from "react";
import type { Control, FieldErrors, UseFormWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { getTimeDifference } from "../../../../../../../utils/date";
import type { BankShiftFormFieldValues, DayOfWeek } from "./BankShiftForm";

type BankShiftRowProps = {
  day: DayOfWeek;
  control: Control<BankShiftFormFieldValues>;
  watch: UseFormWatch<BankShiftFormFieldValues>;
  errors: FieldErrors<BankShiftFormFieldValues>;
  loading?: boolean;
  disabled?: boolean;
};

export const getDuration = (start: string, end: string) => {
  const startTime = DateTime.fromISO(start);

  const endTime = DateTime.fromISO(end);

  return endTime.diff(startTime, ["hours", "minutes"]);
};

export const BankShiftRow = ({
  day,
  control,
  watch,
  errors,
  loading = false,
  disabled = false,
}: BankShiftRowProps) => {
  const { t } = useTranslation();

  const shiftStart = watch(`timings.${day}.shift_start`);

  const shiftEnd = watch(`timings.${day}.shift_end`);

  const isMonday = day === "monday";

  const isTimePickerDisabled = () => {
    return day !== "monday";
  };

  const errorMessages = (messageKey?: string) => {
    return messageKey && t(messageKey);
  };

  const shiftTimeDuration = useMemo(() => {
    const { textFormat } = getTimeDifference({
      start: shiftStart,
      end: shiftEnd,
    });

    return textFormat;
  }, [shiftStart, shiftEnd]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap="40px"
      justifyContent="space-between"
      sx={{ flex: 1 }}
    >
      <Typography
        textTransform="capitalize"
        fontWeight="bold"
        sx={{ width: "100%", maxWidth: "250px" }}
      >
        {day}
      </Typography>

      <TimePicker
        control={control}
        disabled={isTimePickerDisabled() || disabled}
        loading={loading}
        name={`timings.${day}.shift_start`}
        error={isMonday && !!errors.timings?.[day]?.shift_start}
        helperText={
          isMonday && errors.timings?.[day]?.shift_start
            ? errorMessages(errors.timings[day].shift_start.message)
            : undefined
        }
        sx={{ width: "100%", maxWidth: "250px" }}
      />

      <TimePicker
        control={control}
        name={`timings.${day}.shift_end`}
        disabled={isTimePickerDisabled() || disabled}
        loading={loading}
        error={isMonday && !!errors?.timings?.[day]?.shift_end}
        helperText={
          isMonday && errors.timings?.[day]?.shift_end
            ? errorMessages(errors.timings[day].shift_end.message)
            : undefined
        }
        sx={{ width: "100%", maxWidth: "250px" }}
      />

      <Box sx={{ width: "100%", maxWidth: "250px" }}>
        {loading ? (
          <Skeleton
            height="40px"
            sx={{
              transform: "scale(1)",
            }}
          />
        ) : (
          <Typography sx={{ flex: 1, maxWidth: "250px" }}>
            {shiftTimeDuration}
          </Typography>
        )}
      </Box>
    </Stack>
  );
};
