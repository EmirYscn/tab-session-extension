import React from "react";
import styled from "styled-components";

const typeStyles: Record<ButtonTypes, string> = {
  icon: "padding: 0.5em;",
  action:
    "padding: 1em 2em; background: #fff; color: #000000; box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;",
  delete: "color: #ea2907;",
};

const StyledButton = styled.button<{ $buttonType?: ButtonTypes }>`
  padding: 0.5em 1em;
  border: none;
  border-radius: 6px;
  background: none;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${(props) => props.$buttonType && typeStyles[props.$buttonType]}
`;

type ButtonTypes = "icon" | "action" | "delete";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  buttonType?: ButtonTypes;
};

function Button({ children, onClick, buttonType = "icon" }: ButtonProps) {
  return (
    <StyledButton onClick={onClick} $buttonType={buttonType}>
      {children}
    </StyledButton>
  );
}

export default Button;
