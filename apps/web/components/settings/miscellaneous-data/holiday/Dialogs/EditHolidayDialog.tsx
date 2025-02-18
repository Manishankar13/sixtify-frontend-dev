import { Stack } from "@mui/material";
import { Button, Dialog, toasts } from "@repo/shared-components";
import { useRef } from "react";
import { useDisabledButtonsCache } from "../../../../../app/context/DisabledButtonsCacheContext/DisabledButtonsCacheContext";
import { submitButtonId } from "../../../../../hooks/useEnableDisableSubmitButtonToggle";
import { onError } from "../../../../../utils/errors";
import type { Holiday } from "../HolidayList/hooks/useGetHolidays";
import type { FormRef } from "./HolidayForm";
import { HolidayForm } from "./HolidayForm";
import { useEditHoliday } from "./hooks/useEditHoliday";
import { useGetHoliday } from "./hooks/useGetHoliday";

type EditHolidayDialogProps = {
  open: boolean;
  onClose: () => void;
  onEditSuccess: () => void;
  holidayId: Holiday["id"];
};

export const EditHolidayDialog = ({
  holidayId,
  open,
  onClose,
  onEditSuccess,
}: EditHolidayDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { isDisabled } = useDisabledButtonsCache(submitButtonId);

  const { data: latestHolidayData, isPending: isPendingLatestHolidayData } =
    useGetHoliday({
      holidayId,
    });

  const { mutate, isPending } = useEditHoliday({
    holidayId,
    options: {
      onSuccess: (data) => {
        onClose();
        onEditSuccess();
        toasts.success({ title: data.message });
      },
      onError: (error) => onError(error, formRef.current?.setError),
    },
  });

  const onEditHoliday = () => {
    formRef.current?.submitForm((formValues) => {
      mutate(formValues);
    });
  };

  return (
    <Dialog
      maxWidth="sm"
      onClose={onClose}
      open={open}
      title="Edit Holiday"
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={onEditHoliday}
            loading={isPending}
            disabled={isDisabled()}
          >
            Edit
          </Button>
        </Stack>
      }
    >
      <HolidayForm
        ref={formRef}
        defaultValues={latestHolidayData}
        loading={isPendingLatestHolidayData}
      />
    </Dialog>
  );
};
