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
import { CityAutocomplete } from "../../../common/Autocomplete/CityAutocomplete";
import { CompanyAutocomplete } from "../../../common/Autocomplete/CompanyAutocomplete";
import { CountryAutocomplete } from "../../../common/Autocomplete/CountryAutocomplete";
import { StateAutocomplete } from "../../../common/Autocomplete/StateAutocomplete";

//TODO:Bhavik, define common message
const BusinessUnitFormSchema = z.object({
  company_id: z
    .string()
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  business_unit_name: z
    .string()
    .max(255, "common.maxLength")
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  unit_license_no: z.string().max(255, "common.maxLength").nullable(),
  email: z.string().regex(emailRegex, "common.email.invalid").nullable(),
  phone_no: z
    .string()
    .regex(phoneNumberRegex, "common.phoneNumber.invalid")
    .optional()
    .nullable(),
  mobile_no: z
    .string()
    .regex(mobileNumberRegex, "common.mobileNumber.invalid")
    .optional()
    .nullable(),
  address: z.string().max(255, "common.maxLength").nullable(),
  city_id: z.string().nullable(),
  state_id: z.string().nullable(),
  country_id: z.string().nullable(),
  pin_code: z
    .string()
    .regex(pinCodeRegex, "common.pinCode.invalid")
    .optional()
    .nullable(),
});

export type BusinessUnitFormFieldValues = z.infer<
  typeof BusinessUnitFormSchema
>;

type BusinessUnitFormProps = {
  defaultValues?: BusinessUnitFormFieldValues;
  loading?: boolean;
  disabled?: boolean;
};

export type FormRef = {
  submitForm: (
    onSubmit: (formValues: Partial<BusinessUnitFormFieldValues>) => void
  ) => void;
  setError: UseFormSetError<BusinessUnitFormFieldValues>;
};

const formDefaultValues: BusinessUnitFormFieldValues = {
  company_id: null,
  business_unit_name: null,
  email: null,
  mobile_no: null,
  phone_no: null,
  address: null,
  city_id: null,
  state_id: null,
  country_id: null,
  pin_code: null,
  unit_license_no: null,
};

export const BusinessUnitForm = forwardRef(
  (
    {
      defaultValues = formDefaultValues,
      loading = false,
      disabled = false,
    }: BusinessUnitFormProps,
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
      resolver: zodResolver(BusinessUnitFormSchema),
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
      Record<
        keyof BusinessUnitFormFieldValues,
        (keyof BusinessUnitFormFieldValues)[]
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
      <Stack gap="16px">
        <FormRow>
          <CompanyAutocomplete
            control={control}
            loading={loading}
            error={!!errors.company_id}
            disabled={!!defaultValues.company_id || disabled}
            helperText={errorMessages(errors.company_id?.message)}
            name="company_id"
            required
          />

          <TextField
            control={control}
            label="Business Entity Name"
            name="business_unit_name"
            loading={loading}
            required
            error={!!errors.business_unit_name}
            helperText={errorMessages(errors.business_unit_name?.message)}
            disabled={disabled}
          />

          <TextField
            control={control}
            label="Unit License No"
            name="unit_license_no"
            loading={loading}
            error={!!errors.unit_license_no}
            helperText={errorMessages(errors.unit_license_no?.message)}
            disabled={disabled}
          />
        </FormRow>

        <FormRow>
          <TextField
            name="email"
            control={control}
            loading={loading}
            label="Email"
            error={!!errors.email}
            helperText={errorMessages(errors.email?.message)}
            disabled={disabled}
          />

          <TextField
            name="address"
            control={control}
            loading={loading}
            label="Business Unit Address"
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
        </FormRow>

        <FormRow>
          <TextField
            control={control}
            label="Phone No"
            loading={loading}
            name="phone_no"
            error={!!errors.phone_no}
            helperText={errorMessages(errors.phone_no?.message)}
            disabled={disabled}
          />

          <CountryAutocomplete
            control={control}
            loading={loading}
            error={!!errors.country_id}
            helperText={errorMessages(errors.country_id?.message)}
            name="country_id"
            disabled={disabled}
          />

          <StateAutocomplete
            control={control}
            loading={loading}
            error={!!errors.state_id}
            helperText={errorMessages(errors.state_id?.message)}
            name="state_id"
            countryId={countryId}
            disabled={!countryId || disabled}
          />
        </FormRow>

        <FormRow>
          <CityAutocomplete
            control={control}
            error={!!errors.city_id}
            loading={loading}
            helperText={errorMessages(errors.city_id?.message)}
            name="city_id"
            stateId={stateId}
            disabled={!stateId || disabled}
          />

          <TextField
            name="pin_code"
            control={control}
            label="Pincode"
            loading={loading}
            error={!!errors.pin_code}
            helperText={errorMessages(errors.pin_code?.message)}
            placeholder="Enter Pincode"
            disabled={disabled}
          />
        </FormRow>
      </Stack>
    );
  }
);

BusinessUnitForm.displayName = "BusinessUnitForm";
