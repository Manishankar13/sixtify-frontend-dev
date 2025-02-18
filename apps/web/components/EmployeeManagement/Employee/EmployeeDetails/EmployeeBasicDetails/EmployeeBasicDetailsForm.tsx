import { zodResolver } from "@hookform/resolvers/zod";
import {
  DatePicker,
  FormContainer,
  FormRow,
  FormSection,
  TextField,
} from "@repo/shared-components";
import { DateTime } from "luxon";
import type { ForwardedRef } from "react";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import type { UseFormSetError } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useEnableDisableSubmitButton } from "../../../../../hooks/useEnableDisableSubmitButton";
import { dateDaysPlus } from "../../../../../utils/date";
import { filterChangedFormFields } from "../../../../../utils/helper";
import { emailRegex, mobileNumberRegex } from "../../../../../utils/regex";
import { GenderAutocomplete } from "../../../../common/Autocomplete/GenderAutoComplete";
import { TitleSchema } from "../../../../common/Autocomplete/hooks/useGetTitleOptions";
import { TitleAutocomplete } from "../../../../common/Autocomplete/TitleAutocomplete";
import { ImageUploadField } from "../../../../common/ImageUploadField";

const EmployeeBasicDetailsFormSchema = z.object({
  title: TitleSchema.optional().nullable(),
  first_name: z
    .string()
    .max(50, "employee.name.maxLength")
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  middle_name: z.string().max(50, "employee.name.maxLength").nullable(),
  last_name: z
    .string()
    .max(50, "employee.name.maxLength")
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  avatar: z.string().optional().nullable(),
  designation_id: z.string().nullable().nullable(),
  punch_code: z.string().optional().nullable(),
  joining_date: z
    .string()
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  mobile_no: z
    .string()
    .regex(mobileNumberRegex, "common.mobileNumber.invalid")
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  email: z
    .string()
    .trim()
    .regex(emailRegex, "common.email.invalid")
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  date_of_birth: z
    .string()
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  nick_name: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  on_book_joining_date: z.string().nullable().nullable(),
  probation_period: z.number().optional().nullable(),
  confirmation_date: z.string().optional().nullable(),
});

export type EmployeeBasicDetailsFormFieldValues = z.infer<
  typeof EmployeeBasicDetailsFormSchema
>;

type EmployeeBasicDetailsFormProps = {
  defaultValues?: EmployeeBasicDetailsFormFieldValues;
  loading?: boolean;
};

export type FormRef = {
  submitForm: (
    onSubmit: (formValues: Partial<EmployeeBasicDetailsFormFieldValues>) => void
  ) => void;
  setError: UseFormSetError<EmployeeBasicDetailsFormFieldValues>;
};

const formDefaultValues: EmployeeBasicDetailsFormFieldValues = {
  title: null,
  first_name: null,
  middle_name: null,
  last_name: null,
  avatar: null,
  designation_id: null,
  punch_code: null,
  joining_date: null,
  mobile_no: null,
  email: null,
  date_of_birth: null,
  nick_name: null,
  gender: null,
  on_book_joining_date: null,
  probation_period: null,
  confirmation_date: null,
};

