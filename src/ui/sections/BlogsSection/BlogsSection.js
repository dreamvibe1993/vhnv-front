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
      <PreloaderWrapper>
        <Preloader />
      </PreloaderWrapper>
    );
  }

  if (blogs.length < 1) {
    return (
      <BlogsNavigationSection>
        <SectionTitleWrapper>
          <AppSectionTitle1>{t("blog:graphomania")}</AppSectionTitle1>
        </SectionTitleWrapper>
        <Subtitle>{t("blog:noBlogs")}</Subtitle>
      </BlogsNavigationSection>
    );
  }

  return (
    <BlogsNavigationSection id="#graphomania">
      <SectionTitleWrapper>
        <AppSectionTitle1>{t("blog:graphomania")}</AppSectionTitle1>
      </SectionTitleWrapper>
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

const SectionTitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Subtitle = styled.p`
  text-align: center;
`;

const BlogsNavigationSection = styled.section`
  background-color: ${(p) => p.theme.lessDark};
  padding: 1.5rem;
`;
