import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./popup.css";
import { getSessions, Sessions } from "../services/storage";

const App: React.FC<{}> = () => {
  const [sessions, setSessions] = useState<Sessions[]>([]);

  useEffect(() => {
    async function getSessionsFromStore() {
      const sessions = await getSessions();
      setSessions(sessions);
    }

    getSessionsFromStore();
  });
  return <div>Popup</div>;
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
