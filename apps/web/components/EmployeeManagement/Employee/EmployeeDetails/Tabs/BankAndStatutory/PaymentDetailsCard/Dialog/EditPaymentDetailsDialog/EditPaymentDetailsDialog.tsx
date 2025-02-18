import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import {
  Button,
  dateFormats,
  Dialog,
  FormContainer,
  FormSection,
  Tabs,
  toasts,
} from "@repo/shared-components";
import { useQueryClient } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { bankKeys } from "../../../../../../../../../queryKeysFactories/bank";
import { onError } from "../../../../../../../../../utils/errors";
import { filterChangedFormFields } from "../../../../../../../../../utils/helper";
import {
  BANK,
  CASH,
} from "../../../../../../../../common/Autocomplete/hooks/constant";
import type { BankInfoFormFieldValues } from "../../../../../../AddEmployee/BankInfoForm";
import {
  BankInfoForm,
  BankInfoFormSchema,
} from "../../../../../../AddEmployee/BankInfoForm";
import { CORRECTION_OF_DATA } from "../../../../EmployeeWorkPost/Tabs/EmployeeOrganizationDetails/BusinessUnit/Dialogs/EditBusinessUnitDialog/hooks/constant";
import { useTabOptions } from "../../../../EmployeeWorkPost/Tabs/EmployeeOrganizationDetails/BusinessUnit/Dialogs/EditBusinessUnitDialog/hooks/useTabOptions";
import { useEditPaymentDetails } from "./hooks/useEditPaymentDetails";
import { useGetPaymentDetails } from "./hooks/useGetPaymentDetails";

type EditPaymentDetailsDialogProps = {
  onClose: () => void;
  open: boolean;
  employeeId: string;
};

const formDefaultValues: BankInfoFormFieldValues = {
  payment_type: CASH,
  bank_id: null,
  branch_name: null,
  account_type: null,
  account_no: null,
  ifsc_code: null,
  name_as_per_bank: null,
  effective_from: null,
  operationType: CORRECTION_OF_DATA,
};

export const EditPaymentDetailsDialog = ({
  onClose,
  open,
  employeeId,
}: EditPaymentDetailsDialogProps) => {
  const { operationType, menuItems } = useTabOptions({});

  const { data: BankInformation, isFetching: loading } = useGetPaymentDetails({
    employeeId,
  });

  const defaultValues = useMemo(() => {
    if (BankInformation) {
      const businessUnitFormFieldValues: BankInfoFormFieldValues = {
        account_no: BankInformation.account_no,
        name_as_per_bank: BankInformation.name_as_per_bank,
        branch_name: BankInformation.branch_name,
        account_type: BankInformation.account_type,
        ifsc_code: BankInformation.ifsc_code,
        payment_type: BankInformation.payment_type,
        bank_id: BankInformation.bank_id,
        effective_from: BankInformation.effective_from,
        operationType,
      };

      return businessUnitFormFieldValues;
    }

    return formDefaultValues;
  }, [BankInformation]);

  const queryClient = useQueryClient();

  const {
    control,
    watch,
    setError,
    setValue,
    clearErrors,
    formState: { errors, dirtyFields },
    handleSubmit,
  } = useForm<BankInfoFormFieldValues>({
    values: defaultValues,
    resolver: zodResolver(BankInfoFormSchema),
    mode: "all",
  });

  useMemo(() => {
    setValue("operationType", operationType);

    if (operationType === CORRECTION_OF_DATA && defaultValues) {
      setValue("effective_from", defaultValues.effective_from, {
        shouldDirty: true,
      });

      clearErrors("effective_from");
    }
  }, [operationType]);

  const { mutate, isPending } = useEditPaymentDetails({
    bankId: employeeId,
    operationType,
    options: {
      onSuccess: (data) => {
        onClose();
        queryClient.invalidateQueries({
          queryKey: bankKeys.get(employeeId),
        });
        toasts.success({ title: data.message });
      },
      onError: (error) => onError(error, setError),
    },
  });

  const editBankDetails = () => {
    handleSubmit((formValues) => {
      let filterFormValues = filterChangedFormFields(formValues, {
        ...dirtyFields,
        ...(operationType === "assign_new_data"
          ? {
              payment_type: true,
              effective_from: true,
              ...(formValues.payment_type === BANK
                ? {
                    bank_id: true,
                    branch_name: true,
                    account_type: true,
                    account_no: true,
                    ifsc_code: true,
                    name_as_per_bank: true,
                  }
                : {}),
            }
          : {}),
      });

      filterFormValues = {
        ...filterFormValues,
        effective_from:
          filterFormValues?.effective_from &&
          DateTime.fromISO(filterFormValues.effective_from).toFormat(
            dateFormats.dateWithISO8601
          ),
      };

      mutate(filterFormValues);
    })();
  };

  return (
    <Dialog
      maxWidth="md"
      onClose={onClose}
      open={open}
      title="Edit Bank Details"
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={editBankDetails}
            loading={isPending}
            disabled={
              operationType === CORRECTION_OF_DATA
                ? Object.keys(errors ?? {}).length > 0 ||
                  Object.keys(dirtyFields ?? {}).length === 0
                : false
            }
          >
            Edit
          </Button>
        </Stack>
      }
    >
      <Tabs tabs={menuItems} value={operationType} />
      <FormContainer>
        <FormSection>
          <BankInfoForm
            watch={watch}
            errors={errors}
            loading={loading}
            control={control}
            setError={setError}
            operationType={operationType}
            defaultValues={defaultValues}
          />
        </FormSection>
      </FormContainer>
    </Dialog>
  );
};
