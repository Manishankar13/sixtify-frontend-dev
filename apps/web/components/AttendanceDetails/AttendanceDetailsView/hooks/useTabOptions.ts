import { useRouter, useSearchParams } from "next/navigation";

export type TabsItems = {
  value: string;
  title: string;
  onClick: () => void;
};

export const viewOptions = {
  list_view: "List View",
  calendar_view: "Calendar View",
  overtime_request: "Overtime Request",
};

export type OptionKey = keyof typeof viewOptions;

export type UseTabOptionsArgs = {
  employeeId: string;
};

export const useTabOptions = ({ employeeId }: UseTabOptionsArgs) => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const type = searchParams.get("type");

  const employeeAttendanceTab = searchParams.get("tab");

  const listViewPath = employeeAttendanceTab
    ? `/employee-management/employee/${employeeId}?tab=attendance&type=${type}&view=list_view`
    : `/transactions/attendance/attendance-overview/attendance-details/employee/${employeeId}?type=${type}&view=list_view`;

  const calendarViewPath = employeeAttendanceTab
    ? `/employee-management/employee/${employeeId}?tab=attendance&type=${type}&view=calendar_view`
    : `/transactions/attendance/attendance-overview/attendance-details/employee/${employeeId}?type=${type}&view=calendar_view`;

  const overtimeRequestPath = employeeAttendanceTab
    ? `/employee-management/employee/${employeeId}?tab=attendance&type=${type}&view=overtime_request`
    : `/transactions/attendance/attendance-overview/attendance-details/employee/${employeeId}?type=${type}&view=overtime_request`;

  const menuItems: TabsItems[] = [
    {
      value: "list_view",
      title: viewOptions.list_view,
      onClick: () => router.push(listViewPath),
    },
    {
      value: "calendar_view",
      title: viewOptions.calendar_view,
      onClick: () => router.push(calendarViewPath),
    },
    {
      value: "overtime_request",
      title: viewOptions.overtime_request,
      onClick: () => router.push(overtimeRequestPath),
    },
  ];

  return { menuItems };
};
