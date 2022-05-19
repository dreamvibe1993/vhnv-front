import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { appRoutes } from "../../../configs/app-routes/app-routes";
import { useGetAllSongs } from "../../../services/hooks/songs/useGetAllSongs";
import { Preloader } from "../../details/Preloader/Preloader";
import { useTranslation } from "react-i18next";
import { AppSectionTitle1 } from "../../styled-components/titles/AppSectionTitle1";
import { Box, Container, Flex, Heading, Spinner } from "@chakra-ui/react";

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
      <Box w="100%">
        <Flex justify="center" wrap="wrap">
          <Spinner />
        </Flex>
      </Box>
    );

  return (
    <Box w="100%" p="1rem">
      <Heading align="center">{t("common:songs").toUpperCase()}</Heading>
      <Flex justify="center" wrap="wrap">
        {returnUniqueLetters(songs.sort(sortAlphabeticallyInRussian)).map((letter, index) => {
          return (
            <SongLink key={letter + index} to={`${appRoutes.songs.root}/${letter}`}>
              {letter}
            </SongLink>
          );
        })}
      </Flex>
    </Box>
  );
};

const SongLink = styled(Link)`
  font-size: 2rem;
  padding: 0.3em;
  width: 3.5rem;
  margin: 0.3rem;
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
