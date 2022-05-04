import React from "react";
import { getSong } from "../../../api/songs";

export const useGetSongByLetter = (letter) => {
  const [songs, setSongs] = React.useState([]);

  React.useEffect(() => {
    if (!letter) return console.error("No letter in useGetSong!");
    getSong(letter)
      .then((response) => {
        setSongs(response.data.songs);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [letter]);

  return songs;
};
