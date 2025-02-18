import { Stack } from "@mui/material";
import { Button } from "@repo/shared-components";
import type { Meta as MetaTypes, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import type { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof Button> & {
  variant: string;
  size: "small" | "medium" | "large";
};

const meta: MetaTypes<StoryProps> = {
  title: "shared-component/Button/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    children: { control: "text" },
    variant: {
      options: ["outlined", "contained"],
      control: {
        type: "select",
      },
    },
    size: {
      options: ["small", "medium", "large"],
      control: {
        type: "select",
      },
    },
    sx: { control: "object" },
    color: {
      options: ["primary", "secondary"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    onClick: fn(),
    children: "Button",
    size: "medium",
  },
  render: (args) => (
    <Stack direction="row" gap="10px">
      <Button {...args} size="large">
        Large
      </Button>
      <Button {...args} size="medium">
        Medium (Default)
      </Button>
      <Button {...args} size="small">
        Small
      </Button>
    </Stack>
  ),
};

// eslint-disable-next-line import/no-default-export
export default meta;

type Story = StoryObj<typeof meta>;

export const Disabled: Story = {
  args: {
    disabled: true,
    variant: "contained",
  },
};

export const Contained: Story = {
  args: {
    variant: "contained",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Primary: Story = {
  args: {
    color: "primary",
  },
};
export const Secondary: Story = {
  args: {
    color: "secondary",
  },
};
