import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { InputLabel, Stack, useTheme } from "@mui/material";
import type { DatePickerProps as MuiDatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import type { PickerValidDate } from "@mui/x-date-pickers/models";
import { isFunction } from "lodash";
import { DateTime } from "luxon";
import React, { useState } from "react";
import type {
  FieldError,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { useController } from "react-hook-form";
import { CalendarAction } from "../../Actions";
import { Skeleton } from "./Skeleton";

export type DatePickerProps<P extends FieldValues> = UseControllerProps<P> &
  MuiDatePickerProps<PickerValidDate> &
  Partial<{
    label: string;
    required: boolean;
    disabled: boolean;
    format: string;
    error: boolean;
    helperText: string;
    loading: boolean;
    clearable?: boolean;
    setError: (
      name: keyof P,
      error: FieldError | { type: string; message?: string }
    ) => void;
  }>;

export const dateFormats = {
  dateWithISO8601: "yyyy-MM-dd",
  dateWithEuropean: "dd-MM-yyyy",
};

export const LeftArrowIcon: React.FC = () => {
  const theme = useTheme();

  const { iron } = theme.palette.app.color;

  return (
    <ChevronLeftIcon
      sx={{
        border: `1px solid ${iron[800]}`,
        borderRadius: "5px",
        p: "4px",
      }}
    />
  );
};

export const RightArrowIcon: React.FC = () => {
  const theme = useTheme();

  const { iron } = theme.palette.app.color;

  return (
    <ChevronRightIcon
      sx={{
        border: `1px solid ${iron[800]}`,
        borderRadius: "5px",
        p: "4px",
      }}
    />
  );
};

export function DatePicker<P extends FieldValues>({
  setError,
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
  clearable = true,
  rules,
  format = dateFormats.dateWithEuropean,
  ...restProps
}: DatePickerProps<P>) {
  const {
    field: { value, onChange, ...restField },
  } = useController({ name, control, defaultValue, rules });

  const [open, setOpen] = useState(false);

  const theme = useTheme();

  const { iron, butterflyBlue, mirage } = theme.palette.app.color;

  const finalValue = value ? DateTime.fromISO(value) : null;

  if (loading) {
    return <Skeleton />;
  }

  const EmptyIcon = () => null;

  return (
    <Stack gap="10px">
      <InputLabel required={required}>{label}</InputLabel>

      <MuiDatePicker<DateTime>
        {...restField}
        {...restProps}
        disabled={disabled}
        format={format}
        value={finalValue}
        readOnly={readOnly}
        open={open && !readOnly}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        slotProps={{
          field: {
            clearable,
            onClear: () => onChange(null),
          },
          textField: {
            disabled,
            helperText,
            error,
            InputProps: {
              endAdornment: (
                <CalendarAction
                  disabled={disabled}
                  onClick={() => setOpen(true)}
                />
              ),
              sx: {
                "& .MuiInputAdornment-root": {
                  width: "30px",
                },
              },
            },
          },
          day: {
            sx: {
              "&.MuiPickersDay-root": {
                borderRadius: "5px",
                borderColor: butterflyBlue[900],
                fontWeight: 500,
                color: mirage[900],
              },
              "&.MuiPickersDay-root.Mui-selected": {
                backgroundColor: butterflyBlue[900],
                color: iron[600],
              },
              "&.MuiPickersDay-today": {
                color: butterflyBlue[900],
                backgroundColor: iron[600],
              },
            },
          },
          calendarHeader: {
            sx: {
              "& .MuiPickersCalendarHeader-label": {
                fontWeight: "bold",
              },
            },
          },
          yearButton: {
            sx: {
              "&.MuiPickersYear-yearButton.Mui-selected": {
                backgroundColor: butterflyBlue[900],
              },
            },
          },
          monthButton: {
            sx: {
              "&.MuiPickersMonth-monthButton.Mui-selected": {
                backgroundColor: butterflyBlue[900],
              },
            },
          },
        }}
        slots={{
          leftArrowIcon: LeftArrowIcon,
          rightArrowIcon: RightArrowIcon,
          switchViewIcon: EmptyIcon,
        }}
        dayOfWeekFormatter={(weekday) => `${weekday.toFormat("ccc")}`}
        onChange={(value, details) => {
          if (details.validationError) {
            if (isFunction(setError)) {
              setError(name, {
                type: "manual",
                message: "common.date.invalid",
              });
            }
          } else if (value) {
            onChange(value.toISODate());
          }
        }}
      />
    </Stack>
  );
}
