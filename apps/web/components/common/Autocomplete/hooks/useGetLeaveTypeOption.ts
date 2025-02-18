import { z } from "zod";
import { PAID, UNPAID } from "./constant";

const leaveTypes = {
  [PAID]: "Paid",
  [UNPAID]: "Unpaid",
};

export type Leave = keyof typeof leaveTypes;

export const LeaveTypeSchema = z.enum([PAID, UNPAID]);

export function useGetLeaveTypeOptions() {
  const leaveTypeOptions = [
    { label: leaveTypes[PAID], value: PAID },
    { label: leaveTypes[UNPAID], value: UNPAID },
  ];

  return { leaveTypeOptions };
}
