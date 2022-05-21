import React from "react";
import { useParams } from "react-router-dom";
import { useGetSongByLetter } from "../../services/hooks/songs/useGetSong";
import { useDeleteSong } from "../../services/hooks/songs/useDeleteSong";
import { AuthContext } from "../../configs/contexts/auth";
import { Box, Button, Flex, Heading, Spinner, Text } from "@chakra-ui/react";

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
      <Flex p={4} justify="center">
        <Spinner />
      </Flex>
    );

  return (
    <Box p={4}>
      {songs.map((song) => (
        <div key={song._id}>
          <Heading mb={2}>{song.name}</Heading>
          <Text whiteSpace={"pre-wrap"}> {song.lyrics}</Text>
          {isAuth && <Button onClick={() => deleteSong(song._id)} mt={2}>delete</Button>}
        </div>
      ))}
    </Box>
  );
};
