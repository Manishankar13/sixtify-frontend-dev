import { InputLabel, Stack, Tooltip, useTheme } from "@mui/material";
import type { TimePickerProps as MuiTimePickerProps } from "@mui/x-date-pickers/TimePicker";
import { TimePicker as MuiTimePicker } from "@mui/x-date-pickers/TimePicker";
import type { PickerValidDate } from "@mui/x-date-pickers/models";
import { DateTime } from "luxon";
import { type ReactElement, useState } from "react";
import type {
  FieldValues,
  Path,
  PathValue,
  UseControllerProps,
} from "react-hook-form";
import { useController } from "react-hook-form";
import { Skeleton } from "./Skeleton";

export type TimePickerProps<P extends FieldValues> = UseControllerProps<P> &
  MuiTimePickerProps<PickerValidDate> &
  Partial<{
    label: string;
    required: boolean;
    disabled: boolean;
    format: string;
    error: boolean;
    helperText: string;
    loading: boolean;
    isReturnLocalTime: boolean;
    isReturnDateWithTime: boolean;
    helperIcon?: ReactElement;
    toolTipText?: string;
  }>;

export function TimePicker<P extends FieldValues>({
  control,
  defaultValue,
  disabled = false,
  label,
  readOnly = false,
  name,
  error = false,
  helperText,
  loading = false,
  required = false,
  rules,
  format = "HH:mm",
  isReturnLocalTime = false,
  isReturnDateWithTime = false,
  helperIcon,
  toolTipText,
  ...restProps
}: TimePickerProps<P>) {
  const {
    field: { value, onChange, ...restField },
  } = useController({ name, control, defaultValue, rules });

  const [open, setOpen] = useState(false);

  if (error && value && typeof value === "object") {
    helperText = "Invalid time";
  }

  const theme = useTheme();

  const { butterflyBlue } = theme.palette.app.color;

  const pickerValue = value
    ? (DateTime.fromISO(value) as PathValue<P, Path<P> & (string | undefined)>)
    : null;

  if (loading) {
    return <Skeleton label={label} />;
  }

  return (
    <Stack gap="10px">
      {label && (
        <Stack alignItems="center" flexDirection="row" gap="5px">
          <InputLabel required={required} disabled={disabled}>
            {label}
          </InputLabel>
          {helperIcon && toolTipText && (
            <Tooltip title={toolTipText} placement="bottom">
              {helperIcon}
            </Tooltip>
          )}
        </Stack>
      )}

      <MuiTimePicker<DateTime>
        {...restField}
        {...restProps}
        disabled={disabled}
        readOnly={readOnly}
        open={open}
        ampm={false}
        value={pickerValue}
        format={format}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        slotProps={{
          textField: {
            disabled,
            helperText,
            error,
            sx: {
              backgroundColor: "white",
              "& .Mui-selected": {
                backgroundColor: butterflyBlue[900],
                borderRadius: "5px",
              },
            },
          },
          popper: {
            sx: {
              "& .MuiList-padding": {
                padding: "10px",
              },
              "& .MuiMultiSectionDigitalClockSection-item": {
                padding: "4px",
              },
              "& .MuiMultiSectionDigitalClockSection-item.Mui-selected": {
                backgroundColor: butterflyBlue[900],
                borderRadius: "5px",
              },
              "& .MuiMultiSectionDigitalClockSection-item.Mui-selected:hover": {
                backgroundColor: butterflyBlue[900],
                borderRadius: "5px",
              },
              "& .Mui-selected:hover": {
                backgroundColor: butterflyBlue[900],
                borderRadius: "5px",
              },
              "& .MuiMultiSectionDigitalClockSection-item.Mui-selected:focus-visible":
                {
                  backgroundColor: butterflyBlue[900],
                  borderRadius: "5px",
                },
              "& .Mui-selected:focus-visible": {
                backgroundColor: butterflyBlue[900],
                borderRadius: "5px",
              },
            },
          },
        }}
        onChange={(value) => {
          if (value?.isValid) {
            if (isReturnLocalTime) {
              return onChange(value.toFormat(format));
            }

            if (isReturnDateWithTime) {
              return onChange(value.toUTC().toISO());
            }

            onChange(value.toUTC().toISOTime());
          } else {
            onChange(value);
          }
        }}
      />
    </Stack>
  );
}
