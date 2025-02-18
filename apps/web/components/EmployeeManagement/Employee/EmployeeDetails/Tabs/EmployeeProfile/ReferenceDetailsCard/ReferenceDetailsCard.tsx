import { Stack, useTheme } from "@mui/material";
import {
  Card,
  CardItem,
  CardItemValue,
  EditAction,
} from "@repo/shared-components";
import { useQueryClient } from "@tanstack/react-query";
import type { PageProps } from "../../../../../../../app/employee-management/employee/[employeeId]/page";
import { useDialogActions } from "../../../../../../../hooks/useDialogActions";
import { employeeReferenceDetails } from "../../../../../../../queryKeysFactories/employeeReferenceDetails";
import type { DialogRenderer } from "../../../../../../../types/dialogs";
import type { ReferenceTypeOptionsKey } from "../../../../../../common/Autocomplete/hooks/useGetReferenceTypeOptions";
import { ReferenceTypeOptions } from "../../../../../../common/Autocomplete/hooks/useGetReferenceTypeOptions";
import { EditReferenceDetailsDialog } from "./Dialogs/EditReferenceDetailsDialog";
import { useGetReferenceDetails } from "./hooks/useGetReferenceDetails";

type ReferenceDetailsCardProps = Readonly<PageProps["params"]>;

export function ReferenceDetailsCard({
  employeeId,
}: ReferenceDetailsCardProps) {
  const { openedDialog, onDialogClose, onDialogOpen } = useDialogActions();

  const queryClient = useQueryClient();

  const theme = useTheme();

  const { butterflyBlue } = theme.palette.app.color;

  const { data: referenceDetails, isPending } = useGetReferenceDetails({
    employeeId,
  });

  const dialogRenderer: DialogRenderer = {
    edit: (
      <EditReferenceDetailsDialog
        open
        onClose={onDialogClose}
        employeeId={employeeId}
        onEditSuccess={() => {
          queryClient.invalidateQueries({
            queryKey: employeeReferenceDetails.get(employeeId),
          });
        }}
      />
    ),
  };

  return (
    <>
      <Card
        heading="Reference Details"
        action={
          <Stack direction="row">
            <EditAction onClick={() => onDialogOpen("edit")} />
          </Stack>
        }
      >
        <Stack flex={1} flexDirection="row" gap="20px">
          <Stack
            gap="10px"
            flex={1}
            sx={{
              borderRight: `2px solid ${butterflyBlue[300]}`,
              borderRightStyle: "dashed",
            }}
          >
            <CardItem
              label="Reference Type"
              value={
                <CardItemValue
                  title={
                    referenceDetails?.reference_type &&
                    ReferenceTypeOptions[
                      referenceDetails.reference_type as ReferenceTypeOptionsKey
                    ]
                  }
                  loading={isPending}
                />
              }
            />

            <CardItem
              label="Reference Name"
              value={
                <CardItemValue
                  title={referenceDetails?.reference_name}
                  loading={isPending}
                />
              }
            />
          </Stack>

          <Stack gap="10px" flex={1}>
            <CardItem
              label="Reference Mobile No"
              value={
                <CardItemValue
                  title={referenceDetails?.reference_mobile_no}
                  loading={isPending}
                />
              }
            />

            <CardItem
              label="Reference Address"
              value={
                <CardItemValue
                  title={referenceDetails?.reference_address}
                  loading={isPending}
                />
              }
            />
          </Stack>
        </Stack>
      </Card>

      {openedDialog && dialogRenderer[openedDialog]}
    </>
  );
}
