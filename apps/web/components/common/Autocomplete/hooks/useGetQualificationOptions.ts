export function useGeQualificationOption() {
  const qualificationOption = [
    { label: "SSC", value: "ssc" },
    { label: "HSC", value: "hsc" },
    { label: "Diploma", value: "diploma" },
    { label: "Bachelor Degree", value: "bachelors_degree" },
    { label: "Master Degree", value: "masters_degree" },
    { label: "ITI", value: "iti" },
    { label: "B.Ed", value: "bed" },
    { label: "M.Ed", value: "med" },
  ];

  return { qualificationOption };
}

import {
  BACHELORS_DEGREE,
  BED,
  DIPLOMA,
  HSC,
  ITI,
  MASTERS_DEGREE,
  MED,
  SSC,
} from "./constant";

export const QualificationOptions = {
  [SSC]: "SSC",
  [HSC]: "HSC",
  [DIPLOMA]: "Diploma",
  [BACHELORS_DEGREE]: "Bachelor Degree",
  [MASTERS_DEGREE]: "Master Degree",
  [ITI]: "ITI",
  [BED]: "B.Ed",
  [MED]: "M.Ed",
};

export type QualificationOptionsKey = keyof typeof QualificationOptions;
