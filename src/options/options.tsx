import React from "react";
import { createRoot } from "react-dom/client";

import "./options.css";

const App: React.FC<{}> = () => {
  return <div>Options</div>;
};

const rootElement = document.createElement("div");
document.body.appendChild(rootElement);

// Use createRoot for React 18+
const root = createRoot(rootElement);
root.render(<App />);
