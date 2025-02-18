import FolderIcon from "@mui/icons-material/Folder";
import HomeIcon from "@mui/icons-material/Home";
import { Breadcrumbs } from "@repo/shared-components";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

type StoryProps = React.ComponentProps<typeof Breadcrumbs>;

const meta: Meta<StoryProps> = {
  title: "shared-component/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const TextOnly: Story = {
  args: {
    items: [
      { text: "Home", onClick: fn() },
      { text: "Products", onClick: fn() },
      { text: "Categories" },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { icon: <HomeIcon />, text: "Home", onClick: fn() },
      { icon: <FolderIcon />, text: "Documents", onClick: fn() },
      { text: "Details" },
    ],
  },
};
