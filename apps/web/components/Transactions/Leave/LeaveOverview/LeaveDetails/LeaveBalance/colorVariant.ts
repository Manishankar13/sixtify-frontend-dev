import { useTheme } from "@mui/material";

export type LeaveType =
  | "paid"
  | "unpaid"
  | "earned_leave"
  | "sick_leave"
  | "casual_leave"
  | "maternity_leave"
  | "paternity_leave";

export type StatusType = "approved" | "rejected" | "cancelled" | "pending";

export const getColorByVariant = (
  variant: string,
  type: "light" | "dark" = "dark"
) => {
  const theme = useTheme();

  const { darkMint, darkOrange, butterflyBlue, red } = theme.palette.app.color;

  const index = type === "light" ? 600 : 900;

  switch (variant) {
    case "approved":
      return darkMint[index];

    case "rejected":
      return red[index];

    case "cancelled":
      return butterflyBlue[index];

    case "pending":
      return darkOrange[index];

    default:
      return butterflyBlue[index];
  }
};

export const getStatusLabel = (status: string) => {
  switch (status) {
    case "earned_leave":
      return "Earned Leave";

    case "sick_leave":
      return "Sick Leave";

    case "casual_leave":
      return "Casual Leave";

    case "maternity_leave":
      return "Maternity Leave";

    case "paternity_leave":
      return "Paternity Leave";

    default:
      return "Earned Leave";
  }
};
