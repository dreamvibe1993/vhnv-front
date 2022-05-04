import React from "react";
import { Link } from "react-router-dom";
import { appRoutes } from "../../../configs/app-routes/app-routes";
import { useGetAllSongs } from "../../../services/hooks/songs/useGetAllSongs";

export const SongsSection = () => {
  const songs = useGetAllSongs();

  const sortAlphabeticallyInRussian = (a, b) => {
    const currentFirstLetter = a.name.slice(0, 1);
    const nextFirtsLetter = b.name.slice(0, 1);
    return currentFirstLetter.localeCompare(nextFirtsLetter.slice(0, 1));
  };

  const returnUniqueLetters = (songs) => {
    if (songs.length < 1) return [];
    const firstLetters = songs.map((song) => song.name.slice(0, 1));
    return [...new Set(firstLetters)];
  };

  return (
    <div>
      SONGS SECTION
      <br />
      {returnUniqueLetters(songs.sort(sortAlphabeticallyInRussian)).map(
        (letter, index) => {
          return (
            <Link
              key={letter + index}
              to={`${appRoutes.songs.root}/${letter}`}
            >
              {letter}
            </Link>
          );
        }
      )}
    </div>
  );
};
