import { FilterListV2 } from "@repo/shared-components";
import { useGetCompanyOptions } from "../../../../common/Autocomplete/hooks/useGetCompanyOptions";
import { useMemo, useState } from "react";
import type { FieldValues } from "react-hook-form";
import type { FilterListType } from "@repo/shared-components/src/FilterList/FilterTypeWrapper";
import { useGetFilterListItemField } from "../../hooks/useGetFilterListItemField";
import { useGetBankShiftOptions } from "../../../../common/Autocomplete/hooks/useGetBankShiftSchemeOptions";
import type { BankShiftAllocationType } from "./Hooks/useGetBankShiftAllocation";

type BankShiftFilterProps = {
  filterListData?: FieldValues;
  setFilterListData: (data?: FieldValues) => void;
  setAllBankShiftAllocationData: (
    value:
      | BankShiftAllocationType[]
      | ((prev: BankShiftAllocationType[]) => BankShiftAllocationType[])
  ) => void;
  clearSelection: () => void;
};
export const BankShiftFilter = ({
  filterListData,
  setFilterListData,
  setAllBankShiftAllocationData,
  clearSelection,
}: BankShiftFilterProps) => {
  const [currentFilter, setCurrentFilter] = useState<FieldValues>();

  const { data: companyOptions } = useGetCompanyOptions();

  const { filterListItemsField } = useGetFilterListItemField({
    currentFilter,
    companyOptions,
  });

  const { data: bankShiftSchemeOptions } = useGetBankShiftOptions({
    companyId: currentFilter?.company_id,
  });

  const filterListItems: FilterListType[] = useMemo(
    () => [
      ...filterListItemsField,
      {
        label: "Bank Shift",
        key: "bank_shift_type_id",
        value: currentFilter?.bank_shift_type_id ?? "",
        multiSelect: true,
        type: "autoComplete",
        isDisabled: !currentFilter?.company_id,
        options: bankShiftSchemeOptions,
      },
    ],
    [filterListItemsField, bankShiftSchemeOptions]
  );

  const filterResetField = useMemo(
    () => ({
      company_id: {
        business_unit_id: null,
        department_id: null,
        designation_id: null,
        reporting_manager_id: null,
        employee_id: null,
        shift_type_id: null,
        employee_code: null,
        bank_shift_type_id: null,
        punch_code: null,
        business_unit_location_id: null,
        sub_department_id: null,
      },
      business_unit_id: { business_unit_location_id: null },
      department_id: { sub_department_id: null },
    }),
    []
  );

  type FilterKeys = keyof typeof filterResetField;

  const onChange = (data: FieldValues, isPopup: boolean) => {
    if (!isPopup) {
      setCurrentFilter(data);
    }
  };

  const applyFilter = (data: FieldValues, key: FilterKeys) => {
    setAllBankShiftAllocationData([]);

    const prevFilter = { ...filterListData, ...currentFilter };

    const keysToDelete = Object.keys(filterResetField?.[key]);

    const updatedObject = Object.keys(prevFilter)
      .filter((key) => prevFilter[key] && !keysToDelete.includes(key))
      .reduce<FieldValues>((acc, key) => {
        acc[key] = prevFilter[key];

        return acc;
      }, {});

    if (data[key]) {
      updatedObject[key] = data[key];
    } else {
      delete updatedObject[key];
    }

    setFilterListData(updatedObject);
    setCurrentFilter(updatedObject);
  };

  const onApply = (data: FieldValues, isPopup?: boolean, key?: string) => {
    clearSelection();

    if (data && isPopup && key) {
      if (
        key === "company_id" ||
        key === "business_unit_id" ||
        key === "department_id"
      ) {
        applyFilter(data, key);
      } else {
        setFilterListData(data);
        setCurrentFilter(data);
      }
    } else {
      setFilterListData(data);
    }
  };

  const onClear = () => {
    setFilterListData({});
    setCurrentFilter({});
  };

  return (
    <FilterListV2
      filterListItems={filterListItems}
      filterListData={filterListData}
      onChange={onChange}
      onApply={onApply}
      onClear={onClear}
      resetFormBasedOnFields="company_id"
    />
  );
};
