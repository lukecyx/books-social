import { ReactElement } from "react";

import { StyledButton } from "./Button.styled";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText: string;
}

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
