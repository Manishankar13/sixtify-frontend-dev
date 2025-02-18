import { DatePicker, FormRow, TextField } from "@repo/shared-components";
import type {
  Control,
  FieldErrors,
  FieldValues,
  UseFormSetError,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { GenderAutocomplete } from "../../../../../common/Autocomplete/GenderAutoComplete";
import { FileUploadField } from "../../../../../common/FileUploadField";
import type { DocumentFormFieldValues } from "./DocumentForm";
import { DateTime } from "luxon";

type VoterIdFormProps = {
  control: Control<FieldValues>;
  errors: FieldErrors<DocumentFormFieldValues>;
  setError: UseFormSetError<FieldValues>;
  loading?: boolean;
};

export const VoterIdForm = (props: VoterIdFormProps) => {
  const { control, errors, setError, loading } = props;

  const { t } = useTranslation();

  const errorMessages = (messageKey?: string) => {
    return messageKey && t(messageKey);
  };

  return (
    <>
      <FormRow maxColumn={2}>
        <TextField
          name="name"
          control={control}
          label="Name As Per Doc"
          required
          loading={loading}
          error={!!errors.name}
          helperText={errorMessages(errors.name?.message)}
        />

        <TextField
          name="document_no"
          control={control}
          label="Voter Id"
          isCapitalize
          required
          loading={loading}
          error={!!errors.document_no}
          helperText={errorMessages(errors.document_no?.message)}
        />
      </FormRow>

      <FormRow maxColumn={2}>
        <DatePicker
          setError={setError}
          name="date_of_birth"
          control={control}
          loading={loading}
          label="Date of Birth"
          maxDate={DateTime.now()}
          error={!!errors.date_of_birth}
          helperText={errorMessages(errors.date_of_birth?.message)}
        />

        <GenderAutocomplete name="gender" control={control} loading={loading} />
      </FormRow>

      <FileUploadField
        name="document_url"
        control={control}
        multiple
        setError={setError}
        label="File Upload"
        error={!!errors.document_url}
        helperText={errorMessages(errors.document_url?.message)}
      />
    </>
  );
};
