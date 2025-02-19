import { Stack } from "@mui/material";
import { Button, Dialog, toasts } from "@repo/shared-components";
import { isFunction } from "lodash";
import { useRef } from "react";
import type { FieldValues } from "react-hook-form";
import type { ApiErrorResponse } from "../../../../../../types/apiResponse";
import { onError } from "../../../../../../utils/errors";
import { useAddIncomeTaxRegime } from "./hooks/useAddIncomeTaxRegime";
import type { FormRef } from "./IncomeTaxRegimeForm";
import { IncomeTaxRegimeForm } from "./IncomeTaxRegimeForm";

type AddIncomeTaxRegimeDialogProps = {
  open: boolean;
  onClose: () => void;
  onAddSuccess: () => void;
};

export const AddIncomeTaxRegimeDialog = ({
  open,
  onClose,
  onAddSuccess,
}: AddIncomeTaxRegimeDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { mutate, isPending } = useAddIncomeTaxRegime({
    options: {
      onSuccess: (data) => {
        onClose();

        if (isFunction(onAddSuccess)) {
          onAddSuccess();
        }

        toasts.success({ title: data.message });
      },
      onError: (res) => {
        const { error, message } = res.response.data;

        const formattedError: Record<string, string> = {};

        const flattenErrors = (obj: Record<string, string>, prefix = "") => {
          Object.entries(obj).forEach(([key, value]) => {
            const fieldPath = prefix ? `${prefix}.${key}` : key;

            if (typeof value === "object" && value !== null) {
              flattenErrors(value, fieldPath);
            } else {
              formattedError[fieldPath] = value;
            }
          });
        };

        flattenErrors(error);

        const structuredError: ApiErrorResponse<FieldValues> = {
          response: {
            data: {
              message,
              error: formattedError,
            },
          },
        };

        onError(structuredError, formRef.current?.setError);
      },
    },
  });

  const onCreateIncomeTaxRegime = () => {
    formRef.current?.submitForm((formValues) => {
      mutate(formValues);
    });
  };

  return (
    <Dialog
      maxWidth="lg"
      onClose={onClose}
      open={open}
      title="Add Income Tax Regime"
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button onClick={onCreateIncomeTaxRegime} loading={isPending}>
            Save
          </Button>
        </Stack>
      }
    >
      <IncomeTaxRegimeForm ref={formRef} />
    </Dialog>
  );
};
