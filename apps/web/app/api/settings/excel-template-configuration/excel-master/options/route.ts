import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      message: "Excel Master options retrieved successfully.",
      data: [
        {
          value: "4923521e-62c8-49c0-95bb-c0448e6d9e54",
          label: "Add Employees",
        },
        {
          value: "93608899-5223-4e82-aa97-a216c61c10b3",
          label: "Emergency Contact Details",
        },
        {
          value: "48affb65-4df8-4966-83ae-e10867a05137",
          label: "Family Details",
        },
        {
          value: "113336a8-db66-439e-a3bd-ffad7b70c5e4",
          label: "Employee Bank Details",
        },
        {
          value: "91fd4bc8-17ea-4af0-996f-2f2d7f9dff0b",
          label: "Education Details",
        },
        {
          value: "f44f6608-9645-4102-b909-325411f5812b",
          label: "Present Address",
        },
        {
          value: "53e7f229-e9fe-4ff9-ba0b-f313d1547b4b",
          label: "Permenent Address",
        },
      ],
    },
    { status: 200 }
  );
}
