import { DateTime } from "luxon";

export const formatDate = (date: string, format: string = "dd-MM-yyyy") => {
  return DateTime.fromISO(date).toFormat(format);
};

export const getTimeInHHmm = (date: string, format: string = "HH:mm") => {
  const dateTime = DateTime.fromISO(date).toFormat(format);

  return dateTime;
};
