"use client";

import { Box, Stack, Typography, useTheme } from "@mui/material";
import { DatePicker, PadBox, SearchField } from "@repo/shared-components";
import { DateTime } from "luxon";
import { useDebounceValue } from "usehooks-ts";
import { ShiftPlannerBreadcrumbs } from "../../../../components/Transactions/ShiftDay/ShiftPlanner/ShiftPlannerBreadcrumbs";
import { ShiftPlannerList } from "../../../../components/Transactions/ShiftDay/ShiftPlanner/ShiftPlannerList/ShiftPlannerList";
import { Debounce_Delay } from "../../../../utils/helper";
import { ShiftPlannerFilter } from "../../../../components/Transactions/ShiftDay/ShiftPlanner/ShiftPlannerList/ShiftPlannerFilter";
import { useState } from "react";
import { type FieldValues, useForm } from "react-hook-form";

export default function Page() {
  const theme = useTheme();

  const { iron, butterflyBlue } = theme.palette.app.color;

  const [filterListData, setFilterListData] = useState<FieldValues | undefined>(
    undefined
  );

  const { control, watch } = useForm({
    defaultValues: {
      search: "",
      datePeriod: DateTime.now().toFormat("yyyy-MM"),
    },
  });

  const [searchInput] = useDebounceValue(watch("search"), Debounce_Delay);

  const [datePeriodInput] = useDebounceValue(
    DateTime.fromISO(
      watch("datePeriod").split("-").slice(0, 2).join("-")
    ).toFormat("yyyy-MM"),
    Debounce_Delay
  );

  return (
    <Stack gap="10px">
      <ShiftPlannerBreadcrumbs />
      <Stack gap="5px">
        <Box
          sx={{
            background: iron[600],
            border: `1px solid ${butterflyBlue[300]}`,
            borderRadius: "6px",
            height: "100%",
            width: "100%",
            gap: "10px",
          }}
        >
          <PadBox padding={{ paddingLeft: "10Px", paddingRight: "10Px" }}>
            <Stack
              direction="row"
              gap="5px"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6">Shift Planner</Typography>
              <Box sx={{ width: "200px" }}>
                <DatePicker
                  clearable={false}
                  format="MMM yyyy"
                  views={["year", "month"]}
                  name="datePeriod"
                  maxDate={DateTime.now().plus({ months: 3 })}
                  control={control}
                  sx={{ height: 50 }}
                />
              </Box>
            </Stack>
          </PadBox>
        </Box>
        <Box
          sx={{
            background: iron[600],
            border: `1px solid ${butterflyBlue[300]}`,
            borderRadius: "6px",
            height: "100%",
            width: "100%",
            gap: "10px",
          }}
        >
          <PadBox padding={{ padding: "10px" }}>
            <Stack direction="row" gap="5px" justifyContent="flex-end">
              <ShiftPlannerFilter
                filterListData={filterListData}
                setFilterListData={setFilterListData}
              />
              <SearchField name="search" control={control} />
            </Stack>
          </PadBox>
          <ShiftPlannerList
            datePeriod={datePeriodInput}
            search={searchInput}
            externalFilter={filterListData}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
