import styled from "styled-components";

export const FormErrorText = styled.span`
  color: ${(p) => p.theme.error};
  text-transform: lowercase;
  padding-top: .5rem;
  padding-left: 0;
  font-size: 1.3rem;
`;
