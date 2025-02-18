import { Box, styled, type CSSObject } from "@mui/material";
import { ToastContainer, type ToastContainerProps } from "react-toastify";

export const ToasterStyled = styled(ToastContainer)<ToastContainerProps>(({
  theme: {
    palette: {
      app: { color },
    },
  },
}) => {
  const toastBody: CSSObject = {
    "& .Toastify__toast-container": {
      padding: "0px",
    },

    "& .Toastify__toast": {
      padding: "0px",
      inlineSize: "400px",
      marginLeft: "-80px",
      borderRadius: "8px",
      border: `2px solid ${color.iron[700]}`,
    },

    "& .Toastify__toast-body": {
      padding: "0px",
    },
  };

  const toastSuccess: CSSObject = {
    "& .Toastify__toast-theme--light.Toastify__toast--success": {
      "& .Toastify__toast-body": {
        borderInlineStart: `6px solid ${color.darkMint[900]}`,
      },
    },
  };

  const toastError: CSSObject = {
    "& .Toastify__toast-theme--light.Toastify__toast--error": {
      "& .Toastify__toast-body": {
        borderInlineStart: `6px solid ${color.red[900]}`,
      },
    },
  };

  const toastWarning: CSSObject = {
    "& .Toastify__toast-theme--light.Toastify__toast--warning": {
      "& .Toastify__toast-body": {
        borderInlineStart: `6px solid ${color.darkOrange[900]}`,
      },
    },
  };

  const toastInfo: CSSObject = {
    "& .Toastify__toast-theme--light.Toastify__toast--info": {
      "& .Toastify__toast-body": {
        borderInlineStart: `6px solid ${color.slate[900]}`,
      },
    },
  };

  return {
    ...toastBody,
    ...toastSuccess,
    ...toastError,
    ...toastWarning,
    ...toastInfo,
  };
});

export const HoverBox = styled(Box)(({ theme }) => ({
  color: theme.palette.app.color.slate[900],

  "&:hover": {
    color: theme.palette.app.color.butterflyBlue[900],
  },
}));
