import React from "react";
import styled from "styled-components";

export const Backdrop = ({ z }) => {
  return <BackdropContainer z={z}></BackdropContainer>;
};

const BackdropContainer = styled.div`
  position: fixed;
  z-index: ${(p) => p.z};
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #101010;
  opacity: 0.5;
`;
