"use client";

import { Box, Skeleton, Stack, Typography, useTheme } from "@mui/material";
import { CardItemValue } from "@repo/shared-components";
import { formatDate } from "@repo/shared-components/src/utils/date";
import { capitalize } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { calculateLeaveDetails } from "../../Dialogs/ApplyLeaveForm";
import type { LeaveRequest } from "./hooks/useGetPendingLeaveRequest";

type BasicLeaveRequestDetailsSectionProps = {
  isBasicLeaveRequestDetailsLoading: boolean;
  BasicLeaveRequestDetails?: LeaveRequest;
};

export const BasicLeaveRequestDetailsSection = ({
  isBasicLeaveRequestDetailsLoading,
  BasicLeaveRequestDetails,
}: BasicLeaveRequestDetailsSectionProps) => {
  const theme = useTheme();

  const { slate, iron } = theme.palette.app.color;

  const dateCalendarView = (date: string) => (
    <Stack width="90px" height="120px">
      <Box
        bgcolor={slate[900]}
        color={iron[600]}
        borderRadius="5px 5px 0px 0px"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
        }}
      >
        <Typography variant="body1">{formatDate(date, "MMM")}</Typography>
      </Box>

      <Stack
        height="65px"
        bgcolor={slate[800]}
        color={slate[900]}
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="body1">{formatDate(date, "dd")}</Typography>

        <Typography variant="body1">{formatDate(date, "ccc")}</Typography>
      </Stack>
    </Stack>
  );

  return (
    <Stack direction="row" gap="20px">
      {isBasicLeaveRequestDetailsLoading ? (
        [...Array(2)].map(() => (
          <Skeleton key={uuidv4()} width="90px" sx={{ minHeight: "120px" }} />
        ))
      ) : (
        <>
          {BasicLeaveRequestDetails?.from_date &&
            dateCalendarView(BasicLeaveRequestDetails.from_date)}

          {BasicLeaveRequestDetails?.to_date &&
            dateCalendarView(BasicLeaveRequestDetails.to_date)}
        </>
      )}

      <CardItemValue
        title="Leave Days"
        subTitle={
          BasicLeaveRequestDetails &&
          calculateLeaveDetails(
            BasicLeaveRequestDetails.from_date,
            BasicLeaveRequestDetails.to_date,
            BasicLeaveRequestDetails.from_half,
            BasicLeaveRequestDetails.to_half,
            true
          )
        }
        loading={isBasicLeaveRequestDetailsLoading}
      />

      <CardItemValue
        title="Leave Type"
        subTitle={capitalize(BasicLeaveRequestDetails?.leave_type)}
        loading={isBasicLeaveRequestDetailsLoading}
      />

      <CardItemValue
        title="Leave Name"
        subTitle={BasicLeaveRequestDetails?.leave_type_name}
        loading={isBasicLeaveRequestDetailsLoading}
      />
    </Stack>
  );
};
