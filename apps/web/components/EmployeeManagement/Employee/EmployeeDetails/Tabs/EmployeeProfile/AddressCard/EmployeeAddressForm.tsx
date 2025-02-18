import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormContainer,
  FormRow,
  FormSection,
  TextField,
} from "@repo/shared-components";
import { t } from "i18next";
import type { ForwardedRef } from "react";
import { forwardRef, useImperativeHandle, useMemo } from "react";
import type { UseFormSetError } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEnableDisableSubmitButton } from "../../../../../../../hooks/useEnableDisableSubmitButton";
import {
  filterChangedFormFields,
  resetDependentFields,
} from "../../../../../../../utils/helper";
import {
  emailRegex,
  mobileNumberRegex,
  pinCodeRegex,
} from "../../../../../../../utils/regex";
import { CityAutocomplete } from "../../../../../../common/Autocomplete/CityAutocomplete";
import { CountryAutocomplete } from "../../../../../../common/Autocomplete/CountryAutocomplete";
import { StateAutocomplete } from "../../../../../../common/Autocomplete/StateAutocomplete";

const EmployeeAddressFormSchema = z.object({
  name: z.string().max(255, "common.maxLength").nullable().or(z.literal("")),
  address: z
    .string()
    .max(255, "common.maxLength")
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  city_id: z
    .string()
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  state_id: z
    .string()
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  country_id: z
    .string()
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  pin_code: z
    .string()
    .regex(pinCodeRegex, "common.pinCode.invalid")
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  mobile_no: z
    .string()
    .regex(mobileNumberRegex, "common.mobileNumber.invalid")
    .nullable()
    .or(z.literal("")),

  email: z
    .string()
    .max(255, "common.maxLength")
    .regex(emailRegex, "common.email.invalid")
    .nullable()
    .or(z.literal("")),
});

export type EmployeeAddressFormFieldValues = z.infer<
  typeof EmployeeAddressFormSchema
>;

type EmployeeAddressProps = {
  defaultValues?: EmployeeAddressFormFieldValues;
  loading?: boolean;
};

export type FormRef = {
  submitForm: (
    onSubmit: (formValues: Partial<EmployeeAddressFormFieldValues>) => void
  ) => void;
  setError: UseFormSetError<EmployeeAddressFormFieldValues>;
};

const formDefaultValues: EmployeeAddressFormFieldValues = {
  name: null,
  address: null,
  city_id: null,
  state_id: null,
  country_id: null,
  pin_code: null,
  mobile_no: null,
  email: null,
};

export const EmployeeAddressForm = forwardRef(
  (
    { defaultValues = formDefaultValues, loading }: EmployeeAddressProps,
    ref: ForwardedRef<FormRef>
  ) => {
    const {
      watch,
      setValue,
      control,
      setError,
      formState: { errors, dirtyFields },
      handleSubmit,
    } = useForm({
      values: defaultValues,
      resolver: zodResolver(EmployeeAddressFormSchema),
      mode: "all",
    });

    const countryId = watch("country_id") ?? "";

    const stateId = watch("state_id") ?? "";

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

    const errorMessages = (messageKey?: string) => {
      return messageKey && t(messageKey);
    };

    useEnableDisableSubmitButton({ control, defaultValues, errors });

    const dependentFieldsMap: Partial<
      Record<
        keyof EmployeeAddressFormFieldValues,
        (keyof EmployeeAddressFormFieldValues)[]
      >
    > = {
      country_id: ["state_id", "city_id"],
      state_id: ["city_id"],
    };

    useMemo(() => {
      resetDependentFields({
        fieldName: "country_id",
        fieldValue: countryId,
        dirtyFields,
        setValue,
        dependentFieldsMap,
      });
    }, [countryId]);

    useMemo(() => {
      resetDependentFields({
        fieldName: "state_id",
        fieldValue: stateId,
        dirtyFields,
        setValue,
        dependentFieldsMap,
      });
    }, [stateId]);

    return (
      <FormContainer>
        <FormSection>
          <FormRow maxColumn={2}>
            <TextField
              control={control}
              label="Name"
              name="name"
              loading={loading}
            />

            <TextField
              control={control}
              label="Address"
              name="address"
              loading={loading}
              error={!!errors.address}
              helperText={errorMessages(errors.address?.message)}
              required
            />
          </FormRow>

          <FormRow maxColumn={2}>
            <CountryAutocomplete
              control={control}
              loading={loading}
              error={!!errors.country_id}
              helperText={errorMessages(errors.country_id?.message)}
              name="country_id"
              required
            />

            <StateAutocomplete
              control={control}
              loading={loading}
              error={!!errors.state_id}
              helperText={errorMessages(errors.state_id?.message)}
              name="state_id"
              countryId={countryId}
              disabled={!countryId}
              required
            />
          </FormRow>

          <FormRow maxColumn={2}>
            <CityAutocomplete
              control={control}
              loading={loading}
              error={!!errors.city_id}
              helperText={errorMessages(errors.city_id?.message)}
              name="city_id"
              stateId={stateId}
              disabled={!stateId}
              required
            />

            <TextField
              name="pin_code"
              control={control}
              loading={loading}
              label="Pincode"
              required
              error={!!errors.pin_code}
              helperText={errorMessages(errors.pin_code?.message)}
              placeholder="Enter Pincode"
            />
          </FormRow>

          <FormRow maxColumn={2}>
            <TextField
              control={control}
              label="Mobile No"
              name="mobile_no"
              loading={loading}
              error={!!errors.mobile_no}
              helperText={errorMessages(errors.mobile_no?.message)}
            />

            <TextField
              name="email"
              control={control}
              label="Email"
              loading={loading}
              error={!!errors.email}
              helperText={errorMessages(errors.email?.message)}
            />
          </FormRow>
        </FormSection>
      </FormContainer>
    );
  }
);

EmployeeAddressForm.displayName = " EmployeeAddressForm";
