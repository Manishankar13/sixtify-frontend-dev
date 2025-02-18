import { TableCell, TableRow } from "@mui/material";
import {
    DeleteAction,
    TextField,
    type TextFieldProps
} from "@repo/shared-components";
import { t } from "i18next";
import type {
    FieldArrayWithId,
    FieldErrors,
    UseFormSetValue,
    UseFormWatch,
} from "react-hook-form";
import type { CompanyFormFieldType } from "./IncomeTaxRegimeForm";

export type IncomeTaxSlabsFromProps = {
    watch: UseFormWatch<CompanyFormFieldType>;
    field: FieldArrayWithId<CompanyFormFieldType>;
    setValue: UseFormSetValue<CompanyFormFieldType>;
    index: number;
    removeTaxSlab: (index: number) => void;
    removeMonthRow?: () => void;
    formType: "standard" | "senior" | "super_senior";
    errors: FieldErrors<CompanyFormFieldType>;
    headersLength: number;
};

export const IncomeTaxSlabsForm = ({
    control,
    watch,
    errors,
    field,
    index,
    removeTaxSlab,
    formType = "standard",
    headersLength,
}: Omit<TextFieldProps<CompanyFormFieldType>, "name"> & IncomeTaxSlabsFromProps) => {

    const errorMessage = (messageKey?: string) => {
        return messageKey && t(messageKey);
    };

    const isValidHeaderLength = headersLength === 5;

    const dynamicWidth = !isValidHeaderLength ? "150px" : "100%";

    return (
        <TableRow sx={{ verticalAlign: "baseline" }} key={field?.id}>
            <TableCell>
                <TextField
                    control={control}
                    name={`tax_slabs.${formType}.${index}.start_range`}
                    placeholder="00"
                    type="number"
                    style={{ maxWidth: "400px" }}
                    sx={{ maxWidth: dynamicWidth }}
                    error={!!errors.tax_slabs?.[formType]?.[index]?.start_range?.message}
                    helperText={errorMessage(
                        errors.tax_slabs?.[formType]?.[index]?.start_range?.message
                    )}
                />
            </TableCell>
            <TableCell>
                <TextField
                    control={control}
                    name={`tax_slabs.${formType}.${index}.end_range`}
                    placeholder="00"
                    type="number"
                    style={{ maxWidth: "400px" }}
                    sx={{ maxWidth: dynamicWidth }}
                    error={!!errors.tax_slabs?.[formType]?.[index]?.end_range?.message}
                    helperText={errorMessage(
                        errors.tax_slabs?.[formType]?.[index]?.end_range?.message
                    )}
                />
            </TableCell>
            <TableCell>
                <TextField
                    control={control}
                    name={`tax_slabs.${formType}.${index}.tax_rate`}
                    style={{ maxWidth: "400px" }}
                    placeholder="00"
                    sx={{ maxWidth: dynamicWidth }}
                    error={!!errors.tax_slabs?.[formType]?.[index]?.tax_rate?.message}
                    helperText={errorMessage(
                        errors.tax_slabs?.[formType]?.[index]?.tax_rate?.message
                    )}
                />
            </TableCell>
            <TableCell>
                <TextField
                    control={control}
                    name={`tax_slabs.${formType}.${index}.surcharge_rate`}
                    placeholder="00"
                    style={{ maxWidth: "400px" }}
                    sx={{ maxWidth: dynamicWidth }}
                    error={!!errors.tax_slabs?.[formType]?.[index]?.surcharge_rate?.message}
                    helperText={errorMessage(
                        errors.tax_slabs?.[formType]?.[index]?.surcharge_rate?.message
                    )}
                />
            </TableCell>

            <TableCell>
                {watch(`tax_slabs.${formType}`).length > 1 && (
                    <DeleteAction onClick={() => removeTaxSlab(index)} />
                )}
            </TableCell>
        </TableRow>
    );
};