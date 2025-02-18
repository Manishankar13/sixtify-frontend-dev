import { Stack } from "@mui/material";
import { Button, Dialog } from "@repo/shared-components";
import React from "react";
import { IncomeTaxForm } from "./IncomeTaxForm";
import { useGetViewIncomeTax } from "./hooks/useGetViewIncomeTax";

type AddIncomeTaxDialogProps = {
  open: boolean;
  onClose: () => void;
  incomeTaxId: string;
};

export const ViewIncomeTaxDetails = ({
  incomeTaxId,
  open,
  onClose,
}: AddIncomeTaxDialogProps) => {
  const { data: IncomeTax, isPending: isPendingLatestIncomeTax } =
    useGetViewIncomeTax({ incomeTaxId });

  return (
    <Dialog
      maxWidth="xl"
      onClose={onClose}
      open={open}
      title="View Income Tax Regime"
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
        </Stack>
      }
    >
      <IncomeTaxForm
        disabled
        defaultValues={IncomeTax}
        loading={isPendingLatestIncomeTax}
      />
    </Dialog>
  );
};
