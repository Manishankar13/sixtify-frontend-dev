import { Add } from "@mui/icons-material";
import {
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { DeleteAction, PadBox, TextField } from "@repo/shared-components";
import {
  useFieldArray,
  type Control,
  type FieldErrors,
  type UseFormWatch,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import type { CompanyFormFieldType } from "./IncomeTaxRegimeForm";

type TaxSlabConfigurationProps = {
  title: string;
  slapType: "standard" | "senior" | "super_senior";
  control: Control<CompanyFormFieldType>;
  errors: FieldErrors<CompanyFormFieldType>;
  watch: UseFormWatch<CompanyFormFieldType>;
  handleAddNewRow?: () => void;
  remove?: (index: number) => void;
};

const headers = [
  "Start Range",
  "End Range",
  "Tax Rate",
  "Surcharge Rate",
  "Action",
];

export const IncomeTaxSlabsForm = ({
  watch,
  title,
  slapType = "standard",
  errors,
  control,
}: TaxSlabConfigurationProps) => {
  const { t } = useTranslation();

  const { append, fields, remove } = useFieldArray({
    name: `tax_slabs.${slapType}`,
    keyName: "id",
    control,
  });

  const handleAddNewRow = () => {
    append({
      start_range: null,
      end_range: null,
      tax_rate: null,
      surcharge_rate: null,
    });
  };

  const theme = useTheme();

  const { slate } = theme.palette.app.color;

  const errorMessages = (messageKey?: string) => {
    return messageKey && t(messageKey);
  };

  return (
    <>
      <Typography variant="h6" fontWeight={500}>
        {title}
      </Typography>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: slate[700] }}>
            {headers.map((item) => (
              <TableCell key={uuidv4()}>{item}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {Array.isArray(fields) &&
            fields.map((field, index) => (
              <TableRow sx={{ verticalAlign: "baseline" }} key={field.id}>
                <TableCell>
                  <TextField
                    control={control}
                    name={`tax_slabs.${slapType}.${index}.start_range`}
                    placeholder="00"
                    type="number"
                    style={{ maxWidth: "400px" }}
                    error={
                      !!errors?.tax_slabs?.[slapType]?.[index]?.start_range
                    }
                    helperText={errorMessages(
                      errors?.tax_slabs?.[slapType]?.[index]?.start_range
                        ?.message
                    )}
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    control={control}
                    name={`tax_slabs.${slapType}.${index}.end_range`}
                    placeholder="00"
                    type="number"
                    style={{ maxWidth: "400px" }}
                    error={!!errors?.tax_slabs?.[slapType]?.[index]?.end_range}
                    helperText={errorMessages(
                      errors?.tax_slabs?.[slapType]?.[index]?.end_range?.message
                    )}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    control={control}
                    name={`tax_slabs.${slapType}.${index}.tax_rate`}
                    placeholder="00"
                    style={{ maxWidth: "400px" }}
                    error={!!errors?.tax_slabs?.[slapType]?.[index]?.tax_rate}
                    helperText={errorMessages(
                      errors?.tax_slabs?.[slapType]?.[index]?.tax_rate?.message
                    )}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    control={control}
                    name={`tax_slabs.${slapType}.${index}.surcharge_rate`}
                    placeholder="00"
                    style={{ maxWidth: "400px" }}
                    error={
                      !!errors?.tax_slabs?.[slapType]?.[index]?.surcharge_rate
                    }
                    helperText={errorMessages(
                      errors?.tax_slabs?.[slapType]?.[index]?.surcharge_rate
                        ?.message
                    )}
                  />
                </TableCell>
                <TableCell>
                  {watch(`tax_slabs.${slapType}`).length > 1 && (
                    <DeleteAction onClick={() => remove(index)} />
                  )}
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
            disabled={Object.keys(errors).some((key) =>
              key.startsWith(`tax_slabs.${slapType}`)
            )}
          >
            Add New
          </Button>
        </Divider>
      </PadBox>
    </>
  );
};
