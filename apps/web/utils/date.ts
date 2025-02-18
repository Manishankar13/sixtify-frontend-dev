import { getTimeInHHmm } from "@repo/shared-components/src/utils/date";
import type { DurationLikeObject } from "luxon";
import { DateTime, Duration } from "luxon";

type TimeDifferenceParams = {
  start: string | null;
  end: string | null;
  format?: Array<keyof DurationLikeObject>;
};

export const dateDaysPlus = (date: string, days: number) => {
  const joining = DateTime.fromISO(date);

  const confirmation = joining.plus({ days });

  return confirmation.toISODate();
};

export const dateDaysDifference = (startDate: string, endDate: string) => {
  const start = DateTime.fromISO(startDate);

  const end = DateTime.fromISO(endDate);

  // Calculate the difference in days
  const diffInDays = end.diff(start, "days").days;

  // Return the difference as an integer
  return Math.floor(diffInDays);
};

export const dateFormat = (date: string, isOnlyDateShow?: boolean) => {
  const dateTime = DateTime.fromISO(date);

  const formattedDate = isOnlyDateShow
    ? dateTime.toFormat("dd-MM-yyyy")
    : dateTime.toFormat("dd-MM-yyyy • hh:mm a");

  return formattedDate;
};

export const calculateDateDifference = (
  fromDate: string,
  toDate: string
): string => {
  const start = DateTime.fromISO(fromDate);

  const end = DateTime.fromISO(toDate);

  // Calculate the difference in years, months, and days
  const diff = end.diff(start, ["years", "months", "days"]).toObject();

  // Format the result as '5y 2m 10d'
  const years = Math.floor(diff.years ?? 0);

  const months = Math.floor(diff.months ?? 0);

  const days = Math.floor(diff.days ?? 0);

  return `${years}y ${months}m ${days}d`;
};

export const getTimeDifference = ({
  start,
  end,
  format = ["hours", "minutes"],
}: TimeDifferenceParams) => {
  if (!start && !end) {
    return {
      textFormat: "0h 0m",
      duration: Duration.fromObject({ hours: 0, minutes: 0 }),
    };
  }

  const startDateTime = start
    ? DateTime.fromISO(start)
    : DateTime.now().startOf("day");

  let endDateTime;

  if (!end) {
    if (startDateTime.hour < 12) {
      endDateTime = startDateTime.set({ hour: 12, minute: 0 });
    } else {
      endDateTime = startDateTime.plus({ days: 1 }).set({ hour: 0, minute: 0 });
    }
  } else {
    endDateTime = DateTime.fromISO(end);

    if (endDateTime < startDateTime) {
      endDateTime = endDateTime.plus({ days: 1 });
    }
  }

  const duration = endDateTime.diff(startDateTime, format);

  if (duration.as("milliseconds") < 0) {
    return {
      textFormat: "0h 0m",
      duration: Duration.fromObject({ hours: 0, minutes: 0 }),
    };
  }

  return {
    textFormat: `${duration.hours || 0}h ${duration.minutes || 0}m`,
    duration,
  };
};

export const formatHours = (timeString: string) => {
  if (!timeString) {
    return "0h 0m";
  }

  const [hours, minutes] = timeString.split(":");

  const formattedHours = hours ? parseInt(hours, 10) : 0;

  const formattedMinutes = minutes ? parseInt(minutes, 10) : 0;

  return `${formattedHours}h ${formattedMinutes}m`;
};

export const formatToLocalTime = (
  utcTime: string,
  format = "HH:mm:ss"
): string => {
  return utcTime
    ? DateTime.fromISO(utcTime).toLocal().toFormat(format)
    : "00:00:00";
};

export const getShiftTime = (
  shift_start: string = "21:00:00+00",
  shift_end: string = "07:00:00+00"
) => {
  const shiftEnd = getTimeInHHmm(shift_end, "HH:mm");

  const shiftStart = getTimeInHHmm(shift_start, "HH:mm");

  return `${shiftStart} - ${shiftEnd}`;
};
