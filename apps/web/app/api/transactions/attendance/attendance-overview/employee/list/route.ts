import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      message: "Attendance listed successfully.",
      data: {
        totalCount: 10,
        employees: [
          {
            id: "9ebeddc7-ed56-43b0-8767-4f3a0c784e51",
            employee_code: "HI67NAL",
            punch_code: "025",
            avatar: null,
            employee_name: "akshay vinubhai gondaliya",
            department_name: "Trainee Developer",
            sub_department_name: "Trainee Web Developer",
            designation_name: "HR Manager",
            company_name: "Codezee Solutions PVT Ltd.",
            company_id: "a45accee-c3b9-447f-9ec1-a8f0d07abedb",
            business_unit_name: "John code solution",
            business_unit_location_name: "CodeZee Location",
            reporting_manager_name: "jay Rathod",
            shift_type_name: "DAY (10:00 - 18:00)",
            full_count: "30",
          },
          {
            id: "28f407c6-eeac-4747-a851-33f8acf0926e",
            employee_code: "XYZ789D",
            punch_code: null,
            avatar: null,
            employee_name: "Alice AS Smith",
            department_name: "Research and Development",
            sub_department_name: "System Analysis",
            designation_name: "HR Manager",
            company_name: "Codezee Solutions PVT Ltd.",
            company_id: "a45accee-c3b9-447f-9ec1-a8f0d07abedb",
            business_unit_name: "John code solution",
            business_unit_location_name: "CodeZee Location",
            reporting_manager_name: "",
            shift_type_name: "DAY (10:00 - 18:00)",
            full_count: "30",
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
            company_id: "a45accee-c3b9-447f-9ec1-a8f0d07abedb",
            business_unit_name: "John code solution",
            business_unit_location_name: "CodeZee Location",
            reporting_manager_name: "",
            shift_type_name: "DAY (10:00 - 18:00)",
            full_count: "30",
          },
          {
            id: "b03197fa-0cd4-44dc-a3e8-abfb41da749e",
            employee_code: "HI14NAL",
            punch_code: "7777",
            avatar:
              "https://sixtify.s3.amazonaws.com/1723805168303_depositphotos_675471232-stock-illustration-lion-king-wild-roars-majestic_1715750732604 - Copy.jpg",
            employee_name: "Bhavik BS Shah",
            department_name: "Research and Development",
            sub_department_name: "System Analysis",
            designation_name: "HR Manager",
            company_name: "Codezee Solutions PVT Ltd.",
            company_id: "a45accee-c3b9-447f-9ec1-a8f0d07abedb",
            business_unit_name: "John code solution",
            business_unit_location_name: "CodeZee Location",
            reporting_manager_name: "",
            shift_type_name: "DAY (10:00 - 18:00)",
            full_count: "30",
          },
          {
            id: "d7ba4f59-d6d5-4125-8ba5-3e5dca2d1e4c",
            employee_code: "DEF456E",
            punch_code: null,
            avatar: null,
            employee_name: "Bob BJ Johnson",
            department_name: "Research and Development",
            sub_department_name: "System Analysis",
            designation_name: "HR Manager",
            company_name: "Codezee Solutions PVT Ltd.",
            company_id: "a45accee-c3b9-447f-9ec1-a8f0d07abedb",
            business_unit_name: "John code solution",
            business_unit_location_name: "CodeZee Location",
            reporting_manager_name: "",
            shift_type_name: "DAY (10:00 - 18:00)",
            full_count: "30",
          },
          {
            id: "6c5ed953-54cc-4c31-a582-4bd93dd08436",
            employee_code: "MC999C",
            punch_code: "1001",
            avatar:
              "https://sixtify.s3.amazonaws.com/1725870638552_preview.jpg",
            employee_name: "Chirag Sondagar",
            department_name: "Trainee Developer",
            sub_department_name: "Trainee Web Developer",
            designation_name: "HR Manager",
            company_name: "Codezee Solutions PVT Ltd.",
            company_id: "a45accee-c3b9-447f-9ec1-a8f0d07abedb",
            business_unit_name: "John code solution",
            business_unit_location_name: "CodeZee Location",
            reporting_manager_name: "Divya Divya",
            shift_type_name: "DAY (10:00 - 18:00)",
            full_count: "30",
          },
          {
            id: "9829deec-24ee-4325-912c-b013074bee7f",
            employee_code: "HI17NAL",
            punch_code: null,
            avatar: null,
            employee_name: "Ciaran CC Clemons",
            department_name: "Research and Development",
            sub_department_name: "System Analysis",
            designation_name: "HR Manager",
            company_name: "Codezee Solutions PVT Ltd.",
            company_id: "a45accee-c3b9-447f-9ec1-a8f0d07abedb",
            business_unit_name: "John code solution",
            business_unit_location_name: "CodeZee Location",
            reporting_manager_name: "",
            shift_type_name: "DAY (10:00 - 18:00)",
            full_count: "30",
          },
          {
            id: "f63571db-bbce-4b7e-a4e1-ef804caae7bb",
            employee_code: "EC1002C",
            punch_code: null,
            avatar: null,
            employee_name: "Demo DD Demo",
            department_name: "Research and Development",
            sub_department_name: "System Analysis",
            designation_name: "HR Manager",
            company_name: "Codezee Solutions PVT Ltd.",
            company_id: "a45accee-c3b9-447f-9ec1-a8f0d07abedb",
            business_unit_name: "John code solution",
            business_unit_location_name: "CodeZee Location",
            reporting_manager_name: "jay Rathod",
            shift_type_name: "DAY (10:00 - 18:00)",
            full_count: "30",
          },
          {
            id: "4b062b76-e6ac-448c-99d1-faa61bc4686d",
            employee_code: "EC1003C",
            punch_code: null,
            avatar: null,
            employee_name: "Dijendra DD Dijendra",
            department_name: "Research and Development",
            sub_department_name: "System Analysis",
            designation_name: "HR Manager",
            company_name: "Codezee Solutions PVT Ltd.",
            company_id: "a45accee-c3b9-447f-9ec1-a8f0d07abedb",
            business_unit_name: "John code solution",
            business_unit_location_name: "CodeZee Location",
            reporting_manager_name: "jay Rathod",
            shift_type_name: "DAY (10:00 - 18:00)",
            full_count: "30",
          },
          {
            id: "129ecae3-7735-4181-a78a-7c5323975a03",
            employee_code: "HI19NAL",
            punch_code: null,
            avatar: null,
            employee_name: "Divya DD Divya",
            department_name: "Testing Fields",
            sub_department_name: "Test following functionality in EOD",
            designation_name: "tester",
            company_name: "Codezee Solutions PVT Ltd.",
            company_id: "a45accee-c3b9-447f-9ec1-a8f0d07abedb",
            business_unit_name: "John code solution",
            business_unit_location_name: "CodeZee Location",
            reporting_manager_name: "",
            shift_type_name: "DAY (10:00 - 18:00)",
            full_count: "30",
          },
        ],
      },
    },
    { status: 200 }
  );
}
