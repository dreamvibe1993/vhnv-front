import React from "react";
import { getAllSongs } from "../../../api/songs";

export const useGetAllSongs = () => {
  const [songs, setSongs] = React.useState([]);

  React.useEffect(() => {
    getAllSongs()
      .then((response) => {
        setSongs(response.data.songs);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return songs;
};
