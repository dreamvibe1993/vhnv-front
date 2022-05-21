import React from "react";
import { appRoutes } from "../../../configs/app-routes/app-routes";
import { useGetAllSongs } from "../../../services/hooks/songs/useGetAllSongs";
import { useTranslation } from "react-i18next";
import { Box, Button, Flex, Heading, Spinner, Wrap } from "@chakra-ui/react";
import { Link } from "react-router-dom";

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
      <Wrap justify="center" spacing={5} mt={5}>
        {returnUniqueLetters(songs.sort(sortAlphabeticallyInRussian)).map((letter, index) => {
          return (
            <Button key={letter + index} as={Link} to={`${appRoutes.songs.root}/${letter}`}>
              {letter}
            </Button>
          );
        })}
      </Wrap>
    </Box>
  );
};

