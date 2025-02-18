import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import { ButtonGroup as MuiButtonGroup, Stack } from "@mui/material";
import { Button, ButtonGroup } from "@repo/shared-components";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

type StoryProps = React.ComponentProps<typeof ButtonGroup>;

const meta: Meta<StoryProps> = {
  title: "shared-component/Button/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const DefaultButtonGroup: Story = {
  args: {
    renderButtons: [
      { icon: <HomeIcon />, value: "home", label: "Home", selected: true },
      {
        icon: <FavoriteIcon />,
        value: "favorites",
        label: "Favorites",
        selected: false,
      },
      {
        icon: <SettingsIcon />,
        value: "settings",
        label: "Settings",
        selected: false,
      },
    ],
    onSelect: fn(),
  },
};

export const NoSelectedButton: Story = {
  args: {
    renderButtons: [
      { icon: <HomeIcon />, value: "home", label: "Home", selected: false },
      {
        icon: <FavoriteIcon />,
        value: "favorites",
        label: "Favorites",
        selected: false,
      },
      {
        icon: <SettingsIcon />,
        value: "settings",
        label: "Settings",
        selected: false,
      },
    ],
    onSelect: fn(),
  },
};

export const DisabledButtons: Story = {
  args: {
    renderButtons: [
      { icon: <HomeIcon />, value: "home", label: "Home", selected: false },
      {
        icon: <FavoriteIcon />,
        value: "favorites",
        label: "Favorites",
        selected: false,
      },
      {
        icon: <SettingsIcon />,
        value: "settings",
        label: "Settings",
        selected: false,
      },
    ],
    onSelect: fn(),
  },
  decorators: [
    () => (
      <Stack direction="row" gap="10px">
        <MuiButtonGroup aria-label="Disabled button group">
          <Button variant="outlined" disabled>
            Home
          </Button>
          <Button variant="outlined" disabled>
            Favorites
          </Button>
          <Button variant="outlined" disabled>
            Settings
          </Button>
        </MuiButtonGroup>
      </Stack>
    ),
  ],
};
