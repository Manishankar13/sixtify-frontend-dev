import { Delete as DeleteIcon } from "@mui/icons-material";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { Chip } from "@repo/shared-components";
import type { Meta as MetaTypes, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import type { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof Chip> & {
  variant: string;
  size: "small" | "medium";
};

const meta: MetaTypes<StoryProps> = {
  title: "shared-component/Chips/Chip",
  component: Chip,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    children: { control: "text" },
    variant: {
      options: ["outlined", "filled"],
      control: {
        type: "select",
      },
    },
    size: {
      options: ["small", "medium"],
      control: {
        type: "select",
      },
    },
    sx: { control: "object" },
    color: {
      options: ["secondary", "info", "success", "warning", "error", "primary"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    onClick: fn(),
    size: "medium",
    variant: "filled",
  },
  render: (args) => (
    <Stack alignItems="center" direction="row" gap="50px">
      <Stack gap="33px">
        <Typography fontWeight="bold">Color</Typography>
        <Typography>secondary</Typography>
        <Typography>info</Typography>
        <Typography>success</Typography>
        <Typography>warning</Typography>
        <Typography>error</Typography>
        <Typography>primary</Typography>
      </Stack>
      <Stack gap="25px">
        <Typography fontWeight="bold">Medium [Default]</Typography>
        <Box>
          <Chip color="secondary" label="Secondary" {...args} />
        </Box>
        <Box>
          <Chip color="info" label="Info" {...args} />
        </Box>
        <Box>
          <Chip color="success" label="Success" {...args} />
        </Box>
        <Box>
          <Chip color="warning" label="Warning" {...args} />
        </Box>
        <Box>
          <Chip color="error" label="Error" {...args} />
        </Box>
        <Box>
          <Chip color="primary" label="Primary" {...args} />
        </Box>
      </Stack>
      <Stack gap="33px">
        <Typography fontWeight="bold">small</Typography>
        <Box>
          <Chip
            variant="filled"
            label="Secondary"
            size="small"
            color="secondary"
          />
        </Box>
        <Box>
          <Chip variant="filled" label="Info" size="small" color="info" />
        </Box>
        <Box>
          <Chip variant="filled" label="Success" size="small" color="success" />
        </Box>
        <Box>
          <Chip variant="filled" label="Warning" size="small" color="warning" />
        </Box>
        <Box>
          <Chip variant="filled" label="Error" size="small" color="error" />
        </Box>
        <Box>
          <Chip variant="filled" label="Primary" size="small" color="primary" />
        </Box>
      </Stack>
    </Stack>
  ),
};

// eslint-disable-next-line import/no-default-export
export default meta;

type Story = StoryObj<typeof meta>;

export const Disabled: Story = {
  args: {
    disabled: true,
    variant: "filled",
  },
};

export const Contained: Story = {
  args: {
    variant: "filled",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
  },
};
export const WithDeleteIcon: Story = {
  args: {
    deleteIcon: <DeleteIcon sx={{ color: "white" }} />,
    onDelete: fn(),
  },
};

export const WithAvatar: Story = {
  args: {
    avatar: <Avatar alt="User Avatar" src="" />,
  },
};
