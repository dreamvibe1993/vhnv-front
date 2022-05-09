import React from "react";
import styled from "styled-components";
import { SubmitSongForm } from "./Forms/SubmitSongForm";

//Delete a song-lyrics Create a blog Create an insta-post

export const Admin = () => {
  return (
    <AdminContainer>
      <SubmitSongForm />
    </AdminContainer>
  );
};

const AdminContainer = styled.div`
  min-height: calc(100vh - 6.4rem - 5.5rem);
`;
