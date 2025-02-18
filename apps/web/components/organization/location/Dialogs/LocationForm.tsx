import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { FormRow, TextField } from "@repo/shared-components";
import {
  type ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import type { UseFormSetError } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useEnableDisableSubmitButton } from "../../../../hooks/useEnableDisableSubmitButton";
import {
  filterChangedFormFields,
  resetDependentFields,
} from "../../../../utils/helper";
import {
  emailRegex,
  mobileNumberRegex,
  phoneNumberRegex,
  pinCodeRegex,
} from "../../../../utils/regex";
import { BusinessUnitAutocomplete } from "../../../common/Autocomplete/BusinessUnitAutocomplete";
import { CityAutocomplete } from "../../../common/Autocomplete/CityAutocomplete";
import { CountryAutocomplete } from "../../../common/Autocomplete/CountryAutocomplete";
import { StateAutocomplete } from "../../../common/Autocomplete/StateAutocomplete";

const LocationFormFormSchema = z.object({
  business_unit_id: z
    .string()
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  location_name: z
    .string()
    .max(255, "common.maxLength")
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  email: z.string().regex(emailRegex, "common.email.invalid").nullable(),
  phone_no: z
    .string()
    .regex(phoneNumberRegex, "common.phoneNumber.invalid")
    .nullable(),
  mobile_no: z
    .string()
    .regex(mobileNumberRegex, "common.mobileNumber.invalid")
    .nullable(),
  address: z.string().max(255, "common.maxLength").nullable(),
  city_id: z.string().nullable(),
  state_id: z.string().nullable(),
  country_id: z.string().nullable(),
  pin_code: z.string().regex(pinCodeRegex, "common.pinCode.invalid").nullable(),
});

export type LocationFormFieldValues = z.infer<typeof LocationFormFormSchema>;

type LocationFormProps = {
  defaultValues?: LocationFormFieldValues;
  loading?: boolean;
  disabled?: boolean;
};

export type FormRef = {
  submitForm: (
    onSubmit: (formValues: Partial<LocationFormFieldValues>) => void
  ) => void;
  setError: UseFormSetError<LocationFormFieldValues>;
};

const formDefaultValues: LocationFormFieldValues = {
  business_unit_id: null,
  location_name: null,
  email: null,
  phone_no: null,
  mobile_no: null,
  address: null,
  city_id: null,
  state_id: null,
  country_id: null,
  pin_code: null,
};

export const LocationForm = forwardRef(
  (
    {
      defaultValues = formDefaultValues,
      loading = false,
      disabled = false,
    }: LocationFormProps,
    ref: ForwardedRef<FormRef>
  ) => {
    const { t } = useTranslation();

    const {
      watch,
      control,
      setValue,
      setError,
      formState: { errors, dirtyFields },
      handleSubmit,
    } = useForm({
      values: defaultValues,
      resolver: zodResolver(LocationFormFormSchema),
      mode: "all",
    });

    const countryId = watch("country_id");

    const stateId = watch("state_id");

    useEnableDisableSubmitButton({ control, defaultValues, errors });

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

    const dependentFieldsMap: Partial<
      Record<keyof LocationFormFieldValues, (keyof LocationFormFieldValues)[]>
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
      <Stack gap="16px">
        <FormRow>
          <BusinessUnitAutocomplete
            isEnabled
            name="business_unit_id"
            control={control}
            loading={loading}
            disabled={!!defaultValues.business_unit_id || disabled}
            label="Business Unit"
            placeholder="Select Business Unit"
            required
            error={!!errors.business_unit_id}
            helperText={errorMessages(errors.business_unit_id?.message)}
          />

          <TextField
            control={control}
            label="Location Name"
            name="location_name"
            loading={loading}
            required
            error={!!errors.location_name}
            helperText={errorMessages(errors.location_name?.message)}
            disabled={disabled}
          />

          <TextField
            name="email"
            control={control}
            loading={loading}
            label="Email"
            error={!!errors.email}
            helperText={errorMessages(errors.email?.message)}
            disabled={disabled}
          />
        </FormRow>

        <FormRow>
          <TextField
            name="address"
            control={control}
            loading={loading}
            label="Business Location Address"
            error={!!errors.address}
            helperText={errorMessages(errors.address?.message)}
            placeholder="Enter Address"
            disabled={disabled}
          />

          <TextField
            control={control}
            label="Mobile No"
            name="mobile_no"
            loading={loading}
            error={!!errors.mobile_no}
            helperText={errorMessages(errors.mobile_no?.message)}
            disabled={disabled}
          />

          <TextField
            control={control}
            label="Phone No"
            name="phone_no"
            loading={loading}
            error={!!errors.phone_no}
            helperText={errorMessages(errors.phone_no?.message)}
            disabled={disabled}
          />
        </FormRow>

        <FormRow>
          <CountryAutocomplete
            control={control}
            error={!!errors.country_id}
            loading={loading}
            helperText={errorMessages(errors.country_id?.message)}
            name="country_id"
            disabled={disabled}
          />

          <StateAutocomplete
            control={control}
            error={!!errors.state_id}
            helperText={errorMessages(errors.state_id?.message)}
            name="state_id"
            loading={loading}
            countryId={countryId}
            disabled={!countryId || disabled}
          />

          <CityAutocomplete
            control={control}
            error={!!errors.city_id}
            helperText={errorMessages(errors.city_id?.message)}
            name="city_id"
            loading={loading}
            stateId={stateId}
            disabled={!stateId || disabled}
          />
        </FormRow>

        <FormRow>
          <TextField
            name="pin_code"
            control={control}
            label="Pin code"
            loading={loading}
            error={!!errors.pin_code}
            helperText={errorMessages(errors.pin_code?.message)}
            placeholder="Enter Pin code"
            disabled={disabled}
          />
        </FormRow>
      </Stack>
    );
  }
);

LocationForm.displayName = "LocationForm";
