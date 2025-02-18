import { Box, Skeleton, Stack, Typography, useTheme } from "@mui/material";
import { PadBox } from "@repo/shared-components";
import { getTimeInHHmm } from "@repo/shared-components/src/utils/date";
import type { AttendanceLogs } from "./hooks/type";

type AttendanceFormShiftDetailsCardProps = {
  data: AttendanceLogs;
  isFetching: boolean;
};

export const getLabelColor = (status: string | null, type?: string) => {
  const index = type === "dark" ? 900 : 600;

  const theme = useTheme();

  const { sapphireBlue, darkOrange, slate } = theme.palette.app.color;

  switch (status) {
    case "holiday":
      return {
        label: "Holiday",
        color: sapphireBlue[index],
      };

    case "full_day_weekly_off":
      return {
        label: "Weekly Off",
        color: darkOrange[index],
      };

    case "first_half_weekly_off":
      return {
        label: "First Half Weekly Off",
        color: darkOrange[index],
      };

    case "second_half_weekly_off":
      return {
        label: "Second Half Weekly Off",
        color: darkOrange[index],
      };

    default:
      return { label: "", color: slate[800] };
  }
};

export const AttendanceFormShiftDetailsCard = ({
  data,
  isFetching,
}: AttendanceFormShiftDetailsCardProps) => {
  return (
    <Box
      sx={{
        border: `1px solid ${getLabelColor(data.status, "dark").color}`,
        backgroundColor: `${getLabelColor(data.status, "light").color}`,
        borderRadius: "5px",
      }}
    >
      <PadBox padding={{ padding: "15px" }}>
        <Stack flexDirection="row" justifyContent="space-between">
          <Stack flexDirection="row" gap="40px">
            <Stack gap="5px">
              <Typography variant="subtitle2">Shift </Typography>
              {isFetching ? (
                <Skeleton sx={{ width: "60px" }} />
              ) : (
                <Typography variant="body2">
                  {data.shift_type_name ?? "-"}
                </Typography>
              )}
            </Stack>

            <Stack gap="5px">
              <Typography variant="subtitle2">Shift Time </Typography>
              {isFetching ? (
                <Skeleton sx={{ width: "60px" }} />
              ) : (
                <Typography variant="body2">
                  {data.shift_start && data.shift_end
                    ? `${getTimeInHHmm(data.shift_start)} - ${getTimeInHHmm(data.shift_end)}`
                    : "-"}
                </Typography>
              )}
            </Stack>
          </Stack>

          {data.status && (
            <Box
              sx={{
                border: `1px solid ${getLabelColor(data.status, "dark").color}`,
                backgroundColor: "white",
                borderRadius: "5px",
                height: "min-content",
                padding: "0px 5px",
              }}
            >
              {getLabelColor(data.status).label}
            </Box>
          )}
        </Stack>
      </PadBox>
    </Box>
  );
};
