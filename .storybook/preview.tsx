import { withThemeFromJSXProvider } from "@storybook/addon-themes";

import { GlobalStyles } from "../src/styles";

export const decorators = [
  withThemeFromJSXProvider({
    GlobalStyles,
  }),
];
