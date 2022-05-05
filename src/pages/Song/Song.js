import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useGetSongByLetter } from "../../services/hooks/songs/useGetSong";

export const Song = () => {
  const params = useParams();
  const songs = useGetSongByLetter(params.letter);
  return (
    <SongContainer>
      {songs.map((song) => (
        <div key={song._id}>
          <Title>{song.name}</Title>
          <Lyrics> {song.lyrics}</Lyrics>
          <br />
        </div>
      ))}
    </SongContainer>
  );
};

const Title = styled.h2`
  background-color: ${p => p.theme.darkest};
  display: inline-block;
  padding: 5px 10px;
`;

const Lyrics = styled.div`
  white-space: pre-wrap;
  text-transform: lowercase;
`;

const SongContainer = styled.div`
  padding: 15px;
  min-height: 100vh;
`;
