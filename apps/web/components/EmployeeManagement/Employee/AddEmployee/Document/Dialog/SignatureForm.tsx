import { FormRow, TextField } from "@repo/shared-components";
import type {
  Control,
  FieldErrors,
  FieldValues,
  UseFormSetError,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FileUploadField } from "../../../../../common/FileUploadField";
import type { DocumentFormFieldValues } from "./DocumentForm";

type SignatureFormProps = {
  control: Control<FieldValues>;
  errors: FieldErrors<DocumentFormFieldValues>;
  setError: UseFormSetError<FieldValues>;
  loading?: boolean;
};

export const SignatureForm = (props: SignatureFormProps) => {
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
