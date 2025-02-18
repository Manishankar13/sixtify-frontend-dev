import { zodResolver } from "@hookform/resolvers/zod";
import { Add } from "@mui/icons-material";
import { Stack } from "@mui/material";
import {
  Autocomplete,
  Button,
  DatePicker,
  FormContainer,
  FormRow,
  FormSection,
  RadioGroupField,
  TextField,
  toasts,
} from "@repo/shared-components";
import { useQueryClient } from "@tanstack/react-query";
import _, { debounce, isEmpty } from "lodash";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import type { ForwardedRef } from "react";
import { forwardRef, useEffect, useImperativeHandle, useMemo } from "react";
import type {
  Control,
  SubmitHandler,
  UseFormSetError,
  UseFormWatch,
} from "react-hook-form";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useApplicationContext } from "../../../../app/context/ApplicationContext";
import type { ButtonViewTypeKeys } from "../../../../app/employee-management/employee/hooks/useGetButtonOptions";
import { useDialogActions } from "../../../../hooks/useDialogActions";
import { departmentKeys } from "../../../../queryKeysFactories/department";
import { designationKeys } from "../../../../queryKeysFactories/designation";
import { gradeKeys } from "../../../../queryKeysFactories/grade";
import { skillTypeKeys } from "../../../../queryKeysFactories/skillType";
import { subDepartmentKeys } from "../../../../queryKeysFactories/subDepartment";
import { workTypeKeys } from "../../../../queryKeysFactories/worktype";
import type { DialogRenderer } from "../../../../types/dialogs";
import { dateDaysPlus } from "../../../../utils/date";
import { onError } from "../../../../utils/errors";
import { Debounce_Delay, resetDependentFields } from "../../../../utils/helper";
import { emailRegex, mobileNumberRegex } from "../../../../utils/regex";
import { AccountTypeSchema } from "../../../common/Autocomplete/AccountTypeAutoComplete";
import { AttendancePenaltyRuleAutocomplete } from "../../../common/Autocomplete/AttendancePenaltyRuleAutocomplete";
import { BankShiftSchemaAutocomplete } from "../../../common/Autocomplete/BankShiftSchemaAutocomplete";
import { BusinessUnitAutocomplete } from "../../../common/Autocomplete/BusinessUnitAutocomplete";
import { CompanyAutocomplete } from "../../../common/Autocomplete/CompanyAutocomplete";
import { DepartmentAutocomplete } from "../../../common/Autocomplete/DepartmentAutocomplete";
import { DesignationAutocomplete } from "../../../common/Autocomplete/DesignationAutocomplete";
import { EmployeeCodeAutocomplete } from "../../../common/Autocomplete/EmployeeCodeAutocomplete";
import { GenderAutocomplete } from "../../../common/Autocomplete/GenderAutoComplete";
import { GradeAutocomplete } from "../../../common/Autocomplete/GradeAutocomplete";
import { HolidaySchemeAutocomplete } from "../../../common/Autocomplete/HolidaySchemeAutocomplete";
import { GenderTypeSchema } from "../../../common/Autocomplete/hooks/useGetGenderOptions";
import { TitleSchema } from "../../../common/Autocomplete/hooks/useGetTitleOptions";
import { LeavePlanAutocomplete } from "../../../common/Autocomplete/LeavePlanAutocomplete";
import { LocationAutocomplete } from "../../../common/Autocomplete/LocationAutocomplete";
import { OvertimeRuleAutocomplete } from "../../../common/Autocomplete/OvertimeRuleAutocomplete";
import { PaymentTypeSchema } from "../../../common/Autocomplete/PaymentTypeAutoComplete";
import { ReportingManagerAutoComplete } from "../../../common/Autocomplete/ReportingManagerAutoComplete";
import { ShiftSchemeAutocomplete } from "../../../common/Autocomplete/ShiftSchemeAutocomplete";
import { SkillTypeAutocomplete } from "../../../common/Autocomplete/SkillTypeAutocomplete";
import { SubDepartmentAutocomplete } from "../../../common/Autocomplete/SubDepartmentAutocomplete";
import { TitleAutocomplete } from "../../../common/Autocomplete/TitleAutocomplete";
import { WeeklyOffSchemeAutocomplete } from "../../../common/Autocomplete/WeeklyOffSchemeAutocomplete";
import { WorkTypeAutocomplete } from "../../../common/Autocomplete/WorkTypeAutocomplete";
import { ImageUploadField } from "../../../common/ImageUploadField";
import { AddDepartmentDialog } from "../../../settings/miscellaneous-data/department/Dialogs/AddDepartmentDialog";
import { AddDesignationDialog } from "../../../settings/miscellaneous-data/designation/Dialogs/AddDesignationDialog";
import { AddGradeDialog } from "../../../settings/miscellaneous-data/grade/Dialogs/AddGradeDialog";
import { AddSkillTypeDialog } from "../../../settings/miscellaneous-data/skill-type/Dialogs/AddSkillTypeDialog";
import { AddSubDepartmentDialog } from "../../../settings/miscellaneous-data/sub-department/Dialogs/AddSubDepartmentDialog";
import { AddWorkTypeDialog } from "../../../settings/miscellaneous-data/work-type/Dialogs/AddWorkTypeDialog";
import AddDraftEmployeeDialog from "./AddDraftEmployeeDialog";
import type { BankInfoFormFieldValues } from "./BankInfoForm";
import { BankInfoForm, BankInfoFormSchema } from "./BankInfoForm";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { AddDocumentDialog } from "./Document/Dialog/AddDocumentDialog";
import { DocumentFormObj } from "./Document/Dialog/DocumentForm";
import { AADHAAR_CARD, PAN_CARD } from "./Document/Dialog/hooks/constant";
import { useDocumentOptions } from "./Document/Dialog/hooks/useDocumentOptions";
import { DocumentList } from "./Document/DocumentList/DocumentList";
import type { StatutoryFormFieldValues } from "./EmployeeForm/StatutoryInfoForm";
import {
  StatutoryInfoForm,
  StatutoryInfoFormSchema,
} from "./EmployeeForm/StatutoryInfoForm";
import { useAddEmployee } from "./hooks/useAddEmployee";
import {
  marshalDocumentPayload,
  marshalEmployeePayload,
} from "./MarshalEmployeeData";

