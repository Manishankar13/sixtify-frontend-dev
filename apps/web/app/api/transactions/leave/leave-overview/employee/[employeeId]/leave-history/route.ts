import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      message: "Leave History listed successfully.",
      data: {
        totalCount: 5,
        leaveHistoryList: [
          {
            id: "30b71c81-8532-46a1-9780-e0dbf3008ddc",
            leave_date: "16 Aug  - 18 Aug , 2022",
            leave_days: "3 Days",
            leave_type: "Unpaid",
            leave_name: "Sick leave",
            request_by: "Demo Demo",
            request_at: "2024-11-27T11:37:13.682Z",
            leave_remark: "On leave due to illness—resting and recovering.",
            status: "Rejected",
            action_by: "Chirag Sodnagar",
            action_at: "2024-11-28T11:37:13.682Z",
            remark: "Workload",
          },
          {
            id: "30b71c81-8532-46a1-9780-e0dbf3008dd2",
            leave_date: "10 Aug  - 12 Aug , 2022",
            leave_days: "2 Days",
            leave_type: "Paid",
            leave_name: "Paid leave",
            request_by: "Demo Demo",
            request_at: "2024-11-09T11:37:13.682Z",
            leave_remark: "Going out of station",
            status: "Approved",
            action_by: "Demo Demo",
            action_at: "2024-11-10T11:37:13.682Z",
            remark: "Approved",
          },
          {
            id: "30b71c81-8532-46a1-9783-e0abf3008dd2",
            leave_date: "10 Aug  - 12 Aug , 2022",
            leave_days: "2 Days",
            leave_type: "Paid",
            leave_name: "Paid leave",
            request_by: "Demo Demo",
            request_at: "2024-11-09T11:37:13.682Z",
            leave_remark: "Going out of station",
            status: "Cancelled",
            action_by: "Demo Demo",
            action_at: "2024-11-10T11:37:13.682Z",
            remark: null,
          },
          {
            id: "30b71c81-8532-46a1-9780-e0dbf3008dr2",
            leave_date: "10 Aug  - 12 Aug , 2022",
            leave_days: "2 Days",
            leave_type: "Paid",
            leave_name: "Sick leave",
            request_by: "Demo Demo",
            request_at: "2024-11-09T11:37:13.682Z",
            leave_remark: "On leave due to illness—resting and recovering.",
            status: "Rejected",
            action_by: "Demo Demo",
            action_at: "2024-11-10T11:37:13.682Z",
            remark: "Rejected",
          },
          {
            id: "30b71c81-8532-46a1-9780-e0dbf3078dd2",
            leave_date: "10 Aug  - 12 Aug , 2022",
            leave_days: "2 Days",
            leave_type: "Paid",
            leave_name: "Sick leave",
            request_by: "Demo Demo",
            request_at: "2024-11-09T11:37:13.682Z",
            leave_remark: "On leave due to illness—resting and recovering.",
            status: "Approved",
            action_by: "Demo Demo",
            action_at: "2024-11-10T11:37:13.682Z",
            remark: "Approved",
          },
        ],
      },
    },
    { status: 200 }
  );
}
