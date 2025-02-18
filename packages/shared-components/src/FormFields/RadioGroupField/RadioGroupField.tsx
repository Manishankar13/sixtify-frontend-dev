import {
  FormControlLabel,
  InputLabel,
  RadioGroup,
  Stack,
  Box,
  type StackOwnProps,
  type SxProps,
} from "@mui/material";
import Radio, { type RadioProps as MuiRadioProps } from "@mui/material/Radio";
import {
  useController,
  type ControllerRenderProps,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Skeleton } from "./Skeleton";
import type { ReactNode } from "react";

type Options = {
  values: boolean | string;
  label?: ReactNode;
  disabled: boolean;
  direction?: StackOwnProps["direction"];
};

export type RadioGroupFieldProps<P extends FieldValues> =
  UseControllerProps<P> &
    Omit<Omit<MuiRadioProps, "checked">, keyof ControllerRenderProps<P>> & {
      label?: string;
      options: Options[];
      loading?: boolean;
      direction?: StackOwnProps["direction"];
      sx?: SxProps;
    };

export function RadioGroupField<P extends FieldValues>({
  name,
  rules,
  label,
  control,
  options,
  defaultValue,
  size = "small",
  color = "secondary",
  loading = false,
  direction = "row",
  sx = {},
  ...restRadioButtonProps
}: RadioGroupFieldProps<P>) {
  const {
    field: { value, onChange, ...restField },
  } = useController({ name, control, defaultValue, rules });

  if (loading) {
    return <Skeleton />;
  }

  return (
    <Stack gap="5px">
      {label && <InputLabel>{label}</InputLabel>}

      <RadioGroup
        name={name}
        value={value}
        onChange={(_, event) => {
          if (event === "true") {
            onChange(true);
          } else if (event === "false") {
            onChange(false);
          } else {
            onChange(event);
          }
        }}
      >
        <Stack
          gap={direction === "column" ? "5px" : "45px"}
          direction={direction}
        >
          {options?.map(({ label, values, disabled }, index) => {
            return (
              // eslint-disable-next-line sonarjs/no-array-index-key
              <Box key={index} width="max-content">
                <FormControlLabel
                  value={values}
                  control={
                    <Radio
                      {...restField}
                      {...restRadioButtonProps}
                      color={color}
                      size={size}
                    />
                  }
                  disabled={disabled}
                  label={label}
                  sx={sx}
                />
              </Box>
            );
          })}
        </Stack>
      </RadioGroup>
    </Stack>
  );
}
