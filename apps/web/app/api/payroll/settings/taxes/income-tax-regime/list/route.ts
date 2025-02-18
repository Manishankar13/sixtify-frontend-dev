import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      message: "Income tax regimes listed successfully.",
      data: {
        totalCount: 2,
        incomeTaxRegimes: [
          {
            id: "adffd434-b7c5-4f37-b359-abf1f5342cd6",
            financial_year: {
              start_date: "2042-04-01",
              end_date: "2043-03-31",
            },
            regime_type: "old",
            action_by: "Demo Demo",
            action_at: "2025-02-01T10:25:16.278Z",
            full_count: "2",
          },
          {
            id: "801ef753-c07b-4530-bec9-4c006c9763d3",
            financial_year: {
              start_date: "2024-04-01",
              end_date: "2025-03-31",
            },
            regime_type: "new",
            action_by: "Demo Demo",
            action_at: "2025-02-01T05:39:33.701Z",
            full_count: "2",
          },
        ],
      },
    },
    { status: 200 }
  );
}
