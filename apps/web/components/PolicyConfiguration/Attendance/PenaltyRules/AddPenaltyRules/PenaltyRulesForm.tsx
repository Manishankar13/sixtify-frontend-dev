import { zodResolver } from "@hookform/resolvers/zod";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Skeleton as MuiSkeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { FormRow, PadBox, TextField } from "@repo/shared-components";
import { t } from "i18next";
import { useSearchParams } from "next/navigation";
import type { ForwardedRef } from "react";
import { forwardRef, useImperativeHandle, useState } from "react";
import type { UseFormSetError } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { filterNestedChangedFormFields } from "../../../../../utils/helper";
import { leaveDayRegex } from "../../../../../utils/regex";
import { CompanyAutocomplete } from "../../../../common/Autocomplete/CompanyAutocomplete";
import { AttendanceSchemaHoliday } from "./SubComponents/AttendanceSchemaHoliday";
import { AttendanceSchemaWeeklyOff } from "./SubComponents/AttendanceSchemaWeeklyOff";
import { LateArrivalPenaltyCondition } from "./SubComponents/LateArrivalPenaltyCondition";

const PenaltyRulesFormSchema = z
  .object({
    company_id: z
      .string()
      .nullable()
      .refine((value) => !!value, {
        message: "common.required",
      }),
    attendance_penalty_rule_code: z
      .string()
      .min(2, "common.minCodeLength")
      .max(10, "common.maxCodeLength")
      .nullable()
      .refine((value) => !!value, {
        message: "common.required",
      }),
    attendance_penalty_rule_name: z
      .string()
      .max(100, "common.maxNameLength")
      .nullable()
      .refine((value) => !!value, {
        message: "common.required",
      }),
    buffer_period_days: z
      .number()
      .max(10, "common.invalidNumber")
      .int()
      .positive()
      .nullable()
      .refine((value) => !!value, {
        message: "common.required",
      }),
    is_holiday_penalty_enabled: z.boolean().nullable(),
    holiday_penalty_condition: z.object({
      days_with_no_attendance: z
        .number()
        .max(2, "common.invalidNumber")
        .int()
        .positive()
        .nullable()
        .optional(),
      condition_type: z.string().nullable().optional(),
      leave_deduction_days: z
        .number()
        .nullable()
        .optional()
        .refine((value) => !value || leaveDayRegex.test(value.toString()), {
          message: "common.invalidNumber",
        }),
      penalty_deduction_source: z.string().nullable().optional(),
    }),
    is_weekly_off_penalty_enabled: z.boolean().nullable(),
    weekly_off_penalty_condition: z.object({
      days_with_no_attendance: z
        .number()
        .max(2, "common.invalidNumber")
        .int()
        .positive()
        .nullable()
        .optional(),
      condition_type: z.string().nullable().optional(),
      leave_deduction_days: z
        .number()
        .nullable()
        .optional()
        .refine((value) => !value || leaveDayRegex.test(value.toString()), {
          message: "common.invalidNumber",
        }),
      penalty_deduction_source: z.string().nullable().optional(),
    }),
    is_late_arrival_penalty_enabled: z.boolean().nullable(),
    late_arrival_penalty_condition: z.object({
      penalty_basis: z.string().nullable().optional(),
      max_allowed_instances: z.number().int().positive().nullable().optional(),
      evaluation_period: z.string().nullable().optional(),
      penalty_increment_threshold_days: z
        .number()
        .max(100, "common.maxDigitLength")
        .int()
        .positive()
        .nullable()
        .optional(),
      leave_deduction_days: z
        .number()
        .nullable()
        .optional()
        .refine((value) => !value || leaveDayRegex.test(value.toString()), {
          message: "common.invalidNumber",
        }),
      penalty_deduction_source: z.string().nullable().optional(),
      penalty_slabs: z
        .array(
          z.object({
            id: z.string().uuid().optional().nullable(),
            action: z.string().optional(),
            late_from_minutes: z.number().nullable().optional(),
            late_to_minutes: z.number().nullable().optional(),
            penalty_deduction_minutes: z.number().nullable().optional(),
          })
        )
        .nullable()
        .optional(),
    }),
  })
  // eslint-disable-next-line sonarjs/cognitive-complexity
  .superRefine((data, ctx) => {
    const addIssue = (path: string[], message: string) => {
      ctx.addIssue({ path, message, code: z.ZodIssueCode.custom });
    };

    const checkRequiredFields = (
      pathPrefix: string[],
      fields: Record<string, unknown>,
      customMessages: Record<string, string> = {}
    ) => {
      Object.entries(fields).forEach(([key, value]) => {
        const message = customMessages[key] ?? "This is a mendatory Field";

        if (!value) {
          addIssue([...pathPrefix, key], message);
        }
      });
    };

    if (data.is_holiday_penalty_enabled) {
      checkRequiredFields(
        ["holiday_penalty_condition"],
        data.holiday_penalty_condition ?? {}
      );
    }

    if (data.is_weekly_off_penalty_enabled) {
      checkRequiredFields(
        ["weekly_off_penalty_condition"],
        data.weekly_off_penalty_condition ?? {}
      );
    }

    if (data.is_late_arrival_penalty_enabled) {
      const lateArrival = data.late_arrival_penalty_condition;

      if (!lateArrival?.penalty_basis) {
        addIssue(
          ["late_arrival_penalty_condition", "penalty_basis"],
          "common.required"
        );
      }

      if (lateArrival) {
        if (lateArrival.penalty_basis === "hour") {
          checkRequiredFields(["late_arrival_penalty_condition"], {
            evaluation_period: lateArrival.evaluation_period,
            penalty_slabs: lateArrival.penalty_slabs,
          });

          lateArrival.penalty_slabs?.forEach((slab, index) => {
            checkRequiredFields(
              ["late_arrival_penalty_condition", `penalty_slabs.${index}`],
              slab || {}
            );
          });

          const penaltySlabs = lateArrival?.penalty_slabs ?? [];

          penaltySlabs.forEach((slab, index) => {
            const currentLateFromMinutes = slab.late_from_minutes ?? null;

            const currentlateToMinutes = slab?.late_to_minutes ?? null;

            if (
              currentLateFromMinutes &&
              currentlateToMinutes &&
              currentLateFromMinutes > currentlateToMinutes
            ) {
              addIssue(
                [
                  "late_arrival_penalty_condition",
                  `penalty_slabs.${index}`,
                  "late_to_minutes",
                ],
                "must be greater than late from minutes"
              );
              addIssue(
                [
                  "late_arrival_penalty_condition",
                  `penalty_slabs.${index}`,
                  "late_from_minutes",
                ],
                "must be less than late to minutes"
              );
            }

            if (index > 0) {
              const previousSlab = penaltySlabs[index - 1];

              const currentLateFromMinutes = slab.late_from_minutes ?? null;

              const previousLateToMinutes =
                previousSlab?.late_to_minutes ?? null;

              if (
                currentLateFromMinutes &&
                previousLateToMinutes &&
                currentLateFromMinutes <= previousLateToMinutes
              ) {
                addIssue(
                  [
                    "late_arrival_penalty_condition",
                    `penalty_slabs.${index}`,
                    "late_from_minutes",
                  ],
                  "must be greater than late from of previous"
                );
              }
            }
          });
        }

        if (lateArrival.penalty_basis === "instance") {
          checkRequiredFields(
            ["late_arrival_penalty_condition"],
            {
              max_allowed_instances: lateArrival.max_allowed_instances,
              evaluation_period: lateArrival.evaluation_period,
              leave_deduction_days: lateArrival.leave_deduction_days,
              penalty_increment_threshold_days:
                lateArrival.penalty_increment_threshold_days,
              penalty_deduction_source: lateArrival.penalty_deduction_source,
            },
            { penalty_deduction_source: "common.selectionRequired" }
          );

          if (
            lateArrival.evaluation_period &&
            lateArrival.max_allowed_instances &&
            ((lateArrival.evaluation_period === "month" &&
              lateArrival.max_allowed_instances > 31) ||
              (lateArrival.evaluation_period === "week" &&
                lateArrival.max_allowed_instances > 7))
          ) {
            addIssue(
              ["late_arrival_penalty_condition", "max_allowed_instances"],
              "common.invalidNumber"
            );
          }
        }
      }
    }
  });

