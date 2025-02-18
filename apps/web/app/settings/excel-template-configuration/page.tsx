"use client";

import React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import {
  Breadcrumbs,
  Button,
  PadBox,
  SearchField,
  SvgsHome,
} from "@repo/shared-components";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Add } from "@mui/icons-material";
import { AddExcelTemplateConfiguration } from "../../../components/settings/ExcelTemplateConfiguration/AddExcelTemplateConfiguration";
import { ExcelTemplateList } from "../../../components/settings/ExcelTemplateConfiguration/ExcelTemplateConfigurationList/ExcelTemplateList";
import { useDebounceValue } from "usehooks-ts";
import { Debounce_Delay } from "../../../utils/helper";

export default function Page() {
  const router = useRouter();

  const theme = useTheme();

  const searchParams = useSearchParams();

  const page = searchParams.get("page");

  const { control, watch } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const [searchInput] = useDebounceValue(watch("search"), Debounce_Delay);

  if (page === "add-page") {
    return <AddExcelTemplateConfiguration />;
  }

  return (
    <Stack gap="10px">
      <Breadcrumbs
        items={[
          {
            icon: <SvgsHome />,
            onClick: () => router.push("/"),
          },
          {
            text: "Settings",
          },
          {
            text: "Excel Template Configuration",
          },
        ]}
      />
      <Box
        sx={{
          background: theme.palette.app.color.iron[600],
          border: `1px solid ${theme.palette.app.color.butterflyBlue[300]}`,
          borderRadius: "6px",
        }}
      >
        <PadBox padding={{ padding: "10px" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1">
              Excel Template Configuration
            </Typography>

            <Stack direction="row" gap="5px">
              <SearchField name="search" control={control} />

              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={() =>
                  router.push(
                    "/settings/excel-template-configuration?page=add-page"
                  )
                }
              >
                Add Excel Template Configuration
              </Button>
            </Stack>
          </Stack>
        </PadBox>

        <ExcelTemplateList search={searchInput} />
      </Box>
    </Stack>
  );
}