export const EmployeeBasicDetailsForm = forwardRef(
  (
    {
      defaultValues = formDefaultValues,
      loading = false,
    }: EmployeeBasicDetailsFormProps,
    ref: ForwardedRef<FormRef>
  ) => {
    const { t } = useTranslation();

    const {
      watch,
      control,
      setError,
      formState: { errors, dirtyFields },
      handleSubmit,
      setValue: setFieldValue,
    } = useForm({
      values: defaultValues,
      resolver: zodResolver(EmployeeBasicDetailsFormSchema),
      mode: "all",
    });

    useEnableDisableSubmitButton({ control, defaultValues, errors });

    useImperativeHandle(ref, () => ({
      submitForm(onSubmit) {
        handleSubmit((formValues) => {
          const filterFormValues = filterChangedFormFields(formValues, {
            ...dirtyFields,
            probation_period: false,
          });

          onSubmit(filterFormValues);
        })();
      },
      setError,
    }));

    const errorMessages = (messageKey?: string) => {
      return messageKey && t(messageKey);
    };

    const joiningDate = watch("joining_date");

    const dateOfBirthDate = watch("date_of_birth");

    const probationPeriod = watch("probation_period");

    const onBookJoiningDate = watch("on_book_joining_date");

    const confirmationDate = watch("confirmation_date");

    useEffect(() => {
      if (joiningDate && probationPeriod) {
        const confirmation = dateDaysPlus(joiningDate, probationPeriod);

        setFieldValue("confirmation_date", confirmation);
      } else {
        setFieldValue("confirmation_date", null);
      }
    }, [joiningDate, probationPeriod]);

    useEffect(() => {
      if (joiningDate && typeof probationPeriod === "number") {
        const confirmation = dateDaysPlus(joiningDate, probationPeriod);

        setFieldValue("confirmation_date", confirmation, { shouldDirty: true });
      } else if (confirmationDate) {
        setFieldValue("confirmation_date", null, { shouldDirty: true });
      }
    }, [joiningDate, probationPeriod]);

    return (
      <FormContainer>
        <FormSection title="Basic Details">
          <ImageUploadField
            variant="circle"
            name="avatar"
            control={control}
            isCapture={true}
            loading={loading}
          />

          <FormRow>
            <TitleAutocomplete
              name="title"
              control={control}
              loading={loading}
            />

            <TextField
              name="first_name"
              control={control}
              label="First Name"
              required
              error={!!errors.first_name}
              helperText={errorMessages(errors.first_name?.message)}
            />

            <TextField
              name="middle_name"
              control={control}
              label="Middle Name"
              error={!!errors.middle_name}
              helperText={errorMessages(errors.middle_name?.message)}
            />
          </FormRow>

          <FormRow>
            <TextField
              name="last_name"
              control={control}
              label="Last Name"
              required
              error={!!errors.last_name}
              helperText={errorMessages(errors.last_name?.message)}
            />

            <TextField
              control={control}
              label="Nick Name"
              name="nick_name"
              loading={loading}
            />
            <TextField
              control={control}
              label="Punch Code"
              name="punch_code"
              loading={loading}
            />
          </FormRow>

          <FormRow>
            <DatePicker
              name="date_of_birth"
              setError={setError}
              control={control}
              label="Date of Birth"
              required
              maxDate={
                joiningDate ? DateTime.fromISO(joiningDate) : DateTime.now()
              }
              error={!!errors.date_of_birth}
              helperText={errorMessages(errors.date_of_birth?.message)}
            />

            <GenderAutocomplete
              name="gender"
              control={control}
              loading={loading}
            />

            <DatePicker
              setError={setError}
              name="joining_date"
              control={control}
              label="Date Of Joining"
              minDate={
                dateOfBirthDate ? DateTime.fromISO(dateOfBirthDate) : undefined
              }
              maxDate={
                onBookJoiningDate
                  ? DateTime.fromISO(onBookJoiningDate)
                  : undefined
              }
              required
              error={!!errors.joining_date}
              helperText={errorMessages(errors.joining_date?.message)}
            />
          </FormRow>

          <FormRow>
            <DatePicker
              setError={setError}
              name="on_book_joining_date"
              control={control}
              label="ON Books Join Date"
              minDate={joiningDate ? DateTime.fromISO(joiningDate) : undefined}
              error={!!errors.on_book_joining_date}
              helperText={errorMessages(errors.on_book_joining_date?.message)}
            />

            <TextField
              control={control}
              label="Probation Period (Days)"
              name="probation_period"
              type="number"
              loading={loading}
            />
            <DatePicker
              control={control}
              name="confirmation_date"
              label="Confirmation Date"
              readOnly={true}
              loading={loading}
            />
          </FormRow>

          <FormRow>
            <TextField
              name="email"
              control={control}
              label="Email"
              required
              error={!!errors.email}
              helperText={errorMessages(errors.email?.message)}
              loading={loading}
            />
            <TextField
              control={control}
              label="Mobile Number"
              name="mobile_no"
              required
              error={!!errors.mobile_no}
              helperText={errorMessages(errors.mobile_no?.message)}
              loading={loading}
            />
          </FormRow>
        </FormSection>
      </FormContainer>
    );
  }
);

EmployeeBasicDetailsForm.displayName = "EmployeeBasicDetailsForm";
