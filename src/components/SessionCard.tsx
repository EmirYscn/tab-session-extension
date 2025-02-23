import React, { useRef, useState } from "react";

import styled from "styled-components";
import { IoTrashBinOutline } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import { GrMultiple } from "react-icons/gr";
import { RiPushpinLine } from "react-icons/ri";
import { LuTag } from "react-icons/lu";
import { FaTag } from "react-icons/fa6";

import Button from "./Button";
import Tabs from "./Tabs";

import { ChangeEvent, MouseEvent } from "../types/types";
import { Session, setSessionsStorage } from "../services/storage";
import { useOptions } from "../contexts/options/optionsContextProvider";
import { formatString } from "../utils/formatString";

const StyledSessionCard = styled.div<{ $isDark?: boolean }>`
  background-color: ${(props) =>
    props.$isDark
      ? props.theme.colors.darkmode[100]
      : props.theme.colors.grey[800]};
  border-radius: 6px;

  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;

  /* box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px; */

  box-shadow: ${(props) =>
    props.$isDark
      ? "rgba(99, 100, 100, 0.3) 0px 1px 2px 0px, rgba(99, 100, 100, 0.15) 0px 2px 6px 2px"
      : "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"};
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

const Tags = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  max-width: 100%;
  padding-bottom: 4px;
`;

const Tag = styled.span`
  background-color: ${(props) => props.theme.colors.darkmode[300]};
  padding: 4px 8px;
  border-radius: 12px;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 2px;
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
  const { options } = useOptions();
  const [isEditing, setIsEditing] = useState(false);

  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [isAddingNewTab, setIsAddingNewTab] = useState(false);
  const [tags, setTags] = useState(session.tags || []);

  const [value, setValue] = useState(session.name);
  const inputRef = useRef<HTMLInputElement>(null);
  const tabsCount = session.tabs.length;

  function handleAddTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && newTag.trim()) {
      const formattedTag = newTag.trim().toLowerCase();
      const updatedTags = new Set(tags);
      updatedTags.add(formattedTag);

      setTags(Array.from(updatedTags));
      updateSessionTags(Array.from(updatedTags));

      setNewTag("");
      setIsAddingTag(false);
    }
  }

  // Handles tag removal
  function handleRemoveTag(tagToRemove: string) {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    updateSessionTags(updatedTags);
  }

  // Updates session tags in storage
  function updateSessionTags(updatedTags: string[]) {
    setSessions((prevSessions) => {
      const updatedSessions = prevSessions.map((prev) =>
        prev.id === session.id ? { ...prev, tags: updatedTags } : prev
      );
      setSessionsStorage(updatedSessions);
      return updatedSessions;
    });
  }

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
    e.stopPropagation();
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

  function handleOpenAllTabs(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
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
        {tags.length > 0 && (
          <Tags>
            {tags.map((tag, index) => (
              <Tag
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRemoveTag(tag);
                }}
              >
                <FaTag />
                {formatString(tag, 6)} ✖
              </Tag>
            ))}
          </Tags>
        )}
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
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsAddingTag(!isAddingTag);
                }}
              >
                <LuTag />
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
      {isAddingTag && (
        <Input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={handleAddTag}
          placeholder="Add a tag..."
          autoFocus
          $isDark={options.isDark}
        />
      )}
    </>
  );
}

export default SessionCard;
