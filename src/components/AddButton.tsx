import styled from "styled-components";

import { useOptions } from "../contexts/options/optionsContextProvider";

const StyledButton = styled.button<{ $isDark?: boolean }>`
  align-items: center;
  background-color: ${(props) => props.theme.colors.darkmode[300]};
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #7da0a2 0 -3px 0 inset;
  box-sizing: border-box;
  color: ${(props) => props.theme.colors.darkmode[100]};
  cursor: pointer;
  display: inline-flex;
  font-weight: bold;
  justify-content: center;

  padding-left: 16px;
  padding-right: 16px;
  padding: 1rem;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow 0.15s, transform 0.15s;
  font-size: 18px;

  &:focus {
    box-shadow: #7da0a2 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px,
      rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #7da0a2 0 -3px 0 inset;
    outline: none;
  }

  &:hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px,
      rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #7da0a2 0 -3px 0 inset;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: #7da0a2 0 3px 7px inset;
    transform: translateY(2px);
    outline: none;
  }
`;

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function AddButton({ children, onClick }: ButtonProps) {
  const { options } = useOptions();
  return (
    <StyledButton onClick={onClick} $isDark={options.isDark}>
      {children}
    </StyledButton>
  );
}

export default AddButton;
