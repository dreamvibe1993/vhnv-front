import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useGetSongByLetter } from "../../services/hooks/songs/useGetSong";
import { AppButton } from "../../ui/styled-components/buttons/AppButton";
import { useDeleteSong } from "../../services/hooks/songs/useDeleteSong";
import { AppSongTitle2 } from "../../ui/styled-components/titles/AppSongTitle2";

export const Song = () => {
  const params = useParams();
  const songs = useGetSongByLetter(params.letter);
  const deleteSong = useDeleteSong();

  return (
    <SongContainer>
      {songs.map((song) => (
        <div key={song._id}>
          <AppSongTitle2>{song.name}</AppSongTitle2>
          <Lyrics> {song.lyrics}</Lyrics>
          <br />
          <AppButton onClick={() => deleteSong(song._id)}>delete</AppButton>
        </div>
      ))}
    </SongContainer>
  );
};

const Lyrics = styled.div`
  font-size: 1.6rem;
  white-space: pre-wrap;
  text-transform: lowercase;
`;

const SongContainer = styled.div`
  padding: 1.5rem;
  min-height: 100vh;
`;
