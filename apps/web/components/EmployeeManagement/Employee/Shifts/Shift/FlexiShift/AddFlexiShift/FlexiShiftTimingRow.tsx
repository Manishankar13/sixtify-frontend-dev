import { Box, Stack, Typography } from "@mui/material";
import { DateTime, Duration } from "luxon";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TimePicker } from "../../../../../../../../../packages/shared-components/src/FormFields/TimePicker/TimePicker";
import { getTimeDifference } from "../../../../../../../utils/date";
import type { DayOfWeek, FlexiShiftFormFieldValues } from "./FlexiShiftForm";

type FlexiShiftTimingRowProps = {
  day: DayOfWeek;
  loading: boolean;
  disabled?: boolean;
};

export const calculateNetWorkingHours = (
  shiftGrossHours?: string | null,
  isBreakFlexible?: boolean,
  breakHours?: string | null,
  breakStart?: string | null,
  breakEnd?: string | null
  // eslint-disable-next-line sonarjs/cognitive-complexity
) => {
  if (!shiftGrossHours || typeof shiftGrossHours !== "string") {
    return "0h 0m";
  }

  const timeParts = shiftGrossHours.split(":").map(Number);

  if (
    (timeParts.length !== 2 && timeParts.length !== 3) ||
    timeParts.some(isNaN)
  ) {
    return "0h 0m";
  }

  const [hours, minutes, seconds] = timeParts;

  let netWorkingDuration = Duration.fromObject({
    hours,
    minutes,
    seconds: seconds ?? 0,
  });

  if (isBreakFlexible) {
    const breakDuration = getTimeDifference({
      start: "00:00",
      end: breakHours ?? "00:00",
    }).duration;

    if (breakDuration.isValid && netWorkingDuration.isValid) {
      netWorkingDuration = netWorkingDuration?.minus(breakDuration);
    }
  } else if (breakStart && breakEnd) {
    const breakDuration = getTimeDifference({
      start: breakStart,
      end: breakEnd,
      format: ["hours", "minutes"],
    }).duration;

    if (breakDuration.isValid && netWorkingDuration.isValid) {
      netWorkingDuration = netWorkingDuration.minus(breakDuration);
    }
  } else if (!breakHours || typeof breakHours !== "string") {
    return `${hours}h ${minutes}m `;
  }

  const netHours = Math.floor(netWorkingDuration.as("hours"));

  const netMinutes = Math.floor(netWorkingDuration.as("minutes")) % 60;

  return `${netHours}h ${netMinutes}m`;
};