export type PenaltyRulesFormFieldValues = z.infer<
  typeof PenaltyRulesFormSchema
>;

export type LateArrivalPenaltyConditionType = z.infer<
  typeof PenaltyRulesFormSchema
>["late_arrival_penalty_condition"];

export type PenaltySlabsType = LateArrivalPenaltyConditionType["penalty_slabs"];

type PenaltyRulesFormProps = {
  defaultValues?: PenaltyRulesFormFieldValues;
  companyId?: string;
  loading?: boolean;
  type?: "edit" | "create";
};

export type FormRef = {
  submitForm: (
    onSubmit: (formValues: Partial<PenaltyRulesFormFieldValues>) => void
  ) => void;
  setError: UseFormSetError<PenaltyRulesFormFieldValues>;
};

const formDefaultValues: PenaltyRulesFormFieldValues = {
  company_id: null,
  attendance_penalty_rule_code: null,
  attendance_penalty_rule_name: null,
  buffer_period_days: null,
  is_holiday_penalty_enabled: false,
  holiday_penalty_condition: {
    days_with_no_attendance: null,
    condition_type: null,
    leave_deduction_days: null,
    penalty_deduction_source: null,
  },
  is_weekly_off_penalty_enabled: false,
  weekly_off_penalty_condition: {
    days_with_no_attendance: null,
    condition_type: null,
    leave_deduction_days: null,
    penalty_deduction_source: null,
  },
  is_late_arrival_penalty_enabled: false,
  late_arrival_penalty_condition: {
    penalty_basis: null,
    max_allowed_instances: null,
    evaluation_period: null,
    penalty_increment_threshold_days: null,
    leave_deduction_days: null,
    penalty_deduction_source: null,
    penalty_slabs: null,
  },
};

