import { Stack, Typography } from "@mui/material";
import { PadBox } from "@repo/shared-components";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof PadBox> = {
  title: "shared-component/PadBox",
  component: PadBox,
  tags: ["autodocs"],
  render: (args) => {
    return (
      <PadBox {...args}>
        <Stack
          justifyContent="center"
          alignItems={"center"}
          sx={{ width: "100%", height: "50px", backgroundColor: "lightblue" }}
        >
          <Typography variant="caption">Content inside PadBox</Typography>
        </Stack>
      </PadBox>
    );
  },
};

export default meta;

type Story = StoryObj<typeof PadBox>;

export const DefaultPadBox: Story = {
  args: {
    padding: { padding: "20px" },
  },
};

export const NoPaddingPadBox: Story = {
  args: {
    padding: { padding: "0px" },
  },
};

export const CustomPaddingPadBox: Story = {
  args: {
    padding: {
      paddingTop: "50px",
      paddingBottom: "30px",
      paddingLeft: "10px",
      paddingRight: "10px",
    },
  },
};
