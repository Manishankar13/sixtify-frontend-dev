import { Stack } from "@mui/material";
import {
  Card,
  CardItem,
  CardItemValue,
  EditAction,
} from "@repo/shared-components";
import { useQueryClient } from "@tanstack/react-query";
import { useDialogActions } from "../../../../../../../hooks/useDialogActions";
import { employeeAddressKeys } from "../../../../../../../queryKeysFactories/employeeAddress";
import type { DialogRenderer } from "../../../../../../../types/dialogs";
import { PermanentAddressDialog } from "./EditPermanentAddressDialog";
import type { EmployeePermanentAddress } from "./hooks/useGetEmployeePermanentAddress";
export type EmployeeAddressDataRef = {
  refreshEmployeeAddressData: () => void;
};

type PermanentAddressCardProps = {
  employeeId: string;
  isLoading: boolean;
  defaultValues?: EmployeePermanentAddress;
};

export const PermanentAddressCard = ({
  defaultValues,
  isLoading,
  employeeId,
}: PermanentAddressCardProps) => {
  const { openedDialog, onDialogClose, onDialogOpen } = useDialogActions();

  const queryClient = useQueryClient();

  const dialogRenderer: DialogRenderer = {
    edit: (
      <PermanentAddressDialog
        employeeId={employeeId}
        open
        onClose={onDialogClose}
        onEditSuccess={() => {
          queryClient.invalidateQueries({
            queryKey: employeeAddressKeys.listing(employeeId),
          });
        }}
      />
    ),
  };

  return (
    <>
      <Card
        heading="Permanent Address"
        action={
          <Stack direction="row">
            <EditAction onClick={() => onDialogOpen("edit")} />
          </Stack>
        }
      >
        <CardItem
          label="Name"
          value={
            <CardItemValue title={defaultValues?.name} loading={isLoading} />
          }
        />

        <CardItem
          label="Address"
          value={
            <CardItemValue title={defaultValues?.address} loading={isLoading} />
          }
        />

        <CardItem
          label="City"
          value={
            <CardItemValue
              title={defaultValues?.city_name}
              loading={isLoading}
            />
          }
        />

        <CardItem
          label="State"
          value={
            <CardItemValue
              title={defaultValues?.state_name}
              loading={isLoading}
            />
          }
        />

        <CardItem
          label="Country"
          value={
            <CardItemValue
              title={defaultValues?.country_name}
              loading={isLoading}
            />
          }
        />

        <CardItem
          label="PinCode"
          value={
            <CardItemValue
              title={defaultValues?.pin_code}
              loading={isLoading}
            />
          }
        />

        <CardItem
          label="Mobile"
          value={
            <CardItemValue
              title={defaultValues?.mobile_no}
              loading={isLoading}
            />
          }
        />

        <CardItem
          label="Email"
          value={
            <CardItemValue title={defaultValues?.email} loading={isLoading} />
          }
        />
      </Card>
      {openedDialog && dialogRenderer[openedDialog]}
    </>
  );
};
