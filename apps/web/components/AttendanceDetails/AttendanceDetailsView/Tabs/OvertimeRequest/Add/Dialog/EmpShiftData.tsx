import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { getTimeInHHmm } from "@repo/shared-components/src/utils/date";
import { getShiftTime } from "../../../../../../../utils/date";
import { getLabelColor } from "../../../../../../Transactions/Attendance/AttendanceOverview/Dialogs/AttendanceFormShiftDetailsCard";
import type { OvertimeRequest } from "../hooks/useGetOvertimeRequest";

type EmpShiftDataProps = {
  overtimeRequest?: OvertimeRequest;
  loading: boolean;
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export const EmpShiftData = ({
  overtimeRequest,
  loading,
  // eslint-disable-next-line sonarjs/cognitive-complexity
}: EmpShiftDataProps) => {
  return (
    <Box
      sx={{
        ...(overtimeRequest && {
          border: `1px solid ${getLabelColor(overtimeRequest.day_type, "dark").color}`,
          backgroundColor: `${getLabelColor(overtimeRequest.day_type, "light").color}`,
        }),
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "5px",
        padding: "10px",
      }}
    >
      <Stack gap="10px" alignItems="center">
        <Typography variant="subtitle2">
          Shift: {overtimeRequest?.shift_type_name ?? "-"}
        </Typography>

        {loading ? (
          <Skeleton width="100px" animation="wave" />
        ) : (
          <Typography variant="subtitle2">
            {overtimeRequest?.shift_start && overtimeRequest?.shift_end
              ? getShiftTime(
                  overtimeRequest.shift_start,
                  overtimeRequest.shift_end
                )
              : "-"}
          </Typography>
        )}
      </Stack>

      <Stack gap="10px" alignItems="center">
        <Typography variant="subtitle2">First In Log</Typography>

        {loading ? (
          <Skeleton width="100px" animation="wave" />
        ) : (
          <Typography variant="subtitle2">
            {overtimeRequest?.first_in_time
              ? getTimeInHHmm(overtimeRequest.first_in_time)
              : "-"}
          </Typography>
        )}
      </Stack>

      <Stack gap="10px" alignItems="center">
        <Typography variant="subtitle2">Last Out Log</Typography>

        {loading ? (
          <Skeleton width="100px" animation="wave" />
        ) : (
          <Typography variant="subtitle2">
            {overtimeRequest?.last_out_time
              ? getTimeInHHmm(overtimeRequest.last_out_time)
              : "-"}
          </Typography>
        )}
      </Stack>

      <Stack gap="10px" alignItems="center">
        <Typography variant="subtitle2">Work Hours</Typography>

        {loading ? (
          <Skeleton width="100px" animation="wave" />
        ) : (
          <Typography variant="subtitle2">
            {overtimeRequest?.work_hours
              ? getTimeInHHmm(overtimeRequest.work_hours)
              : "-"}
          </Typography>
        )}
      </Stack>

      <Stack gap="10px" alignItems="center">
        <Typography variant="subtitle2">Work In Ot</Typography>

        {loading ? (
          <Skeleton width="100px" animation="wave" />
        ) : (
          <Typography variant="subtitle2">
            {overtimeRequest?.work_in_time_overtime
              ? getTimeInHHmm(overtimeRequest.work_in_time_overtime)
              : "-"}
          </Typography>
        )}
      </Stack>

      <Stack gap="10px" alignItems="center">
        <Typography variant="subtitle2">Work Out Ot</Typography>

        {loading ? (
          <Skeleton width="100px" animation="wave" />
        ) : (
          <Typography variant="subtitle2">
            {overtimeRequest?.work_out_time_overtime
              ? getTimeInHHmm(overtimeRequest.work_out_time_overtime)
              : "-"}
          </Typography>
        )}
      </Stack>

      {overtimeRequest?.day_type && (
        <Box
          sx={{
            border: `1px solid ${getLabelColor(overtimeRequest.day_type, "dark").color}`,
            backgroundColor: "white",
            borderRadius: "5px",
            padding: "0px 5px",
            height: "max-content",
          }}
        >
          {getLabelColor(overtimeRequest.day_type).label}
        </Box>
      )}
    </Box>
  );
};
