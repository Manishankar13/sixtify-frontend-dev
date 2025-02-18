import type { AutocompleteProps as MuiAutocompleteProps } from "@mui/material";

import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  InputLabel,
  Autocomplete as MuiAutocomplete,
  Paper,
  Popper,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMemo, useRef, type KeyboardEvent } from "react";
import {
  useController,
  type ControllerRenderProps,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { EditAction } from "../../Actions";
import { toasts } from "../../Toast";
import { BoxStyled, CheckStyled } from "../CheckBox/CheckBox.styled";
import { Skeleton } from "./Skeleton";

export type Option = {
  label: string;
  value: string | number;
  disabled?: boolean;
  employee_code?: string;
  avatar?: string;
  punch_code?: string;
};

export type AutocompleteProps<P extends FieldValues> = UseControllerProps<P> &
  Omit<
    Omit<
      MuiAutocompleteProps<
        {
          label: string;
          value: string | number;
          disabled?: boolean;
          avatar?: string;
          employee_code?: string;
          punch_code?: string;
        },
        boolean,
        boolean,
        boolean
      >,
      "renderInput"
    >,
    keyof ControllerRenderProps<P>
  > & {
    required?: boolean;
    label?: string;
    helperText?: string;
    error?: boolean;
    placeholder?: string;
    isShowAvatar?: boolean;
    shouldCloseOnSelect?: boolean;
    onAction?: () => void;
    isShowSelectAll?: boolean;
    maxLimit?: number;
    renderOption?: (
      props: React.HTMLProps<HTMLLIElement>,
      option: Option,
      state: { selected: boolean }
    ) => JSX.Element;
    getOptionLabel?: (option: string) => string;
  };

export function Autocomplete<P extends FieldValues>({
  control,
  defaultValue,
  name,
  required = false,
  label,
  multiple = false,
  disabled = false,
  options = [],
  rules,
  loading = false,
  helperText,
  error,
  placeholder = "",
  freeSolo,
  isShowSelectAll = true,
  isShowAvatar = false,
  shouldCloseOnSelect = false,
  onAction,
  renderOption,
  getOptionLabel,
  maxLimit,
  ...restProps
}: AutocompleteProps<P>) {
  const {
    field: { onChange, value, ...restField },
  } = useController({ name, control, defaultValue, rules });

  const { t } = useTranslation();

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      const allValues = options.map((option) => option.value);

      onChange(allValues);
    } else {
      onChange([]);
    }
  };

  const highlightedOptionRef = useRef<string | number>("");

  const isAllSelected = useMemo(() => {
    return (
      multiple &&
      isShowSelectAll &&
      options.length > 0 &&
      value?.length === options.filter((option) => !option.disabled).length
    );
  }, [multiple, isShowSelectAll, options, value]);

  const memoizedOptions = useMemo(() => {
    return [
      ...(multiple && isShowSelectAll && options.length
        ? [{ label: "Select All", value: "select-all" }]
        : []),
      ...options,
    ];
  }, [multiple, isShowSelectAll, options]);

  // eslint-disable-next-line sonarjs/function-return-type
  const selectedValue = useMemo(() => {
    if (multiple && freeSolo) {
      return (
        value?.map((val: string | number) => {
          const selectedOption = options.find((option) => option.value === val);

          return selectedOption ? selectedOption.label : val.toString();
        }) || []
      );
    } else if (multiple) {
      return options.filter((option) => value?.includes(option.value));
    } else if (!options.find((option) => option.value === value) && freeSolo) {
      return value;
    }

    return options.find((option) => option.value === value) || null;
  }, [multiple, options, value]);

  const {
    palette: {
      app: { color },
    },
  } = useTheme();

  const StyledPaper = styled(Paper)(({ theme }) => ({
    "& .MuiAutocomplete-listbox": {
      maxHeight: 200,
      overflowY: "auto",
      marginTop: "10px",
      "&::-webkit-scrollbar": {
        width: "6px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: color.lightBlue[100],
      },
      "& .MuiAutocomplete-option": {
        fontSize: "14px", // Change this to your desired font size
      },
    },
  }));

  if (loading) {
    return <Skeleton label={label} />;
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Space" && highlightedOptionRef.current) {
      e.preventDefault();

      if (multiple) {
        if (highlightedOptionRef.current == "select-all") {
          handleSelectAll(!isAllSelected);

          return;
        }

        if (selectedValue && Array.isArray(selectedValue)) {
          if (maxLimit && selectedValue.length >= maxLimit) {
            toasts.error({
              title: t("common.autocomplete.limitExceed", { maxLimit }),
            });

            return;
          }

          const valuesArray = selectedValue.map((item) => item.value);

          if (valuesArray.includes(highlightedOptionRef.current)) {
            onChange(
              valuesArray.filter(
                (value) => value !== highlightedOptionRef.current
              )
            );
          } else {
            onChange([...valuesArray, highlightedOptionRef.current]);
          }
        }
      } else {
        onChange(highlightedOptionRef.current);
      }
    }
  };

  return (
    <Stack gap="10px">
      {label && <InputLabel required={required}>{label}</InputLabel>}

      <Stack
        direction="row"
        justifyContent="space-between"
        gap="10px"
        alignItems="start"
      >
        <MuiAutocomplete
          PopperComponent={Popper}
          PaperComponent={StyledPaper}
          sx={{
            "& .MuiAutocomplete-tag": {
              backgroundColor: color.slate[700],
              color: "black",
            },
            width: "100%",
          }}
          onHighlightChange={(event, option) => {
            if (option) {
              if (highlightedOptionRef.current != option.value) {
                highlightedOptionRef.current = option.value;
              }
            }
          }}
          disableCloseOnSelect={shouldCloseOnSelect}
          disabled={disabled}
          freeSolo={freeSolo}
          {...restProps}
          {...restField}
          renderTags={(value: Option[], getTagProps) =>
            value.map((option: Option, index: number) => {
              const { key, ...tagProps } = getTagProps({ index });

              const label = typeof option === "string" ? option : option.label;

              let avatarContent = "";

              let avatar = undefined;

              if (isShowAvatar) {
                if (!option.avatar) {
                  const initials = option.label
                    .split(" ")
                    .map((word) => word[0]?.toUpperCase())
                    .join("");

                  avatarContent = `${initials}`;
                }
                avatar = option.avatar ? (
                  <Avatar src={option.avatar} alt={option.label} />
                ) : (
                  <Avatar>{avatarContent}</Avatar>
                );
              }

              return (
                <Chip avatar={avatar} label={label} key={key} {...tagProps} />
              );
            })
          }
          renderOption={(props, option, { selected }) => {
            if (renderOption) {
              return renderOption(props, option, { selected });
            }

            const { key, ...optionProps } = props;

            return (
              <li key={key} {...optionProps}>
                <Stack gap="5px">
                  <Stack direction="row" gap="10px">
                    {multiple && (
                      <Checkbox
                        icon={<BoxStyled size="small" />}
                        checkedIcon={<CheckStyled size="small" />}
                        indeterminate={
                          !isAllSelected &&
                          selectedValue?.length &&
                          option.value === "select-all"
                            ? true
                            : false
                        }
                        checked={isAllSelected ? true : selected}
                        sx={{
                          marginRight: "8px",
                          ".MuiCheckbox-indeterminate": {
                            borderColor: color.butterflyBlue[900],
                          },
                        }}
                      />
                    )}
                    {option.label}
                  </Stack>
                  {option.value === "select-all" && (
                    <Divider sx={{ width: "280px" }} />
                  )}
                </Stack>
              </li>
            );
          }}
          renderInput={(params) => {
            let startAdornment = params.InputProps.startAdornment;

            if (!multiple && selectedValue?.avatar && getOptionLabel) {
              startAdornment = (
                <Box width="20px" marginLeft="10px">
                  <Avatar
                    src={selectedValue.avatar}
                    alt={selectedValue.label}
                    sx={{ width: 24, height: 24 }}
                  />
                </Box>
              );
            }

            return (
              <TextField
                {...params}
                placeholder={placeholder || `Select ${label}`}
                error={error}
                helperText={helperText}
                InputProps={{
                  ...params.InputProps,
                  startAdornment,
                }}
                onKeyDown={(e) => handleKeyDown(e)}
              />
            );
          }}
          multiple={multiple}
          options={memoizedOptions}
          isOptionEqualToValue={(option, value) =>
            freeSolo ? false : option.value === value.value
          }
          getOptionLabel={(option) => {
            if (getOptionLabel) {
              return getOptionLabel(option);
            }

            if (typeof option === "string") {
              return option;
            }

            return option.label;
          }}
          value={selectedValue}
          onChange={(_, newValue) => {
            if (
              multiple &&
              Array.isArray(newValue) &&
              maxLimit &&
              newValue.length > maxLimit
            ) {
              toasts.error({
                title: t("common.autocomplete.limitExceed", { maxLimit }),
              });

              return;
            }

            if (multiple && isShowSelectAll && Array.isArray(newValue)) {
              const isSelectAllIncluded = newValue.some(
                (option) =>
                  typeof option !== "string" && option?.value === "select-all"
              );

              if (isSelectAllIncluded) {
                handleSelectAll(!isAllSelected);

                return;
              }
            }

            if (multiple && freeSolo) {
              if (Array.isArray(newValue)) {
                // eslint-disable-next-line sonarjs/function-return-type
                const values = newValue.map((option) => {
                  return typeof option === "string" ? option : option.value;
                });

                return onChange(values);
              }

              return onChange(value || []);
            }

            if (typeof newValue === "string") {
              return onChange(newValue ?? null);
            }

            if (Array.isArray(newValue)) {
              // eslint-disable-next-line sonarjs/function-return-type
              const values = newValue.map((option) => {
                if (typeof option === "string") {
                  return newValue;
                }

                return option.value;
              });

              return onChange(values);
            }

            onChange(newValue ? newValue.value : null);
          }}
          getOptionDisabled={(option) => !!option.disabled}
        />

        {onAction && (
          <IconButton
            disabled={disabled}
            sx={{
              border: `1px solid ${color.iron[800]}`,
              padding: "0px",
              borderRadius: "5px",
            }}
            onClick={onAction}
          >
            <EditAction />
          </IconButton>
        )}
      </Stack>
    </Stack>
  );
}
