"use client";

import { ThemeProvider } from "styled-components";

import { GlobalStyles } from "@/styles/GlobalStyles";
import { baseTheme } from "@/styles/theme";

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={baseTheme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};
