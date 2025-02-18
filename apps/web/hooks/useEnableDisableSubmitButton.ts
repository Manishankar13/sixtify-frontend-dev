import type { Control, FieldErrors, FieldValues } from "react-hook-form";
import { useDetectFormChange } from "./useDetectFormChange";
import { useEnableDisableSubmitButtonToggle } from "./useEnableDisableSubmitButtonToggle";

type UseEnableDisableSubmitButtonProps<T extends FieldValues> = {
  control: Control<T>;
  defaultValues: T;
  errors: FieldErrors<T>;
};

export const useEnableDisableSubmitButton = <T extends FieldValues>({
  control,
  defaultValues,
  errors,
}: UseEnableDisableSubmitButtonProps<T>) => {
  const { isFormChanged } = useDetectFormChange(control, defaultValues);

  useEnableDisableSubmitButtonToggle({ errors, isFormChanged });

  return { isFormChanged };
};
