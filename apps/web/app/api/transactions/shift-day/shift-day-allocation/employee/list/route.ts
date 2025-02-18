import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      message: "Shift day employees listed successfully.",
      data: {
        totalCount: 5,
        list: [
          {
            id: "27971d36-39dd-486b-ac2f-618559b9542d",
            employee_code: "EMP101",
            punch_code: "805",
            employee_name: "Raj R. Patel",
            department_name: "Manufacturing",
            sub_department_name: null,
            avatar: null,
            designation_name: "Plant Manager",
            company_name: "Birla Grasim",
            business_unit_name: "Fiber",
            business_unit_location_name: "Vilayat",
            reporting_manager_name: "Sarad Bhola",
            weekly_off_type_name: "Sunday & Saturday",
            shift_type_name: "General",
            holiday_group_name: "Makar Sakranti",
            full_count: "57",
          },
          {
            id: "29971d36-39dd-486b-ac2f-618679b9542d",
            employee_code: "EMP102",
            punch_code: "806",
            employee_name: "Jignesh Vaghela",
            department_name: "Management",
            sub_department_name: "HOD",
            avatar: null,
            designation_name: "HOD",
            company_name: "Birla Grasim",
            business_unit_name: "Fiber",
            business_unit_location_name: "Vilayat",
            reporting_manager_name: "Sarad Bhola",
            weekly_off_type_name: "Sunday & Saturday",
            shift_type_name: "General",
            holiday_group_name: "Makar Sakranti",
            full_count: "57",
          },
          {
            id: "30971d36-39dd-486b-ac2f-618559b9542d",
            employee_code: "EMP103",
            punch_code: "807",
            employee_name: "Alpesh Panchal",
            department_name: "Transport",
            sub_department_name: "Trucking",
            avatar: null,
            designation_name: "Truck Operator",
            company_name: "Birla Grasim",
            business_unit_name: "Fiber",
            business_unit_location_name: "Vilayat",
            reporting_manager_name: "Sarad Bhola",
            weekly_off_type_name: "Sunday & Saturday",
            shift_type_name: "General",
            holiday_group_name: "Makar Sakranti",
            full_count: "57",
          },
          {
            id: "27971d36-39dd-486b-ac2f-618559b9542d",
            employee_code: "EMP104",
            punch_code: "808",
            employee_name: "Raj R. Patel",
            department_name: "Manufacturing",
            sub_department_name: "Q&A",
            avatar: null,
            designation_name: "Quality Assurance Manager",
            company_name: "Birla Grasim",
            business_unit_name: "Fiber",
            business_unit_location_name: "Vilayat",
            reporting_manager_name: "Sarad Bhola",
            weekly_off_type_name: "Sunday & Saturday",
            shift_type_name: "General",
            holiday_group_name: "Makar Sakranti",
            full_count: "57",
          },
          {
            id: "2e93dc4d-3888-4f1c-a4bb-f58236e03cbf",
            employee_code: "EMP105",
            punch_code: "1319",
            employee_name: "Tony Stark Stark",
            avatar: null,
            department_name: null,
            sub_department_name: null,
            designation_name: "Quality Assurance Manager",
            company_name: "Birla Grasim",
            business_unit_name: null,
            business_unit_location_name: null,
            reporting_manager_name: "",
            weekly_off_type_name: null,
            shift_type_name: null,
            holiday_group_name: null,
            full_count: "57",
          },
        ],
      },
    },
    { status: 200 }
  );
}
