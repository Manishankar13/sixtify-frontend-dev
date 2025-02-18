import { Box, Slider, Stack, Tooltip } from "@mui/material";
import React from "react";
import { TimelineTrackSegments } from "./TimelineTrackSegments";
import { type WorkDayType } from "../utils/colorVariant";
import { getTimeInHHmm } from "../utils/date";
import { ArrowUp } from "../Svgs/ArrowUp";
import { DateTime } from "luxon";

export type HighlightedInterval = {
  in_time: string;
  out_time: string;
  status_type: WorkDayType;
};

type TimelineProps = {
  totalDots: number;
  highlightedIntervals: HighlightedInterval[];
  startTimeline: string;
  shiftStartTime: string;
  shiftEndTime: string;
};

export const getArrowValue = (date: string) => {
  const time = DateTime.fromFormat(date, "HH:mm");

  const hour = time.hour;

  const minute = time.minute;

  return hour + minute / 60;
};

export const Timeline = ({
  totalDots,
  highlightedIntervals,
  shiftStartTime,
  shiftEndTime,
  startTimeline = "2024-11-17T18:30:04.000Z",
}: TimelineProps) => {
  const slotStartTime = parseFloat(getTimeInHHmm(startTimeline));

  const getArrowPosition = (
    shiftStartTime: string,
    shiftEndTime: string,
    type: "END" | "START"
  ) => {
    const shiftStart = getTimeInHHmm(shiftStartTime);

    const shiftEnd = getTimeInHHmm(shiftEndTime);

    let shiftStartValue = getArrowValue(shiftStart);

    let shiftEndValue = getArrowValue(shiftEnd);

    shiftStartValue =
      shiftStartValue < slotStartTime
        ? shiftStartValue + totalDots
        : shiftStartValue;

    shiftEndValue =
      shiftEndValue < shiftStartValue
        ? shiftEndValue + totalDots
        : shiftEndValue;

    return type === "END" ? shiftEndValue : shiftStartValue;
  };

  const isHighlighted = (index: number) => {
    const wrappedValue = (index + slotStartTime) % totalDots;

    return highlightedIntervals.some(
      (interval) =>
        wrappedValue >= parseFloat(getTimeInHHmm(interval.in_time)) &&
        wrappedValue <= parseFloat(getTimeInHHmm(interval.out_time))
    );
  };

  const marks = Array.from({ length: totalDots }, (_, index) => ({
    value: (index + slotStartTime) % totalDots,
    label: "",
    highlighted: isHighlighted((index + slotStartTime) % totalDots),
  }));

  return (
    <Stack sx={{ position: "relative", width: "100%" }}>
      <TimelineTrackSegments
        totalDots={totalDots}
        intervals={highlightedIntervals}
        startTimeline={slotStartTime}
      />
      <Tooltip
        title={`Shift Start: ${getTimeInHHmm(shiftStartTime)}`}
        arrow
        placement="top"
      >
        <Box
          sx={{
            cursor: "pointer",
            position: "absolute",
            top: "12px",
            zIndex: 2,
            left: `${(((getArrowPosition(shiftStartTime, shiftEndTime, "START") - slotStartTime) % totalDots) / (totalDots - 1)) * 100}%`,
          }}
        >
          <ArrowUp />
        </Box>
      </Tooltip>
      <Tooltip
        title={`Shift End: ${getTimeInHHmm(shiftEndTime)}`}
        arrow
        placement="top"
      >
        <Box
          sx={{
            cursor: "pointer",
            position: "absolute",
            top: "12px",
            zIndex: 2,
            left: `${(((getArrowPosition(shiftStartTime, shiftEndTime, "END") - slotStartTime) % totalDots) / (totalDots - 1)) * 100}%`,
          }}
        >
          <ArrowUp />
        </Box>
      </Tooltip>
      <Slider
        valueLabelDisplay="off"
        marks={marks}
        max={totalDots - 1}
        step={1}
        value={highlightedIntervals
          .map((interval) => [
            (parseFloat(getTimeInHHmm(interval.in_time)) -
              slotStartTime +
              totalDots) %
              totalDots,
            (parseFloat(getTimeInHHmm(interval.out_time)) -
              slotStartTime +
              totalDots) %
              totalDots,
          ])
          .flat()}
        sx={{
          zIndex: 1,
          "& .MuiSlider-track": {
            background: "transparent",
            height: 1,
            border: "none",
          },
          "& .MuiSlider-mark": {
            backgroundColor: "gray",
            height: 4,
            width: 4,
            borderRadius: "50%",
          },
          "& .MuiSlider-markActive": {
            backgroundColor: "transparent",
            height: 5,
            width: 5,
          },
          "& .MuiSlider-rail": {
            height: 2,
            backgroundColor: "#929292",
          },
          "& .MuiSlider-thumb": {
            display: "none",
          },
        }}
      />
    </Stack>
  );
};
