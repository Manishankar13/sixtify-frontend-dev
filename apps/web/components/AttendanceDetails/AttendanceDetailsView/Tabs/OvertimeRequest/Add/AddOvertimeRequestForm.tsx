import { zodResolver } from "@hookform/resolvers/zod";
import {
  CancelOutlined as CancelIcon,
  CheckCircleOutline as CheckIcon,
  HourglassEmptyOutlined as HourglassIcon,
} from "@mui/icons-material";
import { alpha, Avatar, Box, Stack, Typography, useTheme } from "@mui/material";
import {
  Chip,
  DatePicker,
  FormRow,
  TextField,
  TimePicker,
  toasts,
} from "@repo/shared-components";
import {
  formatDate,
  getTimeInHHmm,
} from "@repo/shared-components/src/utils/date";
import { capitalize, has } from "lodash";
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
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { useEnableDisableSubmitButtonToggle } from "../../../../../../hooks/useEnableDisableSubmitButtonToggle";
import { dateFormat } from "../../../../../../utils/date";
import {
  filterChangedFormFields,
  resetDependentFields,
} from "../../../../../../utils/helper";
import {
  getColorByVariant,
  type StatusType,
} from "../../../../../Transactions/Leave/LeaveOverview/LeaveDetails/LeaveBalance/colorVariant";
import type { AttendanceDetails } from "../../../../AttendanceSummary/hooks/type";
import { EmpShiftData } from "./Dialog/EmpShiftData";
import type { OneOvertimeRequest } from "./hooks/useGetOneOvertimeRequest";
import { useGetOvertimeRequest } from "./hooks/useGetOvertimeRequest";

const OvertimeRequestFormSchema = z
  .object({
    overtime_date: z
      .string()
      .nullable()
      .refine((value) => !!value, {
        message: "common.required",
      }),
    in_time_overtime: z.string().nullable(),
    out_time_overtime: z.string().nullable(),
    remark: z.string().nullable().nullable(),
    shift_start: z.string().nullable(),
    shift_end: z.string().nullable(),
  })
  .superRefine((val, ctx) => {
    if (!val.in_time_overtime && !val.out_time_overtime) {
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

    if (val.shift_start && val.shift_end) {
      if (
        val.in_time_overtime &&
        getTimeInHHmm(val.shift_start) < getTimeInHHmm(val.in_time_overtime)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Requested OT hours for In OT must be before the shift start time.",
          path: ["in_time_overtime"],
        });
      }

      if (
        val.out_time_overtime &&
        getTimeInHHmm(val.shift_end) > getTimeInHHmm(val.out_time_overtime)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Requested OT hours for Out OT must be after the shift end time.",
          path: ["out_time_overtime"],
        });
      }
    }
  });

export type OvertimeRequestFormFieldValues = z.infer<
  typeof OvertimeRequestFormSchema
>;

type OvertimeRequestFormProps = {
  defaultValues?: OvertimeRequestFormFieldValues;
  loading?: boolean;
  attendanceDetails: AttendanceDetails;
  overtimeDetails?: OneOvertimeRequest;
  isView?: boolean;
  isEnabled?: boolean;
};

export type FormRef = {
  submitForm: (
    onSubmit: (formValues: Partial<OvertimeRequestFormFieldValues>) => void
  ) => void;
  setError: UseFormSetError<OvertimeRequestFormFieldValues>;
};

const formDefaultValues: OvertimeRequestFormFieldValues = {
  overtime_date: null,
  remark: null,
  in_time_overtime: null,
  out_time_overtime: null,
  shift_start: null,
  shift_end: null,
};