const EmployeeCodeTypeSchema = z.enum(["auto", "manual"]);

const SaveTypeSchema = z.enum(["save", "draft"]);

const EmployeeFormSchema = z
  .object({
    submitType: SaveTypeSchema,
    avatar: z.string().optional().nullable(),
    employee_code_id: z.string().optional().nullable(),
    employee_code_type: EmployeeCodeTypeSchema,
    employee_code: z.string().optional().nullable(),
    punch_code: z.string().optional().nullable(),
    title: TitleSchema.optional().nullable(),
    first_name: z
      .string()
      .max(50, "employee.name.maxLength")
      .nullable()
      .refine((value) => !!value, {
        message: "common.required",
      }),
    middle_name: z.string().max(50, "employee.name.maxLength").nullable(),
    last_name: z
      .string()
      .max(50, "employee.name.maxLength")
      .nullable()
      .refine((value) => !!value, {
        message: "common.required",
      }),
    nick_name: z.string().optional().nullable(),
    date_of_birth: z
      .string()
      .nullable()
      .refine((value) => !!value, {
        message: "common.required",
      }),
    gender: GenderTypeSchema.optional().nullable(),
    joining_date: z
      .string()
      .nullable()
      .refine((value) => !!value, {
        message: "common.required",
      }),
    on_book_joining_date: z.string().nullable().nullable(),
    probation_period: z.number().optional().nullable(),
    confirmation_date: z.string().optional().nullable(),
    email: z
      .string()
      .trim()
      .regex(emailRegex, "common.email.invalid")
      .nullable()
      .refine((value) => !!value, {
        message: "common.required",
      }),
    mobile_no: z
      .string()
      .regex(mobileNumberRegex, "common.mobileNumber.invalid")
      .nullable()
      .refine((value) => !!value, {
        message: "common.required",
      }),
    company_id: z
      .string()
      .nullable()
      .refine((value) => !!value, {
        message: "common.required",
      }),
    business_unit_id: z.string().optional().nullable(),
    business_unit_location_id: z.string().optional().nullable(),
    department_id: z.string().optional().nullable(),
    sub_department_id: z.string().optional().nullable(),
    designation_id: z.string().optional().nullable(),
    grade_id: z.string().optional().nullable(),
    work_type_id: z.string().optional().nullable(),
    skill_type_id: z.string().optional().nullable(),
    reporting_manager_id: z.string().optional().nullable(),
    attendance_penalty_rule_id: z.string().optional().nullable(),
    overtime_rule_id: z.string().optional().nullable(),
    leave_plan_id: z.string().optional().nullable(),
    weekly_off_type_id: z.string().optional().nullable(),
    shift_type_id: z.string().optional().nullable(),
    bank_shift_type_id: z.string().optional().nullable(),
    holiday_group_id: z.string().optional().nullable(),
    salary_slab_id: z.string().optional().nullable(),
    assigned_roles: z.array(z.string()),
    document_details: z.array(DocumentFormObj).optional().nullable(),
  })
  // eslint-disable-next-line sonarjs/cognitive-complexity
  .superRefine((val, ctx) => {
    if (
      val.employee_code_type === "auto" &&
      val.company_id &&
      !val.employee_code_id
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "common.required",
        path: ["employee_code_id"],
      });
    } else if (val.employee_code_type === "manual" && !val.employee_code) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "common.required",
        path: ["employee_code"],
      });
    }

    if (val.company_id) {
      if (!val.business_unit_id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "common.required",
          path: ["business_unit_id"],
        });
      }

      if (val.business_unit_id && !val.business_unit_location_id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "common.required",
          path: ["business_unit_location_id"],
        });
      }

      if (!val.department_id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "common.required",
          path: ["department_id"],
        });
      }

      if (!val.designation_id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "common.required",
          path: ["designation_id"],
        });
      }

      if (val.department_id && !val.sub_department_id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "common.required",
          path: ["sub_department_id"],
        });
      }

      if (isEmpty(val.reporting_manager_id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "common.required",
          path: ["reporting_manager_id"],
        });
      }

      if (!val.shift_type_id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "common.required",
          path: ["shift_type_id"],
        });
      }

      if (!val.bank_shift_type_id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "common.required",
          path: ["bank_shift_type_id"],
        });
      }

      if (!val.weekly_off_type_id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "common.required",
          path: ["weekly_off_type_id"],
        });
      }

      if (!val.holiday_group_id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "common.required",
          path: ["holiday_group_id"],
        });
      }

      if (!val.leave_plan_id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "common.required",
          path: ["leave_plan_id"],
        });
      }
    }
  });

