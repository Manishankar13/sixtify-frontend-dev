import { NEW, OLD } from "./constant";

const taxRegimeTypes = {
  [OLD]: "Old Tax Redime",
  [NEW]: "New Tax Redime",
};

export type TaxRegime = keyof typeof taxRegimeTypes;

export function useGetTaxRegimeOptions() {
  const taxRegimeOption = [
    { label: taxRegimeTypes[OLD], value: OLD },
    { label: taxRegimeTypes[NEW], value: NEW },
  ];

  return { taxRegimeOption };
}
