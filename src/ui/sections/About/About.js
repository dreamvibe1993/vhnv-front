import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

export const About = () => {
  const { t } = useTranslation();

  return (
    <AboutSection>
      <Title>{t("about:groupName")}</Title>
      <Description>{t("about:groupFrom")}</Description>
    </AboutSection>
  );
};

const AboutSection = styled.section`
  background-color: ${(p) => p.theme.dark};
  padding: 15px;
  text-align: center;
`;

const Title = styled.h1`
  font-weight: 900;
  font-size: 36px;
`;

const Description = styled.p``;
