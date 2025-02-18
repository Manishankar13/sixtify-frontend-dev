import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Box, Stack, Typography, useTheme } from "@mui/material";
import {
  DatePicker,
  FormRow,
  RadioGroupField,
  TextField,
} from "@repo/shared-components";
import { formatDate } from "@repo/shared-components/src/utils/date";
import { t } from "i18next";
import { isEqual } from "lodash";
import { DateTime } from "luxon";
import type { ForwardedRef } from "react";
import { forwardRef, useImperativeHandle, useMemo } from "react";
import type { UseFormSetError } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useEnableDisableSubmitButton } from "../../../../../../hooks/useEnableDisableSubmitButton";
import { dateDaysDifference } from "../../../../../../utils/date";
import { filterChangedFormFields } from "../../../../../../utils/helper";
import { EmployeeAutocomplete } from "../../../../../common/Autocomplete/EmployeeAutoComplete";
import { LeaveTypesAutocomplete } from "../../../../../common/Autocomplete/LeavePlanTypeAutocomplete";
import { FileUploadField } from "../../../../../common/FileUploadField";
import type { LeaveEmployeeDetails } from "../hooks/useGetLeaveEmployeeDetails";

export const ApplyLeaveFormSchema = z
  .object({
    leave_type_id: z
      .string()
      .nullable()
      .refine((value) => !!value, {
        message: "common.required",
      }),
    from_date: z
      .string()
      .nullable()
      .refine((value) => !!value, {
        message: "common.required",
      }),
    to_date: z
      .string()
      .nullable()
      .refine((value) => !!value, {
        message: "common.required",
      }),
    from_half: z.string().nullable(),
    to_half: z.string().nullable(),
    attachments: z.array(z.string()).optional().nullable(),
    notifies: z.array(z.string()).optional().nullable(),
    reason: z
      .string()
      .max(500, "common.maxCharacterLength")
      .optional()
      .nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.from_date === data.to_date) {
      if (!data.from_half) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["from_half"],
          message: "common.required",
        });
      }
    } else {
      if (!data.from_half) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["from_half"],
          message: "common.required",
        });
      }

      if (!data.to_half) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["to_half"],
          message: "common.required",
        });
      }
    }
  });

export type ApplyLeaveFormFieldValues = z.infer<typeof ApplyLeaveFormSchema>;

type ApplyLeaveProps = {
  leaveDetailsData?: LeaveEmployeeDetails;
  defaultValues?: ApplyLeaveFormFieldValues;
  loading?: boolean;
};

export type FormRef = {
  submitForm: (
    onSubmit: (formValues: Partial<ApplyLeaveFormFieldValues>) => void
  ) => void;
  setError: UseFormSetError<ApplyLeaveFormFieldValues>;
};

export const applyLeaveDefaultValues: ApplyLeaveFormFieldValues = {
  leave_type_id: null,
  from_date: null,
  to_date: null,
  from_half: "full_day",
  to_half: null,
  attachments: null,
  notifies: null,
  reason: null,
};

export const calculateLeaveDetails = (
  from_date: string,
  to_date: string,
  from_half: string | null,
  to_half: string | null,
  withLabel?: boolean
  // eslint-disable-next-line sonarjs/cognitive-complexity
): string => {
  const dateDifference = dateDaysDifference(from_date, to_date);

  if (
    isEqual(from_date, to_date) &&
    ((from_half === "first_half" && to_half === "first_half") ||
      (from_half === "second_half" && to_half === "second_half"))
  ) {
    if (withLabel) {
      return from_half === "first_half"
        ? "0.5 days (First half)"
        : "0.5 days (Second half)";
    }

    return "0.5 days";
  }

  if (isEqual(from_half, to_half)) {
    if (withLabel) {
      return from_half === "first_half"
        ? `${dateDifference + 0.5} days (First half)`
        : `${dateDifference + 0.5} days (Second half)`;
    }

    return `${dateDifference + 0.5} days`;
  }

  if (from_half === "second_half" && to_half === "first_half") {
    return `${dateDifference} days`;
  }

  return `${dateDifference + 1} days`;
};

