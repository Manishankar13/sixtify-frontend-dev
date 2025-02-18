import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      message: "Grade added successfully.",
      data: {
        id: "6cff5602-437e-4183-8b4f-b297c7910ac1",
        company_id: "e8036f4a-fa62-48a8-94c1-f6c01bd33a1b",
        grade_name: "Senior Manager Officer1",
        grade_code: "AD1",
        description: "Senior Manager Officer",
        is_active: true,
        is_deleted: false,
        created_by: "f63571db-bbce-4b7e-a4e1-ef804caae7bb",
        updated_by: "f63571db-bbce-4b7e-a4e1-ef804caae7bb",
        deleted_by: null,
        created_at: "2024-07-16T10:05:22.489Z",
        updated_at: "2024-07-16T10:05:22.489Z",
        deleted_at: null,
      },
    },
    { status: 201 }
  );
}
