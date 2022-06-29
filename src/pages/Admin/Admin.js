import { Box, StackDivider, VStack } from "@chakra-ui/react";
import React from "react";
import { Redirect } from "react-router-dom";
import { appRoutes } from "../../configs/app-routes/app-routes";
import { AuthContext } from "../../configs/contexts/auth";
import { AppToolbar } from "../../ui/bars/AppToolbar";
import {
  AppButton,
  AppButtonLink,
} from "../../ui/styled-components/buttons/AppButton";
import { AppSongTitle2 } from "../../ui/styled-components/titles/AppSongTitle2";
import { SubmitBlogForm } from "./Forms/SubmitBlogForm";
import { SubmitSongForm } from "./Forms/SubmitSongForm";

//Create a blog Create an insta-post

export const Admin = () => {
  const { isAuth } = React.useContext(AuthContext);

  if (!isAuth) return <Redirect to={appRoutes.login.root} />;

  return (
    <VStack divider={<StackDivider borderColor="gray.200" />}>
      <Box maxW="1024px" w="100%">
      <AppToolbar>
        <AppButtonLink href="#new-song">new song</AppButtonLink>
        <AppButtonLink href="#new-blog">new blog</AppButtonLink>
        <AppButton type="button">new insta</AppButton>
      </AppToolbar>
      <AppSongTitle2>New Song</AppSongTitle2>
      <SubmitSongForm />
      <AppSongTitle2>New Blog</AppSongTitle2>
      <SubmitBlogForm />
      </Box>
    </VStack>
  );
};
