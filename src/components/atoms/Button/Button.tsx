import { ReactElement } from "react";
import { StyledButton } from "./Button.styled";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText: string;
}

// const Button: React.FC<ButtonProps> = ({ label, ...props }) => {
//   return <StyledButton {...props}>{label}</StyledButton>;
// };
//

// export type ButtonProps = {
//   onClick: () => void;
// };

export function Button({
  buttonText,
  ...defaultBtnProps
}: ButtonProps): ReactElement {
  return <StyledButton {...defaultBtnProps}>{buttonText}</StyledButton>;
}

// export default Button;
