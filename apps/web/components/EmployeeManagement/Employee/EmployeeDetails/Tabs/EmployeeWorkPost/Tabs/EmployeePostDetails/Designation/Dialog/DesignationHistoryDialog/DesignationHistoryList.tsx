import { AgGrid, defaultPageSize } from "@repo/shared-components";
import type {
  GridReadyEvent,
  IDatasource,
  IGetRowsParams,
} from "ag-grid-community";
import type { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { AgDataWithActions } from "../../../../../../../../../../../types/agGrid";
import { useGetPostDetailHistoryQueryFn } from "../../../hooks/useGetPostDetailHistory";
import type { Histories } from "../../../../EmployeeOrganizationDetails/hooks/useGetOrganizationHistory";
import { useGetDesignationHistoryColumns } from "./hooks/useGetDesignationHistoryColumns";

type DesignationHistoryListProps = {
  employeeId: string;
};

export const DesignationHistoryList = ({
  employeeId,
}: DesignationHistoryListProps) => {
  const gridRef = useRef<AgGridReact<Histories>>(null);

  const [loading, setLoading] = useState(false);

  const { column } = useGetDesignationHistoryColumns({ loading });

  const { fetchPostDetailHistory } = useGetPostDetailHistoryQueryFn();

  const getRows = async (params: IGetRowsParams) => {
    setLoading(true);

    const { histories, totalCount } = await fetchPostDetailHistory({
      employeeId,
      section: "designation",
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
