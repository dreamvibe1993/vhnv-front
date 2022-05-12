import React from "react";
import styled from "styled-components";
import { About } from "../../ui/sections/About/About";
import { BlogsSection } from "../../ui/sections/BlogsSection/BlogsSection";
import { SongsNavigation } from "../../ui/sections/SongsSection/SongsSection";

export const Home = () => {
  return (
    <HomeContainer>
      <About />
      <SongsNavigation />
      <BlogsSection />
    </HomeContainer>
  );
};

const HomeContainer = styled.main`
  height: calc(100vh - 115px);
  overflow-y: auto;
`;
