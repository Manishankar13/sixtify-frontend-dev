import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Children } from "react";

function calculateWidth(
  childrenCount: number,
  fullWidth: boolean,
  maxColumn: number
) {
  if (maxColumn <= 2 && childrenCount <= 2 && !fullWidth) {
    return "calc(50% - 10px)";
  }

  if (childrenCount <= 3 && !fullWidth) {
    return "calc(33% - 20px)";
  }

  return "100%";
}

export const RowContainerStyled = styled(Stack, {
  shouldForwardProp(prop) {
    return prop !== "fullWidth";
  },
})<{ fullWidth: boolean; maxColumn: number }>(({
  children,
  fullWidth,
  maxColumn,
}) => {
  const childrenCount = Children.toArray(children).length;

  const flexBasis = calculateWidth(childrenCount, fullWidth, maxColumn);

  return {
    "& > *": {
      flexBasis,
    },
  };
});
