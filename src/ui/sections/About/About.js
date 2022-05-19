import React from "react";
import { useTranslation } from "react-i18next";
import { Heading, Stack, Text } from "@chakra-ui/react";

export const About = () => {
  const { t } = useTranslation();

  return (
    <Stack spacing={1} w="100%" p="1rem">
      <Text align="center" casing="uppercase" fontSize="md">
        {t("about:groupFrom")}
      </Text>
      <Heading align="center" fontSize="6xl">
        {t("about:groupName")}
      </Heading>
      <Text align="center" casing="uppercase" fontSize="md">
        ВСЕХОРОШОНАВСЕГДА
      </Text>
    </Stack>
  );
};
