import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useGetAllBlogs } from "../../../services/hooks/blogs/useGetAllBlogs";
import { BlogEntry } from "../../components/BlogEntry/BlogEntry";
import { Preloader } from "../../details/Preloader/Preloader";

export const BlogsSection = () => {
  const { t } = useTranslation();
  const blogs = useGetAllBlogs();

  if (blogs === 0) {
    return (
      <PreloaderWrapper>
        <Preloader />
      </PreloaderWrapper>
    );
  }

  if (blogs.length < 1) {
    return (
      <BlogsNavigationSection>
        <Title>{t("blog:graphomania")}</Title>
        <Subtitle>{t("blog:noBlogs")}</Subtitle>
      </BlogsNavigationSection>
    );
  }

  return (
    <BlogsNavigationSection id="#graphomania">
      <Title>{t("blog:graphomania")}</Title>
      {blogs.map((blog) => {
        return <BlogEntry key={blog._id} blog={blog} />;
      })}
    </BlogsNavigationSection>
  );
};

const PreloaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.h2`
  display: block;
  text-align: center;
  font-size: 3.6rem;
  text-transform: uppercase;
`;

const Subtitle = styled.p`
  text-align: center;
`;

const BlogsNavigationSection = styled.section`
  background-color: ${(p) => p.theme.lessDark};
  padding: 1.5rem;
`;
