import React, { useRef, useState } from "react";

import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { BiWindowOpen } from "react-icons/bi";
import { IoTrashBinOutline } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import { GrMultiple } from "react-icons/gr";
import { RiPushpinLine } from "react-icons/ri";

import {
  LocalStorageOptions,
  Session,
  setSessionsStorage,
} from "../services/storage";
import Button from "./Button";

import Tabs from "./Tabs";
import { ChangeEvent, MouseEvent } from "../types/types";
import { useOptions } from "../contexts/options/optionsContextProvider";

const StyledSessionCard = styled.div<{ $isDark?: boolean }>`
  background-color: ${(props) =>
    props.$isDark
      ? props.theme.colors.darkmode[100]
      : props.theme.colors.grey[800]};
  border-radius: 6px;

  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;

  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  z-index: 99999;
  cursor: pointer;
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

const Input = styled.input<{ $isDark?: boolean }>`
  padding: 0.7rem 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 4px;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  background-color: ${(props) =>
    props.$isDark
      ? props.theme.colors.darkmode[100]
      : props.theme.colors.grey[800]};
  color: ${(props) =>
    props.$isDark ? props.theme.colors.darkmode[400] : "black"};
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
  const { options, setOptions } = useOptions();
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingNewTab, setIsAddingNewTab] = useState(false);
  const [value, setValue] = useState(session.name);
  const inputRef = useRef<HTMLInputElement>(null);
  const tabsCount = session.tabs.length;

  function handleEdit(e: ChangeEvent) {
    setValue(e.target.value);
  }

  function saveEdit() {
    if (!value.trim()) {
      setValue(session.name); // Reset if empty
    } else {
      setSessions((prevSessions) => {
        const updatedSessions = prevSessions.map((prev) =>
          prev.id === session.id ? { ...prev, name: value } : prev
        );
        setSessionsStorage(updatedSessions);
        return updatedSessions;
      });
    }
    setIsEditing(false);
  }

  function handleDeleteSession(e: MouseEvent, id: string) {
    e.preventDefault();
    setSessions((prevSessions) => {
      const updatedSessions = prevSessions.filter((prev) => prev.id !== id);
      setSessionsStorage(updatedSessions);
      return updatedSessions;
    });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      setValue(session.name);
      setIsEditing(false);
    }
  }

  function handleAddTab(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!isExpanded) {
      setExpandedId();
    }
    setIsAddingNewTab((isAdding) => !isAdding);
  }

  function handleOpenAllTabs() {
    const tabs = session.tabs;
    for (const tab of tabs) {
      chrome.tabs.create({ url: tab.url, active: false });
    }
  }

  function handlePin(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setSessions((prevSessions) => {
      const updatedSessions = prevSessions.map((prev) =>
        prev.id === session.id ? { ...prev, isPinned: !prev.isPinned } : prev
      );
      setSessionsStorage(updatedSessions);
      return updatedSessions;
    });
  }

  return (
    <>
      <StyledSessionCard
        onClick={() => {
          if (isEditing) return;
          setExpandedId();
          setIsAddingNewTab(false);
        }}
        $isDark={options.isDark}
      >
        <Card>
          {isEditing ? (
            <Input
              ref={inputRef}
              type="text"
              value={value}
              onChange={handleEdit}
              onBlur={saveEdit}
              onKeyDown={handleKeyDown}
              autoFocus
              $isDark={options.isDark}
            />
          ) : (
            <span
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsEditing(true);
                setTimeout(() => inputRef.current?.focus(), 0);
              }}
              style={{ padding: "0.5rem", cursor: "text" }}
            >
              {session.name}
            </span>
          )}
          <Details>
            <span>{`${tabsCount} tabs`}</span>
            <Actions>
              <Button onClick={(e) => handleAddTab(e)}>
                <LuPlus />
              </Button>
              <Button buttonType="open" onClick={handleOpenAllTabs}>
                <GrMultiple />
              </Button>
              <Button onClick={handlePin}>
                <RiPushpinLine
                  style={session.isPinned ? { color: "#FC2947" } : {}}
                />
              </Button>
              <Button
                onClick={(e: MouseEvent) => handleDeleteSession(e, session.id)}
                buttonType="delete"
              >
                <IoTrashBinOutline />
              </Button>
            </Actions>
          </Details>
        </Card>
      </StyledSessionCard>
      {isExpanded && tabsCount > 0 && (
        <Tabs
          session={session}
          setSessions={setSessions}
          isAddingNewTab={isAddingNewTab}
          setIsAddingNewTab={setIsAddingNewTab}
        />
      )}
    </>
  );
}

export default SessionCard;
