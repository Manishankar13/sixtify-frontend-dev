import { toasts } from "@repo/shared-components";
import { isFunction } from "lodash";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import type { ApiErrorResponse } from "../types/apiResponse";

export const onError = <FormValues extends FieldValues>(
  error: ApiErrorResponse<FormValues | Record<string, FormValues>>,
  setError?: UseFormSetError<FormValues>,
  showErrorAsToaster?: Record<string, string>[]
) => {
  if (error.response.data.error && isFunction(setError)) {
    Object.entries(error.response.data.error).forEach((field) => {
      if (typeof field[1] === "object" && Object.keys(field[1]).length > 0) {
        Object.keys(field[1]).forEach((subField) => {
          const toasterError = showErrorAsToaster?.find(
            (ele) => ele[`${[field[0]]}.${[subField]}`]
          );

          if (toasterError) {
            toasts.error({
              title:
                toasterError?.[`${[field[0]]}.${[subField]}`] ??
                "Something went wrong",
            });
          } else {
            setError(`${[field[0]]}.${[subField]}` as Path<FormValues>, {
              type: "manual",
              message:
                error.response.data.error?.[field[0]]?.[subField] ||
                "Something went wrong",
            });
          }
        });
      } else {
        const toasterError = showErrorAsToaster?.find((ele) => ele[field[0]]);

        if (toasterError) {
          toasts.error({
            title: toasterError[field[0]] ?? "Something went wrong",
          });
        } else {
          setError(field[0] as Path<FormValues>, {
            type: "manual",
            message:
              error.response.data.error?.[field[0]] || "Something went wrong",
          });
        }
      }
    });
  } else {
    toasts.error({
      title: error.response.data.message || "Something went wrong",
    });
  }
};
