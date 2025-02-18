"use client";

import { Add } from "@mui/icons-material";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Button, PadBox, SearchField } from "@repo/shared-components";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useDebounceValue } from "usehooks-ts";
import { CompanyBankBreadcrumbs } from "../../../components/organization/company-bank/CompanyBankBreadcrumbs";
import { CompanyBankList } from "../../../components/organization/company-bank/CompanyBankList/CompanyBankList";
import { AddCompanyBankDialog } from "../../../components/organization/company-bank/Dialogs/AddCompanyBankDialog";
import { useDialogActions } from "../../../hooks/useDialogActions";
import type { DialogRenderer } from "../../../types/dialogs";
import { Debounce_Delay } from "../../../utils/helper";

export type CompanyBankListRef = {
  refreshCompanyBankList: () => void;
};

export default function Page() {
  const companyBankListRef = useRef<CompanyBankListRef>(null);

  const theme = useTheme();

  const { iron, butterflyBlue } = theme.palette.app.color;

  const { openedDialog, onDialogClose, onDialogOpen } = useDialogActions();

  const { control, watch } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const [searchInput] = useDebounceValue(watch("search"), Debounce_Delay);

  const dialogRenderer: DialogRenderer = {
    add: (
      <AddCompanyBankDialog
        open
        onClose={onDialogClose}
        onAddSuccess={() =>
          companyBankListRef.current?.refreshCompanyBankList()
        }
      />
    ),
  };

  return (
    <>
      <Stack gap="10px">
        <CompanyBankBreadcrumbs />

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
              <Typography variant="subtitle1">Company Bank</Typography>

              <Stack direction="row" gap="5px">
                <SearchField name="search" control={control} />

                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={() => onDialogOpen("add")}
                >
                  Add Company Bank
                </Button>
              </Stack>
            </Stack>
          </PadBox>

          <CompanyBankList ref={companyBankListRef} search={searchInput} />
        </Box>
      </Stack>

      {openedDialog && dialogRenderer[openedDialog]}
    </>
  );
}