const EmployeeFormDraftSchema = z.object({
  submitType: SaveTypeSchema,
  avatar: z.string().optional().nullable(),
  employee_code_id: z.string().optional().nullable(),
  employee_code_type: EmployeeCodeTypeSchema,
  employee_code: z.string().optional().nullable(),
  punch_code: z.string().optional().nullable(),
  title: TitleSchema.optional().nullable(),
  first_name: z
    .string()
    .max(50, "employee.name.maxLength")
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  middle_name: z.string().max(50, "employee.name.maxLength").nullable(),
  last_name: z
    .string()
    .max(50, "employee.name.maxLength")
    .nullable()
    .refine((value) => !!value, {
      message: "common.required",
    }),
  nick_name: z.string().optional().nullable(),
  date_of_birth: z.string().optional().nullable(),
  gender: GenderTypeSchema.optional().nullable(),
  joining_date: z.string().optional().nullable(),
  on_book_joining_date: z.string().optional().nullable(),
  probation_period: z.number().optional().nullable(),
  confirmation_date: z.string().optional().nullable(),
  email: z
    .string()
    .trim()
    .regex(emailRegex, "common.email.invalid")
    .nullable()
    .optional(),
  mobile_no: z
    .string()
    .regex(mobileNumberRegex, "common.mobileNumber.invalid")
    .nullable()
    .optional(),
  company_id: z.string().nullable().optional(),
  business_unit_id: z.string().optional().nullable(),
  business_unit_location_id: z.string().optional().nullable(),
  department_id: z.string().optional().nullable(),
  sub_department_id: z.string().optional().nullable(),
  designation_id: z.string().optional().nullable(),
  grade_id: z.string().optional().nullable(),
  work_type_id: z.string().optional().nullable(),
  skill_type_id: z.string().optional().nullable(),
  reporting_manager_id: z.string().optional().nullable(),
  attendance_penalty_rule_id: z.string().optional().nullable(),
  overtime_rule_id: z.string().optional().nullable(),
  leave_plan_id: z.string().optional().nullable(),
  weekly_off_type_id: z.string().optional().nullable(),
  shift_type_id: z.string().optional().nullable(),
  bank_shift_type_id: z.string().optional().nullable(),
  holiday_group_id: z.string().optional().nullable(),
  salary_slab_id: z.string().optional().nullable(),
  assigned_roles: z.array(z.string()),
  payment_type: PaymentTypeSchema,
  bank_id: z.string().optional().nullable(),
  branch_name: z.string().optional().nullable(),
  account_type: AccountTypeSchema.optional().nullable(),
  account_no: z.string().optional().nullable(),
  ifsc_code: z.string().optional().nullable(),
  name_as_per_bank: z
    .string()
    .max(50, "name_as_per_bank.maxLength")
    .optional()
    .nullable(),
  pf_applicable: z.boolean().optional().nullable(),
  pf_account_no: z.string().optional().nullable(),
  pf_joining_date: z.string().optional().nullable(),
  uan_no: z.string().optional().nullable(),
  esic_applicable: z.boolean().optional().nullable(),
  esic_no: z.string().optional().nullable(),
  esic_joining_date: z.string().optional().nullable(),
  lwf_applicable: z.boolean().optional().nullable(),
  pt_applicable: z.boolean().optional().nullable(),
  tds_applicable: z.boolean().optional().nullable(),
  document_details: z.array(DocumentFormObj).optional().nullable(),
});

const CombineSchema = z.intersection(
  EmployeeFormSchema,
  z.intersection(StatutoryInfoFormSchema, BankInfoFormSchema)
);

export type EmployeeFormFieldValues = z.infer<typeof CombineSchema>;

