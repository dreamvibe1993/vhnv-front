import React from "react";

import { Box, chakra, Container, Stack, Text, useColorModeValue, VisuallyHidden } from "@chakra-ui/react";
import { FaSoundcloud, FaSpotify, FaVk, FaYoutube } from "react-icons/fa";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export const Footer = () => {
  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")} color={useColorModeValue("gray.700", "gray.200")}>
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text>© 2022 VHNV. All rights reserved</Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton label={"VK"} href={"https://vk.com/vhnvvhnv"}>
            <FaVk />
          </SocialButton>
          <SocialButton label={"YouTube"} href={"https://www.youtube.com/channel/UCJS-Y96r7CniQLDmoBWwD7w"}>
            <FaYoutube />
          </SocialButton>
          <SocialButton label={"SoundCloud"} href={"https://soundcloud.com/vhnvvhnvvhnv_forever"}>
            <FaSoundcloud />
          </SocialButton>
          <SocialButton label={"Spotify"} href={"https://open.spotify.com/artist/2IuD4q3UTlB23hODChY0Xh"}>
            <FaSpotify />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
};
