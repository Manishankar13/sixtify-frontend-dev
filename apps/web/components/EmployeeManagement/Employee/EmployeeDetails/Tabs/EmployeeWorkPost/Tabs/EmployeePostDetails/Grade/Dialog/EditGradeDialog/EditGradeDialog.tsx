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
import { submitButtonId } from "../../../../../../../../../../../hooks/useEnableDisableSubmitButtonToggle";
import { onError } from "../../../../../../../../../../../utils/errors";
import { useTabOptions } from "../../../../EmployeeOrganizationDetails/BusinessUnit/Dialogs/EditBusinessUnitDialog/hooks/useTabOptions";
import type { EditDepartmentPayload } from "../../../hooks/useEditPostDetails";
import { useEditPostDetails } from "../../../hooks/useEditPostDetails";
import { useGetSectionPostDetail } from "../../../hooks/useGetSectionPostDetail";
import type {
  EditGradeFormFieldValues,
  EditGradeFormProps,
  FormRef,
} from "./EditGradeForm";
import { EditGradeForm } from "./EditGradeForm";

type EditGradeDialogProps = {
  open: boolean;
  onClose: () => void;
  onEditSuccess: () => void;
  employeeId: string;
  companyId: string;
};

export const EditGradeDialog = ({
  employeeId,
  companyId,
  open,
  onClose,
  onEditSuccess,
}: EditGradeDialogProps) => {
  const formRef = useRef<FormRef>(null);

  const { isDisabled } = useDisabledButtonsCache(submitButtonId);

  const { data: gradeDetail, isPending: isGradeDetailPending } =
    useGetSectionPostDetail({
      employeeId,
      section: "grade",
    });

  const { operationType, menuItems } = useTabOptions({
    effectFrom: !!gradeDetail?.effective_from,
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

        const formattedError: EditGradeFormFieldValues = merge(error["grade"]);

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
    if (gradeDetail) {
      const gradeFormValues: EditGradeFormProps["defaultValues"] = {
        id: gradeDetail.id,
        effective_from: gradeDetail.effective_from,
        joining_date: gradeDetail.joining_date,
        remark: gradeDetail.remark,
        operationType,
      };

      return gradeFormValues;
    }
  }, [gradeDetail]);

  const onEditGrade = () => {
    formRef.current?.submitForm((formValues) => {
      const payload: EditDepartmentPayload = {
        grade: {
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
      title="Update Grade Detail"
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={onEditGrade}
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
        loading={isGradeDetailPending}
      />

      <EditGradeForm
        ref={formRef}
        operationType={operationType}
        defaultValues={defaultValues}
        loading={isGradeDetailPending}
        companyId={companyId}
      />
    </Dialog>
  );
};
