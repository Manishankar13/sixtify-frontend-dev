import { useQueryClient } from "@tanstack/react-query";
import { useDialogActions } from "../../../../../../../hooks/useDialogActions";
import { employeeAddressKeys } from "../../../../../../../queryKeysFactories/employeeAddress";
import type { DialogRenderer } from "../../../../../../../types/dialogs";

import { Stack } from "@mui/material";
import {
  Card,
  CardItem,
  CardItemValue,
  EditAction,
} from "@repo/shared-components";
import { EditPresentAddressDialog } from "./EditPresentAddressDialog";
import type { EmployeePresentAddress } from "./hooks/useGetEmployeePresentAddress";
export type EmployeeAddressDataRef = {
  refreshEmployeeAddressData: () => void;
};

type PresentAddressCardProps = {
  employeeId: string;
  isLoading: boolean;
  defaultValues?: EmployeePresentAddress;
};

export const PresentAddressCard = ({
  defaultValues,
  employeeId,
  isLoading,
}: PresentAddressCardProps) => {
  const { openedDialog, onDialogClose, onDialogOpen } = useDialogActions();

  const queryClient = useQueryClient();

  const dialogRenderer: DialogRenderer = {
    edit: (
      <EditPresentAddressDialog
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
        heading="Present Address"
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
