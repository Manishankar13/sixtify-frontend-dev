import { Stack } from "@mui/material";
import { Button, Dialog, toasts } from "@repo/shared-components";
import { isFunction } from "lodash";
import { DateTime } from "luxon";
import { useMemo, useRef } from "react";
import { useDisabledButtonsCache } from "../../../../../app/context/DisabledButtonsCacheContext/DisabledButtonsCacheContext";
import { submitButtonId } from "../../../../../hooks/useEnableDisableSubmitButtonToggle";
import { onError } from "../../../../../utils/errors";
import type { FormRef } from "./LeavePlanForm";
import { LeavePlanForm } from "./LeavePlanForm";
import { useEditLeavePlan } from "./hooks/useEditLeavePlan";
import { useGetLeavePlan } from "./hooks/useGetLeavePlan";

type EditLeavePlanDialogProps = {
  open: boolean;
  onClose: () => void;
  onEditSuccess: () => void;
  currentLeavePlanId: string;
};

export const EditLeavePlanDialog = ({
  open,
  onClose,
  onEditSuccess,
  currentLeavePlanId,
}: EditLeavePlanDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { isDisabled } = useDisabledButtonsCache(submitButtonId);

  const { data: leavePlan, isFetching: isPendingLeavePlan } = useGetLeavePlan({
    currentLeavePlanId,
  });

  const { mutate, isPending } = useEditLeavePlan({
    currentLeavePlanId,
    options: {
      onSuccess: (data) => {
        onClose();

        if (isFunction(onEditSuccess)) {
          onEditSuccess();
        }

        toasts.success({ title: data.message });
      },
      onError: (error) => onError(error, formRef.current?.setError),
    },
  });

  const onUpdateLeavePlan = () => {
    formRef.current?.submitForm((formValues) => {
      return mutate(formValues);
    });
  };

  const defaultValues = useMemo(() => {
    if (leavePlan) {
      const leavePlanFormattedDate = DateTime.now()
        .set({ month: leavePlan.year_start_month })
        .toISODate();

      const EditLeavePlanFormFieldValues = {
        ...leavePlan,
        year_start_month: leavePlanFormattedDate ?? null,
      };

      return EditLeavePlanFormFieldValues;
    }
  }, [leavePlan]);

  return (
    <Dialog
      maxWidth="sm"
      onClose={onClose}
      open={open}
      title="Edit Leave Plan"
      actions={
        <Stack direction="row" gap="5px">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={onUpdateLeavePlan}
            loading={isPending}
            disabled={isDisabled()}
          >
            Save
          </Button>
        </Stack>
      }
    >
      <LeavePlanForm
        ref={formRef}
        loading={isPendingLeavePlan}
        defaultValues={defaultValues}
      />
    </Dialog>
  );
};
