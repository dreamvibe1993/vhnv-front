import React from "react";
import styled, { useTheme } from "styled-components";

import { FaBars } from "react-icons/fa";

import { size } from "../../../configs/css/breakpoints";
import { ThemeProviderContext } from "../../../configs/contexts/theme";
import { themes } from "../../../configs/css/colors";
import { Link } from "react-router-dom";
import { appRoutes } from "../../../configs/app-routes/app-routes";

export const Navbar = () => {
  const theme = useTheme();
  const { setTheme } = React.useContext(ThemeProviderContext);
  const [isMenuOpen, setMenuOpen] = React.useState(false);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  function toggleTheme() {
    let index = theme.id;
    if (index > 2) index = 0;
    setTheme(themes[index]);
  }

  return (
    <NavbarContainer isMenuOpen={isMenuOpen}>
      <NavButton to={appRoutes.home.root}>Home</NavButton>
      <NavButton href="#news">News</NavButton>
      <NavButton href="#contact">Contact</NavButton>
      <NavButton href="#about">About</NavButton>
      <Buttons>
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

const NavbarContainer = styled.nav`
  background-color: ${(p) => p.theme.darkest};
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
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
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
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
  padding: 15px 16px;
  color: ${(p) => p.theme.lightest};
  background-color: ${(p) => (p.isMenuOpen ? p.theme.darker : p.theme.darkest)};
  @media (min-width: ${size.mobileL}) {
    display: none;
  }
`;

const Colors = styled.button`
  padding: 15px 16px;
  color: ${(p) => p.theme.lightest};
  background-color: ${(p) => p.theme.darkest};
`;

const Buttons = styled.div`
  background-color: ${(p) => p.theme.darkest};
  position: absolute;
  right: 0;
  button {
    border: none;
  }
`;
