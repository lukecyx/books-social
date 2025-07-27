import styled, { css } from "styled-components";

export const StyledButton = styled.button(
  ({ theme }) => css`
    background-color: ${theme.colors.primary};
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: black;
    }
  `,
);
