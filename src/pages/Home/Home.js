import { StackDivider, VStack } from "@chakra-ui/react";
import React from "react";
import { About } from "../../ui/sections/About/About";
import { BlogsSection } from "../../ui/sections/BlogsSection/BlogsSection";
import { SongsNavigation } from "../../ui/sections/SongsSection/SongsSection";

export const Home = () => {
  return (
    <VStack divider={<StackDivider borderColor="gray.200" />} align="stretch">
      <About />
      <SongsNavigation />
      <BlogsSection />
    </VStack>
  );
};
