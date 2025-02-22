import { createRoot } from "react-dom/client";

import { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "../styles/GlobalStyles";

import { OptionsProvider } from "../contexts/options/optionsContextProvider";
import App from "../components/App";

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
