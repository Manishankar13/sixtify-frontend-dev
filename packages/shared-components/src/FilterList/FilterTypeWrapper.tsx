import { ListItemButton, Stack, Typography } from "@mui/material";
import { Switch } from "../FormFields/Switch";
import type { Control, FieldValues } from "react-hook-form";

export type FilterComponentType =
  | "autoComplete"
  | "text"
  | "date"
  | "dateRange"
  | "checkbox"
  | "radio"
  | "switch";

type Options = readonly {
  label: string;
  value: string;
  disabled?: boolean;
  avatar?: string;
}[];

export type FilterListType = {
  label: string;
  isDisabled?: boolean;
  key: string;
  value: string;
  type: FilterComponentType;
  menuInfo?: string;
  options?: Options;
  multiSelect?: boolean;
};
type FilterTypeWrapperProps = {
  filter: FilterListType;
  control: Control<FieldValues>;
};
export const FilterTypeWrapper = ({
  filter,
  control,
}: FilterTypeWrapperProps) => {
  const getFilterByType = (type: FilterComponentType) => {
    return (
      <Stack
        direction="row"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="body2">{filter.label}</Typography>
        {type === "switch" ? (
          <Switch control={control} name={filter.key} />
        ) : (
          <Typography variant="body2">{filter.menuInfo}</Typography>
        )}
      </Stack>
    );
  };

  return <ListItemButton>{getFilterByType(filter.type)}</ListItemButton>;
};
