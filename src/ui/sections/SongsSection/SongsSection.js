import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { appRoutes } from "../../../configs/app-routes/app-routes";
import { useGetAllSongs } from "../../../services/hooks/songs/useGetAllSongs";
import { Preloader } from "../../details/Preloader/Preloader";
import { useTranslation } from "react-i18next";

export const SongsNavigation = () => {
  const { t } = useTranslation();
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

  if (songs.length < 1)
    return (
      <PreloaderWrapper>
        <Preloader />
      </PreloaderWrapper>
    );

  return (
    <SongsNavigationSection>
      <SectionTitle>{t("common:songs")}</SectionTitle>
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
  text-transform: uppercase;
`;

const LinksAlphabet = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 10px;
`;

const SongLink = styled(Link)`
  padding: 5px;
  width: 35px;
  text-align: center;
  text-decoration: none;
  color: inherit;
  background-color: ${(p) => p.theme.darkest};
  font-weight: 700;
  cursor: pointer;
`;

const PreloaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
