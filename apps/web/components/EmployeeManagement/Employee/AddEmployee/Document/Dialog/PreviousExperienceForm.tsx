import { DatePicker, FormRow, TextField } from "@repo/shared-components";
import type {
  Control,
  FieldErrors,
  FieldValues,
  UseFormSetError,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FileUploadField } from "../../../../../common/FileUploadField";
import type { DocumentFormFieldValues } from "./DocumentForm";
import { DateTime } from "luxon";

type PreviousExperienceFormProps = {
  control: Control<FieldValues>;
  errors: FieldErrors<DocumentFormFieldValues>;
  setError: UseFormSetError<FieldValues>;
  loading?: boolean;
};

export const PreviousExperienceForm = (props: PreviousExperienceFormProps) => {
  const { control, errors, setError, loading } = props;

  const { t } = useTranslation();

  const errorMessages = (messageKey?: string) => {
    return messageKey && t(messageKey);
  };

  return (
    <>
      <FormRow maxColumn={2}>
        <TextField
          name="company_name"
          control={control}
          label="Company Name"
          required
          loading={loading}
          error={!!errors.company_name}
          helperText={errorMessages(errors.company_name?.message)}
        />

        <TextField
          name="job_title"
          control={control}
          label="Job Title"
          required
          loading={loading}
          error={!!errors.job_title}
          helperText={errorMessages(errors.job_title?.message)}
        />
      </FormRow>

      <FormRow maxColumn={2}>
        <DatePicker
          setError={setError}
          name="joining_date"
          control={control}
          loading={loading}
          label="Date Of Joining"
          maxDate={DateTime.now()}
          error={!!errors.joining_date}
          helperText={errorMessages(errors.joining_date?.message)}
        />

        <DatePicker
          name="relieving_date"
          control={control}
          loading={loading}
          label="Date Of Reliving"
        />
      </FormRow>

      <FormRow maxColumn={2}>
        <TextField
          name="address"
          loading={loading}
          control={control}
          label="Address"
        />
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
