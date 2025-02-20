import React from "react";
import styled from "styled-components";

import { IconContext } from "react-icons";
import { IoSettingsOutline } from "react-icons/io5";
import Button from "./Button";

const StyledHeader = styled.div`
  /* padding: 1rem; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey[0]};
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`;

// const IconWrapper = styled.div`
//   cursor: pointer;
//   display: flex;
//   align-items: center;
// `;

function Header() {
  return (
    <StyledHeader>
      <h2>Tab Session</h2>
      <Button>
        <IoSettingsOutline />
      </Button>
    </StyledHeader>
  );
}

export default Header;
