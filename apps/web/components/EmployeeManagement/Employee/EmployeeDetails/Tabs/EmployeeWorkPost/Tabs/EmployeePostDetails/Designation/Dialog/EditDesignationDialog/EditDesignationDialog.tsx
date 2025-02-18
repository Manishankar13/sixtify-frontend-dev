import { Stack } from "@mui/material";
import {
  Button,
  dateFormats,
  Dialog,
  Tabs,
  toasts,
} from "@repo/shared-components";
import { merge } from "lodash";
import { DateTime } from "luxon";
import { useMemo, useRef } from "react";
import { useDisabledButtonsCache } from "../../../../../../../../../../../app/context/DisabledButtonsCacheContext/DisabledButtonsCacheContext";
import { onError } from "../../../../../../../../../../../utils/errors";
import { useTabOptions } from "../../../../EmployeeOrganizationDetails/BusinessUnit/Dialogs/EditBusinessUnitDialog/hooks/useTabOptions";
import type { EditDepartmentPayload } from "../../../hooks/useEditPostDetails";
import { useEditPostDetails } from "../../../hooks/useEditPostDetails";
import { useGetSectionPostDetail } from "../../../hooks/useGetSectionPostDetail";
import type {
  EditDesignationFormFieldValues,
  EditDesignationFormProps,
  FormRef,
} from "./EditDesignationForm";
import { EditDesignationForm } from "./EditDesignationForm";
import { submitButtonId } from "../../../../../../../../../../../hooks/useEnableDisableSubmitButtonToggle";

type EditDesignationDialogProps = {
  open: boolean;
  onClose: () => void;
  onEditSuccess: () => void;
  employeeId: string;
  companyId: string;
};

export const EditDesignationDialog = ({
  employeeId,
  companyId,
  open,
  onClose,
  onEditSuccess,
}: EditDesignationDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { isDisabled } = useDisabledButtonsCache(submitButtonId);

  const { operationType, menuItems } = useTabOptions({});

  const { data: designationDetail, isPending: isDesignationPending } =
    useGetSectionPostDetail({
      employeeId,
      section: "designation",
    });

  const { mutate, isPending } = useEditPostDetails({
    employeeId,
    operationType,
    options: {
      onSuccess: (data) => {
        onClose();
        onEditSuccess();
        toasts.success({ title: data.message });
      },
      onError: (res) => {
        const { error, message } = res.response.data;

        const formattedError: EditDesignationFormFieldValues = merge(
          error["designation"]
        );

        const structuredError = {
          response: {
            data: {
              message,
              error: formattedError,
            },
          },
        };

        onError(structuredError, formRef.current?.setError);
      },
    },
  });

  const defaultValues = useMemo(() => {
    if (designationDetail) {
      const designationFormValues: EditDesignationFormProps["defaultValues"] = {
        id: designationDetail.id,
        effective_from: designationDetail.effective_from,
        joining_date: designationDetail.joining_date,
        remark: designationDetail.remark,
        operationType,
      };

      return designationFormValues;
    }
  }, [designationDetail]);

  const onEditDesignation = () => {
    formRef.current?.submitForm((formValues) => {
      const payload: EditDepartmentPayload = {
        designation: {
          id: formValues.id,
          remark: formValues.remark,
          effective_from:
            formValues.effective_from &&
            DateTime.fromISO(formValues.effective_from).toFormat(
              dateFormats.dateWithISO8601
            ),
        },
      };

      mutate(payload);
    });
  };

  return (
    <Dialog
      maxWidth="md"
      onClose={onClose}
      open={open}
      title="Update Designation Detail"
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={onEditDesignation}
            loading={isPending}
            disabled={isDisabled()}
          >
            Edit
          </Button>
        </Stack>
      }
    >
      <Tabs
        tabs={menuItems}
        value={operationType}
        loading={isDesignationPending}
      />

      <EditDesignationForm
        ref={formRef}
        operationType={operationType}
        defaultValues={defaultValues}
        loading={isDesignationPending}
        companyId={companyId}
      />
    </Dialog>
  );
};
