import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useGetSongByLetter } from "../../services/hooks/songs/useGetSong";
import { AppButton } from "../../ui/styled-components/buttons/AppButton";
import { useDeleteSong } from "../../services/hooks/songs/useDeleteSong";
import { AppSongTitle2 } from "../../ui/styled-components/titles/AppSongTitle2";
import { Preloader } from "../../ui/details/Preloader/Preloader";
import { AuthContext } from "../../configs/contexts/auth";

export const Song = () => {
  const { isAuth } = React.useContext(AuthContext);
  const params = useParams();
  const songs = useGetSongByLetter(params.letter);
  const emitSongDeletion = useDeleteSong();

  const [isLoading, setLoading] = React.useState(false);

  const deleteSong = (id) => {
    setLoading(true);
    emitSongDeletion(id)
      .then(() => {
        alert("Song successfully deleted!");
      })
      .catch((e) => {
        alert("Something went wrong");
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (isLoading)
    return (
      <SongContainer>
        <PreloaderCentered>
          <Preloader />
        </PreloaderCentered>
      </SongContainer>
    );

  return (
    <SongContainer>
      {songs.map((song) => (
        <div key={song._id}>
          <AppSongTitle2>{song.name}</AppSongTitle2>
          <Lyrics> {song.lyrics}</Lyrics>
          {isAuth && <AppButton onClick={() => deleteSong(song._id)}>delete</AppButton>}
          <hr />
        </div>
      ))}
    </SongContainer>
  );
};

const PreloaderCentered = styled.div`
  display: flex;
  justify-content: center;
`;

const Lyrics = styled.div`
  font-size: 1.6rem;
  white-space: pre-wrap;
  text-transform: lowercase;
`;

const SongContainer = styled.div`
  padding: 1.5rem;
  min-height: 100vh;
`;
