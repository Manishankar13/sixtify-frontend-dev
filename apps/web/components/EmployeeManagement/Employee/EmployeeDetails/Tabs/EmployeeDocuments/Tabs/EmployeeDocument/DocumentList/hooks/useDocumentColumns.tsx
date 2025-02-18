import { ActionCell, LoadingCell } from "@repo/shared-components";
import type { CustomCellRendererProps } from "ag-grid-react";
import type {
  AgColumnsArgs,
  AgColumnsWithActions,
} from "../../../../../../../../../../types/agGrid";
import type { DialogTypes } from "../../../../../../../../../../types/dialogs";
import {
  DocumentOptions,
  type DocumentOptionKey,
} from "../../../../../../../AddEmployee/Document/Dialog/hooks/useDocumentOptions";
import type { Document } from "./useGetDocuments";
import {
  AADHAAR_CARD,
  PAN_CARD,
} from "../../../../../../../AddEmployee/Document/Dialog/hooks/constant";

type UseDocumentColumns = {
  onAction: (actionType: DialogTypes, rowData: Document) => void;
};

export const useDocumentColumns = ({
  onAction,
  loading,
}: AgColumnsArgs<UseDocumentColumns>) => {
  const column: AgColumnsWithActions<Document> = [
    {
      headerName: "Document Type",
      field: "document_type",
      cellRenderer: ({ data }: CustomCellRendererProps) => {
        if (loading || !data) {
          return <LoadingCell />;
        }

        return (
          data.document_type &&
          DocumentOptions[data.document_type as DocumentOptionKey]
        );
      },
      sortable: true,
    },
    {
      headerName: "Document No",
      field: "document_no",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return value ? value : "-";
      },
    },
    {
      headerName: "Name As Per Document",
      field: "name",
      cellRenderer: ({ value }: CustomCellRendererProps) => {
        if (loading) {
          return <LoadingCell />;
        }

        return value ? value : " -";
      },
    },
    {
      headerName: "",
      field: "action",
      sortable: false,
      pinned: "right",
      maxWidth: 70,
      lockPinned: true,
      cellRenderer: ({ data }: CustomCellRendererProps<Document>) => {
        if (loading || !data) {
          return <LoadingCell />;
        }

        const items = [
          { title: "View", onClick: () => onAction("view", data) },
          { title: "Edit", onClick: () => onAction("edit", data) },
          ...(![AADHAAR_CARD, PAN_CARD].includes(data.document_type)
            ? [{ title: "Delete", onClick: () => onAction("delete", data) }]
            : []),
        ];

        return <ActionCell items={items}></ActionCell>;
      },
    },
  ];

  return { column };
};
