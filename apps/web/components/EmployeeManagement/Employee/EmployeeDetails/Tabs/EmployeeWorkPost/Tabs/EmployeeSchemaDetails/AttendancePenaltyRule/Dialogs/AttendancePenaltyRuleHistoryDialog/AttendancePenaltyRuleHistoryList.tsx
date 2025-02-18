import { AgGrid, defaultPageSize } from "@repo/shared-components";
import type {
  GridReadyEvent,
  IDatasource,
  IGetRowsParams,
} from "ag-grid-community";
import type { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { AgDataWithActions } from "../../../../../../../../../../../types/agGrid";
import type { Histories } from "../../../../EmployeeOrganizationDetails/hooks/useGetOrganizationHistory";
import { useGetSchemaDetailHistoryQueryFn } from "../../../hooks/useGetSchemaDetailHistory";
import { useAttendancePenaltyRuleHistoryColumns } from "./hooks/useAttendancePenaltyRuleHistoryColumns";

type AttendancePenaltyRuleHistoryListProps = {
  employeeId: string;
};

export const AttendancePenaltyRuleHistoryList = ({
  employeeId,
}: AttendancePenaltyRuleHistoryListProps) => {
  const gridRef = useRef<AgGridReact<Histories>>(null);

  const [loading, setLoading] = useState(false);

  const { column } = useAttendancePenaltyRuleHistoryColumns({ loading });

  const { fetchSchemaDetailHistory } = useGetSchemaDetailHistoryQueryFn();

  const getRows = async (params: IGetRowsParams) => {
    setLoading(true);

    const { histories, totalCount } = await fetchSchemaDetailHistory({
      employeeId,
      section: "attendance_penalty_rule",
      body: {
        ...params,
      },
    });

    let lastRow = -1;

    if (histories) {
      if (histories.length < defaultPageSize) {
        lastRow = totalCount;
      }
      setLoading(false);

      if (histories.length === 0) {
        gridRef.current?.api.showNoRowsOverlay();
      } else {
        gridRef.current?.api.hideOverlay();
      }

      params.successCallback(histories, lastRow);
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

  useEffect(() => {
    if (gridRef.current?.api) {
      gridRef.current.api.setGridOption("datasource", dataSource);
    }
  }, []);

  return (
    <AgGrid<AgDataWithActions<Histories>>
      ref={gridRef}
      columnDefs={column}
      onGridReady={onGridReady}
      height="calc(85vh - 201px)"
    />
  );
};
