import { ReactElement } from "react";

import { StyledButton } from "./Button.styled";
import { ButtonProps } from "./types";

export function Button({
  buttonText,
  ...defaultBtnProps
}: ButtonProps): ReactElement {
  return (
    <div>
      <StyledButton {...defaultBtnProps}>{buttonText}</StyledButton>
    </div>
  );
}
