import { createGlobalStyle, css } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: "Windows95";
    src:
      url("/fonts/w95fa.woff2") format("woff2"),
      url("/fonts/w95fa.woff") format("woff");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    ${({ theme }) => css`
      font-family: ${theme.typography.fontFamily};
      font-size: ${theme.typography.fontSize};
      background-color: ${theme.colors.background};
      color: ${theme.colors.text};
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
      height: 100%;
      border: 2px solid red;
    `}
  }

  button, input, select, textarea {
    ${({ theme }) => css`
      font-family: ${theme.typography.fontFamily};
      font-size: ${theme.typography.fontSize};
    `}
  }

`;
