// import React from 'react';
import React, { useMemo } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import useDarkMode from "use-dark-mode";
import AppContext from "./AppContext";
import MainApp from "./MainApp";
import GlobalStyles from "./theme/GlobalStyles";
import { lightTheme, darkTheme } from "./theme/themes";

function App() {
  window.matchMedia = null;
  const darkMode = useDarkMode(true);
  const contextValue = useMemo(() => ({ darkMode }), [darkMode]);

  return (
    <AppContext.Provider value={contextValue}>
      <ThemeProvider theme={darkMode.value ? darkTheme : lightTheme}>
        <GlobalStyles />
        <div className="App">
          {/* ini kalau untuk localhost "basename/my-portfolio" di hapus */}
          <BrowserRouter
            basename={
              process.env.NODE_ENV === "production" ? "/my-portfolio" : "/"
            }
          >
            {/* <BrowserRouter basename="my-portfolio"> */}
            <MainApp />
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
