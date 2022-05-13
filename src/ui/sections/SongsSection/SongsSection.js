import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { appRoutes } from "../../../configs/app-routes/app-routes";
import { useGetAllSongs } from "../../../services/hooks/songs/useGetAllSongs";
import { Preloader } from "../../details/Preloader/Preloader";
import { useTranslation } from "react-i18next";
import { AppSectionTitle1 } from "../../styled-components/titles/AppSectionTitle1";

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
      <SectionTitleWrapper>
        <AppSectionTitle1>{t("common:songs")}</AppSectionTitle1>
      </SectionTitleWrapper>
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
  padding: 1.5rem;
`;

const SectionTitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const LinksAlphabet = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 1em;
`;

const SongLink = styled(Link)`
  font-size: 2rem;
  padding: 0.3em;
  width: 3.5rem;
  text-align: center;
  text-decoration: none;
  color: inherit;
  background-color: ${(p) => p.theme.darkest};
  cursor: pointer;
  font-family: "Alice", serif;
  text-transform: uppercase;
`;

const PreloaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
