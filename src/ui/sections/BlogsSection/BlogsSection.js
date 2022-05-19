import { Box, Flex, Heading, Spinner, StackDivider, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useGetAllBlogs } from "../../../services/hooks/blogs/useGetAllBlogs";
import { BlogEntry } from "../../components/BlogEntry/BlogEntry";
import { Preloader } from "../../details/Preloader/Preloader";
import { AppSectionTitle1 } from "../../styled-components/titles/AppSectionTitle1";

export const BlogsSection = () => {
  const { t } = useTranslation();
  const blogs = useGetAllBlogs();

  if (blogs === 0) {
    return (
      <Flex justify="center">
        <Spinner />
      </Flex>
    );
  }

  if (blogs.length < 1) {
    return (
      <Box>
        <Heading>{t("blog:graphomania").toUpperCase()}</Heading>
        <Text>{t("blog:noBlogs")}</Text>
      </Box>
    );
  }

  return (
    <Box id="#graphomania" p="1rem">
      <Heading align="center">{t("blog:graphomania").toUpperCase()}</Heading>
      <VStack spacing={4}>
        {blogs.map((blog) => {
          return <BlogEntry key={blog._id} blog={blog} />;
        })}
      </VStack>
    </Box>
  );
};

