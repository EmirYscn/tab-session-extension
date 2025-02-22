import React from "react";
import styled from "styled-components";

import { IconContext } from "react-icons";
import { IoSettingsOutline } from "react-icons/io5";
import Button from "./Button";
import ToggleDarkMode from "./ToggleDarkMode";
import { useOptions } from "../contexts/options/optionsContextProvider";

const StyledHeader = styled.div<{ $isDark?: boolean }>`
  /* padding: 1rem; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid
    ${(props) =>
      props.$isDark
        ? props.theme.colors.darkmode[400]
        : props.theme.colors.grey[0]};
  padding-bottom: 0.5rem;
  /* margin-bottom: 1rem; */
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

function Header() {
  const { options } = useOptions();
  return (
    <StyledHeader $isDark={options.isDark}>
      <h2>Tab Session</h2>
      <Actions>
        <ToggleDarkMode />
        <Button>
          <IoSettingsOutline />
        </Button>
      </Actions>
    </StyledHeader>
  );
}

export default Header;
