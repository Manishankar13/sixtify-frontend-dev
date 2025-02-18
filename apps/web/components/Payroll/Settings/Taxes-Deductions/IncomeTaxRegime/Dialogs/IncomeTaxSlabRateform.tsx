import { Add } from "@mui/icons-material";
import {
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Button,
  DeleteAction,
  PadBox,
  TextField,
} from "@repo/shared-components";
import React, { useEffect } from "react";
import { Control, FieldErrors, useFieldArray, useWatch } from "react-hook-form";
import { z } from "zod";
import { IncomeTaxFormValues } from "./IncomeTaxForm";
import { useTranslation } from "react-i18next";

const percentageRegex = /^(100|[1-9]?[0-9](\.\d{1,2})?)$/;

export const taxSlabsSchema = z.object({
  start_range: z
    .number()
    .positive("Start range must be a positive number")
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  end_range: z
    .number()
    .positive("End range must be a positive number")
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  tax_rate: z
    .string()
    .regex(percentageRegex, "Valid percentage")
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    })
    .transform((value) => (value ? parseFloat(value) : null)),
  surcharge_rate: z
    .string()
    .regex(percentageRegex, "Valid percentage")
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    })
    .transform((value) => (value ? parseFloat(value) : null)),
});

export type TaxSlabs = {
  standard?: Array<typeof taxSlabsSchema._type> | null;
  senior?: Array<typeof taxSlabsSchema._type> | null;
  super_senior?: Array<typeof taxSlabsSchema._type> | null;
};

const Headers = [
  "Start Range",
  "End Range",
  "Tax Rate (%)",
  "Surcharge Rate (%)",
  "Actions",
];

type IncomeTaxSlabRateFormProps = {
  slabType: "standard" | "senior" | "super_senior";
  errors: FieldErrors<IncomeTaxFormValues>;
  control: Control<IncomeTaxFormValues>;
  disabled: boolean;
  loading: boolean;
};

export const IncomeTaxSlabRateForm: React.FC<IncomeTaxSlabRateFormProps> = ({
  slabType,
  control,
  errors,
  disabled,
  loading,
}) => {
  let labelText = "";

  if (slabType === "standard") {
    labelText = "Standard Taxpayer (Below 60)";
  } else if (slabType === "senior") {
    labelText = "Senior Citizen (60 to 80)";
  } else {
    labelText = "Super Senior Citizen(80 and Above)";
  }

  const { fields, append, remove } = useFieldArray({
    name: `tax_slabs.${slabType}`,
    control,
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({
        start_range: null,
        end_range: null,
        tax_rate: null,
        surcharge_rate: null,
      });
    }
  }, [fields, append]);

  const theme = useTheme();

  const { slate } = theme.palette.app.color;

  const handleAddNewRow = () => {
    append({
      start_range: null,
      end_range: null,
      tax_rate: null,
      surcharge_rate: null,
    });
  };

  const handleRemoveRow = (index: number) => {
    remove(index);
  };

  const { t } = useTranslation();

  const errorMessages = (messageKey?: string) => {
    return messageKey && t(messageKey);
  };

  const watchedRows = useWatch({
    control,
    name: `tax_slabs.${slabType}`,
  });

  const isAllRowsFilled = watchedRows?.every(
    (row) =>
      !!row?.start_range &&
      !!row?.end_range &&
      !!row?.tax_rate &&
      !!row?.surcharge_rate
  );

  return (
    <Stack direction="column" gap="10px">
      <Typography variant="body1" fontWeight={500}>
        {labelText}
      </Typography>

      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: slate[700] }}>
            {Headers?.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {fields?.map((field, index) => (
            <TableRow key={field.id}>
              <TableCell>
                <TextField
                  control={control}
                  name={`tax_slabs.${slabType}.${index}.start_range`}
                  placeholder="00"
                  type="number"
                  error={
                    !!errors?.tax_slabs?.[slabType]?.[index]?.start_range
                      ?.message
                  }
                  helperText={errorMessages(
                    errors?.tax_slabs?.[slabType]?.[index]?.start_range?.message
                  )}
                  disabled={disabled}
                  loading={loading}
                />
              </TableCell>

              <TableCell>
                <TextField
                  control={control}
                  name={`tax_slabs.${slabType}.${index}.end_range`}
                  placeholder="00"
                  type="number"
                  error={
                    !!errors?.tax_slabs?.[slabType]?.[index]?.end_range?.message
                  }
                  helperText={errorMessages(
                    errors?.tax_slabs?.[slabType]?.[index]?.end_range?.message
                  )}
                  disabled={disabled}
                  loading={loading}
                />
              </TableCell>

              <TableCell>
                <TextField
                  control={control}
                  name={`tax_slabs.${slabType}.${index}.tax_rate`}
                  placeholder="00"
                  error={
                    !!errors?.tax_slabs?.[slabType]?.[index]?.tax_rate?.message
                  }
                  helperText={errorMessages(
                    errors?.tax_slabs?.[slabType]?.[index]?.tax_rate?.message
                  )}
                  disabled={disabled}
                  loading={loading}
                />
              </TableCell>

              <TableCell>
                <TextField
                  control={control}
                  name={`tax_slabs.${slabType}.${index}.surcharge_rate`}
                  placeholder="00"
                  error={
                    !!errors?.tax_slabs?.[slabType]?.[index]?.surcharge_rate
                      ?.message
                  }
                  helperText={errorMessages(
                    errors?.tax_slabs?.[slabType]?.[index]?.surcharge_rate
                      ?.message
                  )}
                  disabled={disabled}
                  loading={loading}
                />
              </TableCell>

              <TableCell>
                <DeleteAction
                  onClick={() => handleRemoveRow(index)}
                  disabled={disabled}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PadBox padding={{ padding: "15px" }}>
        <Divider>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddNewRow}
            disabled={!isAllRowsFilled || disabled}
          >
            Add New
          </Button>
        </Divider>
      </PadBox>
    </Stack>
  );
};
