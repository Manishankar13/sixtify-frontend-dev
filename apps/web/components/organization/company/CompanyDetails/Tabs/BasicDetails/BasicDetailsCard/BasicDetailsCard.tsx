import { Stack, useTheme } from "@mui/material";
import {
  Card,
  CardItem,
  CardItemValue,
  EditAction,
} from "@repo/shared-components";
import { useQueryClient } from "@tanstack/react-query";
import type { PageProps } from "../../../../../../../app/organization/company/[companyId]/page";
import { useDialogActions } from "../../../../../../../hooks/useDialogActions";
import { basicDetailsKey } from "../../../../../../../queryKeysFactories/basicDetails";
import type { DialogRenderer } from "../../../../../../../types/dialogs";
import { dateFormat } from "../../../../../../../utils/date";
import { useGetBasicDetails } from "../../hooks/useGetBasicDetails";
import { EditBasicDetailsDialog } from "./Dialogs/EditBasicDetailsDialog";

type BasicDetailsCardProps = Readonly<PageProps["params"]>;

export function BasicDetailsCard({ companyId }: BasicDetailsCardProps) {
  const { data, isPending } = useGetBasicDetails({
    companyId,
  });

  const queryClient = useQueryClient();

  const { openedDialog, onDialogClose, onDialogOpen } = useDialogActions();

  const dialogRenderer: DialogRenderer = {
    edit: (
      <EditBasicDetailsDialog
        open
        onClose={onDialogClose}
        onEdit={() => {
          queryClient.invalidateQueries({
            queryKey: basicDetailsKey.get(companyId),
          });
        }}
        companyId={companyId}
        companyData={data}
      />
    ),
  };

  const theme = useTheme();

  const { butterflyBlue } = theme.palette.app.color;

  return (
    <>
      <Card
        heading="Basic Details"
        action={<EditAction onClick={() => onDialogOpen("edit")} />}
      >
        <Stack flexDirection="row" justifyContent="space-between" gap="30px">
          <Stack
            gap="15px"
            width="50%"
            sx={{
              borderRight: `2px solid ${butterflyBlue[300]}`,
              borderRightStyle: "dashed",
            }}
          >
            <CardItem
              label="Company Name"
              value={
                <CardItemValue title={data?.company_name} loading={isPending} />
              }
            />

            <CardItem
              label="Country"
              value={
                <CardItemValue title={data?.country_name} loading={isPending} />
              }
            />

            <CardItem
              label="State/Province"
              value={
                <CardItemValue title={data?.state_name} loading={isPending} />
              }
            />

            <CardItem
              label="City"
              value={
                <CardItemValue title={data?.city_name} loading={isPending} />
              }
            />

            <CardItem
              label="Pincode"
              value={
                <CardItemValue title={data?.pin_code} loading={isPending} />
              }
            />
            <CardItem
              label="Address"
              value={
                <CardItemValue
                  title={data?.address}
                  loading={isPending}
                  sx={{
                    WebkitLineClamp: "unset",
                  }}
                />
              }
            />
          </Stack>
          <Stack gap="15px" width="50%">
            <CardItem
              label="Email"
              value={<CardItemValue title={data?.email} loading={isPending} />}
            />
            <CardItem
              label="Mobile No"
              value={
                <CardItemValue title={data?.mobile_no} loading={isPending} />
              }
            />

            <CardItem
              label="Phone No"
              value={
                <CardItemValue title={data?.phone_no} loading={isPending} />
              }
            />
            <CardItem
              label="Industry"
              value={
                <CardItemValue
                  title={data?.industry_name}
                  loading={isPending}
                />
              }
            />
            <CardItem
              label="Start Date"
              value={
                <CardItemValue
                  title={
                    data?.company_start_date &&
                    dateFormat(data?.company_start_date, true)
                  }
                  loading={isPending}
                />
              }
            />

            <CardItem
              label="Vision & Mission"
              value={
                <CardItemValue
                  title={data?.vision_and_mission}
                  loading={isPending}
                  sx={{
                    WebkitLineClamp: "unset",
                  }}
                />
              }
            />

            <CardItem
              label="About Company"
              value={
                <CardItemValue
                  title={data?.about_company}
                  loading={isPending}
                  sx={{
                    WebkitLineClamp: "unset",
                  }}
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
