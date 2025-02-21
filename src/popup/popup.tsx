import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { v4 as uuidv4 } from "uuid";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "../styles/GlobalStyles";
// import "./popup.css";

import {
  getSessionsStorage,
  getStoredOptions,
  LocalStorageOptions,
  Session,
  setSessionsStorage,
} from "../services/storage";

import SessionCard from "../components/SessionCard";
import Header from "../components/Header";
import Button from "../components/Button";
import {
  OptionsProvider,
  useOptions,
} from "../contexts/options/optionsContextProvider";
import App from "../components/App";

// const StyledApp = styled.div<{ $isDark?: boolean }>`
//   width: 520px;
//   height: 612px;
//   background-color: ${(props) =>
//     props.$isDark
//       ? props.theme.colors.darkmode[200]
//       : props.theme.colors.grey[900]};
//   color: ${(props) =>
//     props.$isDark ? props.theme.colors.darkmode[400] : "black"};
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   padding: 1rem;
// `;

// const Main = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   padding: 1rem;
//   overflow-y: scroll;
// `;

// const Sessions = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
// `;

// const App: React.FC<{}> = () => {
//   const [sessions, setSessions] = useState<Session[]>([]);
//   const { options, setOptions } = useOptions();

//   const [expandedId, setExpandedId] = useState("");

//   async function getCurrentTabs() {
//     const tabs = await chrome.tabs.query({
//       currentWindow: true,
//     });

//     const formattedTabs = tabs.map((tab) => ({
//       id: uuidv4(),
//       icon: tab.favIconUrl || "", // Handle undefined favIconUrl
//       title: tab.title || "",
//       url: tab.url || "", // Handle undefined url
//     }));

//     const newSession: Session = {
//       id: uuidv4(),
//       name: new Date().toDateString(),
//       tabs: formattedTabs,
//     };

//     setSessions((prevSessions) => {
//       const updatedSessions = [newSession, ...prevSessions];
//       setSessionsStorage(updatedSessions);
//       return updatedSessions;
//     });
//   }

//   useEffect(() => {
//     async function getSessionsFromStore() {
//       const sessions = await getSessionsStorage();
//       setSessions(sessions);
//     }
//     async function getOptionsFromStore() {
//       const options = await getStoredOptions();
//       setOptions(options);
//     }

//     getSessionsFromStore();
//     getOptionsFromStore();
//   }, []);

//   return (
//     <OptionsProvider>
//       <ThemeProvider theme={theme}>
//         <>
//           <GlobalStyles />
//           <StyledApp $isDark={options?.isDark}>
//             <Header />
//             <Main>
//               <Button buttonType="action" onClick={getCurrentTabs}>
//                 Save Session
//               </Button>
//               <Sessions>
//                 {sessions.map((session) => (
//                   <SessionCard
//                     key={session.id}
//                     session={session}
//                     isExpanded={expandedId === session.id}
//                     setExpandedId={() =>
//                       setExpandedId(session.id === expandedId ? "" : session.id)
//                     }
//                     setSessions={setSessions}
//                     options={options}
//                   />
//                 ))}
//               </Sessions>
//             </Main>
//           </StyledApp>
//         </>
//       </ThemeProvider>
//     </OptionsProvider>
//   );
// };

// const rootElement = document.createElement("div");
// document.body.appendChild(rootElement);

// // Use createRoot for React 18+
// const root = createRoot(rootElement);
// root.render(<App />);

const rootElement = document.createElement("div");
document.body.appendChild(rootElement);

const root = createRoot(rootElement);
root.render(
  <OptionsProvider>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </OptionsProvider>
);
