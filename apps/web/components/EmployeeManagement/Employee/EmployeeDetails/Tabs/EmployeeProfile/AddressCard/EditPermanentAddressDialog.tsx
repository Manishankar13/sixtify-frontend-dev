import { Stack, Typography } from "@mui/material";
import { Button, CheckBox, Dialog, toasts } from "@repo/shared-components";
import { useMemo, useRef } from "react";

import { isFunction } from "lodash";
import { useForm } from "react-hook-form";
import { onError } from "../../../../../../../utils/errors";
import { removeEmptyStrings } from "../../../../../../../utils/helper";
import type {
  EmployeeAddressFormFieldValues,
  FormRef,
} from "./EmployeeAddressForm";
import { EmployeeAddressForm } from "./EmployeeAddressForm";
import { useEditEmployeeAddress } from "./hooks/useEditEmployeeAddress";
import { useGetEmployeePermanentAddress } from "./hooks/useGetEmployeePermanentAddress";
import { useGetEmployeePresentAddress } from "./hooks/useGetEmployeePresentAddress";

type PermanentAddressDialogProps = {
  open: boolean;
  onClose: () => void;
  onEditSuccess: () => void;
  employeeId: string;
};

export const PermanentAddressDialog = ({
  employeeId,
  open,
  onClose,
  onEditSuccess,
}: PermanentAddressDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { control, watch } = useForm();

  const isCopyPresentAddress = watch("isCopyPresentAddress");

  const { data: permanentAddressData, isLoading: isLoadingPermanentAddress } =
    useGetEmployeePermanentAddress({
      employeeId,
    });

  const { data: presentAddressData, isLoading: isLoadingPresentAddress } =
    useGetEmployeePresentAddress({
      employeeId,
      enabled: isCopyPresentAddress,
    });

  const { mutate, isPending: isEditPending } = useEditEmployeeAddress({
    employeeId,
    options: {
      onSuccess: (data) => {
        onClose();

        if (isFunction(onEditSuccess)) {
          onEditSuccess();
        }
        toasts.success({ title: data.message });
      },
      onError: (error) => {
        const structuredError = {
          response: {
            data: {
              message: error.response.data.message,
              error: error.response.data.error
                .permanent as EmployeeAddressFormFieldValues,
            },
          },
        };

        onError(structuredError, formRef.current?.setError);
      },
    },
  });

  const defaultValues = useMemo(() => {
    const addressData =
      isCopyPresentAddress || presentAddressData
        ? presentAddressData
        : permanentAddressData;

    if (addressData) {
      const employeeAddressFormFieldValues: EmployeeAddressFormFieldValues = {
        name: addressData.name,
        address: addressData.address,
        city_id: addressData.city_id,
        state_id: addressData.state_id,
        country_id: addressData.country_id,
        pin_code: addressData.pin_code,
        mobile_no: addressData.mobile_no,
        email: addressData.email,
      };

      return employeeAddressFormFieldValues;
    }
  }, [presentAddressData, permanentAddressData, isCopyPresentAddress]);

  const onEditPersonalInformation = () => {
    formRef.current?.submitForm((payloadData) => {
      const payload =
        isCopyPresentAddress || presentAddressData
          ? { ...defaultValues, ...payloadData }
          : { ...payloadData };

      mutate({ permanent: removeEmptyStrings(payload) });
    });
  };

  const isLoading = isLoadingPresentAddress || isLoadingPermanentAddress;

  return (
    <Dialog
      maxWidth="lg"
      onClose={onClose}
      open={open}
      title="Permanent Address"
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button loading={isEditPending} onClick={onEditPersonalInformation}>
            Edit
          </Button>
        </Stack>
      }
    >
      <Stack alignItems="start" flexDirection="row" gap="10px">
        <CheckBox
          sx={{
            paddingLeft: "20px",
          }}
          name="isCopyPresentAddress"
          control={control}
        />
        <Typography variant="body1">Copy as Present Address</Typography>
      </Stack>
      <EmployeeAddressForm
        ref={formRef}
        defaultValues={defaultValues}
        loading={isLoading}
      />
    </Dialog>
  );
};
