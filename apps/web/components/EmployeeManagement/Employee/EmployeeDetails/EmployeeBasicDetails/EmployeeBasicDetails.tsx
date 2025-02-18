"use client";

import { Box, Skeleton, Stack, Typography, useTheme } from "@mui/material";
import {
  CardItem,
  CardItemValue,
  EditAction,
  ImageUploadView,
  PadBox,
} from "@repo/shared-components";
import { useQueryClient } from "@tanstack/react-query";
import { capitalize } from "lodash";
import { useDialogActions } from "../../../../../hooks/useDialogActions";
import { employeeBasicDetailsKeys } from "../../../../../queryKeysFactories/employee";
import type { DialogRenderer } from "../../../../../types/dialogs";
import { dateFormat } from "../../../../../utils/date";
import { EditEmployeeBasicDetailsDialog } from "./Dialogs/EditEmployeeBasicDetailsDialog";
import { useGetEmployeeBasicDetails } from "./hooks/useGetEmployeeBasicDetails";

export function EmployeeBasicDetails({
  employeeId,
}: Readonly<{ employeeId: string }>) {
  const theme = useTheme();

  const { lightBlue, butterflyBlue } = theme.palette.app.color;

  const queryClient = useQueryClient();

  const { openedDialog, onDialogClose, onDialogOpen } = useDialogActions();

  const { data: employeeBasicDetailsData, isPending } =
    useGetEmployeeBasicDetails({
      employeeId,
    });

  const dialogRenderer: DialogRenderer = {
    edit: (
      <EditEmployeeBasicDetailsDialog
        open
        onClose={onDialogClose}
        employeeId={employeeId}
        onEditSuccess={() => {
          queryClient.invalidateQueries({
            queryKey: employeeBasicDetailsKeys.get(employeeId),
          });
        }}
      />
    ),
  };

  return (
    <Box bgcolor={lightBlue[50]} sx={{ borderRadius: "5px" }}>
      <PadBox padding={{ padding: 2 }}>
        <Stack flexDirection="row" alignItems="flex-start">
          <Stack flexDirection="row" gap="40px" flex={1}>
            <Stack
              flex={1}
              flexDirection="row"
              gap="20px"
              sx={{
                borderRight: `2px solid ${butterflyBlue[300]}`,
                borderRightStyle: "dashed",
              }}
            >
              <ImageUploadView
                defaultValue={employeeBasicDetailsData?.avatar}
                variant="circle"
              />

              <Stack gap="12px" flex={1}>
                {isPending ? (
                  <Skeleton
                    variant="rounded"
                    height={30}
                    animation="wave"
                    width="150px"
                  />
                ) : (
                  <Typography variant="h5">
                    {employeeBasicDetailsData?.employee_name}
                  </Typography>
                )}
                <Stack gap="5px">
                  <CardItemValue
                    title={employeeBasicDetailsData?.designation_name}
                    loading={isPending}
                  />
                  <CardItemValue
                    title={employeeBasicDetailsData?.department_name}
                    loading={isPending}
                  />
                </Stack>
                <Stack gap="5px" maxWidth="400px">
                  <CardItem
                    label="Employee Code"
                    value={
                      <CardItemValue
                        title={employeeBasicDetailsData?.employee_code}
                        loading={isPending}
                      />
                    }
                  />

                  <CardItem
                    label="Punch Code"
                    value={
                      <CardItemValue
                        title={employeeBasicDetailsData?.punch_code}
                        loading={isPending}
                      />
                    }
                  />

                  <CardItem
                    label="Date Of Join"
                    value={
                      <CardItemValue
                        title={
                          employeeBasicDetailsData?.joining_date &&
                          dateFormat(
                            employeeBasicDetailsData?.joining_date,
                            true
                          )
                        }
                        loading={isPending}
                      />
                    }
                  />
                </Stack>
              </Stack>
            </Stack>

            <Stack gap="10px" flex={1}>
              <CardItem
                label="Mobile"
                value={
                  <CardItemValue
                    title={employeeBasicDetailsData?.mobile_no}
                    loading={isPending}
                  />
                }
              />

              <CardItem
                label="Email"
                value={
                  <CardItemValue
                    title={employeeBasicDetailsData?.email}
                    loading={isPending}
                  />
                }
              />

              <CardItem
                label="Birthday"
                value={
                  <CardItemValue
                    title={
                      employeeBasicDetailsData?.date_of_birth &&
                      dateFormat(employeeBasicDetailsData?.date_of_birth, true)
                    }
                    loading={isPending}
                  />
                }
              />

              <CardItem
                label="Nick Name "
                value={
                  <CardItemValue
                    title={employeeBasicDetailsData?.nick_name}
                    loading={isPending}
                  />
                }
              />

              <CardItem
                label="Gender"
                value={
                  <CardItemValue
                    title={capitalize(employeeBasicDetailsData?.gender)}
                    loading={isPending}
                  />
                }
              />
              <CardItem
                label="Reporting To"
                value={
                  <CardItemValue
                    showAvatar
                    avatar={employeeBasicDetailsData?.reporting_manager_avatar}
                    title={capitalize(
                      employeeBasicDetailsData?.reporting_manager_name
                    )}
                    loading={isPending}
                  />
                }
              />
            </Stack>
          </Stack>

          <EditAction
            sx={{
              marginTop: "-10px",
            }}
            onClick={() => onDialogOpen("edit")}
          />
        </Stack>
      </PadBox>

      {openedDialog && dialogRenderer[openedDialog]}
    </Box>
  );
}
