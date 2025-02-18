import { Box, styled } from "@mui/material";

export type FileUploadContainerProps = {
  error?: boolean;
};

export const FileUploadContainer = styled(Box)<FileUploadContainerProps>(
  ({ theme, error }) => ({
    border: error
      ? `2px dashed ${theme.palette.app.color.red[900]}`
      : `2px dashed ${theme.palette.app.color.iron[800]}`,
    borderRadius: "8px",
    cursor: "pointer",
    "&:hover": {
      borderColor: theme.palette.app.color.butterflyBlue[900],
    },
  })
);

export const FileInput = styled("input")({
  display: "none",
});
