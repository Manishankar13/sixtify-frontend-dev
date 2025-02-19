import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      message: "Income tax regime retrieved successfully.",
      data: {
        id: "adffd434-b7c5-4f37-b359-abf1f5342cd6",
        financial_year: {
          start_date: "2042-04-01",
          end_date: "2043-03-31",
        },
        regime_type: "old",
        health_education_cess_rate: 5,
        tax_slabs: {
          standard: [
            {
              id: "2a900974-f36d-4ebd-b5db-32a4d2004d47",
              start_range: 700000,
              end_range: 1400000,
              tax_rate: 10,
              surcharge_rate: 3,
            },
          ],
          senior: [
            {
              id: "50ddef75-04cc-4c96-ac53-a59e71fe6b05",
              start_range: 700000,
              end_range: 1400000,
              tax_rate: 10,
              surcharge_rate: 3,
            },
          ],
          super_senior: [
            {
              id: "4d30e0d9-3a4f-4b74-b2d2-47bc6f5cfb0b",
              start_range: 700000,
              end_range: 1400000,
              tax_rate: 10,
              surcharge_rate: 3,
            },
          ],
        },
      },
    },
    { status: 200 }
  );
}
