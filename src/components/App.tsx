import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

// import "./popup.css";

import {
  getSessionsStorage,
  getStoredOptions,
  Session,
  setSessionsStorage,
} from "../services/storage";

import SessionCard from "../components/SessionCard";
import Header from "../components/Header";

import SortBy from "./SortBy";
import FilterBy from "./FilterBy";
import AddButton from "./AddButton";

import { useOptions } from "../contexts/options/optionsContextProvider";
import { formatString } from "../utils/formatString";

const StyledApp = styled.div<{ $isDark?: boolean }>`
  width: 520px;
  height: 600px;
  background-color: ${(props) =>
    props.$isDark
      ? props.theme.colors.darkmode[200]
      : props.theme.colors.grey[900]};
  color: ${(props) =>
    props.$isDark ? props.theme.colors.darkmode[400] : "black"};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

  transition: all 0.2s ease;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  overflow-y: auto;
  position: relative;
  scrollbar-gutter: stable;
`;

const Sessions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  align-self: flex-end;
`;

const SearchTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 8px;
  max-width: 100%;
  padding-bottom: 4px;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
`;

const Tag = styled.span`
  background-color: ${(props) => props.theme.colors.darkmode[300]};
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  flex-shrink: 0;
  white-space: nowrap;
  max-width: 100%;
  text-overflow: ellipsis;
  display: inline-block;
`;

const App: React.FC<{}> = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const { options, setOptions } = useOptions();

  const [expandedId, setExpandedId] = useState("");
  const [searchTags, setSearchTags] = useState<string[]>([]);

  async function getCurrentTabs() {
    const tabs = await chrome.tabs.query({
      currentWindow: true,
    });

    const formattedTabs = tabs.map((tab) => ({
      id: uuidv4(),
      icon: tab.favIconUrl || "",
      title: tab.title || "",
      url: tab.url || "",
    }));

    const newSession: Session = {
      id: uuidv4(),
      name: new Date().toDateString(),
      tabs: formattedTabs,
      isPinned: false,
      date: new Date().toISOString(),
    };

    setSessions((prevSessions) => {
      const updatedSessions = [...prevSessions, newSession];
      setSessionsStorage(updatedSessions);
      return updatedSessions;
    });
  }

  function handleRemoveSearchTag(tagToRemove: string) {
    const updatedTags = searchTags.filter((tag) => tag !== tagToRemove);
    setSearchTags(updatedTags);
  }

  useEffect(() => {
    async function getSessionsFromStore() {
      const sessions = await getSessionsStorage();
      setSessions(sessions);
    }
    async function getOptionsFromStore() {
      const options = await getStoredOptions();
      setOptions(options);
    }

    getSessionsFromStore();
    getOptionsFromStore();
  }, []);

  // 1) FILTER
  const filteredSessions = sessions.filter((session) => {
    if (searchTags.length === 0) {
      // If no search tags, include all sessions
      return true;
    }

    if (session.tags) {
      // Check if any of the session's tags partially match the search tags
      return searchTags.every((searchTag) =>
        session.tags?.some(
          (sessionTag) =>
            sessionTag.toLowerCase().includes(searchTag.toLowerCase()) // Use includes for partial matching
        )
      );
    }

    // If session has no tags, exclude it if there are search tags
    return false;
  });

  // 2) SORT
  const [field, direction] = options.sort?.split("-") as [string, string];
  const modifier = direction === "asc" ? 1 : -1;

  let sortedSessions = [...filteredSessions].sort((a, b) => {
    if (field === "tab") {
      return (b.tabs.length - a.tabs.length) * modifier;
    } else if (field === "date") {
      return (
        (new Date(a.date!).getTime() - new Date(b.date!).getTime()) * modifier
      );
    }
    return 0;
  });

  // sort pinned sessions first
  sortedSessions = sortedSessions.sort(
    (a, b) => Number(b.isPinned) - Number(a.isPinned)
  );

  return (
    <StyledApp $isDark={options?.isDark}>
      <Header />
      <Main>
        <Actions>
          <FilterBy
            addSearchTag={(tag) =>
              setSearchTags((prevTags) => {
                const updatedTags = new Set(prevTags); // Use Set to ensure uniqueness
                updatedTags.add(tag.trim().toLowerCase()); // Add the new tag, automatically removing duplicates
                return Array.from(updatedTags); // Convert Set back to an array
              })
            }
          />
          <SortBy
            options={[
              { value: "date-asc", label: "Oldest" },
              { value: "date-desc", label: "Newest" },
              { value: "tab-asc", label: "Most Tabs" },
              { value: "tab-desc", label: "Fewest Tabs" },
            ]}
          />
        </Actions>
        {searchTags.length > 0 && (
          <div>
            <SearchTags>
              {searchTags.map((tag, index) => (
                <Tag
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemoveSearchTag(tag);
                  }}
                >
                  {formatString(tag, 6)} ✖
                </Tag>
              ))}
            </SearchTags>
          </div>
        )}
        <AddButton onClick={getCurrentTabs}>Save Session</AddButton>
        <Sessions>
          {sortedSessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              isExpanded={expandedId === session.id}
              setExpandedId={() =>
                setExpandedId(session.id === expandedId ? "" : session.id)
              }
              setSessions={setSessions}
            />
          ))}
        </Sessions>
      </Main>
    </StyledApp>
  );
};

export default App;
