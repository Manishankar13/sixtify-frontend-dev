import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      message: "Employee added successfully.",
      data: {
        basicDetails: {
          id: "285447cc-2ca7-4539-9f25-8e2108d4c976",
          employee_code_id: "e60b4dd4-5942-419f-972c-db29cf45759f",
          employee_code: "HI66NAL",
          employee_code_type: "auto",
          punch_code: null,
          title: "ms.",
          nick_name: "Ally",
          date_of_birth: "1990-07-13T18:30:00.000Z",
          gender: "female",
          joining_date: "2023-12-30T18:30:00.000Z",
          on_book_joining_date: "2023-12-19T18:30:00.000Z",
          confirmation_date: null,
          avatar: "https://example.com/avatar.jpg",
          mobile_no: "9874563120",
          rejoined: false,
          email: "alice.williams@workplace.com",
          password: null,
          is_deleted: false,
          created_by: "f8d860f0-c093-4d88-808c-75a23779a105",
          updated_by: "f8d860f0-c093-4d88-808c-75a23779a105",
          deleted_by: null,
          created_at: "2024-09-10T11:39:28.141Z",
          updated_at: "2024-09-10T11:39:28.141Z",
          deleted_at: null,
          first_name: "Alice",
          middle_name: "Jane",
          last_name: "Williams",
        },
        employeeWorkDetails: {
          id: "184a3b1e-e7da-4382-8585-5ce191159993",
          employee_id: "285447cc-2ca7-4539-9f25-8e2108d4c976",
          company_id: "a45accee-c3b9-447f-9ec1-a8f0d07abedb",
          business_unit_id: "29e6aaee-0d66-4acb-95a8-3202d94696a2",
          business_unit_location_id: "fc46687f-ddad-4435-9072-008fa65beedf",
          department_id: "d33d3c85-edbc-48e2-88e4-5a4384367c26",
          sub_department_id: "715c25fd-dd07-4fab-9982-3a4adfe2d512",
          designation_id: "dc51c8bc-bc19-420a-b33d-29beb6b4a7fd",
          grade_id: null,
          work_type_id: null,
          skill_type_id: null,
          reporting_manager_id: null,
          attendance_penalty_rule_id: null,
          overtime_rule_id: null,
          leave_plan_id: null,
          weekly_off_type_id: null,
          shift_type_id: null,
          holiday_group_id: null,
          salary_slab_id: null,
          is_deleted: false,
          created_by: "f8d860f0-c093-4d88-808c-75a23779a105",
          updated_by: "f8d860f0-c093-4d88-808c-75a23779a105",
          deleted_by: null,
          created_at: "2024-09-10T11:39:28.141Z",
          updated_at: "2024-09-10T11:39:28.141Z",
          deleted_at: null,
        },
        EmployeePaymentDetails: {
          id: "a2f9acbb-5e64-4ea8-bdfc-445ea70fec28",
          employee_id: "285447cc-2ca7-4539-9f25-8e2108d4c976",
          payment_type: "cash",
          bank_id: null,
          branch_name: null,
          account_no: null,
          ifsc_code: null,
          account_type: null,
          name_as_per_bank: null,
          is_deleted: false,
          created_by: "f8d860f0-c093-4d88-808c-75a23779a105",
          updated_by: "f8d860f0-c093-4d88-808c-75a23779a105",
          deleted_by: null,
          created_at: "2024-09-10T11:39:28.141Z",
          updated_at: "2024-09-10T11:39:28.141Z",
          deleted_at: null,
          is_active: true,
        },
        employeeStatutoryDetails: {
          id: "730d2f01-7a8c-4abf-9341-9a314a2264a9",
          employee_id: "285447cc-2ca7-4539-9f25-8e2108d4c976",
          pf_applicable: false,
          pf_account_no: null,
          pf_joining_date: null,
          uan_no: null,
          esic_applicable: false,
          esic_no: null,
          esic_joining_date: null,
          pt_applicable: false,
          lwf_applicable: false,
          tds_applicable: false,
          is_deleted: false,
          created_by: "f8d860f0-c093-4d88-808c-75a23779a105",
          updated_by: "f8d860f0-c093-4d88-808c-75a23779a105",
          deleted_by: null,
          created_at: "2024-09-10T06:09:28.141Z",
          updated_at: "2024-09-10T06:09:28.141Z",
          deleted_at: null,
        },
        employeeDocumentDetails: [
          {
            id: "8d63d019-cec0-43a4-b125-d4af29d39c24",
            employee_id: "285447cc-2ca7-4539-9f25-8e2108d4c976",
            document_type: "aadhaar_card",
            document_details: {
              name: "John Doe",
              address: null,
              document_no: "284545784578",
              document_url: [
                "http://example.com/path/to/back_page.pdf",
                "http://example.com/path/to/front_page.pdf",
              ],
              date_of_birth: "1980-01-01",
            },
            is_deleted: false,
            created_by: "f8d860f0-c093-4d88-808c-75a23779a105",
            updated_by: "f8d860f0-c093-4d88-808c-75a23779a105",
            deleted_by: null,
            created_at: "2024-09-10T11:39:28.141Z",
            updated_at: "2024-09-10T11:39:28.141Z",
            deleted_at: null,
          },
          {
            id: "29bbde17-faf9-441d-9497-6fbee74c72f5",
            employee_id: "285447cc-2ca7-4539-9f25-8e2108d4c976",
            document_type: "pan_card",
            document_details: {
              name: "John Doe",
              address: null,
              issue_date: "1980-09-21",
              document_no: "ABCDE1234F",
              document_url: ["http://example.com/path/to/front_page.pdf"],
              date_of_birth: "1980-01-01",
            },
            is_deleted: false,
            created_by: "f8d860f0-c093-4d88-808c-75a23779a105",
            updated_by: "f8d860f0-c093-4d88-808c-75a23779a105",
            deleted_by: null,
            created_at: "2024-09-10T11:39:28.141Z",
            updated_at: "2024-09-10T11:39:28.141Z",
            deleted_at: null,
          },
          {
            id: "d10bd703-83b5-4d17-b263-72237a410a24",
            employee_id: "285447cc-2ca7-4539-9f25-8e2108d4c976",
            document_type: "voterid_card",
            document_details: {
              name: "John Doe",
              gender: "male",
              document_no: "PQRST9876M",
              document_url: ["http://example.com/path/to/front_page.pdf"],
              date_of_birth: "1980-01-01",
            },
            is_deleted: false,
            created_by: "f8d860f0-c093-4d88-808c-75a23779a105",
            updated_by: "f8d860f0-c093-4d88-808c-75a23779a105",
            deleted_by: null,
            created_at: "2024-09-10T11:39:28.141Z",
            updated_at: "2024-09-10T11:39:28.141Z",
            deleted_at: null,
          },
          {
            id: "b82961f9-90c7-4680-897f-e42a302f2033",
            employee_id: "285447cc-2ca7-4539-9f25-8e2108d4c976",
            document_type: "driving_license",
            document_details: {
              name: "John Doe",
              issue_date: "2019-07-21",
              blood_group: "ab+",
              document_no: "MH1220209876543",
              expiry_date: "2026-07-21",
              document_url: ["http://example.com/path/to/front_page.pdf"],
              date_of_birth: "1980-01-01",
            },
            is_deleted: false,
            created_by: "f8d860f0-c093-4d88-808c-75a23779a105",
            updated_by: "f8d860f0-c093-4d88-808c-75a23779a105",
            deleted_by: null,
            created_at: "2024-09-10T11:39:28.141Z",
            updated_at: "2024-09-10T11:39:28.141Z",
            deleted_at: null,
          },
          {
            id: "1b4bbfe0-54e8-447d-8538-9cbfa2440887",
            employee_id: "285447cc-2ca7-4539-9f25-8e2108d4c976",
            document_type: "previous_experience",
            document_details: {
              address: "456 Tech Lane, Silicon Valley, CA",
              job_title: "Junior Software Developer",
              company_name: "Tech Solutions Inc.",
              document_url: ["http://example.com/path/to/front_page.pdf"],
              joining_date: "2010-01-15",
              relieving_date: "2015-03-20",
            },
            is_deleted: false,
            created_by: "f8d860f0-c093-4d88-808c-75a23779a105",
            updated_by: "f8d860f0-c093-4d88-808c-75a23779a105",
            deleted_by: null,
            created_at: "2024-09-10T11:39:28.141Z",
            updated_at: "2024-09-10T11:39:28.141Z",
            deleted_at: null,
          },
          {
            id: "6b72c37c-cd37-44c7-b430-0c21a5559cf0",
            employee_id: "285447cc-2ca7-4539-9f25-8e2108d4c976",
            document_type: "degrees_certificates",
            document_details: {
              degree: "BCA",
              branch_name: "Computer Science",
              document_url: ["http://example.com/path/to/front_page.pdf"],
              joining_year: "2005",
              completion_year: "2008",
              cgpa_or_percentage: "78%",
              university_or_college: "Springfield University",
            },
            is_deleted: false,
            created_by: "f8d860f0-c093-4d88-808c-75a23779a105",
            updated_by: "f8d860f0-c093-4d88-808c-75a23779a105",
            deleted_by: null,
            created_at: "2024-09-10T11:39:28.141Z",
            updated_at: "2024-09-10T11:39:28.141Z",
            deleted_at: null,
          },
          {
            id: "612aa8c0-3930-4faa-9dd8-452a15bfc821",
            employee_id: "285447cc-2ca7-4539-9f25-8e2108d4c976",
            document_type: "signature",
            document_details: {
              name: "John Doe",
              document_url: ["http://example.com/path/to/front_page.pdf"],
            },
            is_deleted: false,
            created_by: "f8d860f0-c093-4d88-808c-75a23779a105",
            updated_by: "f8d860f0-c093-4d88-808c-75a23779a105",
            deleted_by: null,
            created_at: "2024-09-10T11:39:28.141Z",
            updated_at: "2024-09-10T11:39:28.141Z",
            deleted_at: null,
          },
        ],
      },
    },
    { status: 201 }
  );
}
