import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useGetSongByLetter } from "../../services/hooks/songs/useGetSong";

export const Song = () => {
  const params = useParams();
  const songs = useGetSongByLetter(params.letter);
  return (
    <div>
      {songs.map((song) => (
        <div key={song._id}>
          <hr />
          {song.name}
          <br />
          <br />
          <Lyrics>{song.lyrics}</Lyrics>
          <br />
          <hr />
        </div>
      ))}
    </div>
  );
};

const Lyrics = styled.div`
  white-space: pre-wrap;
  text-transform: lowercase;
`;
