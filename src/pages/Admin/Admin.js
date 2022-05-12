import React from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { appRoutes } from "../../configs/app-routes/app-routes";
import { AuthContext } from "../../configs/contexts/auth";
import { AppToolbar } from "../../ui/bars/AppToolbar";
import { AppButton, AppButtonLink } from "../../ui/styled-components/buttons/AppButton";
import { AppSongTitle2 } from "../../ui/styled-components/titles/AppSongTitle2";
import { SubmitBlogForm } from "./Forms/SubmitBlogForm";
import { SubmitSongForm } from "./Forms/SubmitSongForm";

//Create a blog Create an insta-post

export const Admin = () => {
  const { isAuth } = React.useContext(AuthContext);

  if (!isAuth) return <Redirect to={appRoutes.login.root} />;

  return (
    <AdminContainer>
      <AppToolbar>
        <AppButtonLink href="#new-song">new song</AppButtonLink>
        <AppButtonLink href="#new-blog">new blog</AppButtonLink>
        <AppButton type="button">new insta</AppButton>
      </AppToolbar>
      <hr />
      <MarginUtilWrapper>
        <AppSongTitle2>New Song</AppSongTitle2>
      </MarginUtilWrapper>
      <SubmitSongForm />
      <hr />
      <MarginUtilWrapper>
        <AppSongTitle2>New Blog</AppSongTitle2>
      </MarginUtilWrapper>
      <SubmitBlogForm />
    </AdminContainer>
  );
};

const MarginUtilWrapper = styled.div`
  margin: 0px 15px;
`;

const AdminContainer = styled.div`
  min-height: calc(100vh - 6.4rem - 5.5rem);
`;
