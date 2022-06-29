import {
  Box,
  Flex,
  Heading,
  Spinner,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useGetAllBlogs } from "../../../services/hooks/blogs/useGetAllBlogs";
import { BlogEntry } from "../../components/BlogEntry/BlogEntry";

export const BlogsSection = () => {
  const { t } = useTranslation();
  const blogs = useGetAllBlogs();

  if (blogs === 0) {
    return (
      <Flex justify="center" minH="192px" align={"center"}>
        <Spinner />
      </Flex>
    );
  }

  if (blogs.length < 1) {
    return (
      <Box p="1rem">
        <Heading align="center">{t("blog:graphomania")}</Heading>
        <Text>{t("blog:noBlogs")}</Text>
      </Box>
    );
  }

  return (
    <Box id="graphomania" p="1rem">
      <Flex justify={"space-between"}>
        {t("blog:graphomania")
          .split("")
          .map((letter, i) => {
            return (
              <Box
                key={letter + i}
                position={"relative"}
                fontSize={["1.5rem", "4rem"]}
                fontWeight={"extrabold"}
              >
                <FunnyLetterCont>
                  <FunnyLetter
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    bgGradient={useColorModeValue(
                      "radial(blue.900, gray.900 )",
                      "radial(whiteAlpha.900, blue.100 )"
                    )}
                    bgClip="text"
                    fontWeight="extrabold"
                  >
                    {letter}
                  </FunnyLetter>
                </FunnyLetterCont>
                <span style={{ visibility: "hidden" }}>{letter}</span>
              </Box>
            );
          })}
      </Flex>
      <VStack spacing={4}>
        {blogs.map((blog) => {
          return <BlogEntry key={blog._id} blog={blog} />;
        })}
      </VStack>
    </Box>
  );
};

const FunnyLetterCont = styled.div`
  text-transform: uppercase;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.2s ease;
  &:hover {
    color: red;
    transform: translateY(-20%);
  }
  display: flex;
  justify-content: center;
  width: 100%;
`;

const FunnyLetter = styled(Text)`
  pointer-events: none;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
`;
