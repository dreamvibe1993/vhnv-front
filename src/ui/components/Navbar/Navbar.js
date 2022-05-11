import React from "react";
import styled, { useTheme } from "styled-components";

import { FaBars } from "react-icons/fa";

import { size } from "../../../configs/css/breakpoints";
import { ThemeProviderContext } from "../../../configs/contexts/theme";
import { themes } from "../../../configs/css/colors";
import { Link, useHistory } from "react-router-dom";
import { appRoutes } from "../../../configs/app-routes/app-routes";
import { useTranslation } from "react-i18next";

export const Navbar = () => {
  const theme = useTheme();
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const { setTheme } = React.useContext(ThemeProviderContext);

  const [isMenuOpen, setMenuOpen] = React.useState(false);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  function toggleTheme() {
    let index = theme.id;
    if (index > 2) index = 0;
    setTheme(themes[index]);
    localStorage.setItem("theme", index);
  }

  function changeLanguage() {
    const languages = ["ru", "en"];
    const currentLanguage = i18n.language;
    let index = 0;
    if (currentLanguage === "ru") index = 1;
    if (currentLanguage === "en") index = 0;
    i18n.changeLanguage(languages[index]);
    localStorage.setItem("locale", languages[index]);
  }

  const intervalID = React.useRef(0);

  function startCountdown() {
    let counter = 0;
    intervalID.current = setInterval(() => {
      counter = counter + 1;
      if (counter > 2) {
        clearInterval(intervalID.current);
        history.push(appRoutes.admin.root);
      }
    }, 1000);
  }

  function finishCountdown() {
    clearInterval(intervalID.current);
  }

  return (
    <NavbarContainer isMenuOpen={isMenuOpen}>
      <NavButton to={appRoutes.home.root} onTouchStart={startCountdown} onTouchEnd={finishCountdown}>
        {t("common:home")}
      </NavButton>
      <NavButton href="#news">{t("common:news")}</NavButton>
      <NavButton href="#contact">{t("common:contacts")}</NavButton>
      <NavButton href="#about">{t("common:about")}</NavButton>
      <Buttons>
        <ChangeLng onClick={changeLanguage}>{i18n.language}</ChangeLng>
        <Colors type="button" onClick={toggleTheme}>
          {theme.id}
        </Colors>
        <Bars type="button" onClick={toggleMenu} isMenuOpen={isMenuOpen}>
          <FaBars />
        </Bars>
      </Buttons>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.header`
  background-color: ${(p) => p.theme.darkest};
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  font-size: 1.7rem;
  position: relative;
  @media (max-width: ${size.mobileL}) {
    justify-content: space-between;
    flex-direction: ${(p) => (p.isMenuOpen ? "column" : "none")};
    position: relative;
    a:first-child {
      text-align: left;
      flex: 1;
    }
    a:not(:first-child) {
      display: ${(p) => (p.isMenuOpen ? "block" : "none")};
    }
  }
  * {
    transition: all 0.1s linear;
  }
`;

const NavButton = styled(Link)`
  color: ${(p) => p.theme.lightest};
  text-align: center;
  padding: 1.5rem;
  text-decoration: none;
  &:hover {
    background-color: ${(p) => p.theme.lightest};
    color: ${(p) => p.theme.darkest};
  }
  &:active {
    background-color: ${(p) => p.theme.medium};
    color: ${(p) => p.theme.lightest};
  }
`;

const Bars = styled.button`
  padding: 0.8em 0.9em;
  color: ${(p) => p.theme.lightest};
  background-color: ${(p) => (p.isMenuOpen ? p.theme.darker : p.theme.darkest)};
  @media (min-width: ${size.mobileL}) {
    display: none;
  }
`;

const Colors = styled.button`
  padding: 0.8em 0.9em;
  color: ${(p) => p.theme.lightest};
  background-color: ${(p) => p.theme.darkest};
`;

const Buttons = styled.div`
  height: calc(100% / 4);
  background-color: ${(p) => p.theme.darkest};
  position: absolute;
  right: 0;
  button {
    border: none;
  }
`;

const ChangeLng = styled(Colors)``;
