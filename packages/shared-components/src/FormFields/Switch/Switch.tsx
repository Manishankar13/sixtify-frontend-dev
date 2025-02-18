import {
  useController,
  type ControllerRenderProps,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import type { SwitchProps } from "@mui/material";
import { Switch as MuiSwitch } from "@mui/material";
import { Skeleton } from "./Skeleton";

export type SwitchFieldProps<P extends FieldValues> = UseControllerProps<P> &
  Omit<Omit<SwitchProps, "checked">, keyof ControllerRenderProps<P>> & {
    loading?: boolean;
  };

export function Switch<P extends FieldValues>({
  name,
  rules,
  control,
  defaultValue,
  loading = false,
  ...restSwitchProps
}: SwitchFieldProps<P>) {
  const {
    field: { value = false, ...restField },
  } = useController({ name, control, defaultValue, rules });

  if (loading) {
    return <Skeleton />;
  }

  return <MuiSwitch checked={value} {...restField} {...restSwitchProps} />;
}
