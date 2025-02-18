import { Button, Dialog } from "@repo/shared-components";
import { BankShiftForm } from "./BankShiftForm";
import { useGetBankShift } from "./hooks/useGetBankShift";

type ViewBankShiftDialogProps = {
  open: boolean;
  onClose: () => void;
  bankshiftId: string;
};
export const ViewBankShiftDialog = ({
  bankshiftId,
  open,
  onClose,
}: ViewBankShiftDialogProps) => {
  const { data: latestBankShiftData, isPending: isPendingBankShiftData } =
    useGetBankShift({
      bankshiftId,
    });

  return (
    <Dialog
      maxWidth="lg"
      onClose={onClose}
      open={open}
      title="View Bank Shift"
      actions={
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      }
    >
      <BankShiftForm
        defaultValues={latestBankShiftData}
        loading={isPendingBankShiftData}
        disabled
      />
    </Dialog>
  );
};
