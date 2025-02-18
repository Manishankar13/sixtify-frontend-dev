import { useQuery } from "@tanstack/react-query";
import { EMPLOYEE_DRAFT_ROUTES } from "../../../../../constants/routes/employee-management/employee/draft/routes";
import { useAxiosPrivate } from "../../../../../hooks/useAxiosPrivate";
import { employeeDraftKeys } from "../../../../../queryKeysFactories/employeeDraft";
import type { ApiSuccessResponse } from "../../../../../types/apiResponse";
import type { AccountType } from "../../../../common/Autocomplete/AccountTypeAutoComplete";
import type { BloodGroup } from "../../../../common/Autocomplete/hooks/useGetBloodGroupOption";
import type { Gender } from "../../../../common/Autocomplete/hooks/useGetGenderOptions";
import type { Title } from "../../../../common/Autocomplete/hooks/useGetTitleOptions";
import type { PaymentType } from "../../../../common/Autocomplete/PaymentTypeAutoComplete";
import type { DocumentOptionKey } from "../../AddEmployee/Document/Dialog/hooks/useDocumentOptions";

export type EmployeeCodeType = "auto" | "manual";

type BasicDetails = {
  avatar: string | null;
  confirmation_date: string | null;
  date_of_birth: string | null;
  email: string | null;
  first_name: string;
  gender: Gender | null;
  joining_date: string | null;
  last_name: string;
  middle_name: string | null;
  mobile_no: string | null;
  nick_name: string | null;
  on_book_joining_date: string | null;
  title: Title | null;
};

type EmployeeWorkDetails = {
  employee_code_type?: EmployeeCodeType | null;
  employee_code_id?: string | null;
  employee_code?: string | null;
  assigned_roles: string[];
  attendance_penalty_rule_id: string | null;
  overtime_rule_id: string | null;
  business_unit_id: string | null;
  business_unit_location_id: string | null;
  company_id: string | null;
  department_id: string | null;
  designation_id: string | null;
  grade_id: string | null;
  holiday_group_id: string | null;
  leave_plan_id: string | null;
  punch_code: string | null;
  reporting_manager_id: string | null;
  salary_slab_id: string | null;
  shift_type_id: string | null;
  bank_shift_type_id: string | null;
  skill_type_id: string | null;
  sub_department_id: string | null;
  weekly_off_type_id: string | null;
  work_type_id: string | null;
};

type EmployeeBankDetails = {
  payment_type: PaymentType;
  bank_id: string | null;
  branch_name: string | null;
  account_no: string | null;
  ifsc_code: string | null;
  account_type: AccountType | null;
  name_as_per_bank: string | null;
};

type EmployeeStatutoryDetails = {
  pf_applicable: boolean;
  pf_account_no: string | null;
  pf_joining_date: string | null;
  uan_no: string | null;
  esic_applicable: boolean;
  esic_no: string | null;
  esic_joining_date: string | null;
  pt_applicable: boolean;
  lwf_applicable: boolean;
  tds_applicable: boolean;
};

type EmployeeDocumentDetails = {
  document_type: DocumentOptionKey;
  document_details: {
    address?: string | null;
    blood_group?: BloodGroup | null;
    branch_name?: string;
    cgpa_or_percentage?: number | null;
    company_name?: string;
    completion_year?: string | null;
    date_of_birth?: string | null;
    degree?: string;
    document_no?: string;
    document_url: string[];
    expiry_date?: string;
    gender?: string | null;
    issue_date?: string;
    job_title?: string;
    joining_date?: string | null;
    joining_year?: string | null;
    name?: string;
    relieving_date?: string | null;
    university_or_college?: string | null;
  };
};

export type EmployeeDetail = {
  id: string;
  basic_details: BasicDetails;
  work_details: EmployeeWorkDetails;
  payment_details: EmployeeBankDetails;
  statutory_details: EmployeeStatutoryDetails;
  document_details: EmployeeDocumentDetails[];
};

type useGetEmployeeDraftArgs = {
  employeeId: EmployeeDetail["id"];
};

export function useGetEmployeeDraft({ employeeId }: useGetEmployeeDraftArgs) {
  const { axiosPrivate } = useAxiosPrivate();

  const fetchEmployeeDraft = async () => {
    const {
      data: { data },
    } = await axiosPrivate.get<ApiSuccessResponse<EmployeeDetail>>(
      EMPLOYEE_DRAFT_ROUTES.get(employeeId)
    );

    return data;
  };

  return useQuery({
    queryKey: employeeDraftKeys.get(employeeId),
    queryFn: fetchEmployeeDraft,
    enabled: !!employeeId,
  });
}
