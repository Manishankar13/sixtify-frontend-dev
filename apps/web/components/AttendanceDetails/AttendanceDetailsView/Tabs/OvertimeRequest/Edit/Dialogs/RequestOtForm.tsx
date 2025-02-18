import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Grid, Stack, Typography, useTheme } from "@mui/material";
import {
  CardItemValue,
  FormRow,
  TextField,
  TimePicker,
} from "@repo/shared-components";
import {
  formatDate,
  getTimeInHHmm,
} from "@repo/shared-components/src/utils/date";
import { has } from "lodash";
import {
  type ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
} from "react";
import type { UseFormSetError } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { filterChangedFormFields } from "../../../../../../../utils/helper";
import type { AttendanceDetails } from "../../../../../AttendanceSummary/hooks/type";
import { EmpShiftData } from "../../Add/Dialog/EmpShiftData";
import type { OneOvertimeRequest } from "../../Add/hooks/useGetOneOvertimeRequest";

const RequestOtFormSchema = z
  .object({
    in_time_overtime: z.string().nullable().optional(),
    out_time_overtime: z.string().nullable().optional(),
    remark: z.string().nullable().optional().nullable(),
    status: z.enum(["approved", "rejected", "cancelled"]).nullable(),
    shift_start: z.string().nullable(),
    shift_end: z.string().nullable(),
  })
  .superRefine((values, ctx) => {
    if (values.status === "rejected" && !values.remark) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Remark is required when rejecting or canceling.",
        path: ["remark"],
      });
    }

    if (!values.in_time_overtime && !values.out_time_overtime) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "At least one of in time overtime or out time overtime must be provided.",
        path: ["in_time_overtime"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "At least one of in time overtime or out time overtime must be provided.",
        path: ["out_time_overtime"],
      });
    }

    if (values.shift_start && values.shift_end) {
      if (
        values.in_time_overtime &&
        getTimeInHHmm(values.shift_start) <
          getTimeInHHmm(values.in_time_overtime)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Final OT Hours for In OT must be before the shift start time",
          path: ["in_time_overtime"],
        });
      }

      if (
        values.out_time_overtime &&
        getTimeInHHmm(values.shift_end) >
          getTimeInHHmm(values.out_time_overtime)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Final OT Hours for Out OT must be after the shift end time.",
          path: ["out_time_overtime"],
        });
      }
    }
  });

export type RequestOtFormFieldValues = z.infer<typeof RequestOtFormSchema>;

type RequestOtFormProps = {
  defaultValues?: RequestOtFormFieldValues;
  loading?: boolean;
  overtimeDetails?: OneOvertimeRequest;
  attendanceDetails: AttendanceDetails;
};

export type FormRef = {
  submitForm: (
    onSubmit: (formValues: Partial<RequestOtFormFieldValues>) => void
  ) => void;
  setError: UseFormSetError<RequestOtFormFieldValues>;
};

const formDefaultValues: RequestOtFormFieldValues = {
  remark: null,
  in_time_overtime: null,
  out_time_overtime: null,
  status: null,
  shift_start: null,
  shift_end: null,
};

