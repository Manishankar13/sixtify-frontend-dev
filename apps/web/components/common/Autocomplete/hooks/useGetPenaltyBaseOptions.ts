export function useGetPenaltyBaseOptions() {
  const penaltyBaseOptions = [
    { label: "Based on number of instances", value: "instance" },
    { label: "Based On Late Arrival Hours", value: "hour" },
  ];

  return { penaltyBaseOptions };
}
