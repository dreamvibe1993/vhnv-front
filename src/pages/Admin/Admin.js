import React from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { appRoutes } from "../../configs/app-routes/app-routes";
import { AuthContext } from "../../configs/contexts/auth";
import { SubmitSongForm } from "./Forms/SubmitSongForm";

//Delete a song-lyrics Create a blog Create an insta-post

export const Admin = () => {
  const { isAuth } = React.useContext(AuthContext);

  if (!isAuth) return <Redirect to={appRoutes.login.root} />;

  return (
    <AdminContainer>
      <SubmitSongForm />
    </AdminContainer>
  );
};

const AdminContainer = styled.div`
  min-height: calc(100vh - 6.4rem - 5.5rem);
`;
