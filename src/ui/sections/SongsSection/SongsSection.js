import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { appRoutes } from "../../../configs/app-routes/app-routes";
import { useGetAllSongs } from "../../../services/hooks/songs/useGetAllSongs";

export const SongsNavigation = () => {
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
    <SongsNavigationSection>
      <SectionTitle>SONGS</SectionTitle>
      <LinksAlphabet>
        {returnUniqueLetters(songs.sort(sortAlphabeticallyInRussian)).map((letter, index) => {
          return (
            <SongLink key={letter + index} to={`${appRoutes.songs.root}/${letter}`}>
              {letter}
            </SongLink>
          );
        })}
      </LinksAlphabet>
    </SongsNavigationSection>
  );
};

const SongsNavigationSection = styled.section`
  background-color: ${(p) => p.theme.medium};
  padding: 15px;
`;

const SectionTitle = styled.h2`
  text-align: center;
`;

const LinksAlphabet = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const SongLink = styled(Link)`
  padding: 5px;
  width: 35px;
  text-align: center;
  text-decoration: none;
  color: inherit;
  background-color: ${p => p.theme.darkest};
  font-weight: 700;
  cursor: pointer;
`
