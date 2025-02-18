export function useGetEmergencyRelationshipOptions() {
  const emergencyRelationOption = [
    { label: "Brother", value: "brother" },
    { label: "Daughter", value: "daughter" },
    { label: "Father", value: "father" },
    { label: "Mother", value: "mother" },
    { label: "Husband", value: "husband" },
    { label: "Sister", value: "sister" },
    { label: "Son", value: "son" },
    { label: "Wife", value: "wife" },
  ];

  return { emergencyRelationOption };
}
