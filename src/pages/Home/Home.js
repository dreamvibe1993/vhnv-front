import { Box, Center, Collapse, VStack } from "@chakra-ui/react";
import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { About } from "../../ui/sections/About/About";
import { BlogsSection } from "../../ui/sections/BlogsSection/BlogsSection";
import { SongsNavigation } from "../../ui/sections/SongsSection/SongsSection";

export const Home = () => {
  const [isAboutSectionOpen, setAboutSectionOpen] = React.useState(false);
  // const [isAboutOpenByUser, setAboutOpenByUser] = React.useState(false);

  const toggleAboutSectionOnUser = () => {
    // setAboutOpenByUser((prev) => !prev);
    setAboutSectionOpen((prev) => !prev);
  };

  /* Когда окно проскроллено вверх до упора, "about" автоматически вылетает.
  * Отключено, потому что бесило.
  *
  const toggleAboutSectionOnScroll = (isAboutOpenByUser) => {
    if (isAboutOpenByUser) return;
    if (window.scrollY === 0) setAboutSectionOpen(true);
    else setAboutSectionOpen(false);
  };
  React.useEffect(() => {
    const openAboutSectionIfScrOnTop = () => {
      toggleAboutSectionOnScroll(isAboutOpenByUser);
    };
    window.addEventListener("scroll", openAboutSectionIfScrOnTop);
    return () => {
      window.removeEventListener("scroll", openAboutSectionIfScrOnTop);
    };
  }, [isAboutOpenByUser]);
  */

  return (
    <VStack minH="calc(100vh - 60px - 64px)" bg="base">
      <Box maxW="1024px">
        <Collapse in={isAboutSectionOpen} animateOpacity>
          <About />
          <SongsNavigation />
          <Center onClick={toggleAboutSectionOnUser} cursor="pointer">
            <FaChevronUp   />
          </Center>
        </Collapse>
        <Collapse in={!isAboutSectionOpen} animateOpacity>
          <Center onClick={toggleAboutSectionOnUser} cursor="pointer" mt={5}>
            <FaChevronDown />
          </Center>
        </Collapse>
        <BlogsSection />
      </Box>
    </VStack>
  );
};
