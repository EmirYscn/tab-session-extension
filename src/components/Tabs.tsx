import { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

import Button from "./Button";
import Tab from "./Tab";

import {
  Session,
  setSessionsStorage,
  Tab as TabType,
} from "../services/storage";
import { useOptions } from "../contexts/options/optionsContextProvider";

const StyledTabs = styled(motion.div)<{ $isDark?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 215px;
  overflow-y: auto;
  margin: -1rem 0.8rem;
  background-color: ${(props) =>
    props.$isDark
      ? props.theme.colors.darkmode[100]
      : props.theme.colors.grey[800]};
  border-radius: 6px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  padding: 0.5rem 1rem;
  padding-top: 1rem;
  margin-bottom: 1rem;
`;

const InputTab = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.3em;
`;

const Input = styled.input<{ $isDark?: boolean }>`
  padding: 0.7rem 0.5rem 0.2rem 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 4px;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  flex-grow: 1;

  background-color: ${(props) =>
    props.$isDark
      ? props.theme.colors.darkmode[100]
      : props.theme.colors.grey[800]};
  color: ${(props) =>
    props.$isDark ? props.theme.colors.darkmode[400] : "black"};
`;

const InputActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

type TabsProps = {
  session: Session;
  setSessions: React.Dispatch<React.SetStateAction<Session[]>>;
  isAddingNewTab: boolean;
  setIsAddingNewTab: React.Dispatch<React.SetStateAction<boolean>>;
};

function Tabs({
  session,
  setSessions,
  isAddingNewTab,
  setIsAddingNewTab,
}: TabsProps) {
  const { options, setOptions } = useOptions();
  const [inputValue, setInputValue] = useState("");

  function saveTab(sessionId: string) {
    if (!inputValue) return;

    const newTab: TabType = {
      id: uuidv4(),
      icon: "",
      title: inputValue,
      url: inputValue,
    };

    setSessions((prevSessions) => {
      const updatedSessions = prevSessions.map((session) =>
        session.id === sessionId
          ? { ...session, tabs: [newTab, ...session.tabs] }
          : session
      );
      setSessionsStorage(updatedSessions);
      return updatedSessions;
    });

    setInputValue("");
    setIsAddingNewTab(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      saveTab(session.id);
    } else if (e.key === "Escape") {
      setInputValue("");
      setIsAddingNewTab(false);
    }
  }

  return (
    <StyledTabs
      initial={{ height: 0 }}
      animate={{ height: "215px" }}
      exit={{ height: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      $isDark={options.isDark}
    >
      {isAddingNewTab && (
        <InputTab>
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            $isDark={options.isDark}
          />
          <InputActions>
            <Button
              buttonType="delete"
              onClick={() => {
                setInputValue("");
                setIsAddingNewTab(false);
              }}
            >
              <RxCross2 />
            </Button>
            <Button buttonType="open" onClick={() => saveTab(session.id)}>
              <IoMdCheckmark />
            </Button>
          </InputActions>
        </InputTab>
      )}
      {session.tabs.map((tab) => (
        <Tab
          key={tab.id}
          tab={tab}
          session={session}
          setSessions={setSessions}
        />
      ))}
    </StyledTabs>
  );
}

export default Tabs;
