import { useTheme } from "@mui/material";

export type WorkDayType =
  | "present"
  | "holiday"
  | "weekly_off"
  | "working"
  | "first_half_off"
  | "second_half_off"
  | "full_day_weekly_off"
  | "first_half_weekly_off"
  | "second_half_weekly_off"
  | "paid_leave"
  | "absent"
  | "late_in_early_out"
  | "unpaid_leave"
  | "loss_of_pay";

export type WorkDayTypeShort =
  | "P"
  | "H"
  | "WO"
  | "HO"
  | "HWO"
  | "PL"
  | "A"
  | "LIEO"
  | "UPL"
  | "LOP";

export const serverityOptions: Record<WorkDayType, WorkDayTypeShort> = {
  present: "P",
  holiday: "H",
  weekly_off: "WO",
  working: "P",
  first_half_off: "HO",
  second_half_off: "HO",
  full_day_weekly_off: "WO",
  first_half_weekly_off: "HWO",
  second_half_weekly_off: "HWO",
  paid_leave: "PL",
  absent: "A",
  unpaid_leave: "UPL",
  late_in_early_out: "LIEO",
  loss_of_pay: "LOP",
};

export const getColorByVariant = (variant: WorkDayType, type = "dark") => {
  const theme = useTheme();

  const { darkMint, sapphireBlue, darkOrange, orchid, lipstickRed, deepAqua } =
    theme.palette.app.color;

  const index = type === "dark" ? 900 : 600;

  switch (variant) {
    case "present":
      return darkMint[index];

    case "working":
      return darkMint[index];

    case "holiday":
      return sapphireBlue[index];

    case "weekly_off":
      return darkOrange[index];

    case "full_day_weekly_off":
      return darkOrange[index];

    case "first_half_weekly_off":
      return darkOrange[index];

    case "second_half_weekly_off":
      return darkOrange[index];

    case "paid_leave":
      return orchid[index];

    case "absent":
      return lipstickRed[index];

    case "first_half_off":
      return lipstickRed[index];

    case "second_half_off":
      return lipstickRed[index];

    case "unpaid_leave":
      return deepAqua[index];

    case "late_in_early_out":
      return lipstickRed[800];

    case "loss_of_pay":
      return lipstickRed[index];

    default:
      return lipstickRed[index];
  }
};

export const getStatusLabel = (status: WorkDayType) => {
  switch (status) {
    case "present":
      return "Present";

    case "absent":
      return "Absent";

    case "weekly_off":
      return "Weekly Off";

    case "working":
      return "Working";

    case "holiday":
      return "Holiday";

    case "paid_leave":
      return "Paid Leave";

    case "unpaid_leave":
      return "Unpaid Leave";

    case "first_half_weekly_off":
      return "First Half Weekly Off";

    case "second_half_weekly_off":
      return "Second Half Weekly Off";

    case "first_half_off":
      return "First Half Off";

    case "second_half_off":
      return "Second Half Off";

    case "full_day_weekly_off":
      return "Weekly Off";

    case "late_in_early_out":
      return "Late In/Early Out";

    case "loss_of_pay":
      return "Loss of Pay";

    default:
      return "Absent";
  }
};
