import { Add } from "@mui/icons-material";
import {
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import {
  Button,
  DeleteAction,
  PadBox,
  TextField,
} from "@repo/shared-components";
import { useSearchParams } from "next/navigation";
import { useFieldArray, useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import type {
  LateArrivalPenaltyConditionType,
  PenaltyRulesFormFieldValues,
} from "../PenaltyRulesForm";

export type SlabFields = Partial<{
  id: string;
  late_from_minutes: number | null;
  late_to_minutes: number | null;
  penalty_deduction_minutes: number | null;
}>;

type PenaltySlabTableProps = {
  deletedPenaltySlabId?: LateArrivalPenaltyConditionType;
  setDeletedPenaltySlabId?: (slabId: LateArrivalPenaltyConditionType) => void;
};

export const PenaltySlabTable = ({
  deletedPenaltySlabId,
  setDeletedPenaltySlabId,
}: PenaltySlabTableProps) => {
  const theme = useTheme();

  const { slate } = theme.palette.app.color;

  const searchParams = useSearchParams();

  const mode = searchParams.get("page");

  const isViewMode = mode === "view-penalty-rules";

  const {
    watch,
    setValue,
    clearErrors,
    control,
    formState: { errors },
  } = useFormContext<PenaltyRulesFormFieldValues>();

  const Headers = [
    "Late From (Minutes)",
    "Late To (Minutes)",
    "Penalty Deduction (Minutes)",
    "Actions",
  ];

  const penalty_slabs =
    watch("late_arrival_penalty_condition.penalty_slabs") ?? [];

  const preRowEndTime = watch(
    `late_arrival_penalty_condition.penalty_slabs.${penalty_slabs?.length - 1}.late_to_minutes`
  );

  const { append, fields, remove } = useFieldArray({
    name: "late_arrival_penalty_condition.penalty_slabs",
    keyName: "arrayId",
    control,
  });

  if (!fields || fields.length === 0) {
    append({
      action: "add",
      late_from_minutes: null,
      late_to_minutes: null,
      penalty_deduction_minutes: null,
    });
  }

  const handleAddNewRow = () => {
    if (penalty_slabs) {
      const updatedPenaltySlabs = [
        ...penalty_slabs,
        {
          action: "add",
          late_from_minutes: (preRowEndTime && preRowEndTime + 1) ?? null,
          late_to_minutes: null,
          penalty_deduction_minutes: null,
        },
      ];

      setValue(
        "late_arrival_penalty_condition.penalty_slabs",
        updatedPenaltySlabs
      );
    }
  };

  const handleRemoveRow = (index: number) => {
    clearErrors("late_arrival_penalty_condition.penalty_slabs");

    remove(index);
  };

  return (
    <Stack gap="15px">
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: slate[700] }}>
            {Headers.map((item) => (
              <TableCell key={uuidv4()}>{item}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {Array.isArray(fields) &&
            fields.map((field, index) => (
              <TableRow sx={{ verticalAlign: "baseline" }} key={field.arrayId}>
                <TableCell>
                  <TextField
                    control={control}
                    name={`late_arrival_penalty_condition.penalty_slabs.${index}.late_from_minutes`}
                    placeholder="00"
                    type="number"
                    style={{ maxWidth: "400px" }}
                    disabled={isViewMode}
                    error={
                      !!errors?.late_arrival_penalty_condition?.penalty_slabs?.[
                        index
                      ]?.late_from_minutes
                    }
                    helperText={
                      errors?.late_arrival_penalty_condition?.penalty_slabs?.[
                        index
                      ]?.late_from_minutes?.message
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    control={control}
                    name={`late_arrival_penalty_condition.penalty_slabs.${index}.late_to_minutes`}
                    placeholder="00"
                    type="number"
                    error={
                      !!errors?.late_arrival_penalty_condition?.penalty_slabs?.[
                        index
                      ]?.late_to_minutes
                    }
                    disabled={isViewMode}
                    helperText={
                      errors?.late_arrival_penalty_condition?.penalty_slabs?.[
                        index
                      ]?.late_to_minutes?.message
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    control={control}
                    name={`late_arrival_penalty_condition.penalty_slabs.${index}.penalty_deduction_minutes`}
                    placeholder="00"
                    type="number"
                    error={
                      !!errors?.late_arrival_penalty_condition?.penalty_slabs?.[
                        index
                      ]?.penalty_deduction_minutes
                    }
                    disabled={isViewMode}
                    helperText={
                      errors?.late_arrival_penalty_condition?.penalty_slabs?.[
                        index
                      ]?.penalty_deduction_minutes?.message
                    }
                  />
                </TableCell>
                <TableCell>
                  <DeleteAction
                    onClick={() => {
                      if (setDeletedPenaltySlabId && field.id) {
                        const updatedSlabId: LateArrivalPenaltyConditionType = {
                          ...deletedPenaltySlabId,
                          penalty_slabs: [
                            ...(deletedPenaltySlabId?.penalty_slabs || []),
                            {
                              id: field.id,
                              action: "delete",
                            },
                          ],
                        };

                        setDeletedPenaltySlabId(updatedSlabId);
                      }
                      handleRemoveRow(index);
                    }}
                    disabled={(penalty_slabs?.length ?? 0) <= 1 || isViewMode}
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
            disabled={
              Object.keys(errors).some((key) =>
                key.startsWith("late_arrival_penalty_condition.penalty_slabs")
              ) ||
              isViewMode ||
              !preRowEndTime
            }
          >
            Add New
          </Button>
        </Divider>
      </PadBox>
    </Stack>
  );
};
