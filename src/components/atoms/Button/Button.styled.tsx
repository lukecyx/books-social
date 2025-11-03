"use client";

import styled, { css } from "styled-components";

import { pxToRem } from "@/utils/theme";

export const StyledButton = styled.button(
  ({ theme }) => css`
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    padding: ${pxToRem(8)} ${pxToRem(32)};
    height: auto;
    width: auto;
    border: 1px solid yellow;
    cursor: pointer;
    text-transform: capitalize;

    border-left: ${pxToRem(2)} solid black;
    border-top: ${pxToRem(2)} solid black;
    border-right: ${pxToRem(4)} solid black;
    border-bottom: ${pxToRem(4)} solid black;

    &:active {
      border-left: ${pxToRem(4)} solid black;
      border-top: ${pxToRem(4)} solid black;
      border-right: ${pxToRem(2)} solid white;
      border-bottom: ${pxToRem(2)} solid white;
    }
  `,
);
