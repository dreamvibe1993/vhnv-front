import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { AppSectionTitle1 } from "../../styled-components/titles/AppSectionTitle1";

export const About = () => {
  const { t } = useTranslation();

  return (
    <AboutSection>
      <Description>{t("about:groupFrom")}</Description>
      <SectionTitleWrapper>
        <AppSectionTitle1>{t("about:groupName")}</AppSectionTitle1>
      </SectionTitleWrapper>
      <Description style={{ fontSize: "1rem" }}>ВСЕХОРОШОНАВСЕГДА</Description>
    </AboutSection>
  );
};

const AboutSection = styled.section`
  background-color: ${(p) => p.theme.dark};
  font-size: 1.6rem;
  padding: 1.5rem;
  padding-top: 2rem;
  text-align: center;
  overflow: hidden;
`;

const SectionTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  h1 {
    padding: 0;
    letter-spacing: 1.5rem;
    padding-left: 1.5rem;
    font-size: 5.2rem;
  }
`;

const Description = styled.p`
  text-transform: uppercase;
  margin-bottom: 0px;
`;
