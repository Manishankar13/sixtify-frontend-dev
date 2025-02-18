import { type PropsWithChildren } from "react";
import { FilterPopup } from "./FilterPopup";
import type { FilterListType } from "./FilterTypeWrapper";
import {
  Autocomplete,
  DatePicker,
  DateRangePicker,
  TextField,
} from "../FormFields";
import { useTheme, type PopoverProps } from "@mui/material";
import type { Control, FieldValues } from "react-hook-form";
import { PadBox } from "../PadBox";

type FilterPopupWrapperProp = PropsWithChildren<PopoverProps> & {
  filterItem: FilterListType;
  control: Control<FieldValues>;
  currentFilterValue?: string | string[] | null;
  onApply: () => void;
};

export type FilterPopupComponentType = {
  autoComplete?: JSX.Element;
  text: JSX.Element;
  date: JSX.Element;
  checkbox?: JSX.Element;
  dateRange?: JSX.Element;
  switch?: JSX.Element;
  radio?: JSX.Element;
};

export const GetFilterPopupComponent = (
  selectedFilter: FilterListType,
  control: Control<FieldValues>
): FilterPopupComponentType => {
  const theme = useTheme();

  const { sapphireBlue, black } = theme.palette.app.color;

  return {
    autoComplete: selectedFilter.options && (
      <Autocomplete
        disableClearable
        multiple={selectedFilter.multiSelect ?? false}
        placeholder={`Select ${selectedFilter.label}`}
        name={`${selectedFilter.key}`}
        disabled={selectedFilter.isDisabled}
        shouldCloseOnSelect={selectedFilter.multiSelect ?? false}
        control={control}
        options={selectedFilter.options ?? []}
        sx={{
          maxHeight: "250px",
          overflowY: "auto",
          width: "100%",
          "& .MuiAutocomplete-tag": {
            backgroundColor: sapphireBlue[300],
            color: black[900],
          },
        }}
      />
    ),
    text: (
      <TextField
        name={selectedFilter.key}
        control={control}
        disabled={selectedFilter.isDisabled}
        placeholder={selectedFilter.label}
      />
    ),
    date: (
      <DatePicker
        name={selectedFilter.key}
        control={control}
        disabled={selectedFilter.isDisabled}
      />
    ),
    dateRange: (
      <DateRangePicker
        name={selectedFilter.key}
        control={control}
        disabled={selectedFilter.isDisabled}
      />
    ),
  };
};

export const FilterPopupWrapper = ({
  open,
  anchorEl,
  filterItem,
  onClose,
  control,
  onApply,
  currentFilterValue,
}: FilterPopupWrapperProp) => {
  return (
    <FilterPopup
      title={filterItem.label}
      filterItem={filterItem}
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      onApply={onApply}
      currentFilterValue={currentFilterValue}
      showFooter
      showDivider
      background
    >
      <PadBox padding={{ padding: "10px" }}>
        {GetFilterPopupComponent(filterItem, control)[filterItem.type]}
      </PadBox>
    </FilterPopup>
  );
};
