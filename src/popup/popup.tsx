import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { v4 as uuidv4 } from "uuid";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "../styles/GlobalStyles";
import "./popup.css";

import {
  getSessionsStorage,
  Session,
  setSessionsStorage,
} from "../services/storage";

import SessionCard from "../components/SessionCard";
import Header from "../components/Header";
import Button from "../components/Button";

const StyledApp = styled.div`
  width: 520px;
  height: 612px;
  background-color: ${(props) => props.theme.colors.grey[900]};
  color: black;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

// const ScrollContainer = styled.div`
//   overflow-y: scroll;
// `

const Main = styled.div`
  padding: 1rem;
  overflow-y: scroll;
`;

const Sessions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const App: React.FC<{}> = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [expandedId, setExpandedId] = useState("");

  async function getCurrentTabs() {
    const tabs = await chrome.tabs.query({
      currentWindow: true,
    });
    const formattedTabs = tabs.map((tab) => ({
      icon: tab.favIconUrl || "", // Handle undefined favIconUrl
      title: tab.title || "",
      url: tab.url || "", // Handle undefined url
    }));
    const newSession: Session = {
      id: uuidv4(),
      name: new Date().toDateString(),
      tabs: formattedTabs,
    };
    setSessions((prevSessions) => {
      const updatedSessions = [newSession, ...prevSessions];
      setSessionsStorage(updatedSessions);
      return updatedSessions;
    });
    console.log(newSession);
  }

  useEffect(() => {
    async function getSessionsFromStore() {
      const sessions = await getSessionsStorage();
      setSessions(sessions);
    }

    getSessionsFromStore();
  });

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <StyledApp>
          <Header />
          <Button buttonType="action" onClick={getCurrentTabs}>
            Save Session
          </Button>
          <Main>
            <Sessions>
              {sessions.map((session) => (
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
      </>
    </ThemeProvider>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
