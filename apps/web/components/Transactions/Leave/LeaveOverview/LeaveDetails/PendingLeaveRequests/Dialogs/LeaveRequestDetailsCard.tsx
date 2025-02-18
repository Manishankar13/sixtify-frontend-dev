"use client";

import {
  CancelOutlined as CancelIcon,
  CheckCircleOutline as CheckIcon,
  HourglassEmptyOutlined as HourglassIcon,
} from "@mui/icons-material";
import {
  alpha,
  Avatar,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { CardItemValue, Chip } from "@repo/shared-components";
import { formatDate } from "@repo/shared-components/src/utils/date";
import { capitalize } from "lodash";
import {
  getColorByVariant,
  type StatusType,
} from "../../LeaveBalance/colorVariant";
import { BasicLeaveRequestDetailsSection } from "./BasicLeaveRequestDetailsSection";
import type { LeaveRequest } from "./hooks/useGetPendingLeaveRequest";

type LeaveRequestDetailsCardProps = {
  isLeaveRequestDetailsLoading: boolean;
  LeaveRequestDetails?: LeaveRequest;
};

export const LeaveRequestDetailsCard = ({
  LeaveRequestDetails,
  isLeaveRequestDetailsLoading,
}: LeaveRequestDetailsCardProps) => {
  const theme = useTheme();

  const { slate, iron } = theme.palette.app.color;

  const iconMappings: Record<StatusType, typeof CheckIcon> = {
    approved: CheckIcon,
    rejected: CancelIcon,
    cancelled: CancelIcon,
    pending: HourglassIcon,
  };

  const getStatusIcon = (status: StatusType): JSX.Element => {
    const IconComponent = iconMappings[status];

    return <IconComponent fontSize="small" />;
  };

  return (
    <Stack gap="20px" color={slate[900]}>
      <Stack
        padding="15px"
        direction="row"
        gap="10px"
        alignItems="center"
        bgcolor={slate[800]}
        borderRadius="5px"
      >
        <Avatar
          src={LeaveRequestDetails?.avatar ?? ""}
          alt="Employee Photo"
          sx={{ width: 60, height: 60 }}
        />

        {isLeaveRequestDetailsLoading ? (
          <Stack gap="5px">
            <Skeleton sx={{ width: "200px" }} />

            <Skeleton sx={{ width: "300px" }} />
          </Stack>
        ) : (
          <Stack gap="5px">
            <Typography variant="subtitle1" fontWeight={500}>
              {LeaveRequestDetails?.employee_name}
            </Typography>

            <CardItemValue
              title={
                LeaveRequestDetails &&
                `( Requested By ${LeaveRequestDetails.requested_by} On ${formatDate(LeaveRequestDetails.requested_at, "dd-MM-yyyy • hh:mm a")} )`
              }
              loading={isLeaveRequestDetailsLoading}
            />
          </Stack>
        )}
      </Stack>

      <BasicLeaveRequestDetailsSection
        BasicLeaveRequestDetails={LeaveRequestDetails}
        isBasicLeaveRequestDetailsLoading={isLeaveRequestDetailsLoading}
      />

      <CardItemValue
        title="Reason :"
        subTitle={LeaveRequestDetails?.reason}
        loading={isLeaveRequestDetailsLoading}
      />

      <Stack gap="5px">
        <Typography variant="body1" fontWeight={500}>
          Status :
        </Typography>

        {isLeaveRequestDetailsLoading ? (
          <Skeleton sx={{ width: "150px", lineHeight: "30px" }} />
        ) : (
          LeaveRequestDetails?.status && (
            <Chip
              icon={getStatusIcon(LeaveRequestDetails.status)}
              variant="outlined"
              label={
                LeaveRequestDetails.status === "pending"
                  ? "Pending"
                  : `${capitalize(LeaveRequestDetails.status)} By`
              }
              sx={{
                width: "fit-content",
                color: getColorByVariant(LeaveRequestDetails.status),
                backgroundColor: alpha(
                  getColorByVariant(LeaveRequestDetails.status) ??
                    "transparent",
                  0.1
                ),
              }}
            />
          )
        )}
      </Stack>

      {LeaveRequestDetails?.action_details &&
        LeaveRequestDetails.status != "pending" && (
          <Stack
            direction="row"
            gap="10px"
            alignItems="center"
            borderRadius="5px"
          >
            <Avatar
              src={LeaveRequestDetails.action_details.avatar}
              alt="Approver Photo"
              sx={{ width: 40, height: 40 }}
            />

            <Stack direction="column" borderRadius="5px">
              <Stack direction="row" gap="10px" borderRadius="5px">
                <Typography variant="body1" fontWeight={400}>
                  {LeaveRequestDetails.action_details.employee_name}
                </Typography>

                <Typography variant="body1" color={iron[500]}>
                  {formatDate(
                    LeaveRequestDetails.action_details.action_at,
                    "dd-MM-yyyy • hh:mm a"
                  )}
                </Typography>
              </Stack>

              <Typography variant="body2" fontWeight={400}>
                {LeaveRequestDetails.action_details.action_reason}
              </Typography>
            </Stack>
          </Stack>
        )}
    </Stack>
  );
};