export const AddOvertimeRequestForm = forwardRef(
  (
    {
      defaultValues = formDefaultValues,
      attendanceDetails,
      loading = false,
      overtimeDetails,
      isView = false,
      isEnabled,
    }: OvertimeRequestFormProps,
    ref: ForwardedRef<FormRef>
  ) => {
    const { t } = useTranslation();

    const theme = useTheme();

    const { butterflyBlue, slate, iron } = theme.palette.app.color;

    const {
      control,
      clearErrors,
      setError,
      watch,
      setValue,
      formState: { errors, dirtyFields },
      handleSubmit,
    } = useForm({
      values: defaultValues,
      resolver: zodResolver(OvertimeRequestFormSchema),
      mode: "all",
    });

    useEnableDisableSubmitButtonToggle({
      errors,
      isFormChanged: !!Object.keys(dirtyFields).length,
    });

    const overtimeDate = watch("overtime_date") ?? "";

    const inTimeOvertime = watch("in_time_overtime");

    const outTimeOvertime = watch("out_time_overtime");

    const {
      data: overtimeRequest,
      isError,
      error,
      isFetching,
    } = useGetOvertimeRequest({
      employeeId: attendanceDetails.id,
      selectDate: overtimeDate,
      isEnabled,
    });

    useMemo(() => {
      if (isError) {
        toasts.error({
          title: error?.response?.data?.message,
        });
      }
    }, [isError]);

    useEffect(() => {
      if (overtimeRequest) {
        setValue("shift_start", overtimeRequest.shift_start);

        setValue("shift_end", overtimeRequest.shift_end);
      }
    }, [overtimeRequest]);

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
          const filterFormValues = filterChangedFormFields(
            formValues,
            dirtyFields
          );

          onSubmit(filterFormValues);
        })();
      },
      setError,
    }));

    const dependentFieldsMap: Partial<
      Record<
        keyof OvertimeRequestFormFieldValues,
        (keyof OvertimeRequestFormFieldValues)[]
      >
    > = {
      overtime_date: ["in_time_overtime", "out_time_overtime"],
    };

    useMemo(() => {
      resetDependentFields({
        fieldName: "overtime_date",
        fieldValue: overtimeDate,
        dirtyFields,
        setValue,
        clearErrors,
        dependentFieldsMap,
      });
    }, [overtimeDate]);

    const errorMessages = (messageKey?: string) => {
      return messageKey && t(messageKey);
    };

    const iconMappings: Record<StatusType, typeof CheckIcon> = {
      approved: CheckIcon,
      rejected: CancelIcon,
      cancelled: CancelIcon,
      pending: HourglassIcon,
    };

    const getStatusIcon = (status: StatusType): JSX.Element => {
      const IconComponent = iconMappings[status];

      return <IconComponent fontSize="small" />;
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

          {overtimeDetails?.overtime_date ? (
            <Stack gap="10px" alignItems="center">
              <Typography variant="subtitle1">Overtime Date</Typography>

              <Typography variant="body2">
                {formatDate(overtimeDetails.overtime_date)}
              </Typography>
            </Stack>
          ) : (
            <Box width="100%" maxWidth="300px">
              <DatePicker
                name="overtime_date"
                control={control}
                label="Overtime Request Date"
                required
                disabled={!!defaultValues.overtime_date}
                loading={loading}
                error={!!errors.overtime_date}
                helperText={errorMessages(errors.overtime_date?.message)}
              />
            </Box>
          )}
        </Stack>

        <EmpShiftData
          overtimeRequest={overtimeRequest ?? overtimeDetails}
          loading={isFetching}
        />

        <FormRow maxColumn={2}>
          {(has(overtimeRequest, "work_in_time_overtime") ||
            has(overtimeDetails, "work_in_time_overtime")) && (
            <TimePicker
              name="in_time_overtime"
              control={control}
              label="Requested OT Hours (In Time)"
              disabled={isView || !overtimeDate}
              loading={loading}
              error={!!errors.in_time_overtime}
              helperText={errorMessages(errors.in_time_overtime?.message)}
            />
          )}

          {(has(overtimeRequest, "work_out_time_overtime") ||
            has(overtimeDetails, "work_out_time_overtime")) && (
            <TimePicker
              name="out_time_overtime"
              control={control}
              label="Requested OT Hours (Out Time)"
              disabled={isView || !overtimeDate}
              loading={loading}
              error={!!errors.out_time_overtime}
              helperText={errorMessages(errors.out_time_overtime?.message)}
            />
          )}
        </FormRow>

        <TextField
          control={control}
          label="Remark"
          name="remark"
          disabled={isView}
          fullWidth
          multiline
          loading={loading}
          error={!!errors.remark}
          helperText={errorMessages(errors.remark?.message)}
        />

        {isView && (
          <>
            <Typography variant="body1" fontWeight={500}>
              Status :
            </Typography>
            {overtimeDetails?.status && !overtimeDetails?.approvals?.length && (
              <Chip
                icon={getStatusIcon(overtimeDetails.status)}
                variant="outlined"
                label={capitalize(overtimeDetails.status)}
                sx={{
                  width: "fit-content",
                  color: getColorByVariant(overtimeDetails.status),
                  backgroundColor: alpha(
                    getColorByVariant(overtimeDetails.status) ?? "transparent",
                    0.1
                  ),
                }}
              />
            )}
            {overtimeDetails?.approvals?.map((approval) => (
              <Stack
                direction="row"
                gap="10px"
                alignItems="center"
                borderRadius="5px"
                key={uuidv4()}
              >
                <Chip
                  icon={getStatusIcon(approval.status)}
                  variant="outlined"
                  label={capitalize(approval.status)}
                  sx={{
                    width: "fit-content",
                    color: getColorByVariant(approval.status),
                    backgroundColor: alpha(
                      getColorByVariant(approval.status) ?? "transparent",
                      0.1
                    ),
                  }}
                />
                <Avatar
                  src={approval.approval_avatar ?? null}
                  alt="Approver Photo"
                  sx={{ width: 30, height: 30 }}
                />
                <Stack direction="column" borderRadius="5px">
                  <Typography variant="body2" color={iron[500]}>
                    {approval?.level}
                  </Typography>
                  <Stack direction="row" gap="10px" borderRadius="5px">
                    <Typography variant="body2" fontWeight={400}>
                      {approval.approval_by_name ?? "-"}
                    </Typography>

                    <Typography variant="body2" color={iron[500]}>
                      {approval?.approval_at
                        ? dateFormat(approval.approval_at)
                        : "-"}
                    </Typography>
                  </Stack>

                  <Typography variant="body2" fontWeight={400}>
                    {approval.remark ?? "-"}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </>
        )}
      </Stack>
    );
  }
);

AddOvertimeRequestForm.displayName = "AddOvertimeRequestForm";
