import { Add } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { AgGrid, Button, defaultPageSize } from "@repo/shared-components";
import type {
  GridReadyEvent,
  IDatasource,
  IGetRowsParams,
} from "ag-grid-community";
import type { AgGridReact } from "ag-grid-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDialogActions } from "../../../../../hooks/useDialogActions";
import type { AgDataWithActions } from "../../../../../types/agGrid";
import type { DialogRenderer } from "../../../../../types/dialogs";
import { AddHolidayDialog } from "./Dialog/AddHolidayDialog";
import { DeleteHolidayDialog } from "./Dialog/DeleteHolidayDialog";
import { EditHolidayDialog } from "./Dialog/EditHolidayDialog";
import { ViewHolidayDialog } from "./Dialog/ViewHolidayDialog";
import {
  useGetHolidayGroupListColumns,
  type HolidayType,
} from "./hooks/useGetHolidayGroupListColumns";
import { useGetHolidaysQueryFn } from "./hooks/useGetHolidays";

type HolidayListProps = {
  holidayGroupId: string;
  year: string;
  holidayYears: { year: string }[];
};

export const HolidayList = ({
  holidayGroupId,
  year,
  holidayYears,
}: HolidayListProps) => {
  const gridRef = useRef<AgGridReact<HolidayType>>(null);

  const { openedDialog, onDialogClose, onDialogOpen } = useDialogActions();

  const router = useRouter();

  const [currentHoliday, setCurrentHoliday] = useState<HolidayType>();

  const [loading, setLoading] = useState(false);

  const { column } = useGetHolidayGroupListColumns({
    onAction: (actionType, holiday) => {
      onDialogOpen(actionType);
      setCurrentHoliday(holiday);
    },
    loading,
  });

  const { getHolidays } = useGetHolidaysQueryFn();

  const getRows = async (params: IGetRowsParams) => {
    setLoading(true);

    const { startRow, endRow, sortModel, filterModel } = params;

    const { holidays, totalCount } = await getHolidays({
      holidayGroupId,
      body: {
        startRow,
        endRow,
        sortModel,
        filterModel: {
          ...filterModel,
          holiday_group_id: {
            filterType: "text",
            type: "equals",
            filter: holidayGroupId,
          },
          year: {
            filterType: "number",
            type: "equals",
            filter: Number(year),
          },
        },
      },
    });

    let lastRow = -1;

    if (holidays) {
      if (holidays.length < defaultPageSize) {
        lastRow = totalCount;
      }
      setLoading(false);

      if (holidays.length === 0) {
        if (holidayYears[0]) {
          router.push(
            `/employee-management/holiday?tab=${holidayGroupId}&year=${holidayYears[0].year}`
          );
        }

        gridRef.current?.api.showNoRowsOverlay();
      } else {
        gridRef.current?.api.hideOverlay();
      }

      params.successCallback(holidays, lastRow);
    }
  };

  const dataSource: IDatasource = {
    getRows: (params) => {
      getRows(params);
    },
  };

  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.setGridOption("datasource", dataSource);
  }, []);

  const refreshCache = () => {
    gridRef.current?.api.refreshInfiniteCache();
  };

  if (loading) {
    gridRef.current?.api.hideOverlay();
  }
  useEffect(() => {
    if (gridRef.current?.api) {
      gridRef.current.api.setGridOption("datasource", dataSource);
    }
  }, [year, holidayGroupId]);

  const dialogRenderer: DialogRenderer = {
    edit: currentHoliday?.id && (
      <EditHolidayDialog
        open
        onClose={onDialogClose}
        holidayGroupId={holidayGroupId}
        holidayId={currentHoliday.id}
        onEditSuccess={refreshCache}
        year={year}
      />
    ),
    delete: currentHoliday?.id && (
      <DeleteHolidayDialog
        open
        onClose={onDialogClose}
        holidayGroupId={holidayGroupId}
        holidayId={currentHoliday.id}
        onDeleteSuccess={refreshCache}
        holidayName={currentHoliday.holiday_name}
      />
    ),
    add: (
      <AddHolidayDialog
        open
        onClose={onDialogClose}
        holidayGroupId={holidayGroupId}
        onAddSuccess={refreshCache}
        year={year}
      />
    ),
    view: currentHoliday?.id && (
      <ViewHolidayDialog
        open
        onClose={onDialogClose}
        holidayGroupId={holidayGroupId}
        holidayId={currentHoliday.id}
        year={year}
      />
    ),
  };

  return (
    <Stack gap="10px">
      <Button
        variant="outlined"
        startIcon={<Add />}
        sx={{ marginLeft: "auto", marginRight: "10px" }}
        onClick={() => onDialogOpen("add")}
      >
        Add Holiday
      </Button>

      <AgGrid<AgDataWithActions<HolidayType>>
        ref={gridRef}
        columnDefs={column}
        onGridReady={onGridReady}
        height="calc(95vh - 220px)"
      />
      {openedDialog && dialogRenderer[openedDialog]}
    </Stack>
  );
};
