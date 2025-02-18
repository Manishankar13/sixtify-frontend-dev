import { Box, Typography } from "@mui/material";
import { FormRow } from "@repo/shared-components";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof FormRow> = {
  title: "shared-component/Layouts/FormRow",
  component: FormRow,
  tags: ["autodocs"],
  argTypes: {
    maxColumn: {
      options: [1, 2, 3],
      control: {
        type: "select",
      },
    },
  },
  render: (args) => {
    const childrenArray = Array.from({ length: args.maxColumn || 1 });

    return (
      <FormRow {...args}>
        {childrenArray.map((_, index) => (
          <Box
            sx={{ height: "50px", backgroundColor: "lightblue" }}
            key={index}
          >
            <Typography variant="caption">Item {index + 1}</Typography>
          </Box>
        ))}
      </FormRow>
    );
  },
};

export default meta;

type Story = StoryObj<typeof FormRow>;

export const DefaultFormRow: Story = {};

export const FullWidthFormRow: Story = {
  args: {
    fullWidth: true,
  },
};
