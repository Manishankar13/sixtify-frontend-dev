import { Box, Stack, Tooltip } from "@mui/material";
import { getColorByVariant } from "../utils/colorVariant";
import { getArrowValue, type HighlightedInterval } from "./Timeline";
import { getTimeInHHmm } from "../utils/date";

type TimelineTrackSegmentsProps = {
  totalDots: number;
  intervals: HighlightedInterval[];
  startTimeline: number;
};

export const TimelineTrackSegments = ({
  totalDots,
  intervals,
  startTimeline,
}: TimelineTrackSegmentsProps) => {
  return (
    <Box sx={{ position: "relative", width: "100%", height: 4 }}>
      {intervals?.map((interval, index) => {
        const inTime = getTimeInHHmm(interval.in_time);

        const outTime = getTimeInHHmm(interval.out_time);

        let in_time = getArrowValue(inTime);

        in_time = in_time < startTimeline ? in_time + totalDots : in_time;

        let out_time = getArrowValue(outTime);

        out_time = out_time < in_time ? out_time + totalDots : out_time;

        const isValidInTime = !isNaN(in_time);

        const isValidOutTime = !isNaN(out_time);

        let inTimeLabel = "";

        let outTimeLabel = "";

        if (isValidInTime) {
          inTimeLabel = `In time : ${inTime} ${!isValidOutTime ? " / Missing punch" : ""}`;
        }

        if (isValidOutTime) {
          outTimeLabel = `Out time : ${outTime}  ${!isValidInTime ? "/ Missing punch" : ""}`;
        }

        const startPercent =
          (((in_time - startTimeline) % totalDots) / (totalDots - 1)) * 100;

        const endPercent =
          (((out_time - startTimeline) % totalDots) / (totalDots - 1)) * 100;

        const labelText = `In/Out: ${getTimeInHHmm(interval.in_time)} - ${getTimeInHHmm(
          interval.out_time
        )}`;

        const color = getColorByVariant(interval.status_type);

        return (
          // eslint-disable-next-line sonarjs/no-array-index-key
          <Stack direction="row" key={index}>
            {isValidInTime && (
              <Tooltip arrow title={inTimeLabel} placement="top">
                <Box
                  sx={{
                    height: 8,
                    width: 8,
                    position: "absolute",
                    left: `${startPercent}%`,
                    boxShadow: "none",
                    backgroundColor: color,
                    borderRadius: "50%",
                    top: "15px",
                    zIndex: 3,
                    "&:focus, &:hover, &:active": {
                      boxShadow: "none",
                    },
                  }}
                />
              </Tooltip>
            )}
            <Tooltip arrow title={labelText} placement="top">
              <Box
                sx={{
                  position: "absolute",
                  left: `${startPercent}%`,
                  width: `${endPercent - startPercent}%`,
                  height: 3.5,
                  top: "17.5px",
                  backgroundColor: color,
                  zIndex: 2,
                }}
              />
            </Tooltip>
            {isValidOutTime && (
              <Tooltip arrow title={outTimeLabel} placement="top">
                <Box
                  sx={{
                    height: 8,
                    width: 8,
                    position: "absolute",
                    right: `${100 - endPercent}%`,
                    boxShadow: "none",
                    backgroundColor: color,
                    borderRadius: "50%",
                    top: "15px",
                    zIndex: 3,
                    "&:focus, &:hover, &:active": {
                      boxShadow: "none",
                    },
                  }}
                />
              </Tooltip>
            )}
          </Stack>
        );
      })}
    </Box>
  );
};
