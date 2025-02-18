import { Stack } from "@mui/material";
import { Button, Dialog, toasts } from "@repo/shared-components";
import { useMemo, useRef } from "react";
import { useDisabledButtonsCache } from "../../../../../../../../app/context/DisabledButtonsCacheContext/DisabledButtonsCacheContext";
import { submitButtonId } from "../../../../../../../../hooks/useEnableDisableSubmitButtonToggle";
import { onError } from "../../../../../../../../utils/errors";
import type { ReferenceDetails } from "../hooks/useGetReferenceDetails";
import { useGetReferenceDetails } from "../hooks/useGetReferenceDetails";
import type {
  FormRef,
  ReferenceDetailsFormFieldValues,
} from "../ReferenceDetailsForm";
import { ReferenceDetailsForm } from "../ReferenceDetailsForm";
import { useEditReferenceDetails } from "./hooks/useEditReferenceDetails";

type EditReferenceDetailsDialogProps = {
  open: boolean;
  onClose: () => void;
  onEditSuccess: () => void;
  employeeId: ReferenceDetails["id"];
};

export const EditReferenceDetailsDialog = ({
  employeeId,
  open,
  onClose,
  onEditSuccess,
}: EditReferenceDetailsDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { isDisabled } = useDisabledButtonsCache(submitButtonId);

  const {
    data: latesReferenceDetailsData,
    isPending: isPendingLatestReferenceDetailsData,
  } = useGetReferenceDetails({
    employeeId,
  });

  const { mutate, isPending } = useEditReferenceDetails({
    employeeId,
    options: {
      onSuccess: (data) => {
        onClose();
        onEditSuccess();
        toasts.success({ title: data.message });
      },
      onError: (error) => onError(error, formRef.current?.setError),
    },
  });

  const onEditDepartment = () => {
    formRef.current?.submitForm((formValues) => {
      mutate(formValues);
    });
  };

  const defaultValues = useMemo(() => {
    if (latesReferenceDetailsData) {
      const referenceDetailsFormFieldValues: ReferenceDetailsFormFieldValues = {
        reference_type: latesReferenceDetailsData.reference_type,
        reference_employee_id: latesReferenceDetailsData.reference_employee_id
          ? latesReferenceDetailsData.reference_employee_id
          : latesReferenceDetailsData.reference_name,
        reference_name: latesReferenceDetailsData.reference_employee_id
          ? null
          : (latesReferenceDetailsData.reference_name ?? null),
        reference_mobile_no: latesReferenceDetailsData.reference_mobile_no,
        reference_address: latesReferenceDetailsData.reference_address,
      };

      return referenceDetailsFormFieldValues;
    }
  }, [latesReferenceDetailsData]);

  return (
    <Dialog
      maxWidth="sm"
      onClose={onClose}
      open={open}
      title="Edit Reference Details"
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={onEditDepartment}
            loading={isPending}
            disabled={isDisabled()}
          >
            Edit
          </Button>
        </Stack>
      }
    >
      <ReferenceDetailsForm
        companyId={latesReferenceDetailsData?.company_id ?? ""}
        ref={formRef}
        defaultValues={defaultValues}
        loading={isPendingLatestReferenceDetailsData}
      />
    </Dialog>
  );
};
