import styled, { css } from "styled-components";

const ButtStyles = css`
  background-color: ${(p) => p.theme.darkest};
  color: ${(p) => p.theme.lightest};
  padding: 0.5rem 1rem;
  max-width: 33%;
  border: none;
  border-radius: 1px;
`;

export const AppButton = styled.button`
  ${ButtStyles}
`;

export const AppButtonLink = styled.a`
  ${ButtStyles}
  text-decoration: none;
  &:visited {
    color: inherit;
  }
  &:active {
    color: inherit;
  }
`;
