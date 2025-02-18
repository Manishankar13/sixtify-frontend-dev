"use client";

import { Stack } from "@mui/material";
import { Button, toasts } from "@repo/shared-components";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useDisabledButtonsCache } from "../../../../../../../app/context/DisabledButtonsCacheContext/DisabledButtonsCacheContext";
import { submitButtonId } from "../../../../../../../hooks/useEnableDisableSubmitButtonToggle";
import { onError } from "../../../../../../../utils/errors";
import { useAddShift } from "../../hooks/useAddShift";
import type { FormRef } from "./FixedShiftForm";
import { FixedShiftForm } from "./FixedShiftForm";

export const AddFixedShift = () => {
  const formRef = useRef<FormRef>(null);

  const { isDisabled } = useDisabledButtonsCache(submitButtonId);

  const router = useRouter();

  const { mutate, isPending } = useAddShift({
    options: {
      onSuccess: (data) => {
        toasts.success({ title: data.message });
        router.push("/employee-management/shifts/shift");
      },
      onError: (error) => onError(error, formRef.current?.setError),
    },
  });

  const onAddFixedShift = () => {
    formRef.current?.submitForm((formValues) => {
      mutate(formValues);
    });
  };

  const onCancel = () => {
    router.push("/employee-management/shifts/shift");
  };

  return (
    <Stack gap="15px">
      <FixedShiftForm ref={formRef} />

      <Stack direction="row" gap="15px" justifyContent="flex-end">
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={onAddFixedShift}
          loading={isPending}
          disabled={isDisabled()}
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
};