export const formDefaultValues: EmployeeFormFieldValues = {
  submitType: "save",
  employee_code_id: null,
  employee_code_type: "auto",
  employee_code: null,
  punch_code: null,
  title: null,
  first_name: null,
  middle_name: null,
  last_name: null,
  nick_name: null,
  date_of_birth: null,
  gender: null,
  joining_date: null,
  on_book_joining_date: null,
  confirmation_date: null,
  probation_period: null,
  email: null,
  mobile_no: null,
  avatar: null,
  company_id: null,
  business_unit_id: null,
  business_unit_location_id: null,
  department_id: null,
  sub_department_id: null,
  designation_id: null,
  grade_id: null,
  work_type_id: null,
  skill_type_id: null,
  reporting_manager_id: null,
  attendance_penalty_rule_id: null,
  overtime_rule_id: null,
  leave_plan_id: null,
  weekly_off_type_id: null,
  shift_type_id: null,
  bank_shift_type_id: null,
  salary_slab_id: null,
  assigned_roles: [],
  holiday_group_id: null,
  name_as_per_bank: null,
  branch_name: null,
  bank_id: null,
  payment_type: "cash",
  account_no: null,
  account_type: null,
  ifsc_code: null,
  pf_account_no: null,
  esic_no: null,
  uan_no: null,
  pt_applicable: false,
  pf_applicable: false,
  esic_applicable: false,
  esic_joining_date: null,
  lwf_applicable: false,
  tds_applicable: false,
  pf_joining_date: null,
  document_details: [],
};

type EmployeeFormArgs = {
  view: ButtonViewTypeKeys;
  isDraft: boolean;
  loading: boolean;
  employeeId?: Readonly<string>;
  defaultValues?: EmployeeFormFieldValues;
  onSaveDraftEmployee: (values: Partial<EmployeeFormFieldValues>) => void;
};

export type FormRef = {
  setError: UseFormSetError<EmployeeFormFieldValues>;
};

