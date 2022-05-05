import React from "react";
import styled from "styled-components";

export const About = () => {
  return (
    <AboutSection>
      <Title>ВХНВ</Title>
      <Description>
          Группа из Екатеринбурга.
      </Description>
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

const Description = styled.p`

`
