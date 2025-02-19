import { Add } from "@mui/icons-material";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Button, PadBox, SearchField } from "@repo/shared-components";
import { useForm } from "react-hook-form";
import { useDialogActions } from "../../../../../../hooks/useDialogActions";
import { DialogRenderer } from "../../../../../../types/dialogs";
import { AddIncomeTaxDialog } from "../Dialogs/AddIncomeTaxDialog";
import { useDebounceValue } from "usehooks-ts";
import { Debounce_Delay } from "../../../../../../utils/helper";
import { IncomeTaxList, IncomeTaxListRef } from "./IncomeTaxList";
import { useRef } from "react";

export default function IncomeTaxRegime() {
  const theme = useTheme();

  const { iron, butterflyBlue } = theme.palette.app.color;

  const incomTaxRef = useRef<IncomeTaxListRef>(null);

  const { control, watch } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const [searchInput] = useDebounceValue(watch("search"), Debounce_Delay);

  const { openedDialog, onDialogClose, onDialogOpen } = useDialogActions();

  const dialogRenderer: DialogRenderer = {
    add: (
      <AddIncomeTaxDialog
        open
        onClose={onDialogClose}
        onAddSuccess={() => incomTaxRef.current?.refreshIncomeTaxList()}
      />
    ),
  };

  return (
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
          <Typography variant="h6">Income Tax Regime</Typography>

          <Box>
            <Stack direction="row" gap="5px">
              <SearchField name="search" control={control} />

              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={() => onDialogOpen("add")}
              >
                Add Tax Regime
              </Button>
            </Stack>
          </Box>
        </Stack>
      </PadBox>
      <IncomeTaxList search={searchInput} ref={incomTaxRef} />

      {openedDialog && dialogRenderer[openedDialog]}
    </Box>
  );
}
