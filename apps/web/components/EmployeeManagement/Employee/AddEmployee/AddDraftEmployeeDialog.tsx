import React, { useEffect } from "react";
import { Button, Dialog, toasts } from "@repo/shared-components";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import { Stack, Typography } from "@mui/material";
import { isEmpty, isFunction } from "lodash";
import { useQueryClient } from "@tanstack/react-query";
import { employeeKeys } from "../../../../queryKeysFactories/employee";
import { useApplicationContext } from "../../../../app/context/ApplicationContext";
import { useAddEmployeeDraft } from "./hooks/useAddEmployeeDraft";
import { formDefaultValues } from "./EmployeeForm";
import { useEditEmployeeDraft } from "../EditEmployee/hooks/useEditEmployeeDraft";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  marshalDocumentPayload,
  marshalEmployeePayload,
} from "./MarshalEmployeeData";
import { onError } from "../../../../utils/errors";
import { useDebounceCallback } from "usehooks-ts";

type AddDraftEmployeeDialogArgs = Readonly<{
  open: boolean;
  onSuccess?: () => void;
  onDialogClose: () => void;
}>;

export default function AddDraftEmployeeDialog({
  open,
  onSuccess,
  onDialogClose,
}: AddDraftEmployeeDialogArgs) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const params = useParams();

  const employeeId = params.employeeId as string;

  const {
    employeeFormValues,
    documentFormValues,
    setIsOpenAddEditEmployeePage,
    setEmployeeFormValues,
    setDocumentFormValues,
  } = useApplicationContext();

  const onSuccessApi = (message: string) => {
    if (!isEmpty(documentFormValues)) {
      setDocumentFormValues([]);
    }

    onDialogClose();

    setEmployeeFormValues(formDefaultValues);

    setIsOpenAddEditEmployeePage(false);

    toasts.success({ title: message });

    if (!employeeId) {
      queryClient.invalidateQueries({
        queryKey: employeeKeys.searchMetaData(),
      });
    }

    if (isFunction(onSuccess)) {
      onSuccess();
    }
  };

  const { mutate, isPending } = useAddEmployeeDraft({
    options: {
      onSuccess: (data) => onSuccessApi(data.message),
      onError: (error) => onError(error),
    },
  });

  const { mutate: editEmployeeMutate, isPending: editEmployeePending } =
    useEditEmployeeDraft({
      employeeId,
      options: {
        onSuccess: (data) => onSuccessApi(data.message),
        onError: (error) => onError(error),
      },
    });

  const onSubmit = () => {
    if (!isEmpty(employeeFormValues)) {
      if (!employeeFormValues.first_name && !employeeFormValues.last_name) {
        toasts.error({
          title: t("employee.first_name_last_name.required"),
        });

        return;
      }

      if (!employeeFormValues.first_name) {
        toasts.error({
          title: t("employee.first_name.required"),
        });

        return;
      }

      if (!employeeFormValues.last_name) {
        toasts.error({
          title: t("employee.last_name.required"),
        });

        return;
      }

      const documentPayload =
        (employeeFormValues.document_details &&
          !isEmpty(employeeFormValues.document_details) &&
          marshalDocumentPayload(employeeFormValues.document_details)) ||
        [];

      const payload = marshalEmployeePayload(
        employeeFormValues,
        documentPayload
      );

      if (employeeId) {
        editEmployeeMutate(payload);
      } else {
        mutate(payload);
      }
    }
  };

  const handleBackButton = useDebounceCallback(() => {
    onDialogClose();

    window.removeEventListener("popstate", handleBackButton);
  }, 100);

  useEffect(() => {
    window.addEventListener("popstate", handleBackButton);
  }, []);

  const loading = isPending || editEmployeePending;

  return (
    <Dialog
      maxWidth="xs"
      isHideCloseIcon
      isHideDividers
      open={open}
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onDialogClose} variant="outlined" disabled={loading}>
            No
          </Button>

          <Button onClick={onSubmit} color="error" loading={loading}>
            Yes
          </Button>
        </Stack>
      }
    >
      <Stack gap="10px" direction="row">
        <InfoTwoToneIcon color="error" sx={{ mt: "1px" }} />

        <Typography variant="subtitle1" fontWeight={700}>
          {employeeId
            ? t("employee.dialog.edit.draft")
            : t("employee.dialog.save.draft")}
        </Typography>
      </Stack>
    </Dialog>
  );
}
