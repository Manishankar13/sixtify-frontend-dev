"use client";

import { Stack } from "@mui/material";
import { ListItemButton } from "@repo/shared-components";
import { useSearchParams } from "next/navigation";
import { useCategoryItems } from "./hooks/useCategoryItems";

type MasterCategoryListProps = Readonly<{
  searchText: string;
}>;

export function CategoryList({ searchText }: MasterCategoryListProps) {
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab");

  const { categoryItems } = useCategoryItems();

  const filterCategoryItems = categoryItems.filter((item) =>
    searchText
      ? item.key?.toLowerCase().includes(searchText.toLowerCase())
      : true
  );

  return (
    <Stack gap="10px">
      {filterCategoryItems?.map(({ key, title, onClick }) => {
        return (
          <ListItemButton
            key={key}
            label={title}
            selected={key === tab}
            onClick={onClick}
          />
        );
      })}
    </Stack>
  );
}