export const PenaltyRulesForm = forwardRef(
  (
    {
      defaultValues = formDefaultValues,
      loading = false,
      type = "create",
    }: PenaltyRulesFormProps,
    ref: ForwardedRef<FormRef>
  ) => {
    const methods = useForm({
      values: defaultValues,
      resolver: zodResolver(PenaltyRulesFormSchema),
      mode: "all",
    });

    const theme = useTheme();

    const { slate } = theme.palette.app.color;

    const searchParams = useSearchParams();

    const mode = searchParams.get("page");

    const isViewMode = mode === "view-penalty-rules";

    const [deletedPenaltySlabId, setDeletedPenaltySlabId] =
      useState<LateArrivalPenaltyConditionType>();

    const {
      watch,
      control,
      setError,
      setValue,
      formState: { errors, dirtyFields },
      handleSubmit,
    } = methods;

    const errorMessages = (messageKey?: string) => {
      return messageKey && t(messageKey);
    };

    const is_holiday_penalty_enabled = watch("is_holiday_penalty_enabled");

    const is_weekly_off_penalty_enabled = watch(
      "is_weekly_off_penalty_enabled"
    );

    const is_late_arrival_penalty_enabled = watch(
      "is_late_arrival_penalty_enabled"
    );

    const PenaltyRulesEnabled =
      is_holiday_penalty_enabled ||
      is_weekly_off_penalty_enabled ||
      is_late_arrival_penalty_enabled;

    const getLateArrivalDirtyFields = (type: "update" | "add") => {
      const lateArrivalDirtyFields = dirtyFields.late_arrival_penalty_condition;

      const commonFields = {
        ...lateArrivalDirtyFields,
      };

      if (
        type === "add" &&
        lateArrivalDirtyFields &&
        typeof lateArrivalDirtyFields === "object"
      ) {
        return {
          late_arrival_penalty_condition: {
            ...commonFields,
            penalty_slabs: Array.isArray(lateArrivalDirtyFields.penalty_slabs)
              ? lateArrivalDirtyFields.penalty_slabs.map((slab) => ({
                  ...slab,
                  late_from_minutes: true,
                  late_to_minutes: true,
                  penalty_deduction_minutes: true,
                }))
              : null,
          },
        };
      } else if (
        type === "update" &&
        lateArrivalDirtyFields &&
        typeof lateArrivalDirtyFields === "object"
      ) {
        return {
          late_arrival_penalty_condition: {
            penalty_slabs: Array.isArray(lateArrivalDirtyFields.penalty_slabs)
              ? lateArrivalDirtyFields.penalty_slabs.map((slab) => ({
                  ...slab,
                  late_from_minutes: true,
                  late_to_minutes: true,
                  penalty_deduction_minutes: true,
                  id: true,
                  action: true,
                }))
              : null,
          },
        };
      }

      return {};
    };

    const getDayTypeFormValues = (
      formData: Partial<PenaltyRulesFormFieldValues>
    ) => {
      const applicableRule = formData.late_arrival_penalty_condition;

      const updatedPenaltySlab = (applicableRule?.penalty_slabs || [])
        .filter((item) => Object.keys(item || {}).length > 0)
        .map((item) => {
          return item.id
            ? { ...item, action: "update" }
            : { ...item, action: "add" };
        });

      const deletedDay = deletedPenaltySlabId;

      const deletedPenaltySlab = deletedDay?.penalty_slabs;

      const dayTypeFormValues: LateArrivalPenaltyConditionType = {
        ...applicableRule,
        penalty_slabs: [
          ...updatedPenaltySlab,
          ...(deletedPenaltySlab ? [...deletedPenaltySlab] : []),
        ],
      };

      return dayTypeFormValues;
    };

    useImperativeHandle(ref, () => ({
      submitForm(onSubmit) {
        // eslint-disable-next-line sonarjs/cognitive-complexity
        handleSubmit((formValues) => {
          if (type === "edit") {
            const dayTypeDirtyFields = getLateArrivalDirtyFields("update");

            const filterFormValues: Partial<PenaltyRulesFormFieldValues> =
              filterNestedChangedFormFields(formValues, {
                ...dirtyFields,
                late_arrival_penalty_condition: {
                  ...(dirtyFields.late_arrival_penalty_condition ?? {}),
                  ...(dayTypeDirtyFields.late_arrival_penalty_condition ?? {}),
                  penalty_deduction_source:
                    formValues.late_arrival_penalty_condition.penalty_basis !==
                    "instance"
                      ? false
                      : dirtyFields.late_arrival_penalty_condition
                          ?.penalty_deduction_source,
                  penalty_slabs:
                    Array.isArray(
                      dayTypeDirtyFields.late_arrival_penalty_condition
                        ?.penalty_slabs
                    ) &&
                    Array.isArray(
                      dirtyFields.late_arrival_penalty_condition?.penalty_slabs
                    )
                      ? [
                          ...dayTypeDirtyFields.late_arrival_penalty_condition
                            .penalty_slabs,
                          ...dirtyFields.late_arrival_penalty_condition
                            .penalty_slabs,
                        ]
                      : undefined,
                },
              });

            const dayTypeFormValues = getDayTypeFormValues(filterFormValues);

            const payload = {
              ...filterFormValues,
              ...(formValues.is_late_arrival_penalty_enabled && {
                late_arrival_penalty_condition: {
                  ...filterFormValues.late_arrival_penalty_condition,
                  ...(filterFormValues.late_arrival_penalty_condition
                    ?.penalty_basis !== "hour" && {
                    penalty_deduction_source:
                      filterFormValues.late_arrival_penalty_condition
                        ?.penalty_deduction_source,
                  }),
                  ...(filterFormValues.late_arrival_penalty_condition
                    ?.penalty_basis === "hour" &&
                    filterFormValues.late_arrival_penalty_condition
                      ?.penalty_slabs?.length && {
                      penalty_slabs: [
                        ...filterFormValues.late_arrival_penalty_condition
                          .penalty_slabs,
                      ],
                    }),
                  ...dayTypeFormValues,
                },
              }),
            } as PenaltyRulesFormFieldValues;

            const conditionalCleanup = (
              key: keyof typeof payload,
              condition: boolean
              // eslint-disable-next-line sonarjs/no-nested-functions
            ) => {
              if (condition) {
                delete payload[key];
              }
            };

            conditionalCleanup(
              "holiday_penalty_condition",
              !formValues.is_holiday_penalty_enabled
            );
            conditionalCleanup(
              "weekly_off_penalty_condition",
              !formValues.is_weekly_off_penalty_enabled
            );
            conditionalCleanup(
              "late_arrival_penalty_condition",
              !formValues.is_late_arrival_penalty_enabled
            );

            if (
              formValues.late_arrival_penalty_condition?.penalty_basis !==
                "hour" ||
              !payload.late_arrival_penalty_condition?.penalty_slabs?.length
            ) {
              delete payload.late_arrival_penalty_condition?.penalty_slabs;
            }

            onSubmit(payload);

            return;
          }

          const filterFormValues = filterNestedChangedFormFields(formValues, {
            ...dirtyFields,
            is_holiday_penalty_enabled: true,
            is_weekly_off_penalty_enabled: true,
            is_late_arrival_penalty_enabled: true,
          });

          if (!filterFormValues.is_holiday_penalty_enabled) {
            delete filterFormValues.holiday_penalty_condition;
          }

          if (!filterFormValues.is_weekly_off_penalty_enabled) {
            delete filterFormValues.weekly_off_penalty_condition;
          }

          if (!filterFormValues.is_late_arrival_penalty_enabled) {
            delete filterFormValues.late_arrival_penalty_condition;
          }

          onSubmit(filterFormValues);
        })();
      },
      setError,
      setValue,
    }));

    const accordionSections = [
      {
        title: "No Attendance Days",
        component: (
          <Stack gap="10px">
            <AttendanceSchemaHoliday loading={loading} />
            <AttendanceSchemaWeeklyOff loading={loading} />
          </Stack>
        ),
      },
      {
        title: "Late Arrival",
        component: (
          <LateArrivalPenaltyCondition
            loading={loading}
            deletedPenaltySlabId={deletedPenaltySlabId}
            setDeletedPenaltySlabId={setDeletedPenaltySlabId}
          />
        ),
      },
    ];

    return (
      <Stack gap="20px">
        <FormProvider {...methods}>
          <FormRow>
            <CompanyAutocomplete
              control={control}
              loading={loading}
              error={!!errors.company_id}
              helperText={errorMessages(errors.company_id?.message)}
              disabled={!!defaultValues.company_id || isViewMode}
              name="company_id"
              required
            />
            <TextField
              control={control}
              label="Attendance Penalty Rule Code"
              name="attendance_penalty_rule_code"
              loading={loading}
              required
              error={!!errors.attendance_penalty_rule_code}
              helperText={errorMessages(
                errors.attendance_penalty_rule_code?.message
              )}
              disabled={
                !!defaultValues.attendance_penalty_rule_code || isViewMode
              }
            />
            <TextField
              control={control}
              label="Attendance Penalty Rule Name"
              name="attendance_penalty_rule_name"
              loading={loading}
              required
              error={!!errors.attendance_penalty_rule_name}
              helperText={errorMessages(
                errors.attendance_penalty_rule_name?.message
              )}
              disabled={isViewMode}
            />
          </FormRow>
          <Stack gap="10px">
            <Typography variant="body1" fontWeight={500}>
              After how many days should the penalty be applied? (Buffer Period)
            </Typography>
            <Stack direction="row" alignItems="baseline" gap="10px">
              {!loading ? (
                <TextField
                  control={control}
                  type="number"
                  name="buffer_period_days"
                  placeholder="00"
                  loading={loading}
                  required
                  error={!!errors.buffer_period_days}
                  helperText={errorMessages(errors.buffer_period_days?.message)}
                  sx={{ width: "100%", maxWidth: "170px" }}
                  disabled={isViewMode}
                />
              ) : (
                <MuiSkeleton
                  height="40px"
                  sx={{
                    width: "100%",
                    maxWidth: "170px",
                    transform: "scale(1)",
                  }}
                />
              )}
              <Typography color={slate[900]}>Day(s)</Typography>
            </Stack>
          </Stack>
          <Stack>
            {accordionSections.map(({ title, component }) => (
              <Accordion
                key={title}
                defaultExpanded={true}
                sx={{
                  boxShadow: "none",
                  "&.MuiAccordion-root.Mui-expanded": {
                    margin: "0 !important",
                  },
                  "&:before": { display: "none" },
                }}
              >
                <Box width="max-content">
                  <AccordionSummary
                    expandIcon={<ExpandMore fontSize="medium" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                      gap: "10px",
                      flexDirection: "row-reverse",
                      "& MuiAccordionSummary-root.Mui-expanded": {
                        marginRight: "10px",
                        transform: "rotate(-90deg)",
                      },
                      "&.Mui-expanded": {
                        minHeight: "40px",
                        paddingY: "5px",
                      },
                      "& .MuiAccordionSummary-content.Mui-expanded": {
                        margin: "0px",
                      },
                      padding: "0px",
                    }}
                  >
                    <Typography variant="body1" fontWeight={500}>
                      {title}
                    </Typography>
                  </AccordionSummary>
                </Box>
                <AccordionDetails>{component}</AccordionDetails>
              </Accordion>
            ))}
          </Stack>
          {!PenaltyRulesEnabled && (
            <PadBox padding={{ paddingY: "15px" }}>
              <Alert severity="error">
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  At least one of the condition (holiday, weekly off, or late
                  arrival) must be provided.
                </Typography>
              </Alert>
            </PadBox>
          )}
        </FormProvider>
      </Stack>
    );
  }
);

PenaltyRulesForm.displayName = "PenaltyRulesForm";