export const FlexiShiftTimingRow = ({
  day,
  loading,
  disabled = false,
  // eslint-disable-next-line sonarjs/cognitive-complexity
}: FlexiShiftTimingRowProps) => {
  const { t } = useTranslation();

  const {
    watch,
    control,
    formState: { errors },
    setError,
    clearErrors,
    resetField,
  } = useFormContext<FlexiShiftFormFieldValues>();

  const isBreakFlexible = watch("timings.is_flexible_break");

  const isVariedByDay = watch("timings.is_varied_by_day");

  const shiftStart = watch(`timings.day_configuration.${day}.shift_start`);

  const shiftEnd = watch(`timings.day_configuration.${day}.shift_end`);

  const breakStart = watch(`timings.day_configuration.${day}.break_start`);

  const breakEnd = watch(`timings.day_configuration.${day}.break_end`);

  const shiftGrossHours = watch(`timings.day_configuration.${day}.shift_hours`);

  const breakHours = watch(`timings.day_configuration.${day}.break_hours`);

  const isTimePickerDisabled = () => !!(!isVariedByDay && day !== "monday");

  const calculateBreakGrossHour = () => {
    if (breakStart && breakEnd) {
      const duration = getTimeDifference({
        start: breakStart,
        end: breakEnd,
      }).duration;

      return duration.toFormat("hh:mm:ss");
    }
  };

  const errorMessages = (messageKey?: string) => messageKey && t(messageKey);

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const shouldDisableBreakStartTime = (time: DateTime) => {
    if (shiftStart && shiftEnd) {
      const start = DateTime.fromISO(shiftStart);

      const end = DateTime.fromISO(shiftEnd);

      if (end < start) {
        if (start.minute > 0) {
          if (time.hour == start.hour || breakStart) {
            const breakStartHour = breakStart
              ? DateTime.fromISO(breakStart)
              : null;

            return breakStartHour?.hour
              ? time < start && time > end
              : time > start;
          }
        }

        return !(time >= start || time <= end.plus({ hour: 0 }));
      }

      if (time < start) {
        if (breakStart) {
          const breakStartHour = DateTime.fromISO(breakStart);

          if (breakStartHour.hour === start.hour) {
            if (start.minute > 0) {
              return time.minute <= start.minute || time.hour < start.hour;
            }

            return time.hour < start.hour;
          }

          return time.hour < start.hour;
        }

        if (start.minute == 0) {
          return time < end;
        }

        if (time.hour === start.hour) {
          return time.hour < start.hour;
        } else if (start.minute > 0) {
          return time.minute < start.minute;
        }

        return time.minute < start.minute;
      }

      return time > end;
    }

    return false;
  };

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const shouldDisableBreakEndTime = (time: DateTime) => {
    if (breakStart && shiftEnd) {
      const start = DateTime.fromISO(breakStart);

      const end = DateTime.fromISO(shiftEnd);

      if (end < start) {
        if (time.hour == start.hour || breakEnd) {
          const breakStartHour = breakEnd ? DateTime.fromISO(breakEnd) : null;

          return breakStartHour?.hour
            ? time < start && time > end
            : time > start;
        }

        return !(time >= start || time <= end);
      }

      if (time < start) {
        if (breakEnd) {
          const breakEndHour = DateTime.fromISO(breakEnd);

          if (breakEndHour.hour === start.hour) {
            if (start.minute > 0) {
              return time.minute < start.minute || time.hour < start.hour;
            }

            return time.hour < start.hour;
          }

          return time.hour < start.hour;
        }

        if (start.minute == 0) {
          return time < end;
        } else if (time.hour === start.hour) {
          return time.hour < start.hour;
        }

        return time.minute < start.minute;
      }

      return time > end;
    }

    return false;
  };

  // eslint-disable-next-line sonarjs/cognitive-complexity
  useEffect(() => {
    if (shiftEnd && shiftStart && breakStart) {
      if (shiftEnd > shiftStart) {
        const isBreakStartInRange =
          breakStart > shiftStart && breakStart < shiftEnd;

        if (!isBreakStartInRange) {
          setError(`timings.day_configuration.${day}.break_start`, {
            type: "custom",
            message:
              "Break from time cannot be earlier than the shift from time or later than the shift to time. Please enter a valid break time.",
          });
        } else {
          clearErrors(`timings.day_configuration.${day}.break_start`);
        }
      }

      if (shiftEnd < shiftStart) {
        const isBreakStartInRange =
          breakStart < shiftStart && breakStart > shiftEnd;

        if (isBreakStartInRange) {
          setError(`timings.day_configuration.${day}.break_start`, {
            type: "custom",
            message:
              "Break from time cannot be earlier than the shift from time or later than the shift to time. Please enter a valid break time.",
          });
        } else {
          clearErrors(`timings.day_configuration.${day}.break_start`);
        }
      }
    }

    if (shiftEnd && shiftStart && breakStart && breakEnd) {
      if (shiftEnd > shiftStart) {
        const isBreakStartInRange =
          breakEnd <= breakStart || breakEnd >= shiftEnd;

        if (isBreakStartInRange) {
          setError(`timings.day_configuration.${day}.break_end`, {
            type: "custom",
            message:
              "Break to time must be after Break from time and before Shift To time. Please enter a valid break time.",
          });
        } else {
          clearErrors(`timings.day_configuration.${day}.break_end`);
        }
      }

      if (shiftEnd < shiftStart) {
        const isBreakStartInRange =
          breakEnd >= breakStart || breakEnd <= shiftEnd;

        if (isBreakStartInRange) {
          setError(`timings.day_configuration.${day}.break_end`, {
            type: "custom",
            message:
              "Break to time must be after Break from time and before Shift To time. Please enter a valid break time.",
          });
        } else {
          clearErrors(`timings.day_configuration.${day}.break_end`);
        }
      }
    }
  }, [breakStart, breakEnd, shiftStart, shiftEnd]);

  useMemo(() => {
    if (!breakStart || !shiftStart || !shiftEnd) {
      resetField(`timings.day_configuration.${day}.break_end`);
      resetField(`timings.day_configuration.${day}.break_hours`);
      resetField(`timings.day_configuration.${day}.break_start`);
    }
  }, [breakStart, shiftStart, shiftEnd]);

  return (
    <Stack direction="row" sx={{ minWidth: "100%" }} gap="10px">
      <Typography
        mt="10px"
        textTransform="capitalize"
        sx={{ minWidth: "175px" }}
      >
        {day}
      </Typography>
      <Box width="100%" maxWidth="250px">
        <TimePicker
          loading={loading}
          ampm={false}
          disabled={isTimePickerDisabled() || disabled}
          control={control}
          name={`timings.day_configuration.${day}.shift_start`}
          error={
            !isTimePickerDisabled() &&
            !!errors?.timings?.day_configuration?.[day]?.shift_start
          }
          helperText={
            !isTimePickerDisabled() &&
            errors?.timings?.day_configuration?.[day]?.shift_start?.message
              ? errorMessages(
                  errors?.timings?.day_configuration?.[day]?.shift_start
                    ?.message
                )
              : undefined
          }
        />
      </Box>
      <Box width="100%" maxWidth="250px">
        <TimePicker
          loading={loading}
          ampm={false}
          disabled={isTimePickerDisabled() || disabled}
          control={control}
          name={`timings.day_configuration.${day}.shift_end`}
          error={
            !isTimePickerDisabled() &&
            !!errors?.timings?.day_configuration?.[day]?.shift_end
          }
          helperText={
            !isTimePickerDisabled() &&
            errors?.timings?.day_configuration?.[day]?.shift_end?.message
              ? errorMessages(
                  errors?.timings?.day_configuration?.[day]?.shift_end?.message
                )
              : undefined
          }
        />
      </Box>
      <Box width="100%" maxWidth="250px">
        <TimePicker
          loading={loading}
          ampm={false}
          disabled={isTimePickerDisabled() || disabled}
          control={control}
          isReturnLocalTime
          name={`timings.day_configuration.${day}.shift_hours`}
          error={
            !isTimePickerDisabled() &&
            !!errors?.timings?.day_configuration?.[day]?.shift_hours
          }
          helperText={
            !isTimePickerDisabled() &&
            errors?.timings?.day_configuration?.[day]?.shift_hours?.message
              ? errorMessages(
                  errors?.timings?.day_configuration?.[day]?.shift_hours
                    ?.message
                )
              : undefined
          }
        />
      </Box>
      <Box width="100%" maxWidth="250px">
        <TimePicker
          loading={loading}
          ampm={false}
          disabled={
            (!(!isVariedByDay && day !== "monday") && shiftStart && shiftEnd
              ? false
              : true) || disabled
          }
          control={control}
          name={`timings.day_configuration.${day}.break_start`}
          shouldDisableTime={shouldDisableBreakStartTime}
          error={
            !isTimePickerDisabled() &&
            !!errors?.timings?.day_configuration?.[day]?.break_start
          }
          helperText={
            !isTimePickerDisabled()
              ? errorMessages(
                  errors?.timings?.day_configuration?.[day]?.break_start
                    ?.message
                )
              : undefined
          }
        />
      </Box>
      <Box width="100%" maxWidth="250px">
        <TimePicker
          loading={loading}
          ampm={false}
          disabled={
            (!(!isVariedByDay && day !== "monday") &&
            breakStart &&
            shiftStart &&
            shiftEnd
              ? false
              : true) || disabled
          }
          control={control}
          name={`timings.day_configuration.${day}.break_end`}
          shouldDisableTime={shouldDisableBreakEndTime}
          error={
            !isTimePickerDisabled() &&
            !!errors?.timings?.day_configuration?.[day]?.break_end
          }
          helperText={
            !isTimePickerDisabled()
              ? errorMessages(
                  errors?.timings?.day_configuration?.[day]?.break_end?.message
                )
              : undefined
          }
        />
      </Box>

      {isBreakFlexible ? (
        <Box width="100%" maxWidth="250px">
          <TimePicker
            loading={loading}
            ampm={false}
            disabled={isTimePickerDisabled() || disabled}
            control={control}
            name={`timings.day_configuration.${day}.break_hours`}
            isReturnLocalTime
            value={
              calculateBreakGrossHour()
                ? DateTime.fromISO(calculateBreakGrossHour() ?? "")
                : null
            }
            error={!!errors?.timings?.day_configuration?.[day]?.break_hours}
            helperText={errorMessages(
              errors?.timings?.day_configuration?.[day]?.break_hours?.message
            )}
          />
        </Box>
      ) : (
        <Typography mt="10px" sx={{ width: "100%", maxWidth: "250px" }}>
          {getTimeDifference({ start: breakStart, end: breakEnd }).textFormat}
        </Typography>
      )}
      <Typography mt="10px" sx={{ width: "100%", maxWidth: "250px" }}>
        {calculateNetWorkingHours(
          shiftGrossHours,
          isBreakFlexible,
          breakHours,
          breakStart,
          breakEnd
        )}
      </Typography>
    </Stack>
  );
};
