import { IconButton, Menu, menuClasses, type CSSObject } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MenuStyled = styled(Menu)(({ theme }) => {
  const style: CSSObject = {
    [`& .${menuClasses.paper}`]: {
      boxShadow: theme.palette.app.paperBoxShadow,
      minWidth: "29rem",
      width: "auto",
      margin: "0 0.5rem",
      borderRadius: "8px",
      overflow: "visible",
      "& .MuiList-root": {
        padding: "0",
        overflow: "visible",
      },
    },
  };

  return style;
});

export const IconButtonStyled = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "isOpened",
})<{ isOpened?: boolean }>(({ theme, isOpened }) => {
  const { color } = theme.palette.app;

  const style: CSSObject = {
    paddingInline: "0.2rem 0.8rem",
    paddingBlock: "0.2rem",
    borderRadius: "20px",
    background: isOpened ? color.butterflyBlue[500] : color.slate[800],
    border: `1px solid ${isOpened ? color.butterflyBlue[900] : color.iron[700]}`,
  };

  return style;
});
