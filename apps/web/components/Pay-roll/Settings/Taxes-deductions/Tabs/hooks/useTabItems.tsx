import { useRouter } from "next/navigation";

export const categories = {
  "income-tax-regime": "Income Tax Regime",
  "pt-group": "PT Group",
  "investment-deduction": "Investment Deduction",
};

export type Categories = typeof categories;

export type CategoryKeys = keyof typeof categories;

export type CategoryItem = {
  value: CategoryKeys;
  title: string;
  onClick: () => void;
};

export const useTabItems = () => {
  const router = useRouter();

  const categoryItems: CategoryItem[] = [
    {
      value: "income-tax-regime",
      title: categories["income-tax-regime"],
      onClick: () =>
        router.push(
          "/pay-roll/settings/taxes-deductions?tab=income-tax-regime"
        ),
    },
    {
      value: "pt-group",
      title: categories["pt-group"],
      onClick: () =>
        router.push("/pay-roll/settings/taxes-deductions?tab=pt-group"),
    },
    {
      value: "investment-deduction",
      title: categories["investment-deduction"],
      onClick: () =>
        router.push(
          "/pay-roll/settings/taxes-deductions?tab=investment-deduction"
        ),
    },
  ];

  return { categoryItems };
};
