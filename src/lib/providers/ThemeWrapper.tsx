"use client";

import { ThemeProvider } from "styled-components";

import { baseTheme, GlobalStyles } from "@/styles";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={baseTheme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}