export const RequestOtForm = forwardRef(
  (
    {
      defaultValues = formDefaultValues,
      overtimeDetails,
      loading = false,
      attendanceDetails,
    }: RequestOtFormProps,
    ref: ForwardedRef<FormRef>
    // eslint-disable-next-line sonarjs/cognitive-complexity
  ) => {
    const { t } = useTranslation();

    const theme = useTheme();

    const { butterflyBlue, slate } = theme.palette.app.color;

    const {
      watch,
      control,
      clearErrors,
      setValue,
      setError,
      formState: { errors, dirtyFields },
      handleSubmit,
    } = useForm({
      values: defaultValues,
      resolver: zodResolver(RequestOtFormSchema),
      mode: "all",
    });

    const formType = defaultValues.status;

    const inTimeOvertime = watch("in_time_overtime");

    const outTimeOvertime = watch("out_time_overtime");

    useEffect(() => {
      if (overtimeDetails) {
        setValue("shift_start", overtimeDetails.shift_start);

        setValue("shift_end", overtimeDetails.shift_end);
      }
    }, [overtimeDetails]);

    useMemo(() => {
      if (!outTimeOvertime) {
        clearErrors("out_time_overtime");
      }

      if (!inTimeOvertime) {
        clearErrors("in_time_overtime");
      }
    }, [inTimeOvertime, outTimeOvertime]);

    useImperativeHandle(ref, () => ({
      submitForm(onSubmit) {
        handleSubmit((formValues) => {
          const filterFormValues = filterChangedFormFields(formValues, {
            ...dirtyFields,
            status: true,
          });

          onSubmit(filterFormValues);
        })();
      },
      setError,
    }));

    const errorMessages = (messageKey?: string) => {
      return messageKey && t(messageKey);
    };

    return (
      <Stack gap="10px">
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            border: `1px solid ${butterflyBlue[300]}`,
            borderRadius: "5px",
            padding: "10px",
            backgroundColor: slate[800],
          }}
        >
          <Stack flexDirection="row" gap="15px" alignItems="center">
            <Avatar
              sx={{ height: "50px", width: "50px" }}
              src={attendanceDetails?.avatar ?? ""}
            />

            <Typography variant="subtitle1" fontWeight={500}>
              {attendanceDetails?.employee_name}
            </Typography>
          </Stack>

          <Stack gap="10px" alignItems="center">
            <Typography variant="subtitle1">Overtime Date</Typography>

            {overtimeDetails?.overtime_date ? (
              <Typography variant="body2">
                {overtimeDetails?.overtime_date &&
                  formatDate(overtimeDetails.overtime_date)}
              </Typography>
            ) : (
              "-"
            )}
          </Stack>
        </Stack>

        <EmpShiftData overtimeRequest={overtimeDetails} loading={loading} />

        {overtimeDetails && formType === "cancelled" ? (
          <Grid container spacing={2}>
            <Grid gap="5px" item xs={6}>
              <Typography variant="subtitle1">
                Final OT Hours (In Time)
              </Typography>

              <CardItemValue
                title={
                  overtimeDetails.in_time_overtime
                    ? getTimeInHHmm(overtimeDetails.in_time_overtime)
                    : "-"
                }
                loading={loading}
              />
            </Grid>
            <Grid gap="5px" item xs={6}>
              <Typography variant="subtitle1">
                Final OT Hours (Out Time)
              </Typography>

              <CardItemValue
                title={
                  overtimeDetails.out_time_overtime
                    ? getTimeInHHmm(overtimeDetails.out_time_overtime)
                    : "-"
                }
                loading={loading}
              />
            </Grid>
          </Grid>
        ) : (
          <FormRow maxColumn={2}>
            {has(overtimeDetails, "work_in_time_overtime") && (
              <TimePicker
                disabled={formType === "cancelled"}
                name="in_time_overtime"
                control={control}
                label="Final OT Hours (In Time)"
                loading={loading}
                error={!!errors.in_time_overtime}
                helperText={errorMessages(errors.in_time_overtime?.message)}
              />
            )}

            {has(overtimeDetails, "work_out_time_overtime") && (
              <TimePicker
                disabled={formType === "cancelled"}
                name="out_time_overtime"
                control={control}
                label="Final OT Hours (Out Time)"
                loading={loading}
                error={!!errors.out_time_overtime}
                helperText={errorMessages(errors.out_time_overtime?.message)}
              />
            )}
          </FormRow>
        )}

        <Stack gap="10px">
          <Typography variant="subtitle1">Remark</Typography>

          <CardItemValue
            title={overtimeDetails?.remark ?? ""}
            loading={loading}
          />
        </Stack>

        <TextField
          control={control}
          label={
            formType === "rejected"
              ? "Reject Remark"
              : // eslint-disable-next-line sonarjs/no-nested-conditional
                formType === "cancelled"
                ? "Cancel  Remark"
                : "Approve Remark"
          }
          required={formType === "rejected"}
          name="remark"
          fullWidth
          multiline
          loading={loading}
          error={!!errors.remark}
          helperText={errorMessages(errors.remark?.message)}
        />
      </Stack>
    );
  }
);

RequestOtForm.displayName = "RequestOtForm";
