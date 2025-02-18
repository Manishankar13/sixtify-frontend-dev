import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      message: "Bank shift type listed successfully.",
      data: {
        totalCount: 1,
        bankShiftTypes: [
          {
            id: "519a86a2-5f45-4b51-b615-828e669a82a4",
            company_id: "160c179d-b6fe-42c3-8e85-cc77915b3624",
            bank_shift_type_name: "Accounting - Flex Week Shift",
            bank_shift_type_code: "ACC_FLX",
            shift_start: "07:29:00+00",
            shift_end: "16:30:00+00",
            shift_hours: "09:00:00",
            company_name: "Cmcreation Pvt Ltd",
            action_by: "Demo Demo",
            action_at: "2024-09-24T11:55:18.421Z",
            full_count: "1",
          },
        ],
      },
    },
    { status: 200 }
  );
}
