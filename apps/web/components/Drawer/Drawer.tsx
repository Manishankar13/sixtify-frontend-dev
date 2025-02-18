import { Drawer as SharedDrawer } from "@repo/shared-components";
import { usePathname, useRouter } from "next/navigation";
import { useDrawerMenuItems } from "./hooks/useDrawerMenuItems";
import type { DialogRenderer } from "../../types/dialogs";
import { useDialogActions } from "../../hooks/useDialogActions";
import { useState } from "react";
import { useApplicationContext } from "../../app/context/ApplicationContext";
import AddDraftEmployeeDialog from "../EmployeeManagement/Employee/AddEmployee/AddDraftEmployeeDialog";

export const Drawer = ({ open }: { open: boolean }) => {
  const currentPathname = usePathname();

  const router = useRouter();

  const [callBackUrl, setCallBackUrl] = useState("");

  const { isOpenAddEditEmployeePage } = useApplicationContext();

  const { openedDialog, onDialogClose, onDialogOpen } = useDialogActions();

  const dialogRenderer: DialogRenderer = {
    saveAsDraft: (
      <AddDraftEmployeeDialog
        open
        onDialogClose={onDialogClose}
        onSuccess={() => {
          router.push(callBackUrl);
        }}
      />
    ),
  };

  const { menuItems } = useDrawerMenuItems({
    isOpenAddEditEmployeePage,
    onDialogOpen,
    setCallBackUrl,
  });

  return (
    <>
      <SharedDrawer
        menuItems={menuItems}
        open={open}
        currentPathname={currentPathname}
      />

      {openedDialog && dialogRenderer[openedDialog]}
    </>
  );
};
