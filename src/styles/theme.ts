import { pxToRem } from "@/utils/theme";

export const baseTheme = {
  colors: {
    background: "#C0C0C0",
    surface: "#FFFFFF",
    borderLight: "#FFFFFF",
    borderDark: "#808080",
    borderOuter: "#000000",
    borderHighlight: "#DFDFDF",

    primary: "#000080",
    primaryLight: "#1084d0",
    text: "#000000",
    textInverted: "#FFFFFF",

    disabled: "#A0A0A0",
  },

  typography: {
    fontFamily: `"Windows95", "Tahoma", "Arial", "sans-serif"`,
    fontSize: pxToRem(14),
  },

  spacing: {
    xs: pxToRem(4), // 0.25rem (4px)
    sm: pxToRem(8), // 0.5rem (8px)
    md: pxToRem(12), // 0.75rem (12px)
    lg: pxToRem(16), // 1rem (16px)
    xl: pxToRem(24), // 1.5rem (24px)
    xxl: pxToRem(32), // 2rem (32px)
  },

  border: {
    width: pxToRem(2),
    style: "solid",
    radius: "0", // Windows 95 style
  },

  shadows: {
    inset: `inset ${pxToRem(1)} ${pxToRem(1)} #fff, inset -${pxToRem(1)} -${pxToRem(1)} #808080`,
    outset: `${pxToRem(1)} ${pxToRem(1)} #808080, -${pxToRem(1)} -${pxToRem(1)} #fff`,
  },

  button: {
    padding: `${pxToRem(4)} ${pxToRem(12)}`,
    height: pxToRem(28),
    activeInset: `inset ${pxToRem(2)} ${pxToRem(2)} #000000`,
    focusOutline: `1px dotted #000000`,
  },
};

export type ThemeType = typeof baseTheme;
