import { Stack } from "@mui/material";
import { Button, Dialog } from "@repo/shared-components";
import { useRef } from "react";
import { type FormRef, IncomeTaxRegimeForm } from "./IncomeTaxRegimeForm";

type AddIncomeTaxRegimeDialogProps = {
    open: boolean;
    onClose: () => void;
    onAddSuccess: () => void;
};

export const AddIncomeTaxRegimeDialog = ({
    open,
    onClose,
    // onAddSuccess,
}: AddIncomeTaxRegimeDialogProps) => {
    const formRef = useRef<FormRef>(null);

    const onCreateCompany = () => {
        formRef.current?.submitForm((payloadData) => {
            // console.log("payloadData-Dialog", payloadData)
            // mutate(payloadData);
        });
    };

    return (
        <Dialog
            maxWidth="xl"
            onClose={onClose}
            open={open}
            title="Add Company"
            actions={
                <Stack direction="row" gap="5px">
                    <Button onClick={onClose} variant="outlined">
                        Cancel
                    </Button>

                    <Button
                        onClick={onCreateCompany}
                    // loading={isPending}
                    // disabled={isDisabled()}
                    >
                        Save
                    </Button>
                </Stack>
            }
        >
            <IncomeTaxRegimeForm ref={formRef} slapType="standard" />
        </Dialog>
    );
};