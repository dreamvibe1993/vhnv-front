import React from "react";
import styled from "styled-components";
import { About } from "../../ui/sections/About/About";
import { SongsNavigation } from "../../ui/sections/SongsSection/SongsSection";

export const Home = () => {
  return (
    <HomeContainer>
      <About />
      <SongsNavigation />
    </HomeContainer>
  );
};

const HomeContainer = styled.main`
  height: calc(100vh - 115px);
`;
