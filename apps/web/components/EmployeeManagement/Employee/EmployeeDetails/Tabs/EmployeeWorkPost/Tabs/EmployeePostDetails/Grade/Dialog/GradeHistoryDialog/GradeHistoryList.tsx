import { AgGrid, defaultPageSize } from "@repo/shared-components";
import type {
  GridReadyEvent,
  IDatasource,
  IGetRowsParams,
} from "ag-grid-community";
import type { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { AgDataWithActions } from "../../../../../../../../../../../types/agGrid";
import { useGetGradeHistoryColumns } from "./hooks/useGetGradeHistoryColumns";
import { useGetPostDetailHistoryQueryFn } from "../../../hooks/useGetPostDetailHistory";
import type { Histories } from "../../../../EmployeeOrganizationDetails/hooks/useGetOrganizationHistory";

type GradeHistoryListProps = {
  employeeId: string;
};

export const GradeHistoryList = ({ employeeId }: GradeHistoryListProps) => {
  const gridRef = useRef<AgGridReact<Histories>>(null);

  const [loading, setLoading] = useState(false);

  const { column } = useGetGradeHistoryColumns({ loading });

  const { fetchPostDetailHistory } = useGetPostDetailHistoryQueryFn();

  const getRows = async (params: IGetRowsParams) => {
    setLoading(true);

    const { histories, totalCount } = await fetchPostDetailHistory({
      employeeId,
      section: "grade",
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

  if (loading) {
    gridRef.current?.api.hideOverlay();
  }

  return (
    <AgGrid<AgDataWithActions<Histories>>
      ref={gridRef}
      columnDefs={column}
      onGridReady={onGridReady}
      height="calc(85vh - 201px)"
    />
  );
};
