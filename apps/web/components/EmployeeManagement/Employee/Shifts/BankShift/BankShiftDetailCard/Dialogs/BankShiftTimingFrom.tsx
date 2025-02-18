import { Stack, Typography } from "@mui/material";
import { PadBox } from "@repo/shared-components";
import type { Control, FieldErrors, UseFormWatch } from "react-hook-form";
import type { BankShiftFormFieldValues, DayOfWeek } from "./BankShiftForm";
import { BankShiftRow } from "./BankShiftRow";

const daysOfWeek: DayOfWeek[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const headers = [
  "Working Day",
  "Bank Shift From Time",
  "Bank Shift To Time",
  "Bank Shift Hours",
];

type BankShiftTimingProps = {
  control: Control<BankShiftFormFieldValues>;
  watch: UseFormWatch<BankShiftFormFieldValues>;
  errors: FieldErrors<BankShiftFormFieldValues>;
  loading: boolean;
  disabled?: boolean;
};

export const BankShiftTimingForm = ({
  control,
  watch,
  errors,
  loading,
  disabled = false,
}: BankShiftTimingProps) => {
  return (
    <Stack gap="20px">
      <PadBox padding={{ paddingTop: "10px" }}>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Bank Shift Timings
        </Typography>
      </PadBox>

      <Stack gap="10px" justifyContent="center">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap="40px"
          sx={{ flex: 1 }}
        >
          {headers.map((header) => (
            <Typography
              fontWeight="bold"
              key={header}
              sx={{ width: "100%", maxWidth: "250px" }}
            >
              {header}
            </Typography>
          ))}
        </Stack>

        {daysOfWeek.map((day: DayOfWeek) => (
          <BankShiftRow
            control={control}
            key={day}
            day={day}
            watch={watch}
            errors={errors}
            loading={loading}
            disabled={disabled}
          />
        ))}
      </Stack>
    </Stack>
  );
};
