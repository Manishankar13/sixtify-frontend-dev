import { Stack } from "@mui/material";
import { Button, Dialog, toasts } from "@repo/shared-components";
import { useMemo, useRef } from "react";
import { useDisabledButtonsCache } from "../../../../../../app/context/DisabledButtonsCacheContext/DisabledButtonsCacheContext";
import { submitButtonId } from "../../../../../../hooks/useEnableDisableSubmitButtonToggle";
import { onError } from "../../../../../../utils/errors";
import { FormRef, IncomeTaxForm, IncomeTaxFormValues } from "./IncomeTaxForm";
import { useEditIncomeTax } from "./hooks/useEditIncomeTax";
import { useGetViewIncomeTax } from "./hooks/useGetViewIncomeTax";

type EditIncomeTaxDialogProps = {
  open: boolean;
  onClose: () => void;
  onEditSuccess: () => void;
  incomeTaxId: string;
};

export const EditIncomeTax = ({
  incomeTaxId,
  open,
  onClose,
  onEditSuccess,
}: EditIncomeTaxDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { isDisabled } = useDisabledButtonsCache(submitButtonId);

  const { data: incomeTax, isPending: isPendingLatestIncomeTax } =
    useGetViewIncomeTax({
      incomeTaxId,
    });

  const { mutate, isPending } = useEditIncomeTax({
    incomeTaxId,
    options: {
      onSuccess: (data) => {
        onClose();
        onEditSuccess();
        toasts.success({ title: data.message });
      },
      onError: (error) => onError(error, formRef.current?.setError),
    },
  });

  const onEditIncomeTax = () => {
    formRef.current?.submitForm((formValues) => {
      mutate(formValues);
    });
  };

  const defaultValues = useMemo(() => {
    if (incomeTax) {
      const incomeTaxFormFieldValues: IncomeTaxFormValues = {
        regime_type: incomeTax.regime_type,
        standard_deduction_limit: incomeTax.standard_deduction_limit,
        health_education_cess_rate: incomeTax.health_education_cess_rate,
        financial_year: incomeTax.financial_year,
        tax_slabs: {
          standard: incomeTax.tax_slabs.standard.map((slab) => ({
            start_range: slab.start_range,
            end_range: slab.end_range,
            tax_rate: slab.tax_rate,
            surcharge_rate: slab.surcharge_rate,
          })),
          senior: incomeTax.tax_slabs.senior.map((slab) => ({
            start_range: slab.start_range,
            end_range: slab.end_range,
            tax_rate: slab.tax_rate,
            surcharge_rate: slab.surcharge_rate,
          })),
          super_senior: incomeTax.tax_slabs.super_senior.map((slab) => ({
            start_range: slab.start_range,
            end_range: slab.end_range,
            tax_rate: slab.tax_rate,
            surcharge_rate: slab.surcharge_rate,
          })),
        },
      };

      return incomeTaxFormFieldValues;
    }
  }, [incomeTax]);

  return (
    <Dialog
      maxWidth="lg"
      onClose={onClose}
      open={open}
      title="Edit Income Tax Regime"
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={onEditIncomeTax}
            loading={isPending}
            disabled={isDisabled()}
          >
            Edit
          </Button>
        </Stack>
      }
    >
      <IncomeTaxForm
        ref={formRef}
        defaultValues={defaultValues}
        loading={isPendingLatestIncomeTax}
      />
    </Dialog>
  );
};
