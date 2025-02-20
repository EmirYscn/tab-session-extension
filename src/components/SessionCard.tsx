import React, { useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { BiWindowOpen } from "react-icons/bi";
import { FaRegWindowMaximize } from "react-icons/fa";
import { IoTrashBinOutline } from "react-icons/io5";

import { Session, setSessionsStorage } from "../services/storage";
import Button from "./Button";
import { formatString } from "../utils/formatString";

const StyledSessionCard = styled.div`
  background-color: ${(props) => props.theme.colors.grey[800]};
  border-radius: 6px;
  /* display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem; */
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;

  /* & span {
    font-size: 1rem;
    font-weight: 500;
  } */

  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  z-index: 99999;
`;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;

  & span {
    font-size: 1rem;
    font-weight: 500;
  }
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 200px;
  overflow-y: scroll;
  margin: -1rem 0.8rem;
  background-color: ${(props) => props.theme.colors.grey[800]};
  border-radius: 6px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  padding: 0.5rem 1rem;
  padding-top: 1rem;
  margin-bottom: 1rem;
`;
const Tab = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  & img {
    height: 1rem;
  }

  & svg {
    height: 1rem;
  }
`;

type SessionCardProps = {
  session: Session;
  isExpanded: boolean;
  setExpandedId: () => void;
  setSessions: React.Dispatch<React.SetStateAction<Session[]>>;
};

function SessionCard({
  session,
  isExpanded,
  setExpandedId,
  setSessions,
}: SessionCardProps) {
  const tabsCount = session.tabs.length;

  function handleDeleteSession(id: string) {
    setSessions((prevSessions) => {
      const updatedSessions = prevSessions.filter((prev) => prev.id !== id);
      setSessionsStorage(updatedSessions);
      return updatedSessions;
    });
  }

  return (
    <>
      <StyledSessionCard>
        <Card>
          <span>{session.name}</span>
          <Details>
            <span>{`${tabsCount} tabs`}</span>
            <Actions>
              <Button onClick={setExpandedId}>
                <IoIosArrowDown />
              </Button>
              <Button>
                <BiWindowOpen />
              </Button>
              <Button
                onClick={() => handleDeleteSession(session.id)}
                buttonType="delete"
              >
                <IoTrashBinOutline />
              </Button>
            </Actions>
          </Details>
        </Card>
      </StyledSessionCard>
      {isExpanded && (
        <Tabs>
          {session.tabs.map((tab, index) => (
            <Tab key={index}>
              {tab.icon !== "" ? (
                <img src={tab.icon} />
              ) : (
                <FaRegWindowMaximize />
              )}
              <a href={tab.url}>{formatString(tab.title, 40)}</a>
            </Tab>
          ))}
        </Tabs>
      )}
    </>
  );
}

export default SessionCard;
