import { Box, Slider, Stack } from "@mui/material";
import {
  getColorByVariant,
  getStatusLabel,
  type WorkDayType,
} from "../utils/colorVariant";

type AttendanceStatusProps = {
  variant: WorkDayType;
};

export const AttendanceStatus = ({ variant }: AttendanceStatusProps) => {
  const color = getColorByVariant(variant);

  return (
    <Stack sx={{ position: "relative", width: "100%", alignItems: "center" }}>
      <Box
        sx={{
          position: "absolute",
          backgroundColor: "#ffffff",
          border: `1px solid ${color}`,
          borderRadius: "7px",
          padding: "0px 5px",
          zIndex: 1,
          color: `${color}`,
          height: "28px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {getStatusLabel(variant)}
      </Box>
      <Slider
        valueLabelDisplay="off"
        value={[0, 2]}
        max={2}
        step={1}
        sx={{
          "& .MuiSlider-track": {
            background: `${color}`,
            height: "2px",
            border: "none",
          },
          "& .MuiSlider-thumb": {
            backgroundColor: `${color}`,
            height: 8,
            width: 8,
          },
          "& .MuiSlider-rail": {
            backgroundColor: "transparent",
          },
        }}
      />
    </Stack>
  );
};
