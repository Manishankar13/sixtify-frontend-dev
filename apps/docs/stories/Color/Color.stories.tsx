import { colorPaletteUI } from "@repo/shared-components";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof colorPaletteUI> = {
  title: "shared-component/Color",
  component: colorPaletteUI,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof colorPaletteUI>;

export const DefaultColorPaletteUI: Story = {};
