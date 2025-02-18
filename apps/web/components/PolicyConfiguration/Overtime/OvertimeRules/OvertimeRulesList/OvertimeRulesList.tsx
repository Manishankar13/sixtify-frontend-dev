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
import {
  useGetOvertimeRulesListQueryFn,
  type OvertimeRules,
} from "./hooks/useGetOvertimeRulesList";
import type { AgDataWithActions } from "../../../../../types/agGrid";
import { useGetOvertimeRulesListColumns } from "./hooks/useGetOvertimeColumns";
import { filterSearchParams } from "../../../../../utils/helper";
import type { OvertimeRulesListRef } from "../../../../../app/policy-configuration/overtime/overtime-rules/page";
import { useDialogActions } from "../../../../../hooks/useDialogActions";
import { useRouter } from "next/navigation";
import { DeleteOvertimeRulesDialog } from "../Dialogs/DeleteOvertimeRules";
import type { DialogRenderer } from "../../../../../types/dialogs";

export type OvertimeRulesListProps = { search?: string | null };

export const OvertimeRulesList = forwardRef(
  (
    { search = null }: OvertimeRulesListProps,
    ref: ForwardedRef<OvertimeRulesListRef>
  ) => {
    const gridRef = useRef<AgGridReact<OvertimeRules>>(null);

    const { openedDialog, onDialogClose, onDialogOpen } = useDialogActions();

    const [currentOvertimeRules, setCurrentOvertimeRules] =
      useState<OvertimeRules>();

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const { column } = useGetOvertimeRulesListColumns({
      onAction: (actionType, overTimeRules) => {
        if (actionType === "edit") {
          router.push(
            `/policy-configuration/overtime/overtime-rules/edit/${overTimeRules.id}`
          );

          return;
        }

        if (actionType === "view") {
          router.push(
            `/policy-configuration/overtime/overtime-rules/view/${overTimeRules.id}`
          );

          return;
        }
        onDialogOpen(actionType);
        setCurrentOvertimeRules(overTimeRules);
      },
      loading,
    });

    const { getOvertimeRulesList } = useGetOvertimeRulesListQueryFn();

    const getRows = async (params: IGetRowsParams) => {
      setLoading(true);

      const { overTimeRules, totalCount } = await getOvertimeRulesList({
        body: {
          ...params,
          quickFilter: filterSearchParams(search),
        },
      });

      let lastRow = -1;

      if (overTimeRules.length <= defaultPageSize) {
        lastRow = totalCount;
      }

      setLoading(false);

      if (overTimeRules.length === 0) {
        gridRef.current?.api.showNoRowsOverlay();
      } else {
        gridRef.current?.api.hideOverlay();
      }

      return params.successCallback(overTimeRules, lastRow);
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
      refreshOvertimeRulesList() {
        refreshCache();
      },
    }));

    useEffect(() => {
      if (gridRef.current?.api) {
        gridRef.current.api.setGridOption("datasource", dataSource);
      }
    }, [search]);

    if (loading) {
      gridRef.current?.api.hideOverlay();
    }

    const dialogRenderer: DialogRenderer = {
      delete: currentOvertimeRules && (
        <DeleteOvertimeRulesDialog
          open
          overTimeRules={currentOvertimeRules}
          onDeleteSuccess={refreshCache}
          onClose={onDialogClose}
        />
      ),
    };

    return (
      <>
        <AgGrid<AgDataWithActions<OvertimeRules>>
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

OvertimeRulesList.displayName = "OvertimeRulesList";
