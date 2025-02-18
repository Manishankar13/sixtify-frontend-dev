"use client";

import {
  Avatar,
  Grid,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { CardItemValue, Tooltip } from "@repo/shared-components";
import { formatDate } from "@repo/shared-components/src/utils/date";
import { capitalize, isEqual } from "lodash";
import { DateTime } from "luxon";
import { useMemo } from "react";
import { calculateLeaveDetails } from "../../../Dialogs/ApplyLeaveForm";
import type { LeaveRequest } from "../hooks/useGetPendingLeaveRequest";

type LeaveDetailsSectionProps = {
  isLeaveRequestDetailsLoading: boolean;
  LeaveRequestDetails?: LeaveRequest;
};

export const LeaveDetailsSection = ({
  LeaveRequestDetails,
  isLeaveRequestDetailsLoading,
}: LeaveDetailsSectionProps) => {
  const theme = useTheme();

  const { slate } = theme.palette.app.color;

  const leaveDays = useMemo(() => {
    if (LeaveRequestDetails) {
      return !isEqual(
        LeaveRequestDetails.from_date,
        LeaveRequestDetails.to_date
      )
        ? `${formatDate(LeaveRequestDetails.from_date, "dd LLL")} - ${formatDate(LeaveRequestDetails.to_date, "dd LLL, yyyy")}`
        : DateTime.fromISO(LeaveRequestDetails.from_date).toFormat(
            "dd LLL, yyyy"
          );
    }
  }, [LeaveRequestDetails]);

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sx={{
          padding: "15px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: `${slate[800]}`,
          borderRadius: "5px",
        }}
      >
        <Stack direction="row" gap="5px" alignItems="center">
          <Avatar
            src={LeaveRequestDetails?.avatar ?? ""}
            alt="Employee Photo"
            sx={{ width: 40, height: 40 }}
          />

          <CardItemValue
            title={LeaveRequestDetails?.employee_name}
            loading={isLeaveRequestDetailsLoading}
          />
        </Stack>

        <Stack gap="5px" alignItems="center">
          <Typography variant="body1">Leave Date</Typography>

          {isLeaveRequestDetailsLoading ? (
            <Skeleton height={20} width={150} />
          ) : (
            <Typography variant="body2">{leaveDays}</Typography>
          )}
        </Stack>
      </Grid>

      <Grid gap="50px" item xs={6}>
        <Typography variant="body1">Leave Days :</Typography>

        <CardItemValue
          title={
            LeaveRequestDetails &&
            calculateLeaveDetails(
              LeaveRequestDetails.from_date,
              LeaveRequestDetails.to_date,
              LeaveRequestDetails.from_half,
              LeaveRequestDetails.to_half,
              true
            )
          }
          loading={isLeaveRequestDetailsLoading}
        />
      </Grid>

      <Grid gap="5px" item xs={6}>
        <Typography variant="body1">Leave Type :</Typography>

        <CardItemValue
          title={capitalize(LeaveRequestDetails?.leave_type)}
          loading={isLeaveRequestDetailsLoading}
        />
      </Grid>

      <Grid gap="5px" item xs={12}>
        <Typography variant="body1">Leave Remark :</Typography>

        <Tooltip toolTipLabel={LeaveRequestDetails?.reason}>
          <CardItemValue
            title={LeaveRequestDetails?.reason}
            loading={isLeaveRequestDetailsLoading}
          />
        </Tooltip>
      </Grid>
    </Grid>
  );
};
