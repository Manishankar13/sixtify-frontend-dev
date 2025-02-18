import { Add } from "@mui/icons-material";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Button, PadBox } from "@repo/shared-components";
import { useRef } from "react";
import { useDialogActions } from "../../../../../../hooks/useDialogActions";
import type { DialogRenderer } from "../../../../../../types/dialogs";
import { AddIncomeTaxRegimeDialog } from "./Dialogs/AddIncomeTaxRegimeDialog";
import { IncomeTaxRegimeList } from "./IncomeTaxRegimeList/IncomeTaxRegimeList";

export type IncomeTaxRegimeListRef = {
    refreshIncomeTaxRegimeList: () => void;
};

export default function IncomeTaxRegime() {
    const incomeTaxRegimeListRef = useRef<IncomeTaxRegimeListRef>(null);

    const theme = useTheme();

    const { iron, butterflyBlue } = theme.palette.app.color;

    const { openedDialog, onDialogClose, onDialogOpen } = useDialogActions();

    const dialogRenderer: DialogRenderer = {
        add: (
            <AddIncomeTaxRegimeDialog
                open
                onClose={onDialogClose}
                onAddSuccess={() => console.log("first")}
            />
        ),
    };

    return (
        <Stack gap="10px">
            <Box
                sx={{
                    background: iron[600],
                    border: `1px solid ${butterflyBlue[300]}`,
                    borderRadius: "6px",
                    height: "100%",
                    width: "100%",
                }}
            >
                <PadBox padding={{ padding: "10px" }}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant="subtitle1">Income Tax Regime</Typography>
                        <Stack direction="row" gap="5px">
                            <Button
                                variant="outlined"
                                startIcon={<Add />}
                                onClick={() => onDialogOpen("add")}
                            >
                                Add Tax
                            </Button>
                        </Stack>
                    </Stack>
                </PadBox>
                <IncomeTaxRegimeList />
            </Box>
            {openedDialog && dialogRenderer[openedDialog]}
        </Stack>
    )
}