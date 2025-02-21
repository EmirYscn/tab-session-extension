import styled from "styled-components";
import { FaRegWindowMaximize } from "react-icons/fa";
import { IoTrashBinOutline } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";

import { formatString } from "../utils/formatString";
import { Session, setSessionsStorage, Tab } from "../services/storage";
import Button from "./Button";
import { useOptions } from "../contexts/options/optionsContextProvider";

const StyledTab = styled.div<{ $isDark?: boolean }>`
  display: flex;
  align-items: center;
  /* gap: 0.5rem; */
  justify-content: space-between;
  padding: 0 0.3em;
  border-radius: 6px;
  transition: all 0.3s ease;

  & img {
    height: 1rem;
  }

  & svg {
    height: 1rem;
  }

  &:hover {
    /* background-color: rgba(232, 22, 22, 0.1); */
    background-color: ${(props) =>
      props.$isDark ? props.theme.colors.darkmode[300] : "#b3c8cf"};
  }
`;

const TabActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TabDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  & span {
    font-size: 0.9rem;
  }
`;

type TabProps = {
  tab: Tab;
  session: Session;
  setSessions: React.Dispatch<React.SetStateAction<Session[]>>;
};

function Tab({ tab, setSessions }: TabProps) {
  const { options } = useOptions();
  function handleUrlClick(url: string) {
    chrome.tabs.create({ url });
  }

  function handleDeleteTab(tabId: string) {
    setSessions((prevSessions) => {
      const updatedSessions = prevSessions.map((session) => ({
        ...session,
        tabs: session.tabs.filter((tab) => tab.id !== tabId),
      }));

      setSessionsStorage(updatedSessions);

      return updatedSessions;
    });
  }

  return (
    <StyledTab $isDark={options.isDark}>
      <TabDetails onClick={() => handleUrlClick(tab.url)}>
        {tab.icon !== "" ? <img src={tab.icon} /> : <FaRegWindowMaximize />}
        <span>{formatString(tab.title, 40)}</span>
      </TabDetails>
      <TabActions>
        <Button buttonType="open">
          <MdModeEdit />
        </Button>
        <Button buttonType="delete" onClick={() => handleDeleteTab(tab.id)}>
          <IoTrashBinOutline />
        </Button>
      </TabActions>
    </StyledTab>
  );
}

export default Tab;
