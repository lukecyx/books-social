import React from "react";

import { ThemeProvider } from "styled-components";

import { baseTheme, GlobalStyles } from "../src/styles";

import type { Preview } from "@storybook/react-vite";

console.log("preview.tsx");
const preview: Preview = {
  decorators: [
    (Story) => {
      return (
        <ThemeProvider theme={baseTheme}>
          <GlobalStyles />
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