export const ApplyLeaveForm = forwardRef(
  (
    {
      defaultValues = applyLeaveDefaultValues,
      loading = false,
      leaveDetailsData,
    }: ApplyLeaveProps,
    ref: ForwardedRef<FormRef>
  ) => {
    const methods = useForm({
      values: defaultValues,
      resolver: zodResolver(ApplyLeaveFormSchema),
      mode: "all",
    });

    const {
      watch,
      control,
      setValue,
      setError,
      clearErrors,
      formState: { errors, dirtyFields },
      handleSubmit,
    } = methods;

    const theme = useTheme();

    const { slate, butterflyBlue, red } = theme.palette.app.color;

    useEnableDisableSubmitButton({ control, defaultValues, errors });

    const errorMessages = (messageKey?: string) => {
      return messageKey && t(messageKey);
    };

    const fromDate = watch("from_date");

    const toDate = watch("to_date");

    const fromDateISO = fromDate ? DateTime.fromISO(fromDate).toISO() : null;

    const toDateISO = toDate ? DateTime.fromISO(toDate).toISO() : null;

    const fromHalf = watch("from_half");

    const toHalf = watch("to_half");

    // eslint-disable-next-line sonarjs/cognitive-complexity
    useMemo(() => {
      if (fromDateISO && toDateISO && isEqual(fromDateISO, toDateISO)) {
        if (fromHalf === "first_half") {
          setValue("to_half", "first_half", {
            shouldDirty: true,
          });
        } else if (fromHalf !== "first_half") {
          setValue("to_half", "second_half", {
            shouldDirty: true,
          });
        } else if (
          !fromHalf ||
          (fromHalf === "first_half" && toHalf === "second_half")
        ) {
          setValue("from_half", "full_day", {
            shouldDirty: true,
          });
        }

        if (errors.to_half) {
          clearErrors("to_half");
        }
      } else if (fromDateISO && toDateISO && !isEqual(fromDateISO, toDateISO)) {
        if (!fromHalf || fromHalf === "full_day") {
          setValue("from_half", "first_half", {
            shouldDirty: true,
          });
        }

        if (!toHalf) {
          setValue("to_half", "second_half", {
            shouldDirty: true,
          });
        }
      }
    }, [fromDate, toDate, fromHalf, toHalf]);

    useImperativeHandle(ref, () => ({
      submitForm(onSubmit) {
        handleSubmit((formValues) => {
          const filterFormValues = filterChangedFormFields(
            formValues,
            dirtyFields
          );

          const payload = {
            ...filterFormValues,
            from_half:
              formValues.from_half === "full_day"
                ? "first_half"
                : filterFormValues.from_half,
          };

          onSubmit(payload);
        })();
      },
      setError,
    }));

    return (
      <Stack gap="16px">
        <FormProvider {...methods}>
          <Stack direction="row" gap="16px">
            <Stack gap="20px" flex={1}>
              <FormRow maxColumn={2}>
                <Stack flexDirection="row" gap="15px" alignItems="center">
                  <Avatar
                    sx={{ height: "50px", width: "50px" }}
                    src={leaveDetailsData && (leaveDetailsData.avatar ?? "")}
                  />

                  <Box>
                    <Typography variant="subtitle1" fontWeight={500}>
                      {leaveDetailsData?.employee_name}
                    </Typography>

                    <Typography variant="subtitle2" color={slate[900]}>
                      {leaveDetailsData?.designation_name}
                    </Typography>
                  </Box>
                </Stack>

                <LeaveTypesAutocomplete
                  name="leave_type_id"
                  leavePlanId={leaveDetailsData?.leave_plan_id ?? ""}
                  loading={loading}
                  required
                  error={!!errors.leave_type_id}
                  helperText={errorMessages(errors.leave_type_id?.message)}
                />
              </FormRow>

              <FormRow maxColumn={2}>
                <DatePicker
                  setError={setError}
                  name="from_date"
                  loading={loading}
                  required
                  label="From Date"
                  maxDate={toDate ? DateTime.fromISO(toDate) : undefined}
                  error={!!errors.from_date}
                  helperText={errorMessages(errors.from_date?.message)}
                />

                <DatePicker
                  setError={setError}
                  name="to_date"
                  loading={loading}
                  required
                  label="To Date"
                  minDate={fromDate ? DateTime.fromISO(fromDate) : undefined}
                  error={!!errors.to_date}
                  helperText={errorMessages(errors.to_date?.message)}
                />
              </FormRow>

              {fromDate && toDate && (
                <>
                  <FormRow maxColumn={2}>
                    <Stack>
                      <RadioGroupField
                        name="from_half"
                        label={`From ( ${fromDate && formatDate(fromDate, "DDD")} )`}
                        loading={loading}
                        options={[
                          ...(isEqual(fromDateISO, toDateISO)
                            ? [
                                {
                                  values: "full_day",
                                  label: "Full day",
                                  disabled: false,
                                },
                              ]
                            : []),
                          {
                            values: "first_half",
                            label: "First half",
                            disabled: false,
                          },
                          {
                            values: "second_half",
                            label: "Second Half",
                            disabled: false,
                          },
                        ]}
                      />

                      <Typography variant="caption" sx={{ color: red[900] }}>
                        {errorMessages(errors.from_half?.message)}
                      </Typography>
                    </Stack>

                    {!isEqual(fromDateISO, toDateISO) && (
                      <Stack>
                        <RadioGroupField
                          name="to_half"
                          label={`To ( ${toDate && formatDate(toDate, "DDD")} )`}
                          loading={loading}
                          options={[
                            {
                              values: "first_half",
                              label: "First half",
                              disabled: false,
                            },
                            {
                              values: "second_half",
                              label: "Second Half",
                              disabled: false,
                            },
                          ]}
                        />

                        <Typography variant="caption" sx={{ color: red[900] }}>
                          {errorMessages(errors.to_half?.message)}
                        </Typography>
                      </Stack>
                    )}
                  </FormRow>

                  <Box
                    sx={{
                      backgroundColor: butterflyBlue[500],
                      borderRadius: "5px",
                      padding: "10px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      color={butterflyBlue[900]}
                      fontWeight={500}
                    >
                      {fromDate &&
                        toDate &&
                        `Leave request is for ${calculateLeaveDetails(fromDate, toDate, fromHalf, toHalf)}`}
                    </Typography>
                  </Box>
                </>
              )}
            </Stack>

            <Box width="400px">
              <FileUploadField
                name="attachments"
                label="Attachments"
                multiple
                error={!!errors.attachments}
                helperText={errorMessages(errors.attachments?.message)}
              />
            </Box>
          </Stack>

          <TextField
            label="Leave Remark"
            name="reason"
            loading={loading}
            multiline
            required
            error={!!errors.reason}
            helperText={errorMessages(errors.reason?.message)}
          />

          <EmployeeAutocomplete
            label="Notify To"
            name="notifies"
            isShowAvatar
            isShowSelectAll={false}
            loading={loading}
            multiple
            companyId={leaveDetailsData?.company_id ?? ""}
            error={!!errors.notifies}
            helperText={errorMessages(errors.notifies?.message)}
          />
        </FormProvider>
      </Stack>
    );
  }
);

ApplyLeaveForm.displayName = "ApplyLeaveForm";
