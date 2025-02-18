import { AttachFile } from "@mui/icons-material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { IconButton, Stack, Typography } from "@mui/material";

type UploadedFileNameProps = {
  fileName: string;
  onDelete: () => void;
};

export const UploadedFileName = ({
  fileName,
  onDelete,
}: UploadedFileNameProps) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" gap="8x">
        <AttachFile />

        <Typography>{fileName}</Typography>
      </Stack>

      <IconButton onClick={onDelete}>
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </Stack>
  );
};
