import {
  InputLabel,
  TextField as MuiTextField,
  Stack,
  type TextFieldProps as MuiTextFieldProps,
} from "@mui/material";
import type { KeyboardEvent } from "react";
import {
  useController,
  type ControllerRenderProps,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Skeleton } from "./Skeleton";

export type TextFieldProps<P extends FieldValues> = UseControllerProps<P> &
  Omit<MuiTextFieldProps, keyof ControllerRenderProps<P>> & {
    label?: string;
    loading?: boolean;
    rows?: number;
    isCapitalize?: boolean;
    isTrimStartDisabled?: boolean;
  };

export function TextField<P extends FieldValues>({
  control,
  name,
  defaultValue,
  label = "",
  rules,
  type,
  required,
  disabled,
  loading = false,
  placeholder = "",
  isCapitalize = false,
  isTrimStartDisabled = false,
  rows,
  ...inputFieldProps
}: TextFieldProps<P>) {
  const {
    field: { value, onChange, ...restField },
  } = useController({ name, control, defaultValue, rules });

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "-" && type === "number") {
      event.preventDefault();
    }
  };

  if (loading) {
    return <Skeleton rows={rows} />;
  }

  return (
    <Stack gap="10px">
      {label && <InputLabel required={required}>{label}</InputLabel>}

      <MuiTextField
        disabled={disabled}
        required={required}
        fullWidth
        onKeyDown={handleKeyDown}
        placeholder={placeholder || label}
        type={type}
        inputProps={{
          min: 0,
        }}
        onChange={(event) => {
          let value = event.target.value || null;

          if (typeof value === "string" && value.trim() === "") {
            value = null;
          } else if (!isTrimStartDisabled && typeof value === "string") {
            value = value.trimStart();
          }

          if (value && type === "number") {
            onChange(Number(value));
          } else if (isCapitalize) {
            onChange(value ? value?.toUpperCase() : null);
          } else {
            onChange(value);
          }
        }}
        value={typeof value === "string" ? value.trimStart() : value}
        {...restField}
        {...inputFieldProps}
      />
    </Stack>
  );
}
