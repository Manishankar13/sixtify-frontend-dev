import { useTheme } from "@mui/material";
import { PieChart } from "@repo/shared-components";
import { Meta, StoryObj } from "@storybook/react";
const meta: Meta<typeof PieChart> = {
  title: "shared-component/Charts/PieChart",
  component: PieChart,
  tags: ["autodocs"],
  argTypes: {
    height: {
      description: "Height of the PieChart",
      control: {
        type: "number",
      },
      defaultValue: 235,
    },
    width: {
      description: "Width of the PieChart",
      control: {
        type: "number",
      },
      defaultValue: 235,
    },
    skipAnimation: {
      description: "Disables animation if true",
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
    tooltip: {
      description: "Tooltip behavior ('item', 'axis', 'none')",
      control: {
        type: "select",
        options: ["item", "axis", "none"],
      },
      defaultValue: "item",
      mapping: {
        item: { trigger: "item" },
        axis: { trigger: "axis" },
        none: { trigger: "none" },
      },
    },
    label: {
      description: "Center label text",
      control: {
        type: "text",
      },
      defaultValue: "Center",
    },
    series: {
      description: "Pie chart series configuration",
      control: {
        type: "object",
      },
      defaultValue: {
        type: "pie",
        data: [
          { label: "A", value: 40 },
          { label: "B", value: 30 },
          { label: "C", value: 20 },
          { label: "D", value: 10 },
        ],
        innerRadius: 0,
        outerRadius: 100,
        startAngle: 0,
        endAngle: 360,
        paddingAngle: 0,
        arcLabel: "label",
        arcLabelMinAngle: 0,
        cx: "50%",
        cy: "50%",
        highlightScope: { fade: "global", highlight: "item" },
        faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof PieChart>;

export const DefaultPieChart: Story = {
  args: {
    series: {
      type: "pie",
      data: [
        { label: "A", value: 40 },
        { label: "B", value: 30 },
        { label: "C", value: 20 },
        { label: "D", value: 10 },
      ],
    },
  },
};

export const CustomSize: Story = {
  args: {
    height: 300,
    width: 300,
    series: {
      type: "pie",
      data: [
        { label: "A", value: 40 },
        { label: "B", value: 30 },
        { label: "C", value: 20 },
        { label: "D", value: 10 },
      ],
    },
  },
};

export const NoAnimation: Story = {
  args: {
    skipAnimation: true,
    series: {
      type: "pie",
      data: [
        { label: "A", value: 40 },
        { label: "B", value: 30 },
        { label: "C", value: 20 },
        { label: "D", value: 10 },
      ],
    },
  },
};

export const CustomRadii: Story = {
  args: {
    series: {
      type: "pie",
      data: [
        { label: "A", value: 40 },
        { label: "B", value: 30 },
        { label: "C", value: 20 },
        { label: "D", value: 10 },
      ],
      innerRadius: 90,
      outerRadius: "90%",
      cornerRadius: 0,
    },
  },
};

export const NoTooltip: Story = {
  args: {
    tooltip: { trigger: "none" },
    series: {
      type: "pie",
      data: [
        { label: "A", value: 40 },
        { label: "B", value: 30 },
        { label: "C", value: 20 },
        { label: "D", value: 10 },
      ],
    },
  },
};

export const CustomAngles: Story = {
  args: {
    series: {
      type: "pie",
      data: [
        {
          value: 50,
          color: "#F39C12",
          id: "A",
          label: "A",
        },
        {
          value: 50,
          color: "#2980B9",
          id: "B",
          label: "B",
        },
      ],
      startAngle: 45,
      endAngle: 270,
    },
  },
};

export const CustomArcLabel: Story = {
  args: {
    series: {
      type: "pie",
      data: [
        {
          value: 60,
          color: "#1ABC9C",
          id: "A",
          label: "A",
        },
        {
          value: 40,
          color: "#E74C3C",
          id: "B",
          label: "B",
        },
      ],
      arcLabel: (item) => `${item.label}: ${item.value}%`,
    },
  },
};

export const HighlightedSeries: Story = {
  args: {
    series: {
      type: "pie",
      data: [
        {
          value: 50,
          color: "#F39C12",
          id: "A",
          label: "A",
        },
        {
          value: 50,
          color: "#2980B9",
          id: "B",
          label: "B",
        },
      ],
      highlightScope: { fade: "global", highlight: "item" },
    },
  },
};

export const FadedSeries: Story = {
  args: {
    series: {
      type: "pie",
      data: [
        { label: "A", value: 70, color: "#1ABC9C" },
        { label: "B", value: 30, color: "#E74C3C" },
      ],
      faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
    },
  },
};

export const MixedSeries: Story = {
  args: {
    series: {
      type: "pie",
      data: [
        {
          value: 50,
          color: "#F39C12",
          id: "A",
          label: "A",
        },
        {
          value: 50,
          color: "#2980B9",
          id: "B",
          label: "B",
        },
      ],
      highlightScope: { fade: "global", highlight: "item" },
      faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
    },
  },
};
