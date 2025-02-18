import type { Preview } from "@storybook/react";
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { Theme, appTheme } from "@repo/shared-components";
import "../public/globals.css";

const createdAppTheme = createTheme(appTheme(Theme.light));

export const decorators = [
  (Story) => (
    <ThemeProvider theme={createdAppTheme}>
      <Story />
    </ThemeProvider>
  ),
];
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
