import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      message: "Income tax regime options retrieved successfully.",
      data: [
        {
          value: "801ef753-c07b-4530-bec9-4c006c9763d3",
          label: {
            start_date: "2024-04-01",
            end_date: "2025-03-31",
          },
        },
        {
          value: "adffd434-b7c5-4f37-b359-abf1f5342cd6",
          label: {
            start_date: "2042-04-01",
            end_date: "2043-03-31",
          },
        },
      ],
    },
    { status: 200 }
  );
}
