import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      message: "Shift day employee listed successfully",
      data: {
        totalCount: 5,
        list: [
          {
            id: "30b71c81-8532-46a1-9780-e0dbf3008ddc",
            employee_code: "HI68NAL",
            punch_code: "10548",
            avatar:
              "https://sixtify.s3.amazonaws.com/1724304517532_preview.jpg",
            employee_name: "Jay jk kyada",
            department_name: "Research and Development",
            sub_department_name: "System Analysis",
            designation_name: "HR Manager",
            company_name: "Codezee Solutions PVT Ltd.",
            business_unit_name: "Business pvt",
            business_unit_location_name: "CodeZee Location",
            reporting_manager_name: "",
            bank_shift_type_name: "Day",
            full_count: "5",
          },
          {
            id: "fdcda08b-bfad-4399-9ab6-d6ef4788b058",
            employee_code: "HI67NAL",
            punch_code: "025",
            avatar: null,
            employee_name: "akshay vinubhai gondaliya",
            department_name: "Trainee Developer",
            sub_department_name: "Trainee Web Developer",
            designation_name: "HR Manager",
            company_name: "Codezee Solutions PVT Ltd.",
            business_unit_name: "Business pvt",
            business_unit_location_name: "CodeZee Location",
            reporting_manager_name: "jay Rathod",
            bank_shift_type_name: "Day",
            full_count: "5",
          },
          {
            id: "285447cc-2ca7-4539-9f25-8e2108d4c976",
            employee_code: "HI66NAL",
            punch_code: null,
            avatar: "https://example.com/avatar.jpg",
            employee_name: "Alice Jane Williams",
            department_name: "Research and Development",
            sub_department_name: "System Analysis",
            designation_name: "HR Manager",
            company_name: "Codezee Solutions PVT Ltd.",
            business_unit_name: "Business pvt",
            business_unit_location_name: "CodeZee Location",
            reporting_manager_name: "",
            bank_shift_type_name: "Day",
            full_count: "5",
          },
          {
            id: "2832b3db-779e-4f03-a781-c0b966a8dcad",
            employee_code: "HI58NAL",
            punch_code: null,
            avatar:
              "https://sixtify.s3.amazonaws.com/1725885843717_images (2).jpg",
            employee_name: "Raj Ahir",
            department_name: "Research and Development",
            sub_department_name: "System Analysis",
            designation_name: "tester",
            company_name: "Codezee Solutions PVT Ltd.",
            business_unit_name: "Business pvt",
            business_unit_location_name: "CodeZee Location",
            reporting_manager_name: "Jenish Chanchad",
            bank_shift_type_name: "Day",
            full_count: "5",
          },
          {
            id: "1508ddb3-aeea-4e65-b7af-bb795a4a0417",
            employee_code: "HI54NAL",
            punch_code: null,
            avatar: null,
            employee_name: "Mahesh M Patel",
            department_name: "Research and Development",
            sub_department_name: "System Analysis",
            designation_name: "HR Manager",
            company_name: "Codezee Solutions PVT Ltd.",
            business_unit_name: "Business pvt",
            business_unit_location_name: "CodeZee Location",
            reporting_manager_name: "",
            bank_shift_type_name: "Day",
            full_count: "5",
          },
        ],
      },
    },
    { status: 200 }
  );
}
