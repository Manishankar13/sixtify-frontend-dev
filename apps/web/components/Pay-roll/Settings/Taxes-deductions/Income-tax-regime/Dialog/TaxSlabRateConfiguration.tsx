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
import _ from "lodash";
import type { Control, FieldErrors, UseFormWatch } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import type { IncomeTaxRegimeFormFieldValues } from "./IncomeTaxRegimeForm";

type TaxSlabRateConfigurationProps = {
  control: Control<Partial<IncomeTaxRegimeFormFieldValues>>;
  errors: FieldErrors<IncomeTaxRegimeFormFieldValues>;
  disabled: boolean;
  watch: UseFormWatch<Partial<IncomeTaxRegimeFormFieldValues>>;
};

const Headers = [
  "Start Range",
  "End Range",
  "Tax Rate (%)",
  "Surcharge Rate(%)",
  "Actions",
];

export const TaxSlabRateConfiguration = ({
  control,
  errors,
  disabled,
  watch,
}: TaxSlabRateConfigurationProps) => {
  const { t } = useTranslation();

  const theme = useTheme();

  const { slate } = theme.palette.app.color;

  const {
    fields: standardFields,
    append: appendStandard,
    remove: removeStandard,
  } = useFieldArray({
    control,
    keyName: "arrayId",
    name: "tax_slabs.standard",
  });

  const {
    fields: seniorFields,
    append: appendSenior,
    remove: removeSenior,
  } = useFieldArray({
    control,
    keyName: "arrayId",
    name: "tax_slabs.senior",
  });

  const {
    fields: superSeniorFields,
    append: appendSuperSenior,
    remove: removeSuperSenior,
  } = useFieldArray({
    control,
    keyName: "arrayId",
    name: "tax_slabs.super_senior",
  });

  const standardlastIndex = standardFields.length - 1;

  const seniorlastIndex = seniorFields.length - 1;

  const superSeniorlastIndex = superSeniorFields.length - 1;

  const standardlastRow = watch(`tax_slabs.standard.${standardlastIndex}`);

  const seniorlastRow = watch(`tax_slabs.senior.${seniorlastIndex}`);

  const superSeniorlastRow = watch(
    `tax_slabs.super_senior.${superSeniorlastIndex}`
  );

  const isStandardLastRowValid =
    standardlastRow?.start_range &&
    standardlastRow?.end_range &&
    standardlastRow?.tax_rate &&
    standardlastRow?.surcharge_rate;

  const isSeniorLastRowValid =
    seniorlastRow?.start_range &&
    seniorlastRow?.end_range &&
    seniorlastRow?.tax_rate &&
    seniorlastRow?.surcharge_rate;

  const isSuperSeniorLastRowValid =
    superSeniorlastRow?.start_range &&
    superSeniorlastRow?.end_range &&
    superSeniorlastRow?.tax_rate &&
    superSeniorlastRow?.surcharge_rate;

  const handleAddNewRow = (field: string) => {
    switch (field) {
      case "standard":
        appendStandard({
          start_range: null,
          end_range: null,
          tax_rate: null,
          surcharge_rate: null,
        });
        break;

      case "senior":
        appendSenior({
          start_range: null,
          end_range: null,
          tax_rate: null,
          surcharge_rate: null,
        });
        break;

      case "super_senior":
        appendSuperSenior({
          start_range: null,
          end_range: null,
          tax_rate: null,
          surcharge_rate: null,
        });
        break;
    }
  };

  return (
    <Stack gap="15px">
      <Stack gap="15px">
        <Typography variant="h6">Standard Taxpayer(Below 60)</Typography>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: slate[700] }}>
              {Headers.map((item) => (
                <TableCell key={uuidv4()}>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {Array.isArray(standardFields) &&
              standardFields.map((field, index) => (
                <TableRow
                  sx={{ verticalAlign: "baseline" }}
                  key={field.arrayId}
                >
                  <TableCell>
                    <TextField
                      name={`tax_slabs.standard.${index}.start_range`}
                      control={control}
                      isCapitalize
                      type="number"
                      disabled={disabled}
                      placeholder="Start Range"
                      error={
                        !!_.get(
                          errors,
                          `tax_slabs.standard[${index}].start_range`
                        )
                      }
                      helperText={t(
                        _.get(
                          errors,
                          `tax_slabs.standard[${index}].start_range.message`,
                          ""
                        )
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name={`tax_slabs.standard.${index}.end_range`}
                      control={control}
                      isCapitalize
                      disabled={disabled}
                      type="number"
                      placeholder="End Range"
                      error={
                        !!_.get(
                          errors,
                          `tax_slabs.standard[${index}].end_range`
                        )
                      }
                      helperText={t(
                        _.get(
                          errors,
                          `tax_slabs.standard[${index}].end_range.message`,
                          ""
                        )
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name={`tax_slabs.standard.${index}.tax_rate`}
                      control={control}
                      isCapitalize
                      disabled={disabled}
                      type="number"
                      placeholder="Tax Rate"
                      error={
                        !!_.get(errors, `tax_slabs.standard[${index}].tax_rate`)
                      }
                      helperText={t(
                        _.get(
                          errors,
                          `tax_slabs.standard[${index}].tax_rate.message`,
                          ""
                        )
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name={`tax_slabs.standard.${index}.surcharge_rate`}
                      control={control}
                      disabled={disabled}
                      isCapitalize
                      type="number"
                      placeholder="Surcharge Rate"
                      error={
                        !!_.get(
                          errors,
                          `tax_slabs.standard[${index}].surcharge_rate`
                        )
                      }
                      helperText={t(
                        _.get(
                          errors,
                          `tax_slabs.standard[${index}].surcharge_rate.message`,
                          ""
                        )
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <DeleteAction
                      onClick={() =>
                        standardFields?.length > 1 && removeStandard(index)
                      }
                      disabled={
                        (standardFields?.length ?? 0) <= 1
                        // || isViewMode
                      }
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
              onClick={() => handleAddNewRow("standard")}
              disabled={
                Object.keys(errors).some((key) =>
                  key.startsWith("tax_slabs.standard")
                ) ||
                !isStandardLastRowValid ||
                disabled
                //  ||
                // isViewMode ||
                // !preRowEndTime
              }
            >
              Add New
            </Button>
          </Divider>
        </PadBox>
      </Stack>
      <Stack gap="15px">
        <Typography variant="h6">Senior Citizen(60 to 80)</Typography>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: slate[700] }}>
              {Headers.map((item) => (
                <TableCell key={uuidv4()}>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {Array.isArray(seniorFields) &&
              seniorFields.map((field, index) => (
                <TableRow
                  sx={{ verticalAlign: "baseline" }}
                  key={field.arrayId}
                >
                  <TableCell>
                    <TextField
                      name={`tax_slabs.senior.${index}.start_range`}
                      control={control}
                      disabled={disabled}
                      isCapitalize
                      type="number"
                      placeholder="Start Range"
                      error={
                        !!_.get(
                          errors,
                          `tax_slabs.senior[${index}].start_range`
                        )
                      }
                      helperText={t(
                        _.get(
                          errors,
                          `tax_slabs.senior[${index}].start_range.message`,
                          ""
                        )
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name={`tax_slabs.senior.${index}.end_range`}
                      control={control}
                      disabled={disabled}
                      isCapitalize
                      type="number"
                      placeholder="End Range"
                      error={
                        !!_.get(errors, `tax_slabs.senior[${index}].end_range`)
                      }
                      helperText={t(
                        _.get(
                          errors,
                          `tax_slabs.senior[${index}].end_range.message`,
                          ""
                        )
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name={`tax_slabs.senior.${index}.tax_rate`}
                      control={control}
                      disabled={disabled}
                      isCapitalize
                      type="number"
                      placeholder="Tax Rate"
                      error={
                        !!_.get(errors, `tax_slabs.senior[${index}].tax_rate`)
                      }
                      helperText={t(
                        _.get(
                          errors,
                          `tax_slabs.senior[${index}].tax_rate.message`,
                          ""
                        )
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name={`tax_slabs.senior.${index}.surcharge_rate`}
                      control={control}
                      disabled={disabled}
                      isCapitalize
                      type="number"
                      placeholder="Surcharge Rate"
                      error={
                        !!_.get(
                          errors,
                          `tax_slabs.senior[${index}].surcharge_rate`
                        )
                      }
                      helperText={t(
                        _.get(
                          errors,
                          `tax_slabs.senior[${index}].surcharge_rate.message`,
                          ""
                        )
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <DeleteAction
                      onClick={() =>
                        seniorFields?.length > 1 && removeSenior(index)
                      }
                      disabled={
                        (seniorFields?.length ?? 0) <= 1
                        // || isViewMode
                      }
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
              onClick={() => handleAddNewRow("senior")}
              disabled={
                Object.keys(errors).some((key) =>
                  key.startsWith("tax_slabs.senior")
                ) ||
                !isSeniorLastRowValid ||
                disabled
                //  ||
                // isViewMode ||
                // !preRowEndTime
              }
            >
              Add New
            </Button>
          </Divider>
        </PadBox>
      </Stack>
      <Stack gap="15px">
        <Typography variant="h6">Super Senior Citizen(80 and Above)</Typography>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: slate[700] }}>
              {Headers.map((item) => (
                <TableCell key={uuidv4()}>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {Array.isArray(superSeniorFields) &&
              superSeniorFields.map((field, index) => (
                <TableRow
                  sx={{ verticalAlign: "baseline" }}
                  key={field.arrayId}
                >
                  <TableCell>
                    <TextField
                      name={`tax_slabs.super_senior.${index}.start_range`}
                      control={control}
                      disabled={disabled}
                      isCapitalize
                      type="number"
                      placeholder="Start Range"
                      error={
                        !!_.get(
                          errors,
                          `tax_slabs.super_senior[${index}].start_range`
                        )
                      }
                      helperText={t(
                        _.get(
                          errors,
                          `tax_slabs.super_senior[${index}].start_range.message`,
                          ""
                        )
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name={`tax_slabs.super_senior.${index}.end_range`}
                      control={control}
                      disabled={disabled}
                      isCapitalize
                      type="number"
                      placeholder="End Range"
                      error={
                        !!_.get(
                          errors,
                          `tax_slabs.super_senior[${index}].end_range`
                        )
                      }
                      helperText={t(
                        _.get(
                          errors,
                          `tax_slabs.super_senior[${index}].end_range.message`,
                          ""
                        )
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name={`tax_slabs.super_senior.${index}.tax_rate`}
                      control={control}
                      disabled={disabled}
                      isCapitalize
                      type="number"
                      placeholder="Tax Rate"
                      error={
                        !!_.get(
                          errors,
                          `tax_slabs.super_senior[${index}].tax_rate`
                        )
                      }
                      helperText={t(
                        _.get(
                          errors,
                          `tax_slabs.super_senior[${index}].tax_rate.message`,
                          ""
                        )
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name={`tax_slabs.super_senior.${index}.surcharge_rate`}
                      control={control}
                      disabled={disabled}
                      isCapitalize
                      type="number"
                      placeholder="Surcharge Rate"
                      error={
                        !!_.get(
                          errors,
                          `tax_slabs.super_senior[${index}].surcharge_rate`
                        )
                      }
                      helperText={t(
                        _.get(
                          errors,
                          `tax_slabs.super_senior[${index}].surcharge_rate.message`,
                          ""
                        )
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <DeleteAction
                      onClick={() =>
                        superSeniorFields?.length > 1 &&
                        removeSuperSenior(index)
                      }
                      disabled={
                        (superSeniorFields?.length ?? 0) <= 1
                        // || isViewMode
                      }
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
              onClick={() => handleAddNewRow("super_senior")}
              disabled={
                Object.keys(errors).some((key) =>
                  key.startsWith("tax_slabs.super_senior")
                ) ||
                !isSuperSeniorLastRowValid ||
                disabled
                //  ||
                // isViewMode ||
                // !preRowEndTime
              }
            >
              Add New
            </Button>
          </Divider>
        </PadBox>
      </Stack>
    </Stack>
  );
};
