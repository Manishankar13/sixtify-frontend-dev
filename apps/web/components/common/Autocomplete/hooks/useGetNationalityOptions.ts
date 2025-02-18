export function useGetNationalityOption() {
  const nationalityOption = [
    { label: "Indian Resident", value: "indian" },
    { label: "Non Indian Resident", value: "others" },
  ];

  return { nationalityOption };
}
