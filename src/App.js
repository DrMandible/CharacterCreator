import React from "react";

import "./styles.css";
import { ThemeProvider } from "styled-components";

import { StateProvider } from "./data/store";

import { Main } from "./Main";

const THEME = {
  main: `rgba(95, 84, 73, 1)`,
  background: `rgba(235, 252, 251, 1)`,
  shade: `rgba(0, 0, 0, 0.3)`,
  bright: "rgba(255, 255, 255, 0.1)",
  shadow: `rgba(175, 170, 235, .5)`,
  confirm: `rgba(206, 223, 217, 1)`,
  text: `rgba(81, 37, 0, 1)`,
  secondary: `rgb(176, 147, 152)`,
  warning: `rgb(159, 74, 84)`,
  selected: `rgb(175, 200, 220)`
};

export default function App() {
  return (
    <StateProvider>
      <ThemeProvider theme={THEME}>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            background: THEME.background,
            zIndex: -999
          }}
        />
        <Main />
      </ThemeProvider>
    </StateProvider>
  );
}
// REACT COMPONENTS end
