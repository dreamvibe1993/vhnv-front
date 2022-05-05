import React from "react";
import { ThemeProviderContext } from "./configs/contexts/theme";
import { ThemeProvider } from "styled-components";

import { Routes } from "./Routes";
import { GlobalStyles } from "./GlobalStyles";

import { themes } from "./configs/css/colors";

import { Navbar } from "./ui/components/Navbar/Navbar";
import { Footer } from "./ui/components/Footer/Footer";

/*
  TODO:
  1) Aria labels?
  2) Loaders
  3) Icon
  4) Languages Support 
  5) Check meta
*/

function App() {
  const [theme, setTheme] = React.useState(themes[0]);
  return (
    <ThemeProviderContext.Provider value={{ setTheme }}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Navbar />
        <Routes />
        <Footer />
      </ThemeProvider>
    </ThemeProviderContext.Provider>
  );
}

export default App;