export const EmployeeForm = forwardRef(
  (
    {
      view,
      isDraft = false,
      loading = false,
      employeeId,
      defaultValues,
      onSaveDraftEmployee,
    }: EmployeeFormArgs,
    ref: ForwardedRef<FormRef>
    // eslint-disable-next-line sonarjs/cognitive-complexity
  ) => {
    const { t } = useTranslation();

    const {
      isOpenAddEditEmployeePage,
      documentFormValues,
      employeeFormValues,
      setEmployeeFormValues,
      setDocumentFormValues,
      setIsOpenAddEditEmployeePage,
    } = useApplicationContext();


    const initialValues = useMemo(() => {
      if (!isEmpty(defaultValues)) {
        return { ...formDefaultValues, ...defaultValues };
      }

      return employeeFormValues;
    }, [defaultValues]);

    const { documentTypeOptions } = useDocumentOptions();

    const router = useRouter();

    const { openedDialog, onDialogClose, onDialogOpen } = useDialogActions();

    const queryClient = useQueryClient();

    const dynamicResolver = (value: EmployeeFormFieldValues) => {
      return value.submitType === "save"
        ? zodResolver(CombineSchema)
        : zodResolver(EmployeeFormDraftSchema);
    };

    const {
      watch,
      control,
      setError,
      formState: { errors, dirtyFields },
      handleSubmit,
      reset,
      setValue: setFieldValue,
    } = useForm({
      values: initialValues,
      resolver: async (values, context, options) =>
        dynamicResolver(values)(values, context, options),
      mode: "all",
    });

    const debounceEmployeeFormValues = debounce((value) => {
      setEmployeeFormValues(value);
    }, Debounce_Delay);

    useEffect(() => {
      const subscription = watch((value) => {
        debounceEmployeeFormValues(value);
      });

      return () => {
        subscription.unsubscribe();
      };
    }, [watch]);

    const { mutate, isPending } = useAddEmployee({
      options: {
        onSuccess: (data) => {
          if (!isEmpty(documentFormValues)) {
            setDocumentFormValues([]);
          }

          setEmployeeFormValues(formDefaultValues);

          setIsOpenAddEditEmployeePage(false);

          toasts.success({ title: data.message });

          router.push(
            `/employee-management/employee?view=${view}${isDraft ? "&isDraft=true" : ""}`
          );
        },
        onError: (res) => {
          const { error, message } = res.response.data;

          const formattedError: EmployeeFormFieldValues = _.merge(
            error["basic_details"],
            error["work_details"],
            error["payment_details"],
            error["statutory_details"],
            {
              ...(error["document_details"]
                ? { document_details: error["document_details"] }
                : {}),
            },
            {}
          );

          const structuredError = {
            response: {
              data: {
                message,
                error: formattedError,
              },
            },
          };

          onError(structuredError, setError, [
            { document_details: "Document is invalid" },
          ]);
        },
      },
    });

    const bankInfoControl =
      control as unknown as Control<BankInfoFormFieldValues>;

    const bankInfoWatch =
      watch as unknown as UseFormWatch<BankInfoFormFieldValues>;

    const statutoryInfoControl =
      control as unknown as Control<StatutoryFormFieldValues>;

    const statutoryInfoWatch =
      watch as unknown as UseFormWatch<StatutoryFormFieldValues>;

    const employeeCodeType = watch("employee_code_type");

    const companyId = watch("company_id") ?? "";

    const businessUnitId = watch("business_unit_id");

    const departmentId = watch("department_id");

    const joiningDate = watch("joining_date");

    const dateOfBirthDate = watch("date_of_birth");

    const onBookJoiningDate = watch("on_book_joining_date");

    const probationPeriod = watch("probation_period");

    const documentList = watch("document_details") || [];

    const confirmationDate = watch("confirmation_date");

    const pf_account_no = watch("pf_account_no");

    const pf_joining_date = watch("pf_joining_date");

    const uan_no = watch("uan_no");

    const isPfApplicable = watch("pf_applicable");

    const isEsicApplicable = watch("esic_applicable");

    const esic_no = watch("esic_no");

    const esic_joining_date = watch("esic_joining_date");

    const dependentFieldsMap: Partial<
      Record<keyof EmployeeFormFieldValues, (keyof EmployeeFormFieldValues)[]>
    > = {
      company_id: [
        "business_unit_id",
        "business_unit_location_id",
        "employee_code_id",
        "department_id",
        "sub_department_id",
        "designation_id",
        "grade_id",
        "work_type_id",
        "skill_type_id",
        "reporting_manager_id",
        "shift_type_id",
        "bank_shift_type_id",
        "weekly_off_type_id",
        "holiday_group_id",
        "attendance_penalty_rule_id",
        "overtime_rule_id",
        "leave_plan_id",
      ],
      business_unit_id: ["business_unit_location_id"],
      department_id: ["sub_department_id"],
    };

    useMemo(() => {
      resetDependentFields({
        fieldName: "company_id",
        fieldValue: companyId,
        dirtyFields,
        setValue: setFieldValue,
        dependentFieldsMap,
      });
    }, [companyId]);

    useMemo(() => {
      resetDependentFields({
        fieldName: "business_unit_id",
        fieldValue: businessUnitId,
        dirtyFields,
        setValue: setFieldValue,
        dependentFieldsMap,
      });
    }, [businessUnitId]);

    useMemo(() => {
      resetDependentFields({
        fieldName: "department_id",
        fieldValue: departmentId,
        dirtyFields,
        setValue: setFieldValue,
        dependentFieldsMap,
      });
    }, [departmentId]);

    useEffect(() => {
      if (!isOpenAddEditEmployeePage) {
        setIsOpenAddEditEmployeePage(true);
      }

      if (!isEmpty(documentFormValues)) {
        setFieldValue("document_details", documentFormValues);
      }
    }, []);

    useEffect(() => {
      if (joiningDate && typeof probationPeriod === "number") {
        const confirmation = dateDaysPlus(joiningDate, probationPeriod);

        setFieldValue("confirmation_date", confirmation);
      } else if (confirmationDate) {
        setFieldValue("confirmation_date", null);
      }
    }, [joiningDate, probationPeriod]);

    const errorMessages = (messageKey?: string) => {
      return messageKey && t(messageKey);
    };

    const submitAsDraft = () => {
      onDialogOpen("saveAsDraft");
    };

    // eslint-disable-next-line sonarjs/cognitive-complexity
    const onSubmit: SubmitHandler<EmployeeFormFieldValues> = (data) => {
      const documentDetailsPayload =
        (data.document_details &&
          !isEmpty(data.document_details) &&
          marshalDocumentPayload(data.document_details)) ||
        [];

      let isAadharCardAvailable = true;

      let isPanCardAvailable = true;

      documentDetailsPayload.forEach((document) => {
        if (document.document_type === AADHAAR_CARD) {
          isAadharCardAvailable = false;
        } else if (document.document_type === PAN_CARD) {
          isPanCardAvailable = false;
        }
      });

      if (data.submitType === "save") {
        if (isAadharCardAvailable && isPanCardAvailable) {
          toasts.error({
            title: t("employee.aadhaar_card_no_pan_card_no.invalid"),
          });

          return;
        } else if (isAadharCardAvailable) {
          toasts.error({
            title: t("employee.aadhaar_card_no.required"),
          });

          return;
        } else if (isPanCardAvailable) {
          toasts.error({
            title: t("employee.pan_card_no.required"),
          });

          return;
        }
      }

      const payload = marshalEmployeePayload(data, documentDetailsPayload);

      if (data.submitType === "save") {
        mutate({ ...payload, employee_draft_id: employeeId });
      } else {
        onSaveDraftEmployee(payload);
      }
    };

    useEffect(() => {
      if (!isPfApplicable) {
        if (pf_account_no) {
          setFieldValue("pf_account_no", null);
        }

        if (pf_joining_date) {
          setFieldValue("pf_joining_date", null);
        }

        if (uan_no) {
          setFieldValue("uan_no", null);
        }
      }
    }, [isPfApplicable]);

    useEffect(() => {
      if (!isEsicApplicable) {
        if (esic_no) {
          setFieldValue("esic_no", null);
        }

        if (esic_joining_date) {
          setFieldValue("esic_joining_date", null);
        }
      }
    }, [isEsicApplicable]);

    useImperativeHandle(ref, () => ({
      setError,
    }));

    const dialogRenderer: DialogRenderer = {
      addDepartment: (
        <AddDepartmentDialog
          open
          defaultValues={{ company_id: companyId, is_active: true }}
          onClose={onDialogClose}
          onAddSuccess={() => {
            queryClient.invalidateQueries({
              queryKey: departmentKeys.options(companyId),
            });
          }}
        />
      ),
      addSubDepartment: (
        <AddSubDepartmentDialog
          open
          onClose={onDialogClose}
          defaultValues={{
            company_id: companyId,
            department_id: departmentId,
            is_active: true,
          }}
          onAddSuccess={() => {
            queryClient.invalidateQueries({
              queryKey: subDepartmentKeys.options(departmentId),
            });
          }}
        />
      ),
      addDocument: (
        <AddDocumentDialog
          open
          documentTypeOptions={documentTypeOptions}
          onClose={onDialogClose}
          onAdd={(formValues) => {
            setFieldValue("document_details", [...documentList, formValues]);

            setDocumentFormValues([...documentFormValues, formValues]);

            onDialogClose();
          }}
        />
      ),
      addSkillType: (
        <AddSkillTypeDialog
          open
          defaultValues={{ company_id: companyId, is_active: true }}
          onClose={onDialogClose}
          onAddSuccess={() => {
            queryClient.invalidateQueries({
              queryKey: skillTypeKeys.options(companyId),
            });
          }}
        />
      ),
      addDesignation: (
        <AddDesignationDialog
          open
          defaultValues={{ company_id: companyId, is_active: true }}
          onClose={onDialogClose}
          onAddSuccess={() => {
            queryClient.invalidateQueries({
              queryKey: designationKeys.options(companyId),
            });
          }}
        />
      ),
      addGrade: (
        <AddGradeDialog
          open
          defaultValues={{ company_id: companyId, is_active: true }}
          onClose={onDialogClose}
          onAddSuccess={() => {
            queryClient.invalidateQueries({
              queryKey: gradeKeys.options(companyId),
            });
          }}
        />
      ),
      addWorkType: (
        <AddWorkTypeDialog
          open
          defaultValues={{ company_id: companyId, is_active: true }}
          onClose={onDialogClose}
          onAddSuccess={() => {
            queryClient.invalidateQueries({
              queryKey: workTypeKeys.options(companyId),
            });
          }}
        />
      ),
      saveAsDraft: (
        <AddDraftEmployeeDialog
          open
          onDialogClose={onDialogClose}
          onSuccess={() => {
            reset();

            router.push(
              `/employee-management/employee?view=${view}${isDraft ? "&isDraft=true" : ""}`
            );
          }}
        />
      ),
      cancel: (
        <ConfirmationDialog
          open
          onClose={onDialogClose}
          onSave={() => {
            reset();

            if (!isEmpty(documentFormValues)) {
              setDocumentFormValues([]);
            }

            setEmployeeFormValues(formDefaultValues);

            setIsOpenAddEditEmployeePage(false);

            router.push(
              `/employee-management/employee?view=${view}${isDraft ? "&isDraft=true" : ""}`
            );
          }}
        />
      ),
    };

    return (
      <>
        <FormContainer>
          <FormSection title="Basic Details">
            <ImageUploadField
              variant="circle"
              name="avatar"
              loading={loading}
              control={control}
              isCapture
            />

            <FormRow>
              <TitleAutocomplete
                name="title"
                loading={loading}
                control={control}
              />

              <TextField
                name="first_name"
                control={control}
                loading={loading}
                label="First Name"
                required
                error={!!errors.first_name}
                helperText={errorMessages(errors.first_name?.message)}
              />

              <TextField
                name="middle_name"
                control={control}
                loading={loading}
                label="Middle Name"
                error={!!errors.middle_name}
                helperText={errorMessages(errors.middle_name?.message)}
              />
            </FormRow>

            <FormRow>
              <TextField
                name="last_name"
                control={control}
                loading={loading}
                label="Last Name"
                required
                error={!!errors.last_name}
                helperText={errorMessages(errors.last_name?.message)}
              />

              <TextField
                control={control}
                loading={loading}
                label="Nick Name"
                name="nick_name"
              />

              <DatePicker
                name="date_of_birth"
                setError={setError}
                control={control}
                loading={loading}
                label="Date of Birth"
                required
                maxDate={
                  joiningDate ? DateTime.fromISO(joiningDate) : DateTime.now()
                }
                error={!!errors.date_of_birth}
                helperText={errorMessages(errors.date_of_birth?.message)}
              />
            </FormRow>

            <FormRow>
              <GenderAutocomplete
                name="gender"
                control={control}
                loading={loading}
              />

              <DatePicker
                name="joining_date"
                control={control}
                label="Date Of Joining"
                loading={loading}
                setError={setError}
                minDate={
                  dateOfBirthDate
                    ? DateTime.fromISO(dateOfBirthDate)
                    : undefined
                }
                maxDate={
                  onBookJoiningDate
                    ? DateTime.fromISO(onBookJoiningDate)
                    : undefined
                }
                required
                error={!!errors.joining_date}
                helperText={errorMessages(errors.joining_date?.message)}
              />

              <DatePicker
                name="on_book_joining_date"
                control={control}
                setError={setError}
                loading={loading}
                label="ON Books Join Date"
                minDate={
                  joiningDate ? DateTime.fromISO(joiningDate) : undefined
                }
                error={!!errors.on_book_joining_date}
                helperText={errorMessages(errors.on_book_joining_date?.message)}
              />
            </FormRow>

            <FormRow>
              <TextField
                control={control}
                loading={loading}
                label="Probation Period (Days)"
                name="probation_period"
                type="number"
              />

              <DatePicker
                control={control}
                loading={loading}
                name="confirmation_date"
                label="Confirmation Date"
                readOnly={true}
              />

              <TextField
                name="email"
                control={control}
                loading={loading}
                label="Email"
                required
                error={!!errors.email}
                helperText={errorMessages(errors.email?.message)}
              />
            </FormRow>

            <FormRow>
              <TextField
                control={control}
                loading={loading}
                label="Mobile Number"
                name="mobile_no"
                required
                error={!!errors.mobile_no}
                helperText={errorMessages(errors.mobile_no?.message)}
              />
            </FormRow>
          </FormSection>

          <FormSection title="Employee Work & Post">
            <FormRow>
              <CompanyAutocomplete
                name="company_id"
                control={control}
                loading={loading}
                required
                error={!!errors.company_id}
                helperText={errorMessages(errors.company_id?.message)}
              />

              <BusinessUnitAutocomplete
                name="business_unit_id"
                disabled={companyId ? false : true}
                control={control}
                loading={loading}
                required
                error={!!errors.business_unit_id}
                helperText={errorMessages(errors.business_unit_id?.message)}
                companyId={companyId}
              />

              <LocationAutocomplete
                name="business_unit_location_id"
                control={control}
                loading={loading}
                disabled={businessUnitId ? false : true}
                required
                error={!!errors.business_unit_location_id}
                helperText={errorMessages(
                  errors.business_unit_location_id?.message
                )}
                businessUnitId={businessUnitId}
              />
            </FormRow>

            <FormRow>
              <FormRow maxColumn={2}>
                <RadioGroupField
                  name="employee_code_type"
                  label="Employee Code Type"
                  control={control}
                  loading={loading}
                  options={[
                    {
                      values: "auto",
                      label: "Auto",
                      disabled: false,
                    },
                    {
                      values: "manual",
                      label: "Manual",
                      disabled: false,
                    },
                  ]}
                />
              </FormRow>

              {employeeCodeType === "auto" ? (
                <EmployeeCodeAutocomplete
                  disabled={companyId ? false : true}
                  name="employee_code_id"
                  control={control}
                  loading={loading}
                  required
                  error={!!errors.employee_code_id}
                  helperText={errorMessages(errors.employee_code_id?.message)}
                  companyId={companyId}
                />
              ) : (
                <TextField
                  control={control}
                  loading={loading}
                  label="Employee Code"
                  name="employee_code"
                  required
                  error={!!errors.employee_code}
                  helperText={errorMessages(errors.employee_code?.message)}
                />
              )}

              <TextField
                control={control}
                loading={loading}
                label="Punch Code"
                name="punch_code"
              />
            </FormRow>

            <FormRow>
              <DepartmentAutocomplete
                disabled={companyId ? false : true}
                name="department_id"
                onAction={() => onDialogOpen("addDepartment")}
                control={control}
                loading={loading}
                required
                error={!!errors.department_id}
                helperText={errorMessages(errors.department_id?.message)}
                companyId={companyId}
              />

              <SubDepartmentAutocomplete
                disabled={departmentId ? false : true}
                onAction={() => onDialogOpen("addSubDepartment")}
                name="sub_department_id"
                control={control}
                loading={loading}
                required
                error={!!errors.sub_department_id}
                helperText={errorMessages(errors.sub_department_id?.message)}
                departmentId={departmentId}
              />

              <DesignationAutocomplete
                disabled={companyId ? false : true}
                onAction={() => onDialogOpen("addDesignation")}
                name="designation_id"
                control={control}
                loading={loading}
                required
                error={!!errors.designation_id}
                helperText={errorMessages(errors.designation_id?.message)}
                companyId={companyId}
              />
            </FormRow>

            <FormRow>
              <GradeAutocomplete
                disabled={companyId ? false : true}
                name="grade_id"
                control={control}
                loading={loading}
                companyId={companyId}
                onAction={() => onDialogOpen("addGrade")}
              />

              <WorkTypeAutocomplete
                disabled={companyId ? false : true}
                name="work_type_id"
                control={control}
                loading={loading}
                companyId={companyId}
                onAction={() => onDialogOpen("addWorkType")}
              />

              <SkillTypeAutocomplete
                name="skill_type_id"
                onAction={() => onDialogOpen("addSkillType")}
                disabled={companyId ? false : true}
                control={control}
                loading={loading}
                companyId={companyId}
              />
            </FormRow>

            <FormRow>
              <ReportingManagerAutoComplete
                name="reporting_manager_id"
                disabled={companyId ? false : true}
                control={control}
                loading={loading}
                companyId={companyId}
                required
                error={!!errors.reporting_manager_id}
                helperText={errorMessages(errors.reporting_manager_id?.message)}
              />

              <ShiftSchemeAutocomplete
                name="shift_type_id"
                disabled={companyId ? false : true}
                control={control}
                loading={loading}
                companyId={companyId}
                required
                error={!!errors.shift_type_id}
                helperText={errorMessages(errors.shift_type_id?.message)}
              />

              <BankShiftSchemaAutocomplete
                name="bank_shift_type_id"
                disabled={companyId ? false : true}
                control={control}
                loading={loading}
                companyId={companyId}
                required
                error={!!errors.bank_shift_type_id}
                helperText={errorMessages(errors.bank_shift_type_id?.message)}
              />
            </FormRow>

            <FormRow>
              <WeeklyOffSchemeAutocomplete
                name="weekly_off_type_id"
                disabled={companyId ? false : true}
                control={control}
                loading={loading}
                companyId={companyId}
                required
                error={!!errors.weekly_off_type_id}
                helperText={errorMessages(errors.weekly_off_type_id?.message)}
              />

              <HolidaySchemeAutocomplete
                name="holiday_group_id"
                disabled={companyId ? false : true}
                control={control}
                loading={loading}
                companyId={companyId}
                required
                error={!!errors.holiday_group_id}
                helperText={errorMessages(errors.holiday_group_id?.message)}
              />

              <AttendancePenaltyRuleAutocomplete
                name="attendance_penalty_rule_id"
                control={control}
                disabled={companyId ? false : true}
                companyId={companyId}
                loading={loading}
              />
            </FormRow>

            <FormRow>
              <OvertimeRuleAutocomplete
                name="overtime_rule_id"
                control={control}
                disabled={companyId ? false : true}
                companyId={companyId}
                loading={loading}
              />

              <LeavePlanAutocomplete
                name="leave_plan_id"
                control={control}
                disabled={companyId ? false : true}
                companyId={companyId}
                loading={loading}
                required
                error={!!errors.leave_plan_id}
                helperText={errorMessages(errors.leave_plan_id?.message)}
              />

              <Autocomplete
                name="salary_slab_id"
                options={[]}
                control={control}
                loading={loading}
                label="Salary Slab"
                placeholder="Select Salary Slab"
              />
            </FormRow>
          </FormSection>

          <FormSection title="Payment Details">
            <BankInfoForm
              control={bankInfoControl}
              errors={errors}
              loading={loading}
              watch={bankInfoWatch}
            />
          </FormSection>

          <FormSection title="Statutory Details">
            <StatutoryInfoForm
              loading={loading}
              control={statutoryInfoControl}
              watch={statutoryInfoWatch}
              errors={errors}
            />
          </FormSection>

          <Stack direction="row" justifyContent="space-between">
            <FormSection title="Employee Documents"></FormSection>

            <Button
              variant="outlined"
              sx={{ height: "50%" }}
              disabled={isPending || loading}
              startIcon={<Add />}
              onClick={() => onDialogOpen("addDocument")}
            >
              Add Document
            </Button>
          </Stack>
        </FormContainer>

        {!isEmpty(documentList) && (
          <DocumentList setFieldValue={setFieldValue} />
        )}

        <FormSection>
          <Stack direction="row" justifyContent="end">
            <Stack gap="10px" direction="row">
              <Stack direction="row" gap="5px">
                <Button
                  variant="outlined"
                  onClick={() => onDialogOpen("cancel")}
                  disabled={isPending || loading}
                >
                  Cancel
                </Button>

                <Button
                  onClick={() => {
                    setFieldValue("submitType", "draft");

                    handleSubmit(submitAsDraft)();
                  }}
                  disabled={loading}
                  loading={isPending}
                >
                  Save As Draft
                </Button>

                <Button
                  onClick={() => {
                    setFieldValue("submitType", "save");

                    handleSubmit(onSubmit)();
                  }}
                  disabled={loading}
                  loading={isPending}
                >
                  Save
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </FormSection>

        {openedDialog && dialogRenderer[openedDialog]}
      </>
    );
  }
);

EmployeeForm.displayName = "EmployeeForm";
