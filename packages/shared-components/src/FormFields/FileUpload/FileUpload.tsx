import { InputLabel, Stack, Typography, useTheme } from "@mui/material";
import { drop, isFunction, join, last, remove, split } from "lodash";
import { useRef } from "react";
import type {
  FieldValues,
  UseControllerProps,
  UseFormSetError,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { PadBox } from "../../PadBox";
import { SvgsDrop } from "../../Svgs";
import {
  isFileSizeValid,
  isFileTypeValid,
} from "./../../../../../apps/web/utils/file";
import { FileInput, FileUploadContainer } from "./FileUpload.styled";
import { Skeleton } from "./Skeleton";
import { UploadedFileName } from "./UploadedFileName";

export type FileUploadProps<P extends FieldValues> = UseControllerProps<P> & {
  multiple?: boolean;
  loading?: boolean;
  isDisabled?: boolean;
  onChange: (file: File[]) => void;
  onDelete: (file: string[]) => void;
  uploadedFiles: string[];
  error?: boolean;
  helperText?: string;
  label?: string;
  size?: number; //Note:- Size in MB
  accept?: string;
  setError?: UseFormSetError<FieldValues>;
};

export function FileUpload<P extends FieldValues>({
  loading = false,
  uploadedFiles,
  onChange,
  onDelete,
  isDisabled,
  multiple = false,
  error,
  helperText,
  label,
  size = 10,
  setError,
  accept = ".png,.jpg,.jpeg,.doc,.docx,.pdf",
  ...restProps
}: FileUploadProps<P>) {
  const theme = useTheme();

  const { red } = theme.palette.app.color;

  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const getFileName = (url: string) => {
    const imageName = join(drop(split(last(split(url, "/")), "_")), "_");

    return imageName;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);

      const uploadFiles: File[] = [];

      const inValidFiles: string[] = [];

      let isShowError: boolean = false;

      for (const element of files) {
        if (!isFileSizeValid(element, size)) {
          isShowError = true;

          inValidFiles.push(
            t("fileUpload.fileSize.error.message", {
              fileName: element.name,
              fileSize: size,
            })
          );
        } else if (!isFileTypeValid(element)) {
          isShowError = true;

          inValidFiles.push(
            t("fileUpload.fileType.error.message", {
              fileName: element.name,
            })
          );
        } else {
          uploadFiles.push(element);
        }
      }

      if (isShowError) {
        if (isFunction(setError)) {
          setError("document_url", {
            type: "custom",
            message: inValidFiles.join("\n"),
          });
        }

        return;
      }

      if (uploadFiles?.length > 0) {
        onChange(uploadFiles);
      }
    }
  };

  const handleFileRemove = (index: number) => {
    if (multiple && Array.isArray(uploadedFiles)) {
      const copyOfUploadedFiles = [...uploadedFiles];

      remove(copyOfUploadedFiles, (_, i) => i === index);

      onDelete(copyOfUploadedFiles.length > 0 ? copyOfUploadedFiles : []);
    } else {
      onDelete([]);
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const renderFileNames = () => {
    if (!uploadedFiles) {
      return null;
    }

    if (Array.isArray(uploadedFiles)) {
      return uploadedFiles.map((file: string, index: number) => {
        return (
          <UploadedFileName
            key={uuidv4()}
            fileName={getFileName(file)}
            onDelete={() => handleFileRemove(index)}
          />
        );
      });
    }
  };

  if (loading) {
    return <Skeleton />;
  }

  return (
    <Stack gap="10px">
      <InputLabel required>{label}</InputLabel>

      <FileUploadContainer
        onClick={() => inputRef.current?.click()}
        error={error}
        {...restProps}
      >
        <PadBox padding={{ padding: "20px" }}>
          <Stack gap="4px" alignItems="center" justifyContent="center">
            <FileInput
              disabled={isDisabled}
              type="file"
              accept={accept}
              ref={inputRef}
              onChange={handleFileChange}
              multiple={multiple}
            />

            <SvgsDrop />

            <Typography>Drag & drop files or Browse</Typography>

            <Typography variant="caption">
              Only JPG, PNG, PDF files are accepted.
            </Typography>
          </Stack>
        </PadBox>
      </FileUploadContainer>

      {error && (
        <Typography
          variant="caption"
          sx={{
            color: `${red[900]}`,
            whiteSpace: "pre",
            textWrap: "wrap",
          }}
        >
          {helperText}
        </Typography>
      )}

      {renderFileNames()}
    </Stack>
  );
}
