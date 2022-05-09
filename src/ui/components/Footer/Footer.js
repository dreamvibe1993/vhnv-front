import React from "react";
import { FaSoundcloud, FaSpotify, FaVk, FaYoutube } from "react-icons/fa";
import styled from "styled-components";

export const Footer = () => {
  return (
    <FooterContainer>
      <Icons>
        <Link href="https://vk.com/vhnvvhnv">
          <FaVk />
        </Link>
        <Link href="https://soundcloud.com/vhnvvhnvvhnv_forever">
          <FaSoundcloud />
        </Link>
        <Link href="https://open.spotify.com/artist/2IuD4q3UTlB23hODChY0Xh">
          <FaSpotify />
        </Link>
        <Link href="https://www.youtube.com/channel/UCJS-Y96r7CniQLDmoBWwD7w">
          <FaYoutube />
        </Link>
      </Icons>
      2022
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${(p) => p.theme.darkest};
  color: ${(p) => p.theme.lightest};
  text-align: left;
  font-size: 1.2rem;
  padding: 1.3em;
`;

const Icons = styled.div`
  font-size: 2.4rem;
  width: 50%;
  display: flex;
  justify-content: space-between;
  padding: 0.2em 0px;
`;

const Link = styled.a`
  color: inherit;
  display: flex;
  cursor: pointer;
  &:hover {
    color: ${(p) => p.theme.medium};
  }
`;
