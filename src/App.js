import React from "react";
import { ThemeProviderContext } from "./configs/contexts/theme";
import { ThemeProvider } from "styled-components";

import { Routes } from "./Routes";
import { GlobalStyles } from "./GlobalStyles";

import { themes } from "./configs/css/colors";

import { Navbar } from "./ui/components/Navbar/Navbar";
import { Footer } from "./ui/components/Footer/Footer";
import { useTranslation } from "react-i18next";
import { AuthWrapper } from "./ui/service/hocs/AuthWrapper/AuthWrapper";

/*
  TODO:
  * Admin (authorization as admin)
  * About Section
  * Songs using iframes (for ru is ya music)
  * Tablets and Desktop layouts
  * Search by song name
  * Peace though stradania rubric
  * Local instagram
  * ems rems
*/

function App() {
  const { i18n } = useTranslation();
  const [theme, setTheme] = React.useState(themes[0]);

  React.useEffect(() => {
    const themeIndex = localStorage.getItem("theme");
    if (!themeIndex) return;
    setTheme(themes[themeIndex]);
  }, []);

  React.useEffect(() => {
    const locale = localStorage.getItem("locale");
    if (!locale || !i18n) return;
    i18n.changeLanguage(locale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProviderContext.Provider value={{ setTheme }}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AuthWrapper>
          <Navbar />
          <Routes />
          <Footer />
        </AuthWrapper>
      </ThemeProvider>
    </ThemeProviderContext.Provider>
  );
}

export default App;
