import { Stack } from "@mui/material";
import { Button, Dialog, toasts } from "@repo/shared-components";
import { useEditShiftPlanner } from "./hook/useEditShiftPlanner";
import type { FormRef, SlotsType } from "./ShiftPlannerForm";
import { ShiftPlannerForm } from "./ShiftPlannerForm";
import { useRef } from "react";
import { onError } from "../../../../../utils/errors";
import type { ShiftPlannerEditFields } from "../ShiftPlannerList/ShiftPlannerList";

type ShiftPlannerDialogProps = {
  open: boolean;
  onClose: () => void;
  companyId: string;
  onEditSuccess: () => void;
  currentDate: string;
  shiftPlannerData: ShiftPlannerEditFields;
};
export const ShiftPlannerDialog = ({
  open,
  onClose,
  companyId,
  currentDate,
  shiftPlannerData,
  onEditSuccess,
}: ShiftPlannerDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { mutate, isPending } = useEditShiftPlanner({
    currentDate,
    options: {
      onSuccess: (data) => {
        onClose();
        onEditSuccess();
        toasts.success({ title: data.message });
      },
      onError: (error) => onError(error, formRef.current?.setError),
    },
  });

  const onEditShiftPlanner = () => {
    formRef.current?.submitForm((formValues) => {
      const slots: SlotsType[] = [{ ...shiftPlannerData }];

      mutate({ ...formValues, slots });
    });
  };

  return (
    <Dialog
      maxWidth="sm"
      onClose={onClose}
      open={open}
      title="Plan Shift"
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button onClick={onEditShiftPlanner} loading={isPending}>
            Edit
          </Button>
        </Stack>
      }
    >
      <ShiftPlannerForm
        ref={formRef}
        companyId={companyId}
        shiftPlannerData={shiftPlannerData}
      />
    </Dialog>
  );
};
