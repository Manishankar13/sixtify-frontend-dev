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
import { useDialogActions } from "../../../../../../hooks/useDialogActions";
import { AgDataWithActions } from "../../../../../../types/agGrid";
import { DialogRenderer } from "../../../../../../types/dialogs";
import { filterSearchParams } from "../../../../../../utils/helper";
import {
  type IncomeTax,
  useGetIncomeTaxQueryFn,
} from "./hooks/useGetIncomeTax";
import { useIncomeTaxColumns } from "./hooks/useIncomeTaxColumns";
import { ViewIncomeTaxDetails } from "../Dialogs/ViewIncomeTaxDetails";
import { DeleteIncomeTaxDialog } from "../Dialogs/DeleteIncomeTaxDialog";
import { EditIncomeTax } from "../Dialogs/EditIncomeTax";

export type IncomeTaxListProps = { search?: string | null };

export type IncomeTaxListRef = {
  refreshIncomeTaxList: () => void;
};

export const IncomeTaxList = forwardRef(
  (
    { search = null }: IncomeTaxListProps,
    ref: ForwardedRef<IncomeTaxListRef>
  ) => {
    const gridRef = useRef<AgGridReact<IncomeTax>>(null);

    const { openedDialog, onDialogClose, onDialogOpen } = useDialogActions();

    const [currentIncomeTax, setCurrentIncomeTax] = useState<IncomeTax>();

    const [loading, setLoading] = useState(false);

    const { columns } = useIncomeTaxColumns({
      onAction: (actionType, incomeTax) => {
        onDialogOpen(actionType);
        setCurrentIncomeTax(incomeTax);
      },
      loading,
    });
    const { getIncomeTax } = useGetIncomeTaxQueryFn();

    const getRows = async (params: IGetRowsParams) => {
      setLoading(true);

      const { incomeTaxRegimes, totalCount } = await getIncomeTax({
        body: {
          ...params,
          quickFilter: filterSearchParams(search),
        },
      });

      console.log("incomeTaxRegimes", incomeTaxRegimes);
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

    const dialogRenderer: DialogRenderer = {
      edit: currentIncomeTax && (
        <EditIncomeTax
          open
          onClose={onDialogClose}
          incomeTaxId={currentIncomeTax.id}
          onEditSuccess={refreshCache}
        />
      ),
      delete: currentIncomeTax && (
        <DeleteIncomeTaxDialog
          open
          IncomeTax={currentIncomeTax}
          onDeleteSuccess={refreshCache}
          onClose={onDialogClose}
        />
      ),
      view: currentIncomeTax && (
        <ViewIncomeTaxDetails
          open
          onClose={onDialogClose}
          incomeTaxId={currentIncomeTax.id}
        />
      ),
    };

    if (loading) {
      gridRef.current?.api.hideOverlay();
    }

    return (
      <>
        <AgGrid<AgDataWithActions<IncomeTax>>
          ref={gridRef}
          columnDefs={columns}
          onGridReady={onGridReady}
          height="calc(95vh - 160px)"
        />

        {openedDialog && dialogRenderer[openedDialog]}
      </>
    );
  }
);

IncomeTaxList.displayName = "IncomeTaxList";
