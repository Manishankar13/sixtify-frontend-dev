"use client";

import { AgGrid, defaultPageSize } from "@repo/shared-components";
import type {
  GridReadyEvent,
  IDatasource,
  IGetRowsParams,
} from "ag-grid-community";
import type { AgGridReact } from "ag-grid-react";
import type { ForwardedRef } from "react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useDialogActions } from "../../../../../../../hooks/useDialogActions";
import type { AgDataWithActions } from "../../../../../../../types/agGrid";
import { filterSearchParams } from "../../../../../../../utils/helper";
import { useIncomeTaxRegimeColumns } from "./hooks/useIncomeTaxRegimeColumns";
import {
  useGetIncomeTaxRegimeQueryFn,
  type IncomeTaxRegimePayload,
} from "./hooks/usegetIncomeTaxRegime";

export type IncomeTaxListProps = { search?: string | null };

export type IncomeTaxListRef = {
  refreshIncomeTaxList: () => void;
};

export const IncomeTaxRegimeList = forwardRef(
  (
    { search = null }: IncomeTaxListProps,
    ref: ForwardedRef<IncomeTaxListRef>
  ) => {
    const gridRef = useRef<AgGridReact<IncomeTaxRegimePayload>>(null);

    const { openedDialog, onDialogClose, onDialogOpen } = useDialogActions();

    const [currentIncomeTax, setCurrentIncomeTax] =
      useState<IncomeTaxRegimePayload>();

    const [loading, setLoading] = useState(false);

    const { columns } = useIncomeTaxRegimeColumns({
      onAction: (actionType, incomeTax) => {
        onDialogOpen(actionType);
        setCurrentIncomeTax(incomeTax);
      },
      loading,
    });

    const { getIncomeTaxRegime } = useGetIncomeTaxRegimeQueryFn();

    const getRows = async (params: IGetRowsParams) => {
      setLoading(true);

      const { incomeTaxRegimes, totalCount } = await getIncomeTaxRegime({
        body: {
          ...params,
          quickFilter: filterSearchParams(search),
        },
      });

      let lastRow = -1;

      if (incomeTaxRegimes.length < defaultPageSize) {
        lastRow = totalCount;
      }

      setLoading(false);

      if (incomeTaxRegimes.length === 0) {
        gridRef.current?.api.showNoRowsOverlay();
      } else {
        gridRef.current?.api.hideOverlay();
      }

      return params.successCallback(incomeTaxRegimes, lastRow);
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

    useEffect(() => {
      if (gridRef.current?.api) {
        gridRef.current.api.setGridOption("datasource", dataSource);
      }
    }, [search]);

    useImperativeHandle(ref, () => ({
      refreshIncomeTaxList() {
        refreshCache();
      },
    }));

    // const dialogRenderer: DialogRenderer = {
    //     edit: currentIncomeTax && (
    //         // <EditLocationUnitDialog
    //         <AddIncomeTax
    //             open
    //             onClose={onDialogClose}
    //         // incomeTaxId={currentIncomeTax.id}
    //         // onEditSuccess={refreshCache}
    //         />
    //     ),
    // };

    if (loading) {
      gridRef.current?.api.hideOverlay();
    }

    return (
      <>
        <AgGrid<AgDataWithActions<IncomeTaxRegimePayload>>
          ref={gridRef}
          columnDefs={columns}
          onGridReady={onGridReady}
          height="calc(95vh - 160px)"
        />

        {/* {openedDialog && dialogRenderer[openedDialog]} */}
      </>
    );
  }
);

IncomeTaxRegimeList.displayName = "IncomeTaxRegimeList";
