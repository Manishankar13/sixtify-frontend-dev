import { FileUpload } from "@repo/shared-components";
import type {
  FieldValues,
  UseControllerProps,
  UseFormSetError,
} from "react-hook-form";
import { useController } from "react-hook-form";
import { useUploadFile } from "../../hooks/useUploadFile";
import { onError } from "../../utils/errors";

export type FileUploadFieldProps<P extends FieldValues> =
  UseControllerProps<P> & {
    multiple?: boolean;
    error?: boolean;
    helperText?: string;
    size?: number;
    label?: string;
    accept?: string;
    setError?: UseFormSetError<FieldValues>;
  };

export const FileUploadField = <T extends FieldValues>({
  name,
  multiple,
  control,
  defaultValue,
  rules,
  ...props
}: FileUploadFieldProps<T>) => {
  const {
    field: { value, onChange },
  } = useController({ name, control, defaultValue, rules });

  const { mutate, isPending } = useUploadFile({
    uploadFor: name,

    options: {
      onSuccess: (data) => {
        const newFile = data.data.files;

        const updatedFiles = value ? [...value, ...newFile] : [...newFile];

        onChange(updatedFiles);
      },
      onError: (error) => onError(error),
    },
  });

  return (
    <FileUpload
      isDisabled={isPending}
      loading={isPending}
      name={name}
      control={control}
      onChange={(file) => {
        mutate(file);
      }}
      uploadedFiles={value}
      onDelete={(file) => onChange(file)}
      multiple={multiple}
      defaultValue={value}
      {...props}
    />
  );
};
