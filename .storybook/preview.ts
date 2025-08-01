import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { ThemeProvider } from "styled-components";

import { baseTheme, GlobalStyles } from "../src/styles";

import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },

  decorators: [
    withThemeFromJSXProvider({
      themes: {
        baseTheme,
      },
      defaultTheme: "baseTheme",
      Provider: ThemeProvider,
      GlobalStyles,
    }),
  ],
};

export default preview;
