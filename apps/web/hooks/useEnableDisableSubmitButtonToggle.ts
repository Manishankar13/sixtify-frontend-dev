import { useMemo } from "react";
import type { FieldErrors } from "react-hook-form";
import { useDisabledButtonsCache } from "../app/context/DisabledButtonsCacheContext/DisabledButtonsCacheContext";
import { buttonIds } from "../app/context/DisabledButtonsCacheContext/buttonIds";

type UseEnableDisableSubmitButtonToggleProps = {
  errors: FieldErrors;
  isFormChanged: boolean;
};

export const submitButtonId = buttonIds.onSubmit;

export const useEnableDisableSubmitButtonToggle = ({
  errors,
  isFormChanged,
}: UseEnableDisableSubmitButtonToggleProps) => {
  const { enable, disable, isDisabled } =
    useDisabledButtonsCache(submitButtonId);

  useMemo(() => {
    const hasErrors = Object.keys(errors ?? {}).length > 0;

    if (!hasErrors && isFormChanged && isDisabled()) {
      enable();
    } else if ((hasErrors || !isFormChanged) && !isDisabled()) {
      disable();
    }
  }, [errors, isFormChanged, isDisabled, enable, disable]);
};
