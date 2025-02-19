"use client";

import { AgGrid, defaultPageSize } from "@repo/shared-components";
import type {
  GridReadyEvent,
  IDatasource,
  IGetRowsParams,
} from "ag-grid-community";
import type { AgGridReact } from "ag-grid-react";
import {
  type ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useDialogActions } from "../../../../../../hooks/useDialogActions";
import type { AgDataWithActions } from "../../../../../../types/agGrid";
import type { DialogRenderer } from "../../../../../../types/dialogs";
import { filterSearchParams } from "../../../../../../utils/helper";
import { DeleteIncomeTaxRegimeDialog } from "../Dialog/DeleteIncomeTaxRegimeDialog";
import { EditAndViewIncomeTaxRegimeDialog } from "../Dialog/EditAndViewIncomeTaxRegimeDialog";
import type { IncomeTaxRegimeListRef } from "../IncomeTaxRegime";
import type { IncomeTaxRegime } from "./hooks/useGetIncomeTaxRegime";
import { useGetIncomeTaxRegimeQueryFn } from "./hooks/useGetIncomeTaxRegime";
import { useIncomeTaxRegimeColumns } from "./hooks/useIncomeTaxRegimeColumns";

export type IncomeTaxRegimeListProps = { search?: string | null };

export const IncomeTaxRegimeList = forwardRef(
  (
    { search = null }: IncomeTaxRegimeListProps,
    ref: ForwardedRef<IncomeTaxRegimeListRef>
  ) => {
    const gridRef = useRef<AgGridReact<IncomeTaxRegime>>(null);

    const { openedDialog, onDialogClose, onDialogOpen } = useDialogActions();

    const [currentIncomeTaxRegime, setCurrentIncomeTaxRegime] =
      useState<IncomeTaxRegime>();

    const [loading, setLoading] = useState(false);

    const { column } = useIncomeTaxRegimeColumns({
      onAction: (actionType, incomeTaxRegime) => {
        onDialogOpen(actionType);
        setCurrentIncomeTaxRegime(incomeTaxRegime);
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

      if (incomeTaxRegimes?.length < defaultPageSize) {
        lastRow = totalCount;
      }

      setLoading(false);

      if (incomeTaxRegimes?.length === 0) {
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

    useImperativeHandle(ref, () => ({
      refreshIncomeTaxRegimeList() {
        refreshCache();
      },
    }));

    useEffect(() => {
      if (gridRef.current?.api) {
        gridRef.current.api.setGridOption("datasource", dataSource);
      }
    }, [search]);

    const dialogRenderer: DialogRenderer = {
      delete: currentIncomeTaxRegime && (
        <DeleteIncomeTaxRegimeDialog
          open
          incomeTaxRegime={currentIncomeTaxRegime}
          onDeleteSuccess={refreshCache}
          onClose={onDialogClose}
        />
      ),

      edit: currentIncomeTaxRegime && (
        <EditAndViewIncomeTaxRegimeDialog
          open
          openedDialog={openedDialog ?? "edit"}
          incomeTaxRegimeId={currentIncomeTaxRegime?.id}
          onAddSuccess={refreshCache}
          onClose={onDialogClose}
        />
      ),

      view: currentIncomeTaxRegime && (
        <EditAndViewIncomeTaxRegimeDialog
          open
          openedDialog={openedDialog ?? "view"}
          incomeTaxRegimeId={currentIncomeTaxRegime?.id}
          onAddSuccess={refreshCache}
          onClose={onDialogClose}
        />
      ),
    };

    if (loading) {
      gridRef.current?.api.hideOverlay();
    }

    return (
      <>
        <AgGrid<AgDataWithActions<IncomeTaxRegime>>
          ref={gridRef}
          columnDefs={column}
          onGridReady={onGridReady}
          height="calc(95vh - 160px)"
        />

        {openedDialog && dialogRenderer[openedDialog]}
      </>
    );
  }
);

IncomeTaxRegimeList.displayName = "IncomeTaxRegimeList";
