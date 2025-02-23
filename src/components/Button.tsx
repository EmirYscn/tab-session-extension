import React from "react";
import styled from "styled-components";

import { useOptions } from "../contexts/options/optionsContextProvider";

const typeStyles: Record<ButtonTypes, string> = {
  icon: "padding: 0.5em;",
  action:
    "padding: 1em 2em; background: #76ABAE; color: #000000; text-align: center; box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; font-weight: 700;",
  delete: `
    padding: 0.5em;
    &:hover {
      color: #ea2907;
    }
  `,
  tab: "padding: 0.3em;",
  open: `
    padding: 0.5em;
    &:hover {
      color: #89A8B2;
    }
  `,
};

const StyledButton = styled.button<{
  $buttonType?: ButtonTypes;
  $isDark?: boolean;
}>`
  padding: 0.5em 1em;
  border: none;
  border-radius: 6px;
  background: none;
  transition: all 0.15s ease-in-out;
  transform-origin: center;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:active {
    border: none;
    outline: none;
    transform: scale(0.96);
    box-shadow: rgba(50, 50, 93, 0.15) 0px 3px 6px -2px,
      rgba(0, 0, 0, 0.2) 0px 2px 4px -3px;
  }

  &:focus {
    outline: none;
  }

  & svg {
    color: ${(props) => props.$isDark && props.theme.colors.darkmode[400]};
    height: 1.05rem;
    width: auto;
  }

  ${(props) => props.$buttonType && typeStyles[props.$buttonType]}
`;

type ButtonTypes = "icon" | "action" | "delete" | "tab" | "open";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonType?: ButtonTypes;
};

function Button({ children, onClick, buttonType = "icon" }: ButtonProps) {
  const { options } = useOptions();
  return (
    <StyledButton
      onClick={onClick}
      $buttonType={buttonType}
      $isDark={options.isDark}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
