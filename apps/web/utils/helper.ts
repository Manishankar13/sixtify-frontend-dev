import { isEmpty, isObject, omitBy, pickBy } from "lodash";
import type {
  FieldNamesMarkedBoolean,
  FieldValues,
  Path,
  SetValueConfig,
  UseFormClearErrors,
} from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const resetDependentFields = <T extends Record<string, any>>({
  fieldName,
  fieldValue,
  dirtyFields,
  setValue,
  dependentFieldsMap,
  clearErrors,
}: {
  clearErrors?: UseFormClearErrors<T>;
  fieldName: keyof T;
  fieldValue: T[keyof T] | null;
  dirtyFields: Partial<
    Record<
      keyof T,
      | boolean
      | boolean[]
      | Record<string, unknown>
      | Record<string, unknown>[]
      | undefined
    >
  >;
  setValue: (field: Path<T>, value: null, options?: SetValueConfig) => void;
  dependentFieldsMap: Partial<Record<keyof T, Path<T>[]>>;
}) => {
  const dependentFields = dependentFieldsMap[fieldName];

  if ((!fieldValue || dirtyFields[fieldName]) && dependentFields) {
    dependentFields.forEach((dependentField) => {
      setValue(dependentField, null, { shouldDirty: true });

      if (clearErrors) {
        clearErrors(dependentField);
      }
    });
  }
};

export const filterChangedFormFields = <T extends FieldValues>(
  allFields: T,
  dirtyFields: Partial<
    Record<keyof T, boolean | boolean[] | Record<string, unknown>>
  >
): Partial<T> => {
  const changedFieldValues = Object.keys(pickBy(dirtyFields)).reduce(
    (acc, currentField) => {
      return {
        ...acc,
        [currentField]: allFields[currentField],
      };
    },
    {} as Partial<T>
  );

  return changedFieldValues;
};

export const filterNestedChangedFormFields = <T extends FieldValues>(
  allFields: T,
  dirtyFields: FieldNamesMarkedBoolean<T>
): Partial<T> => {
  const getChangedFields = (
    dirty: FieldNamesMarkedBoolean<T> | boolean,
    all: T
  ): Partial<T> => {
    if (typeof dirty === "boolean") {
      return dirty ? (all as Partial<T>) : {};
    }

    return (
      all &&
      Object.keys(all).reduce((acc, currentField) => {
        const dirtyValue =
          dirty[currentField as keyof FieldNamesMarkedBoolean<T>];

        const allFieldValue = all?.[currentField as keyof T];

        if (Array.isArray(dirtyValue) && allFieldValue) {
          acc[currentField as keyof T] = dirtyValue
            .map((dirtyItem, index) => {
              const allItem = (allFieldValue as T)[index];

              if (typeof dirtyItem === "boolean") {
                return dirtyItem ? allItem : {};
              }

              return isObject(dirtyItem)
                ? getChangedFields(
                    dirtyItem as FieldNamesMarkedBoolean<T>,
                    allItem
                  )
                : {};
            })
            .filter((item) => {
              // Filter out empty objects and empty arrays
              if (isObject(item)) {
                // Iterate over the keys and remove keys with empty arrays
                const typedItem = item as Record<string, unknown>;

                // eslint-disable-next-line sonarjs/no-nested-functions
                const filteredKeys = Object.keys(item).filter((key) => {
                  return !(
                    Array.isArray(typedItem[key]) && typedItem[key].length === 0
                  );
                });

                return filteredKeys.length > 0;
              }

              return !(Array.isArray(item) && item.length === 0);
            }) as T[keyof T];
        } else if (isObject(dirtyValue)) {
          const nestedChangedFields = getChangedFields(
            dirtyValue as FieldNamesMarkedBoolean<T>,
            allFieldValue as T
          );

          if (!isEmpty(nestedChangedFields)) {
            acc[currentField as keyof T] = nestedChangedFields as T[keyof T];
          }
        } else if (dirtyValue) {
          acc[currentField as keyof T] = allFieldValue;
        }

        return acc;
      }, {} as Partial<T>)
    );
  };

  return getChangedFields(dirtyFields, allFields);
};

type Obj = { [key: string]: string | null };

export const removeEmptyStrings = (obj: Obj): Obj =>
  omitBy(obj, (value) => value == "");

export const Debounce_Delay = 500; //milliseconds

export const filterSearchParams = (searchText: string | null) => {
  if (searchText) {
    return {
      search: {
        filter: searchText,
      },
    };
  }

  return { search: {} };
};
